"use client";

import { Sparkles } from "lucide-react";

type Item = { label: string; count: number; percent: number };

export function TopModelsList({ items }: { items: Item[]; total?: number }) {
  if (items.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-[12px] text-white/40">
        Chưa có dữ liệu
      </div>
    );
  }
  return (
    <div className="space-y-2.5">
      {items.map((it) => (
        <div key={it.label}>
          <div className="mb-1 flex items-center justify-between text-[12px]">
            <span className="flex items-center gap-1.5 text-white/80">
              <Sparkles className="h-3 w-3 text-[#a98bff]" />
              {it.label}
            </span>
            <span className="text-white/45">
              {it.count} <span className="text-white/30">({it.percent.toFixed(0)}%)</span>
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-[#d25fff]"
              style={{ width: `${it.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
