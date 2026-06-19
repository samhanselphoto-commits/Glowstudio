import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * §6.9 — Section Headline.
 * leoSans 44-78px white, line-height 0.85-0.90, tracking -0.02em.
 * Plus ash-text subheadline.
 *
 * Uses `heading` (not `title`) so it composes cleanly with HTMLAttributes.
 */
export interface SectionHeadlineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  heading: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "text-[34px] md:text-[44px] leading-[0.92]",
  md: "text-[44px] md:text-[48px] leading-[0.9]",
  lg: "text-[44px] md:text-[78px] leading-[0.85]",
} as const;

export function SectionHeadline({
  className,
  heading,
  subtitle,
  align = "left",
  size = "lg",
  ...props
}: SectionHeadlineProps) {
  return (
    <div
      className={cn(align === "center" ? "text-center" : "text-left", className)}
      {...props}
    >
      <h2
        className={cn(
          "font-display font-extrabold text-bone-white tracking-[-0.02em]",
          sizeMap[size],
        )}
      >
        {heading}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base text-ash-text mt-4",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
