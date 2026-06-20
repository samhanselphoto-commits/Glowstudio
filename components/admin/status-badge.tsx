"use client";

import type { UserStatus } from "@/lib/types";
import { cn } from "@/lib/cn";

const LABEL: Record<UserStatus, string> = {
  active: "Active",
  banned: "Banned",
  suspended: "Suspended",
};

const STYLE: Record<UserStatus, string> = {
  active: "bg-[#03e65b]/15 text-[#7af1a5] border-[#03e65b]/30",
  banned: "bg-[#ff5d4b]/15 text-[#ff9a8a] border-[#ff5d4b]/30",
  suspended: "bg-[#ffc533]/15 text-[#ffd76b] border-[#ffc533]/30",
};

export function StatusBadge({ status, className }: { status: UserStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        STYLE[status],
        className
      )}
    >
      {LABEL[status]}
    </span>
  );
}
