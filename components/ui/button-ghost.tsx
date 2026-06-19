import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * §6.2 — Transparent fill, 1px mist border, 60px radius, canvaSans 500 white.
 * Hover: aurora soft bg + aurora violet border.
 */
export interface ButtonGhostProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  size?: "default" | "lg" | "sm";
}

const sizeMap = {
  default: "px-7 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
  sm: "px-3.5 py-1.5 text-sm",
} as const;

export const ButtonGhost = React.forwardRef<HTMLButtonElement, ButtonGhostProps>(
  ({ className, asChild = false, size = "default", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "rounded-full",
          "border border-mist",
          "bg-transparent",
          "text-bone-white",
          "font-medium",
          "transition",
          "hover:bg-aurora-soft hover:border-aurora-violet",
          "active:scale-[0.98]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          sizeMap[size],
          className,
        )}
        {...props}
      />
    );
  },
);
ButtonGhost.displayName = "ButtonGhost";
