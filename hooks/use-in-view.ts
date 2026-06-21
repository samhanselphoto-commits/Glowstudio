"use client";

import { useEffect, useRef, useState } from "react";
import { useMounted } from "./use-mounted";

type Options = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

/**
 * IntersectionObserver hook for scroll reveal.
 * Returns a ref to attach + a boolean `inView`.
 * Self-disconnects after first intersection by default.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: Options = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted, threshold, rootMargin, once]);

  return { ref, inView: mounted && inView };
}
