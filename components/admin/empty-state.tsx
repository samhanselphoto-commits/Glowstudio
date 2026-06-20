"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ icon: Icon, title, description, action, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] text-white/40">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-[14px] font-semibold text-white">{title}</h3>
        {description && (
          <p className="mt-1 max-w-sm text-[12px] text-white/45">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
