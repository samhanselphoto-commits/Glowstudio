import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { footerSections } from "@/lib/mock-data";
import { FacebookIcon, InstagramIcon } from "@/components/icons";

/**
 * §6.21 — Footer.
 * Multi-column link list, ash text, hover white, no bullets, gap 7-10px.
 */
export function Footer({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn("border-t border-mist/10 mt-20", className)}
      {...props}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="col-span-2">
            <span className="font-bold text-base text-bone-white">GLOWSTUDIO</span>
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
              className="text-ash-text hover:text-bone-white transition"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-ash-text hover:text-bone-white transition"
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
