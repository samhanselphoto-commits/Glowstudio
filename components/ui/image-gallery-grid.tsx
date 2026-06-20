import * as React from "react";
import { ImageCard } from "./image-card";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/lib/mock-data";

/**
 * §6.8 — Image Gallery Grid.
 * 2-6 cột responsive, gap 10-14px. Container width do parent control.
 * V2 — added 5/6 column options for full-bleed studio feed.
 */
export interface ImageGalleryGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[] | { id: string; url: string; title?: string }[];
  showOverlay?: boolean;
  columns?: 2 | 3 | 4 | 5 | 6;
}

const columnMap = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
} as const;

export function ImageGalleryGrid({
  items,
  showOverlay = true,
  columns = 4,
  className,
  ...props
}: ImageGalleryGridProps) {
  return (
    <div
      className={cn("grid gap-3.5", columnMap[columns], className)}
      {...props}
    >
      {items.map((item) => (
        <ImageCard
          key={item.id}
          src={item.url}
          alt={"title" in item ? item.title ?? "" : ""}
          showOverlay={showOverlay}
        />
      ))}
    </div>
  );
}
