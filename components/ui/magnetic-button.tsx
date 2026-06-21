"use client";

import { type ReactNode, type CSSProperties, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max pixel offset toward the cursor. */
  strength?: number;
  onClick?: () => void;
  style?: CSSProperties;
};

/**
 * Wraps content in a motion div that drifts slightly toward the cursor.
 * Use for primary CTAs to make them feel "alive" without being distracting.
 */
export function MagneticButton({
  children,
  className,
  strength = 8,
  onClick,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
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

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy, ...style }}
      className={cn("inline-block cursor-pointer", className)}
    >
      {children}
    </motion.div>
  );
}
