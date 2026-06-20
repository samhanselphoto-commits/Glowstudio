"use client";

import { useCallback, useEffect, useState } from "react";
import { KEY, getJSON, setJSON } from "@/lib/storage";
import { buildDemoLibrary } from "@/lib/seed";
import type { LibraryItem } from "@/lib/types";

type State = {
  items: LibraryItem[];
  hydrated: boolean;
};

export function useLibrary() {
  const [state, setState] = useState<State>({ items: [], hydrated: false });

  // Hydrate
  useEffect(() => {
    const items = getJSON<LibraryItem[]>(KEY.library) ?? [];
    setState({ items, hydrated: true });
  }, []);

  // Cross-tab sync
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== KEY.library || e.newValue == null) return;
      try {
        const items = JSON.parse(e.newValue) as LibraryItem[];
        setState((s) => ({ ...s, items }));
      } catch {
        /* noop */
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((items: LibraryItem[]) => {
    setJSON(KEY.library, items);
  }, []);

  const add = useCallback(
    (item: LibraryItem) => {
      setState((s) => {
        const items = [item, ...s.items].slice(0, 500); // cap
        persist(items);
        return { ...s, items };
      });
    },
    [persist]
  );

  const addMany = useCallback(
    (newItems: LibraryItem[]) => {
      if (newItems.length === 0) return;
      setState((s) => {
        const items = [...newItems, ...s.items].slice(0, 500);
        persist(items);
        return { ...s, items };
      });
    },
    [persist]
  );

  const update = useCallback(
    (id: string, patch: Partial<LibraryItem>) => {
      setState((s) => {
        const items = s.items.map((i) => (i.id === id ? { ...i, ...patch } : i));
        persist(items);
        return { ...s, items };
      });
    },
    [persist]
  );

  const remove = useCallback(
    (id: string) => {
      setState((s) => {
        const items = s.items.filter((i) => i.id !== id);
        persist(items);
        return { ...s, items };
      });
    },
    [persist]
  );

  const removeMany = useCallback(
    (ids: string[]) => {
      if (ids.length === 0) return;
      setState((s) => {
        const idSet = new Set(ids);
        const items = s.items.filter((i) => !idSet.has(i.id));
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

  const seedDemo = useCallback(() => {
    const items = buildDemoLibrary();
    persist(items);
    setState((s) => ({ ...s, items }));
  }, [persist]);

  const toggleLike = useCallback(
    (id: string) => {
      setState((s) => {
        const items = s.items.map((i) => (i.id === id ? { ...i, liked: !i.liked } : i));
        persist(items);
        return { ...s, items };
      });
    },
    [persist]
  );

  return {
    items: state.items,
    hydrated: state.hydrated,
    add,
    addMany,
    update,
    remove,
    removeMany,
    clear,
    seedDemo,
    toggleLike,
  };
}
