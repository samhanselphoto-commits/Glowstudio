"use client";

/**
 * Admin credit management hook.
 * Cross-hook contract: topUp / adjust / bulkBonus cập nhật CẢ EndUser.credits
 * (trong KEY.endUsers) LẪN append CreditLog (với userId) + ghi audit.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { KEY, getJSON, setJSON } from "@/lib/storage";
import { makeId } from "@/lib/admin-seed";
import { logAdminAction } from "@/lib/audit";
import type { CreditLog, EndUser } from "@/lib/types";

type State = { logs: CreditLog[]; hydrated: boolean };

type AdminIdentity = { id: string; name: string };

const CAP = 2000;

export function useAdminCredits() {
  const [state, setState] = useState<State>({ logs: [], hydrated: false });

  useEffect(() => {
    const logs = getJSON<CreditLog[]>(KEY.creditLog) ?? [];
    setState({ logs, hydrated: true });
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== KEY.creditLog || e.newValue == null) return;
      try {
        const logs = JSON.parse(e.newValue) as CreditLog[];
        setState((s) => ({ ...s, logs }));
      } catch { /* noop */ }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persistLogs = useCallback((logs: CreditLog[]) => setJSON(KEY.creditLog, logs), []);

  const updateUserBalance = useCallback(
    (userId: string, delta: number) => {
      const users = getJSON<EndUser[]>(KEY.endUsers) ?? [];
      const next = users.map((u) =>
        u.id === userId
          ? { ...u, credits: Math.max(0, u.credits + delta), totalSpent: delta < 0 ? u.totalSpent + Math.abs(delta) : u.totalSpent }
          : u
      );
      setJSON(KEY.endUsers, next);
    },
    []
  );

  const topUp = useCallback(
    (input: { userId: string; amount: number; reason: string }, admin: AdminIdentity) => {
      if (input.amount <= 0) return { ok: false, error: "Số credit phải > 0" };
      const now = Date.now();
      const log: CreditLog = {
        id: makeId("cl"),
        delta: input.amount,
        reason: input.reason,
        createdAt: now,
        userId: input.userId,
        source: "topup",
      };
      setState((s) => {
        const next = [log, ...s.logs].slice(0, CAP);
        persistLogs(next);
        return { ...s, logs: next };
      });
      updateUserBalance(input.userId, input.amount);
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "credit.topup",
        target: input.userId,
        details: `+${input.amount} credit — ${input.reason}`,
      });
      return { ok: true, log };
    },
    [persistLogs, updateUserBalance]
  );

  const adjust = useCallback(
    (input: { userId: string; delta: number; reason: string }, admin: AdminIdentity) => {
      if (input.delta === 0) return { ok: false, error: "Delta phải khác 0" };
      // Check không cho âm quá số dư
      const users = getJSON<EndUser[]>(KEY.endUsers) ?? [];
      const target = users.find((u) => u.id === input.userId);
      if (!target) return { ok: false, error: "User không tồn tại" };
      if (input.delta < 0 && target.credits + input.delta < 0) {
        return { ok: false, error: "Không đủ số dư" };
      }
      const now = Date.now();
      const log: CreditLog = {
        id: makeId("cl"),
        delta: input.delta,
        reason: input.reason,
        createdAt: now,
        userId: input.userId,
        source: "admin_adjust",
      };
      setState((s) => {
        const next = [log, ...s.logs].slice(0, CAP);
        persistLogs(next);
        return { ...s, logs: next };
      });
      updateUserBalance(input.userId, input.delta);
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "credit.adjust",
        target: input.userId,
        details: `${input.delta > 0 ? "+" : ""}${input.delta} credit — ${input.reason}`,
      });
      return { ok: true, log };
    },
    [persistLogs, updateUserBalance]
  );

  const bulkBonus = useCallback(
    (input: { userIds: string[]; amount: number; reason: string }, admin: AdminIdentity) => {
      if (input.amount <= 0 || input.userIds.length === 0) {
        return { ok: false, error: "Số credit > 0 và phải chọn user" };
      }
      const now = Date.now();
      const newLogs: CreditLog[] = input.userIds.map((userId) => ({
        id: makeId("cl"),
        delta: input.amount,
        reason: input.reason,
        createdAt: now,
        userId,
        source: "topup",
      }));
      setState((s) => {
        const next = [...newLogs, ...s.logs].slice(0, CAP);
        persistLogs(next);
        return { ...s, logs: next };
      });
      input.userIds.forEach((uid) => updateUserBalance(uid, input.amount));
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "credit.bulk_bonus",
        target: input.userIds.join(","),
        details: `+${input.amount} credit × ${input.userIds.length} users — ${input.reason}`,
      });
      return { ok: true, count: input.userIds.length };
    },
    [persistLogs, updateUserBalance]
  );

  const stats = useMemo(() => {
    const totalIn = state.logs.filter((l) => l.delta > 0).reduce((s, l) => s + l.delta, 0);
    const totalOut = state.logs.filter((l) => l.delta < 0).reduce((s, l) => s + Math.abs(l.delta), 0);
    const last7d = state.logs.filter((l) => l.createdAt > Date.now() - 7 * 86400e3);
    const spent7d = last7d.filter((l) => l.delta < 0).reduce((s, l) => s + Math.abs(l.delta), 0);
    return { totalIn, totalOut, spent7d, count7d: last7d.length };
  }, [state.logs]);

  return {
    logs: state.logs,
    hydrated: state.hydrated,
    stats,
    topUp,
    adjust,
    bulkBonus,
  };
}
