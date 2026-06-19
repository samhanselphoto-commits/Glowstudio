import * as React from "react";
import { cn } from "@/lib/utils";
import { SparkleIcon, AlertIcon } from "@/components/icons";
import { formatCredits } from "@/lib/format";

/**
 * §6.12 — Credit Badge.
 * Pill ở nav, hiển thị số credit. Warning khi <100.
 */
export interface CreditBadgeProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  credits: number;
  warningThreshold?: number;
}

export const CreditBadge = React.forwardRef<
  HTMLButtonElement,
  CreditBadgeProps
>(({ className, credits, warningThreshold = 100, ...props }, ref) => {
  const isWarning = credits < warningThreshold;

  if (isWarning) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex items-center gap-2",
          "rounded-full",
          "border border-ember-coral",
          "bg-ember-coral/10",
          "px-3.5 py-1.5",
          "text-sm font-medium",
          "transition",
          className,
        )}
        {...props}
      >
        <AlertIcon className="w-4 h-4 text-ember-coral" />
        <span className="text-ember-coral">{formatCredits(credits)}</span>
        <span className="text-ember-coral/70">credits</span>
      </button>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "group flex items-center gap-2",
        "rounded-full",
        "border border-mist",
        "bg-transparent",
        "px-3.5 py-1.5",
        "text-sm font-medium",
        "hover:border-aurora-violet",
        "transition",
        className,
      )}
      {...props}
    >
      <SparkleIcon className="w-4 h-4 text-aurora-violet" />
      <span className="text-bone-white">{formatCredits(credits)}</span>
      <span className="text-ash-text">credits</span>
    </button>
  );
});
CreditBadge.displayName = "CreditBadge";
