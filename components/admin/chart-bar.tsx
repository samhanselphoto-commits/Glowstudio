"use client";

import { cn } from "@/lib/cn";

type ChartBarProps = {
  data: number[];
  labels?: string[];
  height?: number;
  color?: string;
  className?: string;
};

export function ChartBar({
  data,
  labels,
  height = 160,
  color = "from-[#7c5cff] to-[#d25fff]",
  className,
}: ChartBarProps) {
  const max = Math.max(...data, 1);
  return (
    <div className={cn("w-full", className)}>
      <div className="flex w-full items-end gap-1.5" style={{ height: `${height}px` }}>
        {data.map((v, i) => {
          const h = Math.max(2, Math.round((v / max) * (height - 24)));
          return (
            <div key={i} className="group flex flex-1 flex-col items-center gap-1.5">
              <div className="relative w-full" style={{ height: `${h}px` }}>
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 rounded-t-sm bg-gradient-to-t",
                    color
                  )}
                  style={{ height: `${h}px` }}
                />
                <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {v}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {labels && (
        <div className="mt-2 flex w-full gap-1.5">
          {labels.map((l, i) => (
            <div key={i} className="flex-1 text-center text-[9px] text-white/35">
              {l}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
