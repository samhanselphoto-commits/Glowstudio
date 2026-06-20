"use client";

import { useEffect } from "react";
import { Image as ImageIcon, Brush, Maximize2, Shuffle, Sparkles } from "lucide-react";
import Link from "next/link";
import { VariationCard } from "./variation-card";
import { cn } from "@/lib/cn";
import type { AspectRatio, Variation } from "@/lib/types";
import { getModel, getModelTagColor } from "@/lib/models";

type Props = {
  variations: Variation[];
  aspect: AspectRatio;
  activeIndex: number | null;
  busy: boolean;
  creditPerImage: number;
  modelName: import("@/lib/types").ModelName;
  onSelect: (i: number) => void;
  onToggleLike: (id: string) => void;
  onDownload: (v: Variation) => void;
  onInpaint: () => void;
  onUpscale: () => void;
  onReroll: () => void;
  totalReceived: number;
};

export function ResultGrid({
  variations,
  aspect,
  activeIndex,
  busy,
  creditPerImage,
  modelName,
  onSelect,
  onToggleLike,
  onDownload,
  onInpaint,
  onUpscale,
  onReroll,
  totalReceived,
}: Props) {
  const model = getModel(modelName);

  // Empty state
  if (variations.length === 0 && !busy) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-[8.4px] border border-dashed border-white/10 bg-white/[0.02]">
        <div className="text-center">
          <ImageIcon className="mx-auto h-10 w-10 text-white/20" strokeWidth={1.2} />
          <p className="mt-3 text-sm text-white/50">
            Nhập prompt và bấm <span className="text-white">Generate</span> để bắt đầu
          </p>
          <p className="mt-1 text-xs text-white/30">4 variations sẽ hiện ra cùng lúc</p>
        </div>
      </div>
    );
  }

  // Initial loading
  if (busy && variations.length === 0) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-[8.4px] border border-white/10 bg-gradient-to-br from-[#7c5cff]/10 via-black to-[#d25fff]/10">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[#7c5cff]" />
          <p className="mt-4 text-sm text-white">
            Đang generate với <span className="font-semibold">{modelName}</span>…
          </p>
          <p className="mt-1 text-xs text-white/40">Thường mất 6–12 giây</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={cn("grid gap-3", aspect === "1:1" ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        {variations.map((v, i) => (
          <VariationCard
            key={v.id}
            variation={v}
            aspect={aspect}
            index={i}
            isActive={activeIndex === i}
            busy={busy && i === variations.length - 1}
            onSelect={() => onSelect(i)}
            onToggleLike={() => onToggleLike(v.id)}
            onDownload={() => onDownload(v)}
          />
        ))}
      </div>

      {/* Action bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#7c5cff]" />
            Đã generate {totalReceived}/4 variations
          </span>
          <span className="inline-flex items-center gap-1.5">
            Tổng −{creditPerImage * totalReceived} credit
          </span>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", getModelTagColor(modelName))}>
            {model.tag}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onInpaint}
            disabled={activeIndex == null}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs hover:bg-white/[0.08] disabled:opacity-40"
            type="button"
          >
            <Brush className="h-3 w-3" /> Inpaint
          </button>
          <button
            onClick={onUpscale}
            disabled={activeIndex == null}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs hover:bg-white/[0.08] disabled:opacity-40"
            type="button"
          >
            <Maximize2 className="h-3 w-3" /> Upscale 4×
          </button>
          <button
            onClick={onReroll}
            disabled={busy}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-black hover:opacity-90 disabled:opacity-50"
            type="button"
          >
            <Shuffle className="h-3 w-3" /> Re-roll
          </button>
        </div>
      </div>
    </>
  );
}
