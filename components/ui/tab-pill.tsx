"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * §6.4 — Active/Inactive Tab Pill.
 * Active: filled aurora violet + glow shadow.
 * Inactive: transparent, hover → text aurora violet.
 * Disabled: opacity-40, cursor-not-allowed, optional badge (e.g. "Sắp ra mắt").
 */
export interface TabPillProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  disabled?: boolean;
  badge?: string;
}

export const TabPill = React.forwardRef<HTMLButtonElement, TabPillProps>(
  ({ className, active = false, disabled = false, badge, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "inline-flex items-center gap-2",
          "rounded-full",
          "px-5 py-2.5",
          "text-base font-medium",
          "transition whitespace-nowrap",
          active
            ? "bg-aurora-violet text-bone-white shadow-[0_0_24px_rgba(124,92,255,0.45)]"
            : "bg-transparent text-bone-white hover:text-aurora-violet",
          disabled && "opacity-40 cursor-not-allowed hover:text-bone-white",
          className,
        )}
        {...props}
      >
        {children}
        {badge && (
          <span
            className={cn(
              "rounded-full",
              "px-2 py-0.5",
              "text-[10px] font-bold uppercase tracking-wider",
              active
                ? "bg-bone-white/20 text-bone-white"
                : "bg-aurora-soft text-aurora-violet border border-aurora-violet/30",
            )}
          >
            {badge}
          </span>
        )}
      </button>
    );
  },
);
TabPill.displayName = "TabPill";
