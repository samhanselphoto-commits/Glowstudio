import { NavBar, Footer, HeroWordmark, ImageGalleryGrid, ButtonPrimary, ButtonGhost, TagChip } from "@/components/ui";
import {
  galleryShowcase,
  features,
  plans,
  faqItems,
  galleryAll,
} from "@/lib/mock-data";
import { LandingClient } from "./landing-client";

const FILTER_TABS = ["Tất cả", "Lookbook", "Sản phẩm", "Social", "Concept art"];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-midnight">
      <NavBar />

      {/* HERO */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-32 text-center">
        <HeroWordmark>GLOWSTUDIO</HeroWordmark>
        <h2 className="font-display text-[34px] md:text-[48px] leading-[0.9] tracking-[-0.02em] font-extrabold text-bone-white mt-10">
          Nền tảng AI tạo ảnh cho designer &amp; marketer
        </h2>
        <p className="text-base md:text-lg text-ash-text mt-6 max-w-2xl mx-auto">
          Tạo ảnh chuyên nghiệp với GPT Image, NANO BANANA và Zturbo. Style reference,
          inpaint, batch — tất cả trong một studio.
        </p>
        <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
          <ButtonPrimary size="lg">Bắt đầu miễn phí</ButtonPrimary>
          <ButtonGhost size="lg">Xem demo</ButtonGhost>
        </div>

        {/* Trust strip — 6 tag chips (RULE: only here, not in hero fill) */}
        <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
          <TagChip color="lime">Pro plan</TagChip>
          <TagChip color="yellow">Trending</TagChip>
          <TagChip color="pink">Beta</TagChip>
          <TagChip color="coral">Low credit</TagChip>
          <TagChip color="plasma">Premium</TagChip>
          <TagChip color="blue">Info</TagChip>
        </div>
      </section>

      {/* GALLERY HERO SHOWCASE — 8 ảnh edge-to-edge */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 mt-20">
        <ImageGalleryGrid items={galleryShowcase} />
      </section>

      {/* USE CASES — tab filter + filtered grid */}
      <LandingClient
        tabs={FILTER_TABS}
        items={galleryAll}
        features={features}
        plans={plans}
        faqItems={faqItems}
      />

      <Footer />
    </main>
  );
}
