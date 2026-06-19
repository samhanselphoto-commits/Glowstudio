import * as React from "react";
import { cn } from "@/lib/utils";
import { ImageLucideIcon } from "@/components/icons";

/**
 * §6.20 — Empty State.
 * Centered, icon lớn 64px, headline 19px, helper text 14px ash, CTA pill.
 */
export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  cta?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export function EmptyState({
  className,
  icon,
  title,
  description,
  cta,
  ctaHref,
  onCtaClick,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 text-center",
        className,
      )}
      {...props}
    >
      <div className="mb-6 text-charcoal-mute">
        {icon ?? <ImageLucideIcon className="w-16 h-16" />}
      </div>
      <h3 className="text-[19px] font-medium text-bone-white">{title}</h3>
      {description && (
        <p className="text-sm text-ash-text mt-2 max-w-sm">{description}</p>
      )}
      {cta && (
        <a
          href={ctaHref ?? "#"}
          onClick={onCtaClick}
          className="rounded-full bg-bone-white text-midnight px-7 py-2.5 text-sm font-medium mt-6 hover:bg-fog transition inline-block"
        >
          {cta}
        </a>
      )}
    </div>
  );
}
