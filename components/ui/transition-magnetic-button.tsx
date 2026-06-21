"use client";

/**
 * <TransitionMagneticButton> — magnetic drift + expanding-circle transition
 * on click, routing to `href` (must be internal like "/studio").
 *
 * Uses the page transition system to morph the button into a full-screen
 * circle before navigating.
 */

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { usePageTransition } from "@/components/ui/page-transition";

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
  /** Max pixel offset toward the cursor. */
  strength?: number;
  style?: CSSProperties;
};

export function TransitionMagneticButton({
  children,
  href,
  className,
  strength = 8,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const transition = usePageTransition();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 20, mass: 0.5 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set((dx / (r.width / 2)) * strength);
    y.set((dy / (r.height / 2)) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (transition) {
      transition.go(e as unknown as React.MouseEvent<HTMLElement>, href);
    } else {
      router.push(href);
    }
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      role="link"
      tabIndex={0}
      style={{ x: sx, y: sy, ...style }}
      className={cn("inline-block cursor-pointer", className)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (transition) {
            const fake = {
              currentTarget: ref.current,
            } as unknown as React.MouseEvent<HTMLElement>;
            transition.go(fake, href);
          } else {
            router.push(href);
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}
