"use client";

import { Coins } from "lucide-react";
import { useCredits } from "@/hooks/use-credits";
import { formatThousand } from "@/lib/format";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  showLabel?: boolean;
};

export function CreditChip({ className, showLabel = true }: Props) {
  const { balance, hydrated } = useCredits();
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs",
        className
      )}
    >
      <Coins className="h-3.5 w-3.5 text-[#ffc533]" />
      {showLabel && <span className="text-white/60">Còn</span>}
      <span className="font-semibold tabular-nums text-white">
        {hydrated ? formatThousand(balance) : "—"}
      </span>
      <span className="text-white/40">credit</span>
    </div>
  );
}
