"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { KEY, getJSON } from "@/lib/storage";
import type { AdminUser } from "@/lib/types";

/**
 * Render link "Admin" trong nav khi admin session tồn tại.
 * Đặt ở header của public pages.
 */
export function AdminLink() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setAdmin(getJSON<AdminUser | null>(KEY.adminSession) ?? null);
    setHydrated(true);
    function onStorage(e: StorageEvent) {
      if (e.key !== KEY.adminSession) return;
      try {
        setAdmin(e.newValue ? (JSON.parse(e.newValue) as AdminUser) : null);
      } catch { /* noop */ }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!hydrated || !admin) return null;

  return (
    <Link
      href="/admin"
      className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[#7c5cff]/40 bg-[#7c5cff]/10 px-2.5 text-[11px] font-semibold text-[#a98bff] transition-colors hover:bg-[#7c5cff]/20"
    >
      <ShieldCheck className="h-3 w-3" />
      Admin
    </Link>
  );
}
