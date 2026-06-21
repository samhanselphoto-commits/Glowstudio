"use client";

import { type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  yOffset?: number;
};

/**
 * Wrap children to fade + slide up when they enter the viewport.
 * SSR-safe: starts hidden, reveals after mount + intersection.
 */
export function RevealOnScroll({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  yOffset = 18,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: inView ? "translateY(0)" : `translateY(${yOffset}px)`,
      }}
      className={cn(
        "transition-all duration-700 ease-out",
        inView ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}
