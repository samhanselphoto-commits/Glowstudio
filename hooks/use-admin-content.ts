"use client";

/**
 * Admin content moderation hook.
 * Quản lý library items, generations, community posts.
 * Hỗ trợ hide/unhide/delete.
 */

import { useCallback, useEffect, useState } from "react";
import { KEY, getJSON, setJSON } from "@/lib/storage";
import { logAdminAction } from "@/lib/audit";
import type { CommunityPost, Generation, LibraryItem } from "@/lib/types";

type AdminIdentity = { id: string; name: string };

type State = {
  library: LibraryItem[];
  generations: Generation[];
  community: CommunityPost[];
  hydrated: boolean;
};

export function useAdminContent() {
  const [state, setState] = useState<State>({
    library: [],
    generations: [],
    community: [],
    hydrated: false,
  });

  useEffect(() => {
    setState({
      library: getJSON<LibraryItem[]>(KEY.library) ?? [],
      generations: getJSON<Generation[]>(KEY.generations) ?? [],
      community: getJSON<CommunityPost[]>(KEY.communityPosts) ?? [],
      hydrated: true,
    });
  }, []);

  // Cross-tab: re-read all 3 keys
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (!e.key) return;
      if (e.key === KEY.library) {
        try {
          const v = e.newValue ? (JSON.parse(e.newValue) as LibraryItem[]) : [];
          setState((s) => ({ ...s, library: v }));
        } catch { /* noop */ }
      } else if (e.key === KEY.generations) {
        try {
          const v = e.newValue ? (JSON.parse(e.newValue) as Generation[]) : [];
          setState((s) => ({ ...s, generations: v }));
        } catch { /* noop */ }
      } else if (e.key === KEY.communityPosts) {
        try {
          const v = e.newValue ? (JSON.parse(e.newValue) as CommunityPost[]) : [];
          setState((s) => ({ ...s, community: v }));
        } catch { /* noop */ }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persistLibrary = useCallback((v: LibraryItem[]) => setJSON(KEY.library, v), []);
  const persistGenerations = useCallback((v: Generation[]) => setJSON(KEY.generations, v), []);
  const persistCommunity = useCallback((v: CommunityPost[]) => setJSON(KEY.communityPosts, v), []);

  // === Library ===
  const hideLibrary = useCallback(
    (id: string, reason: string, admin: AdminIdentity) => {
      setState((s) => {
        const next = s.library.map((i) => (i.id === id ? { ...i, hidden: true, hiddenReason: reason } : i));
        persistLibrary(next);
        return { ...s, library: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "content.hide",
        target: id,
        details: `library — ${reason}`,
      });
    },
    [persistLibrary]
  );

  const unhideLibrary = useCallback(
    (id: string, admin: AdminIdentity) => {
      setState((s) => {
        const next = s.library.map((i) => (i.id === id ? { ...i, hidden: false, hiddenReason: undefined } : i));
        persistLibrary(next);
        return { ...s, library: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "content.unhide",
        target: id,
        details: "library",
      });
    },
    [persistLibrary]
  );

  const deleteLibrary = useCallback(
    (id: string, admin: AdminIdentity) => {
      setState((s) => {
        const next = s.library.filter((i) => i.id !== id);
        persistLibrary(next);
        return { ...s, library: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "content.delete",
        target: id,
        details: "library",
      });
    },
    [persistLibrary]
  );

  // === Generations ===
  const deleteGeneration = useCallback(
    (id: string, admin: AdminIdentity) => {
      setState((s) => {
        const next = s.generations.filter((g) => g.id !== id);
        persistGenerations(next);
        return { ...s, generations: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "content.delete",
        target: id,
        details: "generation",
      });
    },
    [persistGenerations]
  );

  // === Community ===
  const hideCommunity = useCallback(
    (id: string, reason: string, admin: AdminIdentity) => {
      setState((s) => {
        const next = s.community.map((p) => (p.id === id ? { ...p, hidden: true, hiddenReason: reason } : p));
        persistCommunity(next);
        return { ...s, community: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "content.hide",
        target: id,
        details: `community — ${reason}`,
      });
    },
    [persistCommunity]
  );

  const unhideCommunity = useCallback(
    (id: string, admin: AdminIdentity) => {
      setState((s) => {
        const next = s.community.map((p) => (p.id === id ? { ...p, hidden: false, hiddenReason: undefined } : p));
        persistCommunity(next);
        return { ...s, community: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "content.unhide",
        target: id,
        details: "community",
      });
    },
    [persistCommunity]
  );

  const deleteCommunity = useCallback(
    (id: string, admin: AdminIdentity) => {
      setState((s) => {
        const next = s.community.filter((p) => p.id !== id);
        persistCommunity(next);
        return { ...s, community: next };
      });
      logAdminAction({
        adminId: admin.id,
        adminName: admin.name,
        type: "content.delete",
        target: id,
        details: "community",
      });
    },
    [persistCommunity]
  );

  return {
    library: state.library,
    generations: state.generations,
    community: state.community,
    hydrated: state.hydrated,
    hideLibrary,
    unhideLibrary,
    deleteLibrary,
    deleteGeneration,
    hideCommunity,
    unhideCommunity,
    deleteCommunity,
  };
}
