import * as React from "react";
import { ImageCard } from "./image-card";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/lib/mock-data";

/**
 * §6.8 — Image Gallery Grid.
 * 3-4 cột responsive, gap 10-14px, container 1440px max-width.
 * Use `columns` to force a fixed column count at all breakpoints.
 */
export interface ImageGalleryGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[] | { id: string; url: string; title?: string }[];
  showOverlay?: boolean;
  columns?: 2 | 3 | 4;
}

const columnMap = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
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
      className={cn(
        "grid gap-3.5",
        "max-w-[1440px] mx-auto",
        columnMap[columns],
        className,
      )}
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
