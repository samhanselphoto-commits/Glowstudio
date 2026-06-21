"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Sparkles, Bell } from "lucide-react";

import { CreditChip } from "@/components/ui/credit-chip";
import { AdminLink } from "@/components/public/admin-link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TransitionLink } from "@/components/ui/transition-button";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "Studio", href: "/studio" },
  { label: "Community", href: "/community" },
  { label: "Library", href: "/library" },
  { label: "Pricing", href: "/pricing" },
];

type Props = {
  /** "home" hiển thị login/signup CTA, "studio" hiển thị user avatar. */
  variant?: "home" | "studio";
};

/**
 * Sticky nav shared by homepage + studio.
 * Tăng blur + shadow khi scroll xuống > 8px.
 */
export function StickyNav({ variant = "home" }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b bg-[#0a0a0a]/70 backdrop-blur-xl transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "border-white/10 bg-[#0a0a0a]/85 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl saturate-150"
          : "border-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between gap-6 px-6",
          variant === "studio" ? "max-w-[1600px]" : "max-w-7xl"
        )}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff] shadow-[0_0_24px_rgba(124,92,255,0.55)]">
            <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Glowstudio</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => {
            const active =
              n.href === "/"
                ? pathname === "/"
                : pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <TransitionLink
                key={n.label}
                href={n.href}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-white/10 font-medium text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                {n.label}
              </TransitionLink>
            );
          })}
        </nav>

        {variant === "home" ? (
          <div className="flex items-center gap-2">
            <AdminLink />
            <button className="hidden h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-white sm:flex">
              <Bell className="h-4 w-4" />
            </button>
            <CreditChip className="hidden md:inline-flex" />
            <Link
              href="/login"
              className="hidden h-9 items-center rounded-full px-4 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white sm:flex"
            >
              Đăng nhập
            </Link>
            <MagneticButton
              onClick={() => router.push("/signup")}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Bắt đầu miễn phí
            </MagneticButton>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <CreditChip className="hidden sm:inline-flex" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7c5cff] to-[#d25fff] text-xs font-semibold">
              LN
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
