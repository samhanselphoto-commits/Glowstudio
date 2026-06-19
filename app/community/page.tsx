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
    <main className="min-h-screen bg-midnight">
      <NavBar />

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 py-20">
        <h1 className="font-display text-[78px] md:text-[98px] leading-[0.8] tracking-[-0.02em] font-black text-aurora-violet">
          Cộng đồng
        </h1>
        <p className="text-base text-ash-text mt-6 max-w-2xl">
          Khám phá ảnh được tạo bởi cộng đồng Glowstudio. Click vào ảnh để xem prompt và
          re-use ngay trong Studio.
        </p>

        <div className="mt-10">
          <TabFilterRow tabs={TABS} active={active} onChange={setActive} />
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3.5 mt-10">
          {communityImages.map((img) => (
            <div key={img.id} className="break-inside-avoid mb-3.5">
              <div
                className={cn(
                  "group relative rounded-[8.4px] overflow-hidden bg-charcoal",
                  "border border-mist/10",
                  "cursor-pointer",
                )}
              >
                <img
                  src={img.url}
                  alt={`Bởi ${img.creator.name}`}
                  className="w-full h-auto group-hover:scale-[1.02] transition duration-300"
                />
                <div
                  className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-t from-midnight/90 via-transparent to-transparent",
                    "opacity-0 group-hover:opacity-100",
                    "transition",
                  )}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="block w-6 h-6 rounded-full bg-cover bg-center border border-mist/30"
                          style={{ backgroundImage: `url(${img.creator.avatar})` }}
                          aria-hidden="true"
                        />
                        <span className="text-xs font-medium text-bone-white">
                          {img.creator.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-bone-white">
                        <HeartIcon className="w-3 h-3" />
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
    </main>
  );
}
