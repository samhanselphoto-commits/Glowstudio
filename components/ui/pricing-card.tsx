import * as React from "react";
import { cn } from "@/lib/utils";
import { ButtonGhost, ButtonPrimary } from "./index";
import { CheckIcon } from "@/components/icons";
import { formatVND } from "@/lib/format";
import type { Plan } from "@/lib/mock-data";

/**
 * Pricing Card — used by Landing preview và /pricing page.
 * 20px radius, charcoal surface. Popular = aurora violet border + glow.
 */
export interface PricingCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  plan: Plan;
}

export function PricingCard({ plan, className, ...props }: PricingCardProps) {
  const isCustomPrice = plan.price === 0 && plan.id === "enterprise";

  return (
    <div
      className={cn(
        "rounded-[20px]",
        "bg-charcoal",
        "border p-7",
        "flex flex-col",
        plan.popular
          ? "border-aurora-violet shadow-[0_0_24px_rgba(124,92,255,0.45)]"
          : "border-mist/10",
        className,
      )}
      {...props}
    >
      {plan.popular && (
        <span className="self-start rounded-full bg-aurora-violet text-bone-white text-xs font-bold px-3 py-1 mb-4">
          {plan.tag}
        </span>
      )}
      {!plan.popular && plan.tag && (
        <span className="self-start text-xs font-bold text-charcoal-mute uppercase tracking-wider mb-2">
          {plan.tag}
        </span>
      )}
      <h3 className="text-[19px] font-medium text-bone-white">{plan.name}</h3>
      <p className="text-sm text-ash-text mt-2">{plan.description}</p>

      <p
        className={cn(
          "font-display text-[44px] leading-[0.9] font-extrabold text-bone-white mt-6",
        )}
      >
        {isCustomPrice ? "Liên hệ" : plan.price === 0 ? "0đ" : formatVND(plan.price)}
        {!isCustomPrice && plan.price > 0 && (
          <span className="text-sm text-ash-text font-normal"> / tháng</span>
        )}
      </p>
      {plan.credits > 0 && (
        <p className="text-xs text-charcoal-mute mt-1">
          {plan.credits.toLocaleString("vi-VN").replace(/,/g, ".")} credits / tháng
        </p>
      )}

      <ul className="flex flex-col gap-2.5 mt-7 flex-1">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-sm text-ash-text"
          >
            <CheckIcon className="w-4 h-4 text-toxic-lime flex-shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>

      {plan.popular ? (
        <ButtonPrimary size="lg" className="w-full mt-7">
          {plan.cta}
        </ButtonPrimary>
      ) : (
        <ButtonGhost size="lg" className="w-full mt-7">
          {plan.cta}
        </ButtonGhost>
      )}
    </div>
  );
}
