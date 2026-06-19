import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * §6.10 — Hero Wordmark.
 * leoSans 165px aurora violet, line-height 0.80. Mobile: 120px.
 * RULE §0 #4: display type line-height ≤ 0.90.
 * RULE §0 #3: leoSans only ≥34px.
 */
export interface HeroWordmarkProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "default" | "sm";
}

export function HeroWordmark({
  className,
  size = "default",
  children = "GLOWSTUDIO",
  ...props
}: HeroWordmarkProps) {
  return (
    <h1
      className={cn(
        "font-display",
        "font-black",
        "text-aurora-violet",
        "tracking-[-0.02em]",
        "leading-[0.8]",
        size === "default"
          ? "text-[120px] md:text-[165px]"
          : "text-[78px] md:text-[98px]",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
