"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * §6.4 — Active/Inactive Tab Pill.
 * Active: filled aurora violet + glow shadow.
 * Inactive: transparent, hover → text aurora violet.
 */
export interface TabPillProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const TabPill = React.forwardRef<HTMLButtonElement, TabPillProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "rounded-full",
          "px-5 py-2.5",
          "text-base font-medium",
          "transition",
          "whitespace-nowrap",
          active
            ? "bg-aurora-violet text-bone-white shadow-[0_0_24px_rgba(124,92,255,0.45)]"
            : "bg-transparent text-bone-white hover:text-aurora-violet",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
TabPill.displayName = "TabPill";
