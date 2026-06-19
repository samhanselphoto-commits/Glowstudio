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
      {/* Background — vibrant aurora mesh + animated orbs */}
      <BackgroundDecor />

      <div className="relative z-10">
        <NavBar />

        {/* HERO — 2 col: text + studio mockup with pulse rings */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="animate-fade-up">
                <HeroWordmark size="sm" className="text-aurora-hero">
                  GLOWSTUDIO
                </HeroWordmark>
              </div>
              <h2 className="font-display text-[34px] md:text-[48px] leading-[0.9] tracking-[-0.02em] font-extrabold text-bone-white mt-10 animate-fade-up delay-200">
                Nền tảng AI tạo ảnh{" "}
                <span className="text-aurora-gradient">cho designer</span>{" "}
                <span className="text-aurora-gradient">&amp; marketer</span>
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

              {/* Tiny trust line */}
              <p className="text-xs text-charcoal-mute mt-6 animate-fade-up delay-500">
                50 credits miễn phí · Không cần thẻ · Hủy bất kỳ lúc nào
              </p>
            </div>

            {/* Studio mockup with pulse rings + conic glow */}
            <div className="tilt-container relative animate-scale-in delay-500">
              {/* Conic gradient glow behind mockup */}
              <div
                aria-hidden
                className="absolute -inset-20 conic-ring opacity-70 animate-conic-spin pointer-events-none"
              />
              {/* Soft inner glow */}
              <div
                aria-hidden
                className="absolute -inset-10 bg-aurora-soft blur-3xl rounded-full opacity-60 animate-glow-pulse pointer-events-none"
              />
              {/* Pulse rings */}
              <div
                aria-hidden
                className="pulse-ring pulse-ring-1 -inset-8 pointer-events-none"
              />
              <div
                aria-hidden
                className="pulse-ring pulse-ring-2 -inset-16 pointer-events-none"
              />
              <div
                aria-hidden
                className="pulse-ring pulse-ring-3 -inset-24 pointer-events-none"
              />

              <div className="relative animate-float">
                <StudioMockup />
              </div>
              {/* Decorative floating orbs */}
              <div
                aria-hidden
                className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-neon-magenta/40 blur-xl animate-float"
              />
              <div
                aria-hidden
                className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-cyber-cyan/40 blur-xl animate-float-reverse"
              />
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="divider-aurora" />
        </div>

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

        {/* STATS BAR — 4 KPIs with gradient surface */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
          <div className="relative rounded-[20px] surface-aurora p-10 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 overflow-hidden animate-fade-up delay-200">
            {/* Aurora glow accents */}
            <div
              aria-hidden
              className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-aurora-soft blur-3xl pointer-events-none animate-glow-pulse"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-neon-magenta/15 blur-3xl pointer-events-none animate-glow-pulse"
              style={{ animationDelay: "2s" }}
            />
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center relative animate-fade-up"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <p className="font-display text-[44px] md:text-[58px] leading-[0.9] font-extrabold tracking-[-0.02em]">
                  <span className="text-aurora-gradient">{s.value}</span>
                </p>
                <p className="text-sm text-ash-text mt-3">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY HERO SHOWCASE */}
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
          <div className="relative rounded-[20px] surface-aurora p-12 md:p-20 text-center overflow-hidden animate-fade-up">
            {/* Animated aurora glow orbs */}
            <div
              aria-hidden
              className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-aurora-violet/30 blur-3xl pointer-events-none animate-glow-pulse"
            />
            <div
              aria-hidden
              className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-neon-magenta/25 blur-3xl pointer-events-none animate-glow-pulse"
              style={{ animationDelay: "2s" }}
            />
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] conic-ring opacity-40 animate-conic-spin pointer-events-none"
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
              <h2 className="font-display text-[44px] md:text-[78px] leading-[0.85] tracking-[-0.02em] font-extrabold">
                <span className="text-bone-white">Sẵn sàng tạo ảnh </span>
                <span className="text-aurora-gradient">chuyên nghiệp?</span>
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

/** Animated background — vibrant aurora mesh + orbs + grid + noise. */
function BackgroundDecor() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Aurora mesh gradient — main colorful backdrop */}
      <div
        className="absolute inset-0 bg-aurora-page animate-aurora-mesh"
        style={{ backgroundSize: "120% 120%" }}
      />

      {/* Aurora orbs — extra color punch */}
      <div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-aurora-violet/30 blur-[140px] animate-float"
        style={{ animationDuration: "12s" }}
      />
      <div
        className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-neon-magenta/25 blur-[140px] animate-float-reverse"
        style={{ animationDuration: "14s" }}
      />
      <div
        className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-cyber-cyan/20 blur-[140px] animate-float"
        style={{ animationDuration: "16s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-plasma-pink/10 blur-[160px] animate-glow-pulse"
      />

      {/* Subtle grid overlay for techy feel */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-60" />

      {/* Top + bottom vignette to focus center */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,2,22,0.6), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(5,2,22,0.6), transparent)",
        }}
      />
    </div>
  );
}
