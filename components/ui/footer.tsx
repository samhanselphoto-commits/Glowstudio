import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { footerSections } from "@/lib/mock-data";
import { FacebookIcon, InstagramIcon } from "@/components/icons";

/**
 * §6.21 — Footer.
 * Multi-column link list, ash text, hover white, no bullets, gap 7-10px.
 *
 * V2 — gradient divider on top, brand wordmark with gradient highlight.
 */
export function Footer({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn("mt-20 relative", className)}
      {...props}
    >
      {/* Gradient divider above footer */}
      <div
        aria-hidden
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(124,92,255,0.5) 25%, rgba(255,61,191,0.5) 50%, rgba(41,240,255,0.5) 75%, transparent 100%)",
        }}
      />
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="col-span-2">
            <span className="font-black text-2xl tracking-[-0.04em] text-aurora-gradient">
              GLOWSTUDIO
            </span>
            <p className="text-sm text-ash-text mt-4 max-w-xs">
              Nền tảng AI tạo ảnh cho designer và marketer Việt Nam.
            </p>
          </div>
          {/* Link cols */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold text-charcoal-mute uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ash-text hover:text-bone-white transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-mist/10 flex items-center justify-between">
          <p className="text-xs text-charcoal-mute">
            © 2026 Glowstudio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-ash-text hover:text-aurora-violet transition"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-ash-text hover:text-aurora-violet transition"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
