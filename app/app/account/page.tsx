"use client";

import * as React from "react";
import Link from "next/link";
import { InputField, ButtonPrimary, ButtonGhost, BuyCreditsModal } from "@/components/ui";
import { ACCOUNT_LINKS } from "@/lib/constants";
import { formatCredits } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function AccountPage() {
  const [showBuy, setShowBuy] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState<string>(ACCOUNT_LINKS[0].href);

  return (
    <div className="min-h-screen bg-midnight flex">
      {/* Sidebar */}
      <aside className="w-[240px] border-r border-mist/10 p-5 sticky top-0 h-screen">
        <h3 className="text-xs font-bold text-charcoal-mute uppercase tracking-wider px-4 mb-3">
          Tài khoản
        </h3>
        {ACCOUNT_LINKS.map((link) => {
          const isActive = link.href === activeHref;
          return (
            <button
              key={link.href}
              type="button"
              onClick={() => setActiveHref(link.href)}
              className={cn(
                "relative block w-full text-left rounded-md px-4 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-aurora-soft text-bone-white"
                  : "text-ash-text hover:text-bone-white",
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-aurora-violet" />
              )}
              {link.label}
            </button>
          );
        })}
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 max-w-4xl">
        <h1 className="font-display text-[34px] leading-[0.92] tracking-[-0.02em] font-extrabold text-bone-white">
          Hồ sơ
        </h1>

        {/* Credit balance card — 165px display only here (besides hero) */}
        <div className="mt-10 rounded-[20px] bg-charcoal border border-mist/10 p-10">
          <p className="text-xs font-bold text-charcoal-mute uppercase tracking-wider">
            Số dư credits
          </p>
          <p
            className={cn(
              "font-display",
              "text-[120px] md:text-[165px] leading-[0.8] tracking-[-0.02em]",
              "font-black text-aurora-violet mt-3",
            )}
          >
            {formatCredits(1247)}
          </p>
          <div className="flex items-center gap-3 mt-5 flex-wrap">
            <ButtonPrimary size="lg" onClick={() => setShowBuy(true)}>
              Mua thêm credits
            </ButtonPrimary>
            <ButtonGhost size="lg">Lịch sử giao dịch</ButtonGhost>
          </div>
        </div>

        {/* Profile form */}
        <section className="mt-12">
          <h2 className="text-[19px] font-medium text-bone-white mb-5">
            Thông tin cá nhân
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Họ và tên" defaultValue="Mai Linh" />
            <InputField label="Email" defaultValue="mailinh@example.com" />
            <InputField label="Số điện thoại" placeholder="0901234567" />
            <InputField label="Công ty" placeholder="Tên công ty" />
          </div>
          <ButtonPrimary size="lg" className="mt-6">
            Lưu thay đổi
          </ButtonPrimary>
        </section>

        {/* Plan info */}
        <section className="mt-12">
          <h2 className="text-[19px] font-medium text-bone-white mb-5">
            Gói hiện tại
          </h2>
          <div className="rounded-[20px] bg-charcoal border border-mist/10 p-7 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-base font-medium text-bone-white">Pro</p>
              <p className="text-sm text-ash-text mt-1">
                2.000 credits / tháng — hết hạn 20/07/2026
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ButtonGhost size="default">Hủy gói</ButtonGhost>
              <ButtonPrimary size="default">Nâng cấp Max</ButtonPrimary>
            </div>
          </div>
        </section>
      </main>

      <BuyCreditsModal open={showBuy} onOpenChange={setShowBuy} />
    </div>
  );
}
