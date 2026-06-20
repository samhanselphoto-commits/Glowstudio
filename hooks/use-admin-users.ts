"use client";

/**
 * Admin users CRUD hook. Persist vào KEY.endUsers.
 * Mỗi mutating action ghi audit log.
 * Cross-tab sync qua storage event.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { KEY, getJSON, setJSON } from "@/lib/storage";
import { makeId } from "@/lib/admin-seed";
import { logAdminAction } from "@/lib/audit";
import type { EndUser, UserStatus } from "@/lib/types";

type State = { users: EndUser[]; hydrated: boolean };

type AdminIdentity = { id: string; name: string };

const CAP = 500;

export function useAdminUsers() {
  const [state, setState] = useState<State>({ users: [], hydrated: false });

  useEffect(() => {
    const users = getJSON<EndUser[]>(KEY.endUsers) ?? [];
    setState({ users, hydrated: true });
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== KEY.endUsers || e.newValue == null) return;
      try {
        const users = JSON.parse(e.newValue) as EndUser[];
        setState((s) => ({ ...s, users }));
      } catch { /* noop */ }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((users: EndUser[]) => setJSON(KEY.endUsers, users), []);

  const findById = useCallback(
    (id: string) => state.users.find((u) => u.id === id) ?? null,
    [state.users]
  );

  const create = useCallback(
    (input: { email: string; name: string; status?: UserStatus; credits?: number }, admin: AdminIdentity) => {
      const now = Date.now();
      const u: EndUser = {
        id: makeId("usr"),
        email: input.email.toLowerCase().trim(),
        name: input.name.trim(),
        status: input.status ?? "active",
        credits: input.credits ?? 100,
        totalSpent: 0,
        signupBonusClaimed: true,
        createdAt: now,
        lastSeenAt: now,
      };
      setState((s) => {
        const next = [u, ...s.users].slice(0, CAP);
        persist(next);
        return { ...s, users: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "user.create",
        target: u.id,
        details: `${u.name} (${u.email})`,
      });
      return u;
    },
    [persist]
  );

  const update = useCallback(
    (id: string, patch: Partial<Pick<EndUser, "name" | "email" | "avatar">>, admin: AdminIdentity) => {
      setState((s) => {
        const next = s.users.map((u) => (u.id === id ? { ...u, ...patch } : u));
        persist(next);
        return { ...s, users: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "user.update",
        target: id,
        details: Object.keys(patch).join(", "),
      });
    },
    [persist]
  );

  const remove = useCallback(
    (id: string, admin: AdminIdentity) => {
      const u = findById(id);
      setState((s) => {
        const next = s.users.filter((u) => u.id !== id);
        persist(next);
        return { ...s, users: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "user.delete",
        target: id,
        details: u?.email,
      });
    },
    [persist, findById]
  );

  const setStatus = useCallback(
    (id: string, status: UserStatus, reason: string | undefined, admin: AdminIdentity) => {
      const now = Date.now();
      setState((s) => {
        const next = s.users.map((u) =>
          u.id === id
            ? {
                ...u,
                status,
                bannedAt: status === "banned" || status === "suspended" ? now : undefined,
                banReason: status === "banned" || status === "suspended" ? reason : undefined,
              }
            : u
        );
        persist(next);
        return { ...s, users: next };
      });
      const type =
        status === "banned"
          ? "user.ban"
          : status === "suspended"
          ? "user.suspend"
          : status === "active"
          ? "user.reactivate"
          : "user.status.change";
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type,
        target: id,
        details: reason,
      });
    },
    [persist]
  );

  const bulkBan = useCallback(
    (ids: string[], reason: string, admin: AdminIdentity) => {
      const now = Date.now();
      setState((s) => {
        const idSet = new Set(ids);
        const next = s.users.map((u) =>
          idSet.has(u.id)
            ? { ...u, status: "banned" as UserStatus, bannedAt: now, banReason: reason }
            : u
        );
        persist(next);
        return { ...s, users: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "user.ban",
        target: ids.join(","),
        details: `Bulk ban ${ids.length} users: ${reason}`,
      });
    },
    [persist]
  );

  const bulkDelete = useCallback(
    (ids: string[], admin: AdminIdentity) => {
      setState((s) => {
        const idSet = new Set(ids);
        const next = s.users.filter((u) => !idSet.has(u.id));
        persist(next);
        return { ...s, users: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "user.delete",
        target: ids.join(","),
        details: `Bulk delete ${ids.length} users`,
      });
    },
    [persist]
  );

  // Computed
  const stats = useMemo(() => {
    const total = state.users.length;
    const active = state.users.filter((u) => u.status === "active").length;
    const banned = state.users.filter((u) => u.status === "banned").length;
    const suspended = state.users.filter((u) => u.status === "suspended").length;
    const totalCredits = state.users.reduce((s, u) => s + u.credits, 0);
    const totalSpent = state.users.reduce((s, u) => s + u.totalSpent, 0);
    return { total, active, banned, suspended, totalCredits, totalSpent };
  }, [state.users]);

  return {
    users: state.users,
    hydrated: state.hydrated,
    stats,
    findById,
    create,
    update,
    remove,
    setStatus,
    bulkBan,
    bulkDelete,
  };
}
