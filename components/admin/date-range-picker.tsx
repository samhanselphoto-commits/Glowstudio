"use client";

import { cn } from "@/lib/cn";

export type DateRange = "7d" | "30d" | "90d" | "all";

const OPTIONS: { value: DateRange; label: string }[] = [
  { value: "7d", label: "7 ngày" },
  { value: "30d", label: "30 ngày" },
  { value: "90d", label: "90 ngày" },
  { value: "all", label: "Tất cả" },
];

export function DateRangePicker({
  value,
  onChange,
  className,
}: {
  value: DateRange;
  onChange: (v: DateRange) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] p-0.5", className)}>
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded px-2.5 py-1 text-[11px] font-medium transition-colors",
            value === o.value
              ? "bg-[#7c5cff]/20 text-[#a98bff]"
              : "text-white/55 hover:text-white"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function rangeToMs(r: DateRange): number | null {
  const day = 24 * 60 * 60 * 1000;
  switch (r) {
    case "7d":
      return 7 * day;
    case "30d":
      return 30 * day;
    case "90d":
      return 90 * day;
    case "all":
      return null;
  }
}
