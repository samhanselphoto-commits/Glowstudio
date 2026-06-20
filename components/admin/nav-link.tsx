"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

export function NavLink({
  href,
  label,
  icon: Icon,
  badge,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}) {
  const pathname = usePathname() ?? "";
  const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
        active
          ? "bg-white/[0.07] text-white"
          : "text-white/60 hover:bg-white/[0.04] hover:text-white/85"
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-[#7c5cff]" />
      )}
      <Icon className={cn("h-4 w-4", active ? "text-[#a98bff]" : "")} />
      <span className="flex-1">{label}</span>
      {typeof badge === "number" && badge > 0 && (
        <span className="rounded-full bg-[#7c5cff]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#a98bff]">
          {badge}
        </span>
      )}
    </Link>
  );
}
