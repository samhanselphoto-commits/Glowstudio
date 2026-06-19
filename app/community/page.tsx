"use client";

import * as React from "react";
import Image from "next/image";
import { NavBar, Footer, TabFilterRow } from "@/components/ui";
import { communityImages } from "@/lib/mock-data";
import { HeartIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const TABS = ["Trending", "Mới nhất", "Theo dõi", "Lookbook", "Sản phẩm", "Concept"];

export default function CommunityPage() {
  const [active, setActive] = React.useState(TABS[0]);

  return (
    <main className="min-h-screen bg-midnight relative overflow-hidden">
      <BackgroundDecor />

      <div className="relative z-10">
        <NavBar />

        <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20">
          {/* Hero heading with gradient text */}
          <div className="text-center">
            <h1 className="font-display text-[78px] md:text-[128px] leading-[0.8] tracking-[-0.04em] font-black text-aurora-hero animate-fade-up">
              Cộng đồng
            </h1>
            <p className="text-base md:text-lg text-ash-text mt-6 max-w-2xl mx-auto animate-fade-up delay-200">
              Khám phá ảnh được tạo bởi cộng đồng Glowstudio. Click vào ảnh để xem
              prompt và re-use ngay trong Studio.
            </p>
          </div>

          <div className="mt-12">
            <TabFilterRow tabs={TABS} active={active} onChange={setActive} />
          </div>

          {/* Masonry grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3.5 mt-10">
            {communityImages.map((img, i) => (
              <div
                key={img.id}
                className="break-inside-avoid mb-3.5 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div
                  className={cn(
                    "group relative rounded-[8.4px] overflow-hidden bg-charcoal",
                    "border border-mist/10",
                    "cursor-pointer",
                    "transition-all duration-300",
                    "hover:border-aurora-violet/50 hover:shadow-[0_0_30px_rgba(124,92,255,0.35)]",
                  )}
                >
                  <Image
                    src={img.url}
                    alt={`Bởi ${img.creator.name}`}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="w-full h-auto group-hover:scale-[1.02] transition duration-300"
                  />
                  <div
                    className={cn(
                      "absolute inset-0",
                      "bg-gradient-to-t from-midnight/95 via-midnight/40 to-transparent",
                      "opacity-0 group-hover:opacity-100",
                      "transition",
                    )}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="block w-6 h-6 rounded-full bg-cover bg-center border border-aurora-violet/40"
                            style={{ backgroundImage: `url(${img.creator.avatar})` }}
                            aria-hidden="true"
                          />
                          <span className="text-xs font-medium text-bone-white">
                            {img.creator.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-bone-white">
                          <HeartIcon className="w-3 h-3 text-shock-pink" />
                          {img.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

/** Aurora mesh background + orbs for community page. */
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
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-aurora-violet/25 blur-[140px] animate-float" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-neon-magenta/20 blur-[140px] animate-float-reverse" />
      <div className="absolute inset-0 bg-noise opacity-50" />
    </div>
  );
}
