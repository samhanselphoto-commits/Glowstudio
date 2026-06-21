"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

/**
 * RouteTransitionShell — soft fade + scale + blur between routes.
 *
 * Lives in the root layout (not template) so AnimatePresence has a stable
 * parent that just re-renders on pathname change. Putting AnimatePresence
 * inside `template.tsx` caused the exit animation to race with the route
 * unmount and never fire.
 *
 * Style: very light, barely noticeable — page lifts out (scale 1→1.01,
 * blur 0→6px) and the next page settles in (scale 1.01→1, blur 6px→0).
 * Same easing on both sides so it reads as one continuous breath.
 */
export function RouteTransitionShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 1.01, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1, filter: "blur(6px)" }}
        transition={{
          duration: 0.36,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          willChange: "opacity, transform, filter",
          transformOrigin: "center top",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}