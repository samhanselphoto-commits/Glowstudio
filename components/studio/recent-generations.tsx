"use client";

import Image from "next/image";
import Link from "next/link";
import { History } from "lucide-react";
import { useGenerations } from "@/hooks/use-generations";
import { useMounted } from "@/hooks/use-mounted";
import { formatRelative } from "@/lib/format";

export function RecentGenerations() {
  const { items, hydrated } = useGenerations();
  const mounted = useMounted();

  // Take most recent 4 generations, then first variation of each
  const recents = items.slice(0, 4).map((g) => ({
    src: g.variations[0]?.src,
    model: g.model,
    time: g.createdAt,
  }));

  return (
    <div className="mt-6 rounded-[8.4px] border border-white/10 bg-black p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <History className="h-3.5 w-3.5 text-white/50" />
          Generation gần đây
        </h3>
        <Link href="/library" className="text-xs text-white/50 transition-colors hover:text-white">
          Xem tất cả →
        </Link>
      </div>

      {!mounted || !hydrated ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-md bg-white/[0.04]" />
          ))}
        </div>
      ) : recents.length === 0 ? (
        <div className="grid place-items-center py-8 text-center text-sm text-white/50">
          Chưa có generation nào. Bấm <span className="mx-1 text-white">Generate</span> trong Canvas để bắt đầu.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {recents.map((r, i) =>
            r.src ? (
              <div key={i} className="group relative overflow-hidden rounded-md border border-white/10">
                <div className="relative aspect-square w-full">
                  <Image
                    src={r.src}
                    alt={r.model}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="25vw"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <div className="text-[10px] font-medium text-white">{r.model}</div>
                  <div className="text-[10px] text-white/50">{formatRelative(r.time)}</div>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
