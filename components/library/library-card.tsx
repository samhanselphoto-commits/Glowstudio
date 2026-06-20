"use client";

import Image from "next/image";
import Link from "next/link";
import { Wand2, Download, Calendar, Coins } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatDateVN } from "@/lib/format";
import { getModelTagColor } from "@/lib/models";
import type { LibraryItem } from "@/lib/types";
import { aspectToCss } from "@/lib/format";
import { reuseHref } from "@/lib/links";

type Props = {
  item: LibraryItem;
  selected?: boolean;
  masonry?: boolean;
  onSelect?: () => void;
};

export function LibraryCard({ item, selected, masonry, onSelect }: Props) {
  const aspect = aspectToCss(item.aspect);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[8.4px] border bg-black transition-colors",
        selected ? "border-[#7c5cff]" : "border-white/10 hover:border-white/30",
        masonry && "mb-4 break-inside-avoid"
      )}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: aspect }}
        onClick={onSelect}
      >
        <Image
          src={item.src}
          alt={item.prompt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized={item.src.startsWith("data:")}
        />

        {onSelect && (
          <div
            className={cn(
              "absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-md border transition-all",
              selected
                ? "border-[#7c5cff] bg-[#7c5cff]"
                : "border-white/40 bg-black/40 backdrop-blur-md"
            )}
          >
            {selected && (
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-white">
                <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        )}

        {item.private && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2 py-0.5 text-[10px] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffc533]" /> Riêng tư
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-2 bg-gradient-to-t from-black/90 to-transparent p-3 transition-transform group-hover:translate-y-0 group-hover:pointer-events-auto">
          <div className="pointer-events-auto flex items-center gap-1.5">
            <Link
              href={reuseHref({ prompt: item.prompt, model: item.model, aspect: item.aspect })}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              title="Re-use prompt"
            >
              <Wand2 className="h-3.5 w-3.5" />
            </Link>
            <a
              href={item.src.startsWith("data:") ? item.src : item.src}
              download={`glowstudio-${item.id}.png`}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              title="Tải về"
            >
              <Download className="h-3.5 w-3.5" />
            </a>
          </div>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", getModelTagColor(item.model))}>
            {item.model}
          </span>
        </div>
      </div>

      {!masonry && (
        <div className="p-3">
          <p className="line-clamp-1 text-xs text-white/70">{item.prompt}</p>
          <div className="mt-2 flex items-center justify-between text-[10px] text-white/40">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {formatDateVN(item.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Coins className="h-3 w-3 text-[#ffc533]" /> −{item.credit}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
