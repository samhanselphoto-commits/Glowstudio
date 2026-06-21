"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

/**
 * App Router template — re-mounts on every navigation, which is what
 * AnimatePresence needs to drive page transitions.
 *
 * Style: fade + soft scale + blur. Very light, barely noticeable — the
 * page "lifts" out (scale 1 → 1.01, blur 0 → 6px) and the next page
 * "settles" in (scale 1.01 → 1, blur 6px → 0). Same easing on both
 * sides so it reads as one continuous breath, not two separate anims.
 *
 * No overlay, no curtain — the new page cross-fades in directly over the
 * outgoing one. Single source of truth for all route changes (plain Link
 * and CTA-driven `usePageTransition().go`).
 *
 * Wrapper has `position: relative` so the exiting child can go absolute
 * and stack above the entering one without pushing layout.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, scale: 1.01, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.01, filter: "blur(6px)" }}
            transition={{
              duration: 0.32,
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
      </div>
    </MotionConfig>
  );
}