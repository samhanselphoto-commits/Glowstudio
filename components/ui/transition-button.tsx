"use client";

/**
 * <TransitionLink> — same as next/link, but on click triggers the
 * expanding-circle page transition (morph from button to full-screen overlay).
 *
 * Use for primary CTAs that navigate between routes. For plain links (footer,
 * nav) just keep using next/link — they still get the soft cross-fade from
 * PageReveal.
 */

import Link, { type LinkProps } from "next/link";
import { type MouseEvent, type ReactNode, type CSSProperties } from "react";
import { usePageTransition } from "@/components/ui/page-transition";
import { cn } from "@/lib/cn";

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
  /** Optional inline styles. */
  style?: CSSProperties;
  /** Pass to render as button (e.g. onClick handler expects button semantics). */
  as?: "a" | "button";
};

export function TransitionLink({
  children,
  className,
  style,
  onClick,
  href,
  as = "a",
  ...rest
}: Props) {
  const transition = usePageTransition();
  const isInternal =
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//");

  function handleClick(e: MouseEvent<HTMLElement>) {
    // next/link types onClick as MouseEvent<HTMLAnchorElement>; widen for our handler.
    onClick?.(e as unknown as Parameters<NonNullable<typeof onClick>>[0]);
    if (e.defaultPrevented) return;
    // Modifier keys → let the browser handle (new tab, etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (transition && isInternal) {
      e.preventDefault();
      transition.go(e, String(href));
    }
  }

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(className)}
        style={style}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(className)}
      style={style}
      {...rest}
    >
      {children}
    </Link>
  );
}
