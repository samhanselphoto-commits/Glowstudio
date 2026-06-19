import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * §6.23 — G Mark Logo.
 * Geometric G với cut-out inner shape. Aurora gradient fill.
 * Square SVG, scales với size prop. dùng CSS variables từ @theme.
 */
export interface GMarkProps
  extends React.SVGAttributes<SVGSVGElement> {
  size?: number;
  withBg?: boolean; // Wrap trong rounded-[8.4px] bg-obsidian border
}

export function GMark({ size = 32, withBg = false, className, ...props }: GMarkProps) {
  const svg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
      aria-label="Glowstudio"
      {...props}
    >
      <defs>
        <linearGradient id="gMarkGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7c5cff" />
          <stop offset="0.5" stopColor="#d25fff" />
          <stop offset="1" stopColor="#33d0ff" />
        </linearGradient>
      </defs>
      {/* Outer rounded square — full G mark */}
      <rect width="32" height="32" rx="8" fill="url(#gMarkGradient)" />
      {/* G shape — white cutout */}
      <path
        d="M22.5 16.5C22.5 19.8 19.8 22.5 16.5 22.5C13.2 22.5 10.5 19.8 10.5 16.5C10.5 13.2 13.2 10.5 16.5 10.5C18.3 10.5 19.9 11.3 21 12.6L19 14.4C18.3 13.6 17.5 13.2 16.5 13.2C14.6 13.2 13.2 14.6 13.2 16.5C13.2 18.4 14.6 19.8 16.5 19.8C17.9 19.8 19 19 19.4 17.8H16.5V15.3H22.5V16.5Z"
        fill="#ffffff"
      />
    </svg>
  );

  if (withBg) {
    return (
      <div
        className="rounded-[8.4px] p-0.5 bg-gradient-to-br from-aurora-violet via-plasma-pink to-arc-blue animate-aurora-text"
        style={{ backgroundSize: "200% 200%" }}
      >
        {svg}
      </div>
    );
  }

  return svg;
}
