"use client";

/**
 * Page transition system — expanding-circle morph from CTA → route → reveal.
 *
 * Flow:
 *   1. User clicks a CTA (button wired with `usePageTransition().go`).
 *   2. We capture the button's screen rect and start expanding a colored
 *      circle from there (purple accent #7c5cff).
 *   3. After the circle covers the viewport, we call `router.push(href)`.
 *   4. The destination page mounts naturally — its own CSS keyframes handle
 *      the fade-up entrance (see `.page-reveal` in globals.css).
 *   5. Once the new pathname commits, we shrink the circle so the new
 *      content appears from underneath.
 *
 * Why no <AnimatePresence mode="wait"> around children:
 *   Next.js App Router does a soft client-side navigation — the page
 *   component tree doesn't fully unmount, it streams new content into the
 *   same `<div>{children}</div>`. Forcing a full unmount via
 *   `AnimatePresence mode="wait"` causes a flash and a duplicate render.
 *   Instead we let CSS handle the entrance, and the overlay (a fixed
 *   portal) is the only animated element on top.
 */

import {
  createContext,
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

type Phase = "idle" | "expanding" | "shrinking";

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

/** Time to fully expand the circle. Keep in sync with CSS in PageReveal keyframes. */
const EXPAND_MS = 520;
/** Time to fully shrink + fade the circle after route change. */
const SHRINK_MS = 620;
/** Delay between finishing expand and calling router.push. */
const PUSH_DELAY_MS = EXPAND_MS - 40;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const sizeRef = useRef({ vw: 0, vh: 0 });
  // The pathname we started the transition from — so we know when it changed.
  const startPathRef = useRef<string | null>(null);

  useEffect(() => {
    function measure() {
      sizeRef.current = { vw: window.innerWidth, vh: window.innerHeight };
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const go = useCallback((e: MouseEvent<HTMLElement>, href: string) => {
    // Anchor the origin to the click point, fall back to element rect.
    const el = e.currentTarget;
    const rect = el?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const size = rect ? Math.max(rect.width, rect.height) : 0;
    setOrigin({ x, y, size });
    setPendingHref(href);
    startPathRef.current = window.location.pathname;
    setPhase("expanding");
  }, []);

  // Phase = expanding → after expand duration, push the route.
  useEffect(() => {
    if (phase !== "expanding") return;
    const href = pendingHref;
    if (!href) return;
    const id = window.setTimeout(() => {
      // Capture the href in a local so we don't clear before router fires.
      setPendingHref(null);
      router.push(href);
    }, PUSH_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [phase, pendingHref, router]);

  // When the pathname changes (i.e. the route committed), shrink the circle.
  useEffect(() => {
    if (phase !== "expanding") return;
    if (startPathRef.current == null) return;
    if (pathname === startPathRef.current) return;
    // Two frames so the new page is fully painted before we shrink.
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => setPhase("shrinking"));
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, [pathname, phase]);

  // After shrink, return to idle.
  useEffect(() => {
    if (phase !== "shrinking") return;
    const id = window.setTimeout(() => {
      setPhase("idle");
      setOrigin(null);
      startPathRef.current = null;
    }, SHRINK_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  const value = useMemo<Ctx>(() => ({ go }), [go]);

  const { vw, vh } = sizeRef.current;
  const endSize = vw && vh ? diagonal(vw, vh) : 2400;
  const overlayActive = phase === "expanding" || phase === "shrinking";

  return (
    <TransitionCtx.Provider value={value}>
      {children}

      {/* Expanding / shrinking circle overlay (portal) */}
      <AnimatePresence>
        {overlayActive && origin && (
          <motion.div
            key="transition-overlay"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[100]"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "shrinking" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={
              phase === "shrinking"
                ? { duration: SHRINK_MS / 1000, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0 }
            }
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
              initial={{ scale: origin.size / endSize, opacity: 0.92 }}
              animate={{
                scale: phase === "shrinking" ? 0.96 : 1,
                opacity: phase === "shrinking" ? 0 : 1,
              }}
              transition={
                phase === "shrinking"
                  ? { duration: SHRINK_MS / 1000, ease: [0.4, 0, 0.2, 1] }
                  : {
                      duration: EXPAND_MS / 1000,
                      ease: [0.83, 0, 0.17, 1],
                    }
              }
            >
              {/* Shimmer ring (only while expanding) */}
              {phase === "expanding" && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.22) 50deg, transparent 110deg)`,
                  }}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 360, opacity: 1 }}
                  transition={{ duration: EXPAND_MS / 1000, ease: "linear" }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  );
}
