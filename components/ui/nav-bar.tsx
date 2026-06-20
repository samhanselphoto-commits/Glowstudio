"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonPrimary } from "./button-primary";
import { GMark } from "./g-mark";
import { NAV_LINKS } from "@/lib/constants";

/**
 * §6.11 — Nav Bar (v3 — generic with breadcrumbs + compact).
 *
 * Two layouts:
 *   - default (landing/marketing): logo + center nav + EN + Auth CTA
 *   - app (studio/library/account): logo + optional breadcrumbs + middle slot + right slot
 *
 * States:
 *   - Top: subtle dark tint with gradient hint, h-20
 *   - Scrolled: glassmorphism bg-obsidian/70 backdrop-blur-xl, h-16, gradient border dưới
 *
 * Effects:
 *   - Aurora gradient border dưới nav (khi scrolled)
 *   - Aurora underline animation on nav link hover
 *   - Scroll progress bar ở dưới cùng (gradient violet → magenta → cyan)
 */
export interface NavBarProps
  extends React.HTMLAttributes<HTMLElement> {
  authed?: boolean;
  /** Variant: 'marketing' = public site (default), 'app' = logged-in app shell */
  variant?: "marketing" | "app";
  /** Optional breadcrumbs rendered after logo (e.g. "Studio", "Library") */
  breadcrumbs?: React.ReactNode;
  /** Slot rendered in the middle of the bar (e.g. tabs row) */
  middle?: React.ReactNode;
  /** Slot rendered on the right (e.g. credit badge + avatar) */
  right?: React.ReactNode;
}

export const NavBar = React.forwardRef<HTMLElement, NavBarProps>(
  (
    {
      className,
      authed = false,
      variant = "marketing",
      breadcrumbs,
      middle,
      right,
      ...props
    },
    ref,
  ) => {
    const [scrolled, setScrolled] = React.useState(false);
    const [scrollProgress, setScrollProgress] = React.useState(0);

    React.useEffect(() => {
      const onScroll = () => {
        const y = window.scrollY;
        setScrolled(y > 8);
        const max = window.innerHeight;
        setScrollProgress(Math.min(y / max, 1));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
      <nav
        ref={ref}
        data-scrolled={scrolled}
        className={cn(
          "sticky top-0 z-50",
          "transition-[height,background-color,backdrop-filter] duration-300",
          scrolled
            ? "h-16 bg-obsidian/70 backdrop-blur-xl border-b border-aurora-violet/20"
            : "h-20 bg-gradient-to-b from-midnight/80 to-transparent border-b border-transparent backdrop-blur-sm",
          className,
        )}
        {...props}
      >
        <div className="max-w-[1600px] mx-auto h-full px-6 md:px-10 flex items-center justify-between gap-6">
          {/* LEFT — Logo + optional breadcrumbs */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Glowstudio home"
            >
              <GMark size={32} />
              <span
                className={cn(
                  "font-display font-extrabold text-bone-white tracking-[-0.02em] leading-none",
                  "transition-all duration-300",
                  scrolled ? "text-[15px]" : "text-[17px]",
                )}
              >
                Glowstudio
              </span>
            </Link>
            {breadcrumbs && (
              <>
                <span className="text-charcoal-mute text-base font-light">/</span>
                <span className="text-sm text-ash-text font-medium">
                  {breadcrumbs}
                </span>
              </>
            )}
          </div>

          {/* CENTER — Middle slot OR marketing nav */}
          {middle ? (
            <div className="flex-1 flex justify-center min-w-0">{middle}</div>
          ) : variant === "marketing" ? (
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative px-4 py-2 text-sm font-medium text-bone-white/80 hover:text-bone-white transition-colors"
                >
                  {link.label}
                  <span className="absolute left-4 right-4 bottom-1 h-px bg-gradient-to-r from-aurora-violet via-plasma-pink to-arc-blue scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {/* RIGHT — Custom slot OR default EN + Auth CTA */}
          {right ? (
            <div className="flex items-center gap-3 flex-shrink-0">{right}</div>
          ) : variant === "marketing" ? (
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                type="button"
                className="hidden sm:block text-sm font-medium text-ash-text hover:text-bone-white transition"
                aria-label="Switch language"
              >
                EN
              </button>
              {authed ? (
                <Link
                  href="/app/account"
                  className="rounded-full bg-obsidian border border-mist p-1.5 hover:border-aurora-violet transition"
                  aria-label="Tài khoản"
                >
                  <span className="block w-7 h-7 rounded-full bg-aurora-violet text-bone-white text-xs font-bold flex items-center justify-center">
                    ML
                  </span>
                </Link>
              ) : (
                <Link href="/login">
                  <ButtonPrimary size="sm" className="shimmer-on-hover">
                    Đăng nhập
                  </ButtonPrimary>
                </Link>
              )}
            </div>
          ) : null}
        </div>

        {/* Aurora gradient border under nav when scrolled */}
        {scrolled && (
          <div
            aria-hidden
            className="absolute left-0 right-0 bottom-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(124,92,255,0.6) 25%, rgba(255,61,191,0.6) 50%, rgba(41,240,255,0.6) 75%, transparent 100%)",
            }}
          />
        )}

        {/* Scroll progress bar */}
        <div className="absolute left-0 right-0 bottom-0 h-[2px] pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-aurora-violet via-plasma-pink to-arc-blue origin-left transition-transform duration-100"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </nav>
    );
  },
);
NavBar.displayName = "NavBar";
