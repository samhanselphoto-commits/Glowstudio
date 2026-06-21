"use client";

/**
 * Page transition system — expanding-circle morph from CTA → route → reveal.
 *
 * Flow:
 *   1. User clicks a CTA (button wired with `usePageTransition().go`).
 *   2. We capture the button's screen rect and start expanding a colored
 *      circle from there (purple accent #7c5cff).
 *   3. After the circle covers the viewport (~520ms), we call `router.push(href)`.
 *   4. The destination page mounts inside <PageReveal> which fades-up the
 *      content. We also briefly keep the overlay visible during the swap.
 *   5. Once mounted we shrink the circle so the new content appears.
 *
 * Browser back/forward (no CTA involved) still gets a soft cross-fade +
 * slight lift thanks to <PageReveal>.
 */

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const ACCENT = "#7c5cff";

type Phase = "idle" | "expanding" | "holding" | "shrinking";

type Origin = { x: number; y: number; size: number };

type Ctx = {
  /** Trigger a transition from an element to a route. */
  go: (e: MouseEvent<HTMLElement>, href: string) => void;
};

const TransitionCtx = createContext<Ctx | null>(null);

export function usePageTransition() {
  return useContext(TransitionCtx);
}

function diagonal(vw: number, vh: number) {
  return Math.hypot(vw, vh) + 64; // +buffer so edges aren't visible
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [navKey, setNavKey] = useState(0);
  const sizeRef = useRef({ vw: 0, vh: 0 });

  useEffect(() => {
    function measure() {
      sizeRef.current = { vw: window.innerWidth, vh: window.innerHeight };
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const go = useCallback((e: MouseEvent<HTMLElement>, href: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const size = Math.max(rect.width, rect.height);
    setOrigin({ x, y, size });
    setPendingHref(href);
    setPhase("expanding");
  }, []);

  // Expanding → push route (so navigation begins before the circle fully settles).
  useEffect(() => {
    if (phase !== "expanding") return;
    const id = window.setTimeout(() => {
      if (pendingHref) {
        const href = pendingHref;
        setPendingHref(null);
        startTransition(() => {
          router.push(href);
        });
        setPhase("holding");
      } else {
        setPhase("holding");
      }
    }, 480);
    return () => window.clearTimeout(id);
  }, [phase, pendingHref, router]);

  // When the new pathname mounts (during holding), shrink the circle.
  useEffect(() => {
    if (phase !== "holding") return;
    // Bump key so PageReveal re-mounts.
    setNavKey((k) => k + 1);
    const id = window.requestAnimationFrame(() => {
      // Two frames so the new page is fully painted before we shrink.
      window.requestAnimationFrame(() => setPhase("shrinking"));
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname, phase]);

  // After shrink, return to idle.
  useEffect(() => {
    if (phase !== "shrinking") return;
    const id = window.setTimeout(() => {
      setPhase("idle");
      setOrigin(null);
    }, 620);
    return () => window.clearTimeout(id);
  }, [phase]);

  const value = useMemo<Ctx>(() => ({ go }), [go]);

  const { vw, vh } = sizeRef.current;
  const endSize = vw && vh ? diagonal(vw, vh) : 2400;

  return (
    <TransitionCtx.Provider value={value}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Expanding / shrinking circle overlay */}
      <AnimatePresence>
        {(phase === "expanding" || phase === "holding" || phase === "shrinking") &&
          origin && (
            <motion.div
              key={phase}
              aria-hidden
              className="pointer-events-none fixed inset-0 z-[100]"
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  left: origin.x - endSize / 2,
                  top: origin.y - endSize / 2,
                  width: endSize,
                  height: endSize,
                  background: `radial-gradient(circle at 50% 50%, ${ACCENT} 0%, #5a3eff 55%, #2a0f9c 100%)`,
                  boxShadow: `0 0 140px 50px ${ACCENT}55, inset 0 0 90px 12px rgba(255,255,255,0.08)`,
                }}
                initial={{ scale: origin.size / endSize, opacity: 0.9 }}
                animate={{
                  scale:
                    phase === "shrinking" ? 0.94 : 1,
                  opacity: phase === "shrinking" ? 0 : 1,
                }}
                transition={
                  phase === "expanding" || phase === "holding"
                    ? { duration: 0.5, ease: [0.83, 0, 0.17, 1] }
                    : { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
                }
              >
                {/* Shimmer ring (only while expanding) */}
                {(phase === "expanding" || phase === "holding") && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.22) 50deg, transparent 110deg)`,
                    }}
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 360, opacity: 1 }}
                    transition={{ duration: 0.55, ease: "linear" }}
                  />
                )}
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* navKey counter for downstream consumers that want to react to a transition */}
      <span hidden data-nav-key={navKey} />
    </TransitionCtx.Provider>
  );
}
