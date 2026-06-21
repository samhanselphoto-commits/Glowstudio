"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Coins, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Slide = {
  src: string;
  alt: string;
  model: string;
  status: "generating" | "ready" | "upscaling";
  credit: number;
  prompt: string;
};

const SLIDES: Slide[] = [
  {
    src: "/hero/mesh-portrait.png",
    alt: "Abstract silver mesh flowing hair portrait",
    model: "GPT Image",
    status: "generating",
    credit: 12,
    prompt: "Abstract silver mesh flowing hair portrait, editorial violet gradient",
  },
  {
    src: "/hero/city-golden.png",
    alt: "City aerial view at golden hour",
    model: "Flux Pro",
    status: "ready",
    credit: 15,
    prompt: "City aerial view at golden hour, cinematic warm light through skyline",
  },
  {
    src: "/hero/editorial-portrait.png",
    alt: "Editorial portrait with handbag",
    model: "NANO BANANA",
    status: "upscaling",
    credit: 10,
    prompt: "Editorial portrait of young woman holding brown leather handbag, soft pastel",
  },
  {
    src: "/hero/city-topdown.png",
    alt: "Top-down city view with highways",
    model: "Recraft v3",
    status: "ready",
    credit: 9,
    prompt: "Top-down aerial view of urban grid, highways crossing the city",
  },
  {
    src: "/hero/classic-portrait.png",
    alt: "Classic portrait with red background",
    model: "Ideogram",
    status: "generating",
    credit: 8,
    prompt: "Classic portrait of young woman with bun hairstyle, vibrant red backdrop",
  },
];

const ROTATE_MS = 5500;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);
  const go = useCallback((i: number) => setIndex(i), []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, next]);

  // Keyboard nav
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const current = SLIDES[index];

  return (
    <div
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-[8.4px] border border-white/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides — all rendered, crossfade. Active slide gets Ken Burns zoom. */}
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
            i === index ? "opacity-100 z-[1]" : "opacity-0 z-0"
          )}
          aria-hidden={i !== index}
        >
          <div
            className={cn(
              "absolute inset-0",
              i === index && !paused ? "animate-kenburns" : ""
            )}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      ))}

      {/* Gradient overlay for legibility */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

      {/* Top status chip */}
      <div className="absolute left-4 top-4 z-[3] flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 backdrop-blur-xl">
        <StatusDot status={current.status} />
        <span className="text-xs font-medium text-white/90">
          <span className="capitalize">{current.status}</span> · {current.model}
        </span>
      </div>

      {/* Bottom credit chip */}
      <div className="absolute bottom-4 right-4 z-[3] flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 backdrop-blur-xl">
        <Coins className="h-3.5 w-3.5 text-[#ffc533]" />
        <span className="text-xs font-medium text-white">−{current.credit} credit</span>
      </div>

      {/* Bottom-left prompt preview */}
      <div className="absolute bottom-4 left-4 z-[3] max-w-[60%]">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
          Prompt
        </div>
        <div className="mt-0.5 line-clamp-1 text-[11px] text-white/75">
          {current.prompt}
        </div>
      </div>

      {/* Arrow controls — visible on hover */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-[3] -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-2 text-white/75 opacity-0 backdrop-blur-xl transition-all hover:bg-black/70 hover:text-white group-hover:opacity-100"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-[3] -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-2 text-white/75 opacity-0 backdrop-blur-xl transition-all hover:bg-black/70 hover:text-white group-hover:opacity-100"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dots + progress */}
      <div className="absolute bottom-14 left-1/2 z-[3] flex -translate-x-1/2 items-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "relative h-1 overflow-hidden rounded-full transition-all duration-300",
              i === index ? "w-8 bg-white/30" : "w-1.5 bg-white/20 hover:bg-white/40"
            )}
          >
            {i === index && !paused && (
              <span
                key={`${index}-${paused}`}
                className="absolute inset-y-0 left-0 block bg-[#a98bff]"
                style={{
                  animation: `hero-progress ${ROTATE_MS}ms linear forwards`,
                }}
              />
            )}
            {i === index && paused && (
              <span className="absolute inset-y-0 left-0 block w-full bg-[#a98bff]" />
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes hero-progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

function StatusDot({ status }: { status: Slide["status"] }) {
  if (status === "generating") {
    return (
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#03e65b] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#03e65b]" />
      </span>
    );
  }
  if (status === "upscaling") {
    return <span className="h-2 w-2 rounded-full bg-[#33d0ff] shadow-[0_0_8px_#33d0ff]" />;
  }
  return <span className="h-2 w-2 rounded-full bg-white/60" />;
}