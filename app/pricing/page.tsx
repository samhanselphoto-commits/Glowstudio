"use client";

import * as React from "react";
import {
  NavBar,
  Footer,
  PricingCard,
  ButtonPrimary,
  ButtonGhost,
} from "@/components/ui";
import { plans, topupPacks } from "@/lib/mock-data";
import { formatVND } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("monthly");

  return (
    <main className="min-h-screen bg-midnight relative overflow-hidden">
      <BackgroundDecor />

      <div className="relative z-10">
        <NavBar />

        <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20">
          <div className="text-center">
            <h1 className="font-display text-[78px] md:text-[128px] leading-[0.8] tracking-[-0.04em] font-black text-aurora-hero animate-fade-up">
              Chọn gói phù hợp
            </h1>
            <p className="text-base md:text-lg text-ash-text mt-6 max-w-2xl mx-auto animate-fade-up delay-200">
              Bắt đầu miễn phí, nâng cấp khi cần. Không phí ẩn, không hợp đồng ràng buộc.
            </p>
          </div>

          {/* Billing toggle — glass surface */}
          <div className="flex items-center justify-center mt-12 animate-fade-up delay-300">
            <div className="inline-flex p-1.5 rounded-full surface-aurora gap-1">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={cn(
                  "rounded-full px-6 py-2.5 text-sm font-medium transition",
                  billing === "monthly"
                    ? "bg-gradient-to-r from-aurora-violet via-neon-magenta to-cyber-cyan text-bone-white shadow-[0_0_24px_rgba(124,92,255,0.5)]"
                    : "text-ash-text hover:text-bone-white",
                )}
              >
                Hàng tháng
              </button>
              <button
                type="button"
                onClick={() => setBilling("yearly")}
                className={cn(
                  "rounded-full px-6 py-2.5 text-sm font-medium transition flex items-center gap-2",
                  billing === "yearly"
                    ? "bg-gradient-to-r from-aurora-violet via-neon-magenta to-cyber-cyan text-bone-white shadow-[0_0_24px_rgba(124,92,255,0.5)]"
                    : "text-ash-text hover:text-bone-white",
                )}
              >
                Hàng năm
                <span className="text-toxic-lime text-xs font-bold">-20%</span>
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
            {plans.map((plan, i) => (
              <div
                key={plan.id}
                className="animate-fade-up"
                style={{ animationDelay: `${400 + i * 100}ms` }}
              >
                <PricingCard plan={plan} />
              </div>
            ))}
          </div>

          {/* Top-up section — gradient surface */}
          <div className="mt-20 relative rounded-[20px] surface-aurora p-10 overflow-hidden animate-fade-up">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-aurora-soft blur-3xl pointer-events-none animate-glow-pulse"
            />
            <div className="relative">
              <h2 className="font-display text-[34px] leading-[0.92] tracking-[-0.02em] font-extrabold text-bone-white">
                Mua thêm credits
              </h2>
              <p className="text-sm text-ash-text mt-3">
                Credits mua thêm có hạn 12 tháng, dùng được cho mọi model.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-7">
                {topupPacks.map((pack) => (
                  <div
                    key={pack.id}
                    className={cn(
                      "rounded-[8.4px] border border-mist/20 bg-midnight/60 p-5",
                      "text-center transition cursor-pointer",
                      "hover:border-aurora-violet hover:shadow-[0_0_24px_rgba(124,92,255,0.3)] hover:-translate-y-1",
                    )}
                  >
                    <p className="font-display text-[44px] leading-[0.9] font-extrabold text-aurora-gradient">
                      {pack.credits}
                    </p>
                    <p className="text-xs text-ash-text mt-1">credits</p>
                    <p className="text-base font-medium text-bone-white mt-3">
                      {formatVND(pack.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA bottom */}
          <div className="mt-16 text-center">
            <p className="text-ash-text text-sm">
              Cần gói Enterprise? Liên hệ sales để custom credits, SSO, brand kit riêng.
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <ButtonPrimary size="lg" className="shimmer-on-hover">
                Bắt đầu miễn phí
              </ButtonPrimary>
              <ButtonGhost size="lg">Liên hệ sales</ButtonGhost>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

/** Aurora mesh background for pricing page. */
function BackgroundDecor() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-aurora-page animate-aurora-mesh"
        style={{ backgroundSize: "120% 120%" }}
      />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-aurora-violet/25 blur-[140px] animate-float" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-cyber-cyan/20 blur-[140px] animate-float-reverse" />
      <div className="absolute inset-0 bg-noise opacity-50" />
    </div>
  );
}
