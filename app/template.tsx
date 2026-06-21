"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

/**
 * App Router template — re-mounts on every navigation,
 * which is exactly what AnimatePresence needs to drive page transitions.
 * `initial={false}` skips the animation on the very first mount (SSR).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
