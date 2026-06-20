"use client";

import { useCallback, useEffect, useState } from "react";
import { KEY, getJSON } from "@/lib/storage";
import type { AdminAction } from "@/lib/types";

export function useAdminAudit() {
  const [actions, setActions] = useState<AdminAction[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setActions(getJSON<AdminAction[]>(KEY.auditLog) ?? []);
    setHydrated(true);
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== KEY.auditLog || e.newValue == null) return;
      try {
        const v = JSON.parse(e.newValue) as AdminAction[];
        setActions(v);
      } catch { /* noop */ }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const exportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(actions, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const ts = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `glowstudio-audit-${ts}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [actions]);

  return { actions, hydrated, exportJSON };
}
