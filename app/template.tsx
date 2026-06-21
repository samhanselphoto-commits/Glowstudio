"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

/**
 * App Router template — re-mounts on every navigation,
 * which is what AnimatePresence needs to drive page transitions.
 *
 * Style: fade + soft scale + blur. Subtle, modern, focused.
 * CTA-driven nav still uses the expanding-circle overlay from
 * PageTransitionProvider (see `usePageTransition().go`).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.01, filter: "blur(4px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "opacity, transform, filter" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}