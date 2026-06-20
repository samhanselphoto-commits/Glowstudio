"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

type Option = { value: string; label: string };

type FilterBarProps = {
  search?: string;
  onSearchChange?: (v: string) => void;
  searchPlaceholder?: string;
  selects?: Array<{
    value: string;
    onChange: (v: string) => void;
    options: Option[];
    placeholder?: string;
  }>;
  onClear?: () => void;
  right?: React.ReactNode;
};

export function FilterBar({
  search,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm…",
  selects = [],
  onClear,
  right,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
      {onSearchChange && (
        <div className="relative flex flex-1 items-center min-w-[180px]">
          <Search className="absolute left-2.5 h-3.5 w-3.5 text-white/40" />
          <input
            value={search ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-md border border-white/10 bg-white/[0.03] py-1.5 pl-8 pr-3 text-[12px] text-white placeholder-white/30 outline-none focus:border-[#7c5cff]/60"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2 text-white/30 hover:text-white"
              aria-label="Clear"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
      {selects.map((s, i) => (
        <select
          key={i}
          value={s.value}
          onChange={(e) => s.onChange(e.target.value)}
          className={cn(
            "rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[12px] text-white outline-none focus:border-[#7c5cff]/60",
            s.value ? "text-white" : "text-white/40"
          )}
        >
          {s.placeholder && <option value="">{s.placeholder}</option>}
          {s.options.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#0a0a0a] text-white">
              {o.label}
            </option>
          ))}
        </select>
      ))}
      {onClear && (
        <button
          onClick={onClear}
          className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[12px] text-white/55 hover:text-white"
        >
          Reset
        </button>
      )}
      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
    </div>
  );
}
