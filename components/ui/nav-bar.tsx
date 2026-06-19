"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonUtility } from "./button-utility";
import { NAV_LINKS } from "@/lib/constants";

/**
 * §6.11 — Nav Bar.
 * Transparent hoặc obsidian khi scroll, height 64-80px, full-bleed.
 * Sticky top, data-[scrolled=true] toggles via inline useEffect.
 */
export interface NavBarProps
  extends React.HTMLAttributes<HTMLElement> {
  authed?: boolean;
}

export const NavBar = React.forwardRef<HTMLElement, NavBarProps>(
  ({ className, authed = false, ...props }, ref) => {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 8);
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
          "h-16 md:h-20",
          "flex items-center justify-between",
          "px-6 md:px-10",
          "transition",
          scrolled
            ? "bg-obsidian/80 backdrop-blur-md border-b border-mist/10"
            : "bg-transparent border-b border-transparent",
          className,
        )}
        {...props}
      >
        {/* Left: wordmark */}
        <Link
          href="/"
          className="font-bold text-base text-bone-white tracking-tight"
        >
          GLOWSTUDIO
        </Link>

        {/* Center: nav links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-bone-white">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-aurora-violet transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: lang + auth */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-sm font-medium text-ash-text hover:text-bone-white transition"
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
            <ButtonUtility asChild>
              <Link href="/login">Đăng nhập</Link>
            </ButtonUtility>
          )}
        </div>
      </nav>
    );
  },
);
NavBar.displayName = "NavBar";
