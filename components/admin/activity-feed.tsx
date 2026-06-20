"use client";

import { formatRelative } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

export type FeedItem = {
  id: string;
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  meta?: string;
  time: number;
};

export function ActivityFeed({ items, empty }: { items: FeedItem[]; empty?: string }) {
  if (items.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-[12px] text-white/40">
        {empty ?? "Chưa có hoạt động"}
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div key={it.id} className="flex items-start gap-2.5 rounded-md p-2 hover:bg-white/[0.02]">
            <div
              className={cn(
                "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                "bg-white/[0.04]",
                it.iconColor ?? "text-white/55"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] text-white/85">{it.title}</div>
              {it.meta && <div className="text-[11px] text-white/40">{it.meta}</div>}
            </div>
            <div className="text-[10px] text-white/35">{formatRelative(it.time)}</div>
          </div>
        );
      })}
    </div>
  );
}
