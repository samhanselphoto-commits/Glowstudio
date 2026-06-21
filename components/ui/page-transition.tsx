"use client";

/**
 * Page transition system — soft fade overlay between routes.
 *
 * Why this changed:
 *   The previous expanding-circle overlay (purple radial gradient) was
 *   heavy, slow (~1.1s), and visually loud — out of step with the Studio's
 *   new minimal direction. We keep the `usePageTransition().go` API so
 *   existing CTAs (TransitionLink, TransitionMagneticButton) still work,
 *   but the visual is now a quick white-to-black fade-out + fade-in,
 *   neutral tones, no glow.
 *
 *   Underneath, `app/template.tsx` still runs its own fade+scale+blur on
 *   the new page mount, so we only need the overlay to mask the swap
 *   for ~180ms — long enough to hide the brief flicker, short enough to
 *   feel instant.
 *
 * Flow:
 *   1. User clicks a CTA (button wired with `usePageTransition().go`).
 *   2. We fade a neutral overlay to opaque (~180ms).
 *   3. Then `router.push(href)`. The new page mounts behind the overlay,
 *      with its own fade+blur entrance from `app/template.tsx`.
 *   4. We fade the overlay back to transparent (~220ms) — the new page
 *      is already painted, so this is just lifting the curtain.
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

type Phase = "idle" | "fading-in" | "fading-out";

type Ctx = {
  /** Trigger a transition from an element to a route. */
  go: (e: MouseEvent<HTMLElement>, href: string) => void;
};

const TransitionCtx = createContext<Ctx | null>(null);

export function usePageTransition() {
  return useContext(TransitionCtx);
}

/** Time to fade the overlay to opaque before pushing the route. */
const FADE_IN_MS = 180;
/** Time to fade the overlay back out after the new page commits. */
const FADE_OUT_MS = 220;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  const startPathRef = useRef<string | null>(null);

  const go = useCallback((_e: MouseEvent<HTMLElement>, href: string) => {
    startPathRef.current = window.location.pathname;
    setPhase("fading-in");
    // Push the route right after the overlay covers the screen.
    window.setTimeout(() => router.push(href), FADE_IN_MS);
  }, [router]);

  // When the new pathname commits, lift the curtain (fade out).
  useEffect(() => {
    if (phase !== "fading-in") return;
    if (startPathRef.current == null) return;
    if (pathname === startPathRef.current) return;
    // Two RAFs so the new page is fully painted before we reveal it.
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => setPhase("fading-out"));
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, [pathname, phase]);

  // After fade-out completes, return to idle.
  useEffect(() => {
    if (phase !== "fading-out") return;
    const id = window.setTimeout(() => {
      setPhase("idle");
      startPathRef.current = null;
    }, FADE_OUT_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  const value = useMemo<Ctx>(() => ({ go }), [go]);

  const overlayActive = phase === "fading-in" || phase === "fading-out";

  return (
    <TransitionCtx.Provider value={value}>
      {children}

      {/* Neutral fade overlay — masks the route swap */}
      <AnimatePresence>
        {overlayActive && (
          <motion.div
            key="transition-overlay"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[100] bg-[#0a0a0a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "fading-in" ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration:
                phase === "fading-in"
                  ? FADE_IN_MS / 1000
                  : FADE_OUT_MS / 1000,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  );
}