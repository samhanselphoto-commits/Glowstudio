import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * §6.1 — Filled white pill, 60px radius, canvaSans 500, padding 27px × 10px.
 * No border. Subtle white outline shadow for separation.
 *
 * Variants: default | loading | disabled (visual via opacity-40 + cursor).
 */
const buttonPrimaryVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2",
    "rounded-full",
    "bg-bone-white text-midnight",
    "text-sm font-medium",
    "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
    "transition",
    "hover:bg-fog",
    "active:scale-[0.98]",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-bone-white",
  ),
  {
    variants: {
      size: {
        default: "px-7 py-2.5",
        lg: "px-7 py-3 text-base",
        sm: "px-3.5 py-1.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonPrimaryVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const ButtonPrimary = React.forwardRef<
  HTMLButtonElement,
  ButtonPrimaryProps
>(({ className, size, asChild = false, loading, children, disabled, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(buttonPrimaryVariants({ size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-midnight border-t-transparent rounded-full animate-spin" />
          <span className="opacity-80">{children}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  );
});
ButtonPrimary.displayName = "ButtonPrimary";
