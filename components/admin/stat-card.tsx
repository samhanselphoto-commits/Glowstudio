"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { ArrowDown, ArrowUp } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  delta?: number; // % change
  deltaLabel?: string;
  trend?: number[]; // mini bar chart values
  hint?: string;
};

export function StatCard({
  label,
  value,
  icon: Icon,
  iconColor = "text-[#a98bff]",
  iconBg = "bg-[#7c5cff]/10",
  delta,
  deltaLabel,
  trend,
  hint,
}: StatCardProps & { iconBg?: string }) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-medium uppercase tracking-wider text-white/40">
            {label}
          </div>
          <div className="mt-2 truncate text-[24px] font-bold leading-none text-white">
            {value}
          </div>
          {hint && (
            <div className="mt-1 text-[11px] text-white/35">{hint}</div>
          )}
        </div>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-md", iconBg, iconColor)}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      {(typeof delta === "number" || trend) && (
        <div className="mt-3 flex items-end justify-between gap-3">
          {typeof delta === "number" && (
            <div className="flex items-center gap-1 text-[11px]">
              {positive ? (
                <ArrowUp className="h-3 w-3 text-[#03e65b]" />
              ) : (
                <ArrowDown className="h-3 w-3 text-[#ff5d4b]" />
              )}
              <span className={positive ? "text-[#7af1a5]" : "text-[#ff9a8a]"}>
                {positive ? "+" : ""}
                {delta.toFixed(1)}%
              </span>
              {deltaLabel && <span className="text-white/35">{deltaLabel}</span>}
            </div>
          )}
          {trend && trend.length > 0 && (
            <div className="flex h-6 items-end gap-[2px]">
              {trend.map((v, i) => {
                const max = Math.max(...trend, 1);
                const h = Math.max(2, Math.round((v / max) * 24));
                return (
                  <div
                    key={i}
                    className="w-1 rounded-sm bg-[#7c5cff]/60"
                    style={{ height: `${h}px` }}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
