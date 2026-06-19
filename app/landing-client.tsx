"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  TabFilterRow,
  ImageGalleryGrid,
  SectionHeadline,
  PricingCard,
} from "@/components/ui";
import { ChevronDownIcon, CheckIcon } from "@/components/icons";
import {
  featureIconMap,
  featuresDetailed,
  type Feature,
  type GalleryItem,
  type Plan,
} from "@/lib/mock-data";

type FaqItem = { q: string; a: string };

interface LandingClientProps {
  tabs: string[];
  items: GalleryItem[];
  features: Feature[];
  plans: Plan[];
  faqItems: FaqItem[];
}

/** Build 4 gallery items from a feature's seed prefix. */
function buildFeatureGallery(prefix: string, base: GalleryItem[]) {
  return [0, 1, 2, 3].map((i) => ({
    id: `${prefix}-${i}`,
    url: `https://picsum.photos/seed/${prefix}-${i}/600/600`,
    title: `${prefix} ${i + 1}`,
    // Tag color irrelevant for feature blocks but keep type valid
    category: "Lookbook" as const,
    tagColor: "lime" as const,
  }));
}

export function LandingClient({
  tabs,
  items,
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

      {/* FEATURES — alternating text + image blocks */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <SectionHeadline
          title="Mọi thứ bạn cần"
          subtitle="Từ tạo ảnh đơn lẻ đến cả set brand kit — Glowstudio xử lý hết, không cần chuyển tab."
          align="center"
          size="lg"
        />

        <div className="mt-20 flex flex-col gap-20 md:gap-27">
          {featuresDetailed.map((feat, i) => {
            const Icon = featureIconMap[feat.icon];
            const reverse = i % 2 === 1;
            const gallery = buildFeatureGallery(feat.gallerySeedPrefix, items);
            return (
              <div
                key={feat.id}
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                )}
              >
                {/* Text side */}
                <div className={cn(reverse && "lg:order-2")}>
                  <Icon className="w-10 h-10 text-aurora-violet" />
                  <h3 className="font-display text-[34px] md:text-[44px] leading-[0.9] tracking-[-0.02em] font-extrabold text-bone-white mt-5">
                    {feat.title}
                  </h3>
                  <p className="text-base text-ash-text mt-5 leading-relaxed">
                    {feat.description}
                  </p>
                  <ul className="mt-7 flex flex-col gap-3">
                    {feat.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-sm text-bone-white"
                      >
                        <CheckIcon className="w-4 h-4 text-toxic-lime flex-shrink-0 mt-1" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image side — 2x2 grid */}
                <div className={cn("grid grid-cols-2 gap-3.5", reverse && "lg:order-1")}>
                  {gallery.map((img, idx) => (
                    <div
                      key={img.id}
                      className={cn(
                        "relative rounded-[8.4px] overflow-hidden bg-charcoal border border-mist/10",
                        "aspect-square",
                        // Make the first image taller to add visual interest
                        idx === 0 && "row-span-2",
                      )}
                    >
                      <Image
                        src={img.url}
                        alt={img.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
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
        <SectionHeadline title="Câu hỏi thường gặp" size="lg" />
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
