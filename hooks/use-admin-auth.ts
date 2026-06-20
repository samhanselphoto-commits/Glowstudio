"use client";

/**
 * Admin auth hook. Persist session ở KEY.adminSession.
 * Login xác thực qua mockHash (không phải real auth — chỉ demo).
 * Cross-tab sync qua storage event.
 * Mỗi login/logout ghi audit log.
 */

import { useCallback, useEffect, useState } from "react";
import { KEY, getJSON, setJSON, removeKey } from "@/lib/storage";
import { mockVerify, makeId } from "@/lib/admin-seed";
import { logAdminAction } from "@/lib/audit";
import type { AdminUser } from "@/lib/types";

type State = { admin: AdminUser | null; hydrated: boolean };

export function useAdminAuth() {
  const [state, setState] = useState<State>({ admin: null, hydrated: false });

  // Hydrate
  useEffect(() => {
    const admin = getJSON<AdminUser | null>(KEY.adminSession) ?? null;
    setState({ admin, hydrated: true });
  }, []);

  // Cross-tab sync
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== KEY.adminSession) return;
      try {
        const admin = e.newValue ? (JSON.parse(e.newValue) as AdminUser) : null;
        setState((s) => ({ ...s, admin }));
      } catch { /* noop */ }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback(
    (email: string, password: string): { ok: boolean; error?: string } => {
      const list = getJSON<AdminUser[]>(KEY.adminUsers) ?? [];
      const found = list.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
      if (!found) return { ok: false, error: "Email không tồn tại" };
      if (!mockVerify(password, found.passwordHash)) {
        return { ok: false, error: "Mật khẩu không đúng" };
      }
      const updated: AdminUser = { ...found, lastLoginAt: Date.now() };
      // Persist updated lastLoginAt
      const next = list.map((u) => (u.id === found.id ? updated : u));
      setJSON(KEY.adminUsers, next);
      setJSON(KEY.adminSession, updated);
      setState({ admin: updated, hydrated: true });
      logAdminAction({
        adminId: updated.id,
        adminName: updated.name,
        type: "auth.login",
        target: updated.id,
      });
      return { ok: true };
    },
    []
  );

  const logout = useCallback(() => {
    const current = getJSON<AdminUser | null>(KEY.adminSession);
    if (current) {
      logAdminAction({
        adminId: current.id,
        adminName: current.name,
        type: "auth.logout",
        target: current.id,
      });
    }
    removeKey(KEY.adminSession);
    setState({ admin: null, hydrated: true });
  }, []);

  const role = state.admin?.role;
  return {
    admin: state.admin,
    hydrated: state.hydrated,
    login,
    logout,
    isAdmin: role === "admin" || role === "super_admin",
    canModerate: role === "admin" || role === "super_admin" || role === "moderator",
    isSuperAdmin: role === "super_admin",
  };
}

// silence unused
void makeId;
