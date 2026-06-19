import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * §6.3 — Filled white pill nhỏ, padding 14px × 7px, 14px text.
 * Dùng cho "Đăng nhập" ở header.
 */
export interface ButtonUtilityProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const ButtonUtility = React.forwardRef<
  HTMLButtonElement,
  ButtonUtilityProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-full",
        "bg-bone-white text-midnight",
        "px-3.5 py-1.5",
        "text-sm font-medium",
        "transition",
        "hover:bg-fog",
        "active:scale-[0.98]",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
});
ButtonUtility.displayName = "ButtonUtility";
