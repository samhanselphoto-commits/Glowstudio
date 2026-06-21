"use client";

import Image from "next/image";
import { Heart, Download, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Variation } from "@/lib/types";
import { aspectToCss } from "@/lib/format";

type Props = {
  variation: Variation;
  aspect: import("@/lib/types").AspectRatio;
  index: number;
  isActive: boolean;
  busy: boolean;
  onSelect: () => void;
  onToggleLike: () => void;
  onDownload: () => void;
};

export function VariationCard({
  variation,
  aspect,
  index,
  isActive,
  busy,
  onSelect,
  onToggleLike,
  onDownload,
}: Props) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[8.4px] border transition-colors",
        isActive ? "border-white" : "border-white/10 hover:border-white/30"
      )}
    >
      <div className="relative w-full" style={{ aspectRatio: aspectToCss(aspect) }}>
        <Image
          src={variation.src}
          alt={`Variation ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />

        {busy && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}

        <div className="absolute right-2 top-2 flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike();
            }}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80",
              variation.liked && "text-[#ffd4dc]"
            )}
            aria-label="Thích"
            type="button"
          >
            <Heart className={cn("h-3.5 w-3.5", variation.liked && "fill-current")} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80"
            aria-label="Tải về"
            type="button"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium backdrop-blur-md">
          Variation {index + 1}
        </div>
      </div>
    </div>
  );
}
