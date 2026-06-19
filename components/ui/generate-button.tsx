import * as React from "react";
import { cn } from "@/lib/utils";
import { SparkleIcon } from "@/components/icons";

/**
 * §6.14 — Generate Button.
 * Filled white pill lớn, bên phải credit cost pill obsidian.
 */
export interface GenerateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  cost?: number;
  loading?: boolean;
}

export const GenerateButton = React.forwardRef<
  HTMLButtonElement,
  GenerateButtonProps
>(({ className, cost = 8, loading = false, children = "Tạo ảnh", ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      disabled={loading}
      className={cn(
        "inline-flex items-center gap-3",
        "rounded-full",
        "bg-bone-white text-midnight",
        "px-7 py-3",
        "text-base font-medium",
        "transition",
        "hover:bg-fog",
        "active:scale-[0.98]",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-5 h-5 border-2 border-midnight border-t-transparent rounded-full animate-spin" />
      ) : (
        <SparkleIcon className="w-5 h-5" />
      )}
      <span>{children}</span>
      <span
        className={cn(
          "rounded-full",
          "bg-obsidian",
          "text-ash-text",
          "px-2.5 py-0.5",
          "text-xs font-medium",
        )}
      >
        {cost} credits
      </span>
    </button>
  );
});
GenerateButton.displayName = "GenerateButton";
