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
    <main className="min-h-screen bg-midnight">
      <NavBar />

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20">
        <h1 className="font-display text-[78px] md:text-[98px] leading-[0.8] tracking-[-0.02em] font-black text-bone-white text-center">
          Chọn gói phù hợp
        </h1>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition",
              billing === "monthly"
                ? "bg-aurora-violet text-bone-white shadow-[0_0_24px_rgba(124,92,255,0.45)]"
                : "text-ash-text hover:text-bone-white",
            )}
          >
            Hàng tháng
          </button>
          <button
            type="button"
            onClick={() => setBilling("yearly")}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition flex items-center gap-2",
              billing === "yearly"
                ? "bg-aurora-violet text-bone-white shadow-[0_0_24px_rgba(124,92,255,0.45)]"
                : "text-ash-text hover:text-bone-white",
            )}
          >
            Hàng năm
            <span className="text-toxic-lime text-xs">-20%</span>
          </button>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Top-up section */}
        <div className="mt-20 rounded-[20px] bg-charcoal border border-mist/10 p-10">
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
                  "rounded-[8.4px] border border-mist/20 bg-obsidian p-5",
                  "text-center hover:border-aurora-violet transition cursor-pointer",
                )}
              >
                <p className="font-display text-[44px] leading-[0.9] font-extrabold text-aurora-violet">
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

        {/* CTA bottom */}
        <div className="mt-16 text-center">
          <p className="text-ash-text text-sm">
            Cần gói Enterprise? Liên hệ sales để custom credits, SSO, brand kit riêng.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <ButtonPrimary size="lg">Bắt đầu miễn phí</ButtonPrimary>
            <ButtonGhost size="lg">Liên hệ sales</ButtonGhost>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
