import * as React from "react";
import { ImageCard } from "./image-card";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/lib/mock-data";

/**
 * §6.8 — Image Gallery Grid.
 * 3-4 cột responsive, gap 10-14px, container 1440px max-width.
 */
export interface ImageGalleryGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[] | { id: string; url: string; title?: string }[];
  showOverlay?: boolean;
}

export function ImageGalleryGrid({
  items,
  showOverlay = true,
  className,
  ...props
}: ImageGalleryGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5",
        "max-w-[1440px] mx-auto",
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
