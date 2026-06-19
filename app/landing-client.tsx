"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  TabFilterRow,
  ImageGalleryGrid,
  SectionHeadline,
  PricingCard,
} from "@/components/ui";
import { ChevronDownIcon } from "@/components/icons";
import { featureIconMap, type Feature, type GalleryItem, type Plan } from "@/lib/mock-data";

type FaqItem = { q: string; a: string };

interface LandingClientProps {
  tabs: string[];
  items: GalleryItem[];
  features: Feature[];
  plans: Plan[];
  faqItems: FaqItem[];
}

export function LandingClient({
  tabs,
  items,
  features,
  plans,
  faqItems,
}: LandingClientProps) {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const filtered = React.useMemo(() => {
    if (activeTab === "Tất cả") return items;
    return items.filter((i) => i.category === activeTab);
  }, [activeTab, items]);

  return (
    <>
      {/* USE CASES */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <TabFilterRow
          tabs={tabs}
          active={activeTab}
          onChange={setActiveTab}
        />
        <div className="mt-10">
          <ImageGalleryGrid items={filtered} />
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <SectionHeadline
          title="Mọi thứ bạn cần"
          subtitle="Từ tạo ảnh đơn lẻ đến cả set brand kit — Glowstudio xử lý hết, không cần chuyển tab."
          align="center"
          size="lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-16">
          {features.map((f) => {
            const Icon = featureIconMap[f.icon];
            return (
              <div
                key={f.title}
                className={cn(
                  "rounded-[20px] bg-charcoal p-7",
                  "border border-mist/10",
                  "transition hover:border-aurora-violet",
                )}
              >
                <Icon className="w-8 h-8 text-aurora-violet" />
                <h3 className="text-[19px] font-medium text-bone-white mt-5">
                  {f.title}
                </h3>
                <p className="text-sm text-ash-text mt-3">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <SectionHeadline
          title="Bảng giá đơn giản"
          subtitle="Bắt đầu miễn phí, nâng cấp khi cần. Không có phí ẩn."
          align="center"
          size="lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="/pricing"
            className="text-sm font-medium text-aurora-violet hover:underline"
          >
            So sánh chi tiết →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 mt-20">
        <SectionHeadline
          title="Câu hỏi thường gặp"
          size="lg"
        />
        <ul className="mt-10 flex flex-col gap-2.5">
          {faqItems.map((item, i) => {
            const open = openFaq === i;
            return (
              <li
                key={i}
                className={cn(
                  "rounded-[8.4px] border border-mist/10 bg-charcoal overflow-hidden",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-base font-medium text-bone-white">
                    {item.q}
                  </span>
                  <ChevronDownIcon
                    className={cn(
                      "w-5 h-5 text-ash-text flex-shrink-0 transition",
                      open && "rotate-180 text-aurora-violet",
                    )}
                  />
                </button>
                {open && (
                  <div className="px-5 pb-5 text-sm text-ash-text leading-relaxed">
                    {item.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
