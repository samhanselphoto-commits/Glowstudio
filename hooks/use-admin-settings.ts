"use client";

import { useCallback, useEffect, useState } from "react";
import { KEY, getJSON, setJSON } from "@/lib/storage";
import { DEFAULT_SETTINGS } from "@/lib/admin-seed";
import { logAdminAction } from "@/lib/audit";
import type { ModelName, SystemSettings } from "@/lib/types";

type AdminIdentity = { id: string; name: string };

export function useAdminSettings() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = getJSON<SystemSettings>(KEY.systemSettings);
    setSettings(raw ?? DEFAULT_SETTINGS);
    setHydrated(true);
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== KEY.systemSettings || e.newValue == null) return;
      try {
        const v = JSON.parse(e.newValue) as SystemSettings;
        setSettings(v);
      } catch { /* noop */ }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((s: SystemSettings) => setJSON(KEY.systemSettings, s), []);

  const update = useCallback(
    (patch: Partial<Omit<SystemSettings, "pricing">> & { pricing?: Partial<SystemSettings["pricing"]> }, admin: AdminIdentity) => {
      setSettings((prev) => {
        const base = prev ?? DEFAULT_SETTINGS;
        const pricing = patch.pricing ? { ...base.pricing, ...patch.pricing } : base.pricing;
        const next: SystemSettings = {
          ...base,
          ...patch,
          pricing,
          updatedAt: Date.now(),
          updatedBy: admin.id,
        };
        persist(next);
        logAdminAction({
          adminId: admin.id,
          adminName: admin.name,
          type: "settings.update",
          target: "system",
          details: Object.keys(patch).join(", "),
        });
        return next;
      });
    },
    [persist]
  );

  const setModelCredit = useCallback(
    (model: ModelName, credit: number, admin: AdminIdentity) => {
      update({ pricing: { [model]: { credit, enabled: settings?.pricing[model].enabled ?? true } } }, admin);
    },
    [update, settings]
  );

  const toggleModel = useCallback(
    (model: ModelName, enabled: boolean, admin: AdminIdentity) => {
      update(
        { pricing: { [model]: { credit: settings?.pricing[model].credit ?? 10, enabled } } },
        admin
      );
    },
    [update, settings]
  );

  return { settings, hydrated, update, setModelCredit, toggleModel };
}
