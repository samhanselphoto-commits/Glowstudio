"use client";

import { useCallback, useEffect, useState } from "react";
import { KEY, getJSON, setJSON } from "@/lib/storage";
import type { Generation } from "@/lib/types";

type State = {
  items: Generation[];
  hydrated: boolean;
};

export function useGenerations() {
  const [state, setState] = useState<State>({ items: [], hydrated: false });

  // Hydrate
  useEffect(() => {
    const items = getJSON<Generation[]>(KEY.generations) ?? [];
    setState({ items, hydrated: true });
  }, []);

  // Cross-tab sync
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== KEY.generations || e.newValue == null) return;
      try {
        const items = JSON.parse(e.newValue) as Generation[];
        setState((s) => ({ ...s, items }));
      } catch {
        /* noop */
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((items: Generation[]) => {
    setJSON(KEY.generations, items);
  }, []);

  const add = useCallback(
    (gen: Generation) => {
      setState((s) => {
        const items = [gen, ...s.items].slice(0, 200); // cap
        persist(items);
        return { ...s, items };
      });
    },
    [persist]
  );

  const clear = useCallback(() => {
    persist([]);
    setState((s) => ({ ...s, items: [] }));
  }, [persist]);

  return { items: state.items, hydrated: state.hydrated, add, clear };
}
