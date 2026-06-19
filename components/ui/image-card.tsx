import * as React from "react";
import { cn } from "@/lib/utils";
import { DownloadIcon, HeartIcon } from "@/components/icons";

/**
 * §6.7 — Image Card.
 * 8.4px radius, charcoal background, image edge-to-edge, NO padding.
 * Aspect ratio: defaults to square, accepts override.
 * RULE §0 #9: image fills card, card is a frame not a container.
 * RULE §0 #8: subtle hairline border instead of relying on shadow.
 */
export interface ImageCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  aspect?: "square" | "video" | "portrait" | "auto";
  showOverlay?: boolean;
}

const aspectMap = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  auto: "",
} as const;

export const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  (
    { className, src, alt = "", aspect = "square", showOverlay = true, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative",
          "overflow-hidden",
          "rounded-[8.4px]",
          "bg-charcoal",
          "cursor-pointer",
          "border border-mist/10",
          "shadow-[0_0_0_1px_rgba(229,229,229,0.06),0_20px_40px_rgba(0,0,0,0.5)]",
          aspectMap[aspect],
          className,
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "block w-full h-full",
            "object-cover",
            "transition duration-300",
            "group-hover:scale-[1.02]",
          )}
        />
        {showOverlay && (
          <div
            className={cn(
              "absolute inset-0",
              "bg-midnight/40",
              "opacity-0 group-hover:opacity-100",
              "transition",
              "flex items-end justify-between",
              "p-4",
            )}
          >
            <button
              type="button"
              className="rounded-full bg-obsidian/80 backdrop-blur-sm p-2 hover:bg-aurora-violet transition"
              aria-label="Tải ảnh"
            >
              <DownloadIcon className="w-4 h-4 text-bone-white" />
            </button>
            <button
              type="button"
              className="rounded-full bg-obsidian/80 backdrop-blur-sm p-2 hover:bg-aurora-violet transition"
              aria-label="Thích ảnh"
            >
              <HeartIcon className="w-4 h-4 text-bone-white" />
            </button>
          </div>
        )}
      </div>
    );
  },
);
ImageCard.displayName = "ImageCard";
