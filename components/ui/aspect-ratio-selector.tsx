"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ASPECT_RATIOS } from "@/lib/constants";

/**
 * §6.16 — Aspect Ratio Selector.
 * 1 row 5 chip. Active = aurora violet border + soft bg.
 */
export interface AspectRatioSelectorProps {
  value?: string;
  onChange?: (ratio: string) => void;
  className?: string;
}

export function AspectRatioSelector({
  value = "1:1",
  onChange,
  className,
}: AspectRatioSelectorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {ASPECT_RATIOS.map((r) => {
        const active = r === value;
        return (
          <button
            key={r}
            type="button"
            onClick={() => onChange?.(r)}
            className={cn(
              "px-3 py-1.5",
              "rounded-md",
              "text-xs font-medium",
              "border",
              "transition",
              active
                ? "border-aurora-violet bg-aurora-soft text-bone-white"
                : "border-mist/30 text-ash-text hover:border-mist hover:text-bone-white",
            )}
          >
            {r}
          </button>
        );
      })}
    </div>
  );
}
