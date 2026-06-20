"use client";

import type { AdminRole } from "@/lib/types";
import { cn } from "@/lib/cn";

const LABEL: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  moderator: "Moderator",
};

const STYLE: Record<AdminRole, string> = {
  super_admin: "bg-[#ffc533]/15 text-[#ffd76b] border-[#ffc533]/30",
  admin: "bg-[#7c5cff]/15 text-[#a98bff] border-[#7c5cff]/30",
  moderator: "bg-[#33d0ff]/15 text-[#7adfff] border-[#33d0ff]/30",
};

export function RoleBadge({ role, className }: { role: AdminRole; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        STYLE[role],
        className
      )}
    >
      {LABEL[role]}
    </span>
  );
}
