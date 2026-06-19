import Image from "next/image";
import {
  NavBar,
  Footer,
  HeroWordmark,
  ImageGalleryGrid,
  ButtonPrimary,
  ButtonGhost,
} from "@/components/ui";
import {
  galleryShowcase,
  features,
  plans,
  faqItems,
  galleryAll,
  brandLogos,
  stats,
} from "@/lib/mock-data";
import { LandingClient } from "./landing-client";

const FILTER_TABS = ["Tất cả", "Lookbook", "Sản phẩm", "Social", "Concept art"];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <NavBar />

      {/* HERO — 2 col: text + visual mockup */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <HeroWordmark>GLOWSTUDIO</HeroWordmark>
            <h2 className="font-display text-[34px] md:text-[48px] leading-[0.9] tracking-[-0.02em] font-extrabold text-bone-white mt-10">
              Nền tảng AI tạo ảnh cho designer &amp; marketer
            </h2>
            <p className="text-base md:text-lg text-ash-text mt-6 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
              Tạo ảnh chuyên nghiệp với GPT Image, NANO BANANA và Zturbo. Style
              reference, inpaint, batch — tất cả trong một studio.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-3 mt-10 flex-wrap">
              <ButtonPrimary size="lg">Bắt đầu miễn phí</ButtonPrimary>
              <ButtonGhost size="lg">Xem demo</ButtonGhost>
            </div>
          </div>

          {/* Hero visual mockup */}
          <div className="relative rounded-[20px] overflow-hidden bg-obsidian border border-mist/10 aspect-[4/3] shadow-[0_20px_60px_rgba(124,92,255,0.25)]">
            <Image
              src="https://picsum.photos/seed/glowstudio-hero/800/600"
              alt="Glowstudio Studio preview"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Aurora glow overlay — subtle violet wash on top-left corner */}
            <div className="absolute inset-0 bg-gradient-to-tr from-aurora-soft via-transparent to-transparent" />
            {/* Bottom fade for depth */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-midnight/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF — 6 brand name placeholders */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <p className="text-xs font-bold text-charcoal-mute uppercase tracking-[0.15em] text-center">
          Được tin dùng bởi đội ngũ tại
        </p>
        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {brandLogos.map((b) => (
            <div
              key={b.name}
              className="text-center text-base md:text-lg font-extrabold text-ash-text opacity-60"
            >
              {b.name}
            </div>
          ))}
        </div>
      </section>

      {/* STATS BAR — 4 KPIs */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <div className="rounded-[20px] bg-charcoal border border-mist/10 p-10 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-[44px] md:text-[58px] leading-[0.9] font-extrabold text-bone-white tracking-[-0.02em]">
                {s.value}
              </p>
              <p className="text-sm text-ash-text mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY HERO SHOWCASE — 8 ảnh edge-to-edge */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <ImageGalleryGrid items={galleryShowcase} />
      </section>

      {/* USE CASES + FEATURES + PRICING + FAQ */}
      <LandingClient
        tabs={FILTER_TABS}
        items={galleryAll}
        features={features}
        plans={plans}
        faqItems={faqItems}
      />

      {/* CLOSING CTA — final push trước footer */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <div className="rounded-[20px] bg-obsidian border border-mist/10 p-12 md:p-20 text-center relative overflow-hidden">
          {/* Aurora glow accent — top-right */}
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-aurora-soft blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-[44px] md:text-[78px] leading-[0.85] tracking-[-0.02em] font-extrabold text-bone-white">
              Sẵn sàng tạo ảnh chuyên nghiệp?
            </h2>
            <p className="text-base md:text-lg text-ash-text mt-6 max-w-2xl mx-auto">
              50 credits miễn phí, không cần thẻ. Bắt đầu trong 30 giây.
            </p>
            <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
              <ButtonPrimary size="lg">Bắt đầu miễn phí</ButtonPrimary>
              <ButtonGhost size="lg">Xem bảng giá</ButtonGhost>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
