import {
  NavBar,
  Footer,
  HeroWordmark,
  ImageGalleryGrid,
  ButtonPrimary,
  ButtonGhost,
  StudioMockup,
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
    <main className="min-h-screen bg-midnight relative overflow-hidden">
      {/* Background — animated gradient orbs + noise overlay */}
      <BackgroundDecor />

      <div className="relative z-10">
        <NavBar />

        {/* HERO — 2 col: text + studio mockup with 3D tilt */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="animate-fade-up">
                <HeroWordmark size="sm" className="text-aurora-gradient">
                  GLOWSTUDIO
                </HeroWordmark>
              </div>
              <h2 className="font-display text-[34px] md:text-[48px] leading-[0.9] tracking-[-0.02em] font-extrabold text-bone-white mt-10 animate-fade-up delay-200">
                Nền tảng AI tạo ảnh cho designer &amp; marketer
              </h2>
              <p className="text-base md:text-lg text-ash-text mt-6 max-w-2xl lg:max-w-none mx-auto lg:mx-0 animate-fade-up delay-300">
                Tạo ảnh chuyên nghiệp với GPT Image, NANO BANANA và Zturbo. Style
                reference, inpaint, batch — tất cả trong một studio.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-3 mt-10 flex-wrap animate-fade-up delay-400">
                <ButtonPrimary size="lg" className="shimmer-on-hover">
                  Bắt đầu miễn phí
                </ButtonPrimary>
                <ButtonGhost size="lg">Xem demo</ButtonGhost>
              </div>
            </div>

            {/* Studio mockup with 3D tilt + parallax-ready container */}
            <div className="tilt-container animate-scale-in delay-500">
              {/* Floating glow behind mockup */}
              <div
                aria-hidden
                className="absolute -inset-10 bg-aurora-soft blur-3xl rounded-full opacity-50 animate-glow-pulse pointer-events-none"
              />
              <div className="relative animate-float">
                <StudioMockup />
              </div>
              {/* Decorative floating orbs */}
              <div
                aria-hidden
                className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-aurora-violet/30 blur-xl animate-float"
              />
              <div
                aria-hidden
                className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-arc-blue/30 blur-xl animate-float-reverse"
              />
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF — 6 brand name placeholders */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
          <p className="text-xs font-bold text-charcoal-mute uppercase tracking-[0.15em] text-center animate-fade-up">
            Được tin dùng bởi đội ngũ tại
          </p>
          <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {brandLogos.map((b, i) => (
              <div
                key={b.name}
                className="text-center text-base md:text-lg font-extrabold text-ash-text opacity-60 hover:opacity-100 hover:text-bone-white transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${100 + i * 80}ms` }}
              >
                {b.name}
              </div>
            ))}
          </div>
        </section>

        {/* STATS BAR — 4 KPIs */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
          <div className="relative rounded-[20px] bg-charcoal border border-mist/10 p-10 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 overflow-hidden animate-fade-up delay-200">
            {/* Aurora glow accent */}
            <div
              aria-hidden
              className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-aurora-soft blur-3xl pointer-events-none animate-glow-pulse"
            />
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center relative animate-fade-up"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
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
          <div className="relative rounded-[20px] bg-obsidian border border-mist/10 p-12 md:p-20 text-center overflow-hidden animate-fade-up">
            {/* Animated aurora glow orbs */}
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-aurora-soft blur-3xl pointer-events-none animate-glow-pulse"
            />
            <div
              aria-hidden
              className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-aurora-violet/15 blur-3xl pointer-events-none animate-glow-pulse"
              style={{ animationDelay: "2s" }}
            />
            {/* Subtle grid pattern overlay */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative">
              <h2 className="font-display text-[44px] md:text-[78px] leading-[0.85] tracking-[-0.02em] font-extrabold text-bone-white">
                Sẵn sàng tạo ảnh chuyên nghiệp?
              </h2>
              <p className="text-base md:text-lg text-ash-text mt-6 max-w-2xl mx-auto">
                50 credits miễn phí, không cần thẻ. Bắt đầu trong 30 giây.
              </p>
              <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
                <ButtonPrimary size="lg" className="shimmer-on-hover">
                  Bắt đầu miễn phí
                </ButtonPrimary>
                <ButtonGhost size="lg">Xem bảng giá</ButtonGhost>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

/** Animated background — gradient orbs + noise overlay. */
function BackgroundDecor() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Aurora orb 1 — top-left, slow drift */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-aurora-violet/10 blur-[120px] animate-float"
        style={{ animationDuration: "12s" }}
      />
      {/* Aurora orb 2 — center-right, opposite drift */}
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-plasma-pink/8 blur-[120px] animate-float-reverse"
        style={{ animationDuration: "14s" }}
      />
      {/* Aurora orb 3 — bottom-left, deep */}
      <div
        className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-arc-blue/8 blur-[120px] animate-float"
        style={{ animationDuration: "16s" }}
      />
      {/* Noise texture overlay — subtle film grain */}
      <div className="absolute inset-0 bg-noise opacity-50" />
    </div>
  );
}
