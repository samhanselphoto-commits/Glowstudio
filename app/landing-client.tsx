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
function buildFeatureGallery(prefix: string) {
  return [0, 1, 2, 3].map((i) => ({
    id: `${prefix}-${i}`,
    url: `https://picsum.photos/seed/${prefix}-${i}/600/600`,
    title: `${prefix} ${i + 1}`,
    category: "Lookbook" as const,
    tagColor: "lime" as const,
  }));
}

/** Hook: returns ref + visible className once element enters viewport. */
function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = React.useRef<T>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
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

  const featuresReveal = useReveal<HTMLDivElement>(0.1);
  const pricingReveal = useReveal<HTMLDivElement>(0.1);
  const faqReveal = useReveal<HTMLDivElement>(0.1);

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

      {/* Section divider */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <div className="divider-aurora" />
      </div>

      {/* FEATURES — alternating text + image blocks with 3D tilt */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <div
          ref={featuresReveal.ref}
          className={cn(
            "transition-all duration-1000",
            featuresReveal.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12",
          )}
        >
          <SectionHeadline
            align="center"
            size="lg"
            heading={
              <>
                Mọi thứ bạn{" "}
                <span className="text-aurora-gradient">cần</span>
              </>
            }
            subtitle="Từ tạo ảnh đơn lẻ đến cả set brand kit — Glowstudio xử lý hết, không cần chuyển tab."
          />
        </div>

        <div className="mt-20 flex flex-col gap-20 md:gap-27">
          {featuresDetailed.map((feat, i) => {
            const Icon = featureIconMap[feat.icon];
            const reverse = i % 2 === 1;
            const gallery = buildFeatureGallery(feat.gallerySeedPrefix);
            return (
              <div
                key={feat.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                {/* Text side */}
                <div
                  className={cn(
                    "transition-all duration-1000",
                    reverse && "lg:order-2",
                  )}
                  style={{
                    opacity: featuresReveal.visible ? 1 : 0,
                    transform: featuresReveal.visible
                      ? "translateY(0)"
                      : "translateY(40px)",
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-[8.4px] bg-gradient-to-br from-aurora-violet/20 via-neon-magenta/15 to-cyber-cyan/20 border border-aurora-violet/40 shadow-[0_0_30px_rgba(124,92,255,0.25)]">
                    <Icon className="w-7 h-7 text-aurora-violet" />
                  </div>
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
                        <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-toxic-lime/15 border border-toxic-lime/40 flex items-center justify-center">
                          <CheckIcon className="w-2.5 h-2.5 text-toxic-lime" />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image side — 2x2 grid with 3D tilt on hover */}
                <div
                  className={cn(
                    "tilt-container transition-all duration-1000",
                    reverse && "lg:order-1",
                  )}
                  style={{
                    opacity: featuresReveal.visible ? 1 : 0,
                    transform: featuresReveal.visible
                      ? "translateY(0)"
                      : "translateY(40px)",
                    transitionDelay: `${i * 150 + 200}ms`,
                  }}
                >
                  <div className="tilt-on-hover grid grid-cols-2 gap-3.5">
                    {gallery.map((img, idx) => (
                      <div
                        key={img.id}
                        className={cn(
                          "relative rounded-[8.4px] overflow-hidden bg-charcoal border border-mist/10",
                          "aspect-square",
                          "transition-transform duration-500 hover:scale-[1.03]",
                          "hover:shadow-[0_0_30px_rgba(124,92,255,0.35)] hover:border-aurora-violet/40",
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
                        {/* Subtle hover glow */}
                        <div className="absolute inset-0 bg-aurora-soft opacity-0 hover:opacity-30 transition-opacity pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section divider */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <div className="divider-aurora" />
      </div>

      {/* PRICING PREVIEW */}
      <section
        ref={pricingReveal.ref}
        className={cn(
          "max-w-[1440px] mx-auto px-6 md:px-10 mt-20 transition-all duration-1000",
          pricingReveal.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12",
        )}
      >
        <SectionHeadline
          align="center"
          size="lg"
          heading={
            <>
              Bảng giá{" "}
              <span className="text-aurora-gradient">đơn giản</span>
            </>
          }
          subtitle="Bắt đầu miễn phí, nâng cấp khi cần. Không có phí ẩn."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className="transition-all duration-700 hover:-translate-y-2"
              style={{
                transitionDelay: pricingReveal.visible ? `${i * 100}ms` : "0ms",
                opacity: pricingReveal.visible ? 1 : 0,
                transform: pricingReveal.visible
                  ? "translateY(0)"
                  : "translateY(20px)",
              }}
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="/pricing"
            className="text-sm font-medium text-aurora-violet hover:underline transition-all hover:tracking-wide"
          >
            So sánh chi tiết →
          </a>
        </div>
      </section>

      {/* Section divider */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <div className="divider-aurora" />
      </div>

      {/* FAQ */}
      <section
        ref={faqReveal.ref}
        className={cn(
          "max-w-3xl mx-auto px-6 md:px-10 mt-20 transition-all duration-1000",
          faqReveal.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12",
        )}
      >
        <SectionHeadline
          align="center"
          size="lg"
          heading={
            <>
              Câu hỏi{" "}
              <span className="text-aurora-gradient">thường gặp</span>
            </>
          }
        />
        <ul className="mt-10 flex flex-col gap-3">
          {faqItems.map((item, i) => {
            const open = openFaq === i;
            return (
              <li
                key={i}
                className={cn(
                  "rounded-[8.4px] surface-aurora overflow-hidden",
                  "transition-all duration-300 hover:border-aurora-violet/50",
                )}
                style={{
                  opacity: faqReveal.visible ? 1 : 0,
                  transform: faqReveal.visible
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transitionDelay: `${i * 80}ms`,
                }}
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
                      "w-5 h-5 text-ash-text flex-shrink-0 transition-transform duration-300",
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
