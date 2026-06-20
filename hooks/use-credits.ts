"use client";

import { useCallback, useEffect, useState } from "react";
import { KEY, getJSON, setJSON } from "@/lib/storage";
import { DEMO_STARTING_CREDITS } from "@/lib/seed";
import type { CreditLog } from "@/lib/types";

type State = {
  balance: number;
  hydrated: boolean;
};

/**
 * Tracks credit balance in localStorage. Persists a log of every change.
 * `hydrated` flips to true after the first effect so consumers can
 * avoid hydration mismatch.
 */
export function useCredits() {
  const [state, setState] = useState<State>({ balance: DEMO_STARTING_CREDITS, hydrated: false });

  // Hydrate from localStorage
  useEffect(() => {
    const raw = getJSON<number>(KEY.credits);
    if (typeof raw === "number" && Number.isFinite(raw) && raw >= 0) {
      setState({ balance: raw, hydrated: true });
    } else {
      setState({ balance: DEMO_STARTING_CREDITS, hydrated: true });
    }
  }, []);

  // Cross-tab sync
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== KEY.credits || e.newValue == null) return;
      const n = Number(JSON.parse(e.newValue));
      if (Number.isFinite(n)) setState((s) => ({ ...s, balance: n }));
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((balance: number, log: CreditLog[]) => {
    setJSON(KEY.credits, balance);
    setJSON(KEY.creditLog, log);
  }, []);

  const deduct = useCallback(
    (amount: number, reason: string) => {
      if (amount <= 0) return false;
      setState((s) => {
        const next = Math.max(0, s.balance - amount);
        const log: CreditLog[] = [
          ...(getJSON<CreditLog[]>(KEY.creditLog) ?? []),
          {
            id: `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
            delta: -amount,
            reason,
            createdAt: Date.now(),
          },
        ];
        persist(next, log);
        return { ...s, balance: next };
      });
      return true;
    },
    [persist]
  );

  const topUp = useCallback(
    (amount: number, reason: string) => {
      if (amount <= 0) return false;
      setState((s) => {
        const next = s.balance + amount;
        const log: CreditLog[] = [
          ...(getJSON<CreditLog[]>(KEY.creditLog) ?? []),
          {
            id: `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
            delta: amount,
            reason,
            createdAt: Date.now(),
          },
        ];
        persist(next, log);
        return { ...s, balance: next };
      });
      return true;
    },
    [persist]
  );

  return { balance: state.balance, hydrated: state.hydrated, deduct, topUp };
}
