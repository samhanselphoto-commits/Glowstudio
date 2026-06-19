import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { TagColor } from "@/lib/constants";

/**
 * §6.6 — Category Tag Chip.
 * 6 màu tag palette. White text 12-14px bold. Padding 7px × 14px.
 * RULE: chỉ dùng cho tag/chip/badge — KHÔNG fill lớn, hero, background (§0 rule #7).
 */
const tagChipVariants = cva(
  cn(
    "inline-flex items-center",
    "rounded-full",
    "px-3.5 py-1.5",
    "text-xs font-bold",
    "text-bone-white",
    "whitespace-nowrap",
  ),
  {
    variants: {
      color: {
        lime: "bg-toxic-lime",
        yellow: "bg-voltage-yellow",
        pink: "bg-shock-pink",
        coral: "bg-ember-coral",
        plasma: "bg-plasma-pink",
        blue: "bg-arc-blue",
      },
    },
    defaultVariants: {
      color: "lime",
    },
  },
);

export interface TagChipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof tagChipVariants> {
  color?: TagColor;
}

export function TagChip({ className, color, children, ...props }: TagChipProps) {
  return (
    <span
      className={cn(tagChipVariants({ color: color ?? undefined }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
