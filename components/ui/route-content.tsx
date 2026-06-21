"use client";

/**
 * <RouteContent> — wraps a page's content so the `pageRevealUp` keyframe
 * (see globals.css) re-fires on every route change. We use `pathname` as
 * a React key so the inner DOM remounts when the route swaps.
 *
 * Why a wrapper instead of motion.div:
 *   - Pure CSS animation is more reliable under React 19 + Next.js 15
 *     streaming, which can race with motion's animation lifecycle.
 *   - No library dependency for the entrance — predictable timing that
 *     matches the PageTransitionProvider's expand/shrink phases.
 */

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
  className?: string;
};

export function RouteContent({ children, className }: Props) {
  const pathname = usePathname();
  return (
    <main key={pathname} data-route-content className={className}>
      {children}
    </main>
  );
}
