"use client";

/**
 * Page transition system — triggers an immediate route push on CTA click.
 *
 * Why this changed:
 *   We used to render a full-screen overlay (purple circle, then neutral
 *   black) to mask the route swap. That hid the brief flicker but added
 *   a hard "curtain" feel that fought the rest of the minimal direction.
 *
 *   The new approach: the overlay is gone. `app/template.tsx` is the
 *   single source of truth for the visual transition — it animates both
 *   the outgoing and incoming pages with a soft blur + scale. CTA clicks
 *   just call `router.push` immediately and let the template do the rest.
 *
 *   This keeps the existing `usePageTransition().go` API so
 *   TransitionLink and TransitionMagneticButton don't need to change.
 *
 * Flow:
 *   1. CTA click → `go(e, href)` → `router.push(href)` immediately.
 *   2. `pathname` updates → `app/template.tsx`'s `key` changes → motion
 *      runs the previous page's exit (fade out + blur + scale up) and the
 *      new page's enter (fade in + blur clear + scale to 1) concurrently.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type Ctx = {
  /** Trigger a transition from an element to a route. */
  go: (e: MouseEvent<HTMLElement>, href: string) => void;
};

const TransitionCtx = createContext<Ctx | null>(null);

export function usePageTransition() {
  return useContext(TransitionCtx);
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const go = useCallback(
    (_e: MouseEvent<HTMLElement>, href: string) => {
      router.push(href);
    },
    [router]
  );

  const value = useMemo<Ctx>(() => ({ go }), [go]);

  return (
    <TransitionCtx.Provider value={value}>
      {children}
    </TransitionCtx.Provider>
  );
}