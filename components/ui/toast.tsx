"use client";

import { CheckCircle2, AlertCircle, Info, Coins, X } from "lucide-react";
import { useToasts, dismissToast } from "@/hooks/use-toast";
import { cn } from "@/lib/cn";
import type { ToastItem } from "@/lib/types";

const ICONS: Record<ToastItem["type"], React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  credit: Coins,
};

const COLORS: Record<ToastItem["type"], string> = {
  success: "border-[#03e65b]/30 bg-[#03e65b]/10 text-[#7af1a5]",
  error: "border-[#ff5d4b]/30 bg-[#ff5d4b]/10 text-[#ff9a8a]",
  info: "border-white/15 bg-white/[0.06] text-white",
  credit: "border-[#ffc533]/30 bg-[#ffc533]/10 text-[#ffd76b]",
};

export function ToastViewport() {
  const items = useToasts();
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {items.map((t) => {
        const Icon = ICONS[t.type];
        return (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-[8.4px] border px-4 py-3 shadow-2xl backdrop-blur-xl",
              "animate-in slide-in-from-right-4 fade-in-0 duration-200",
              COLORS[t.type]
            )}
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="flex-1 text-sm leading-snug">{t.message}</p>
            <button
              onClick={() => dismissToast(t.id)}
              className="shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
              aria-label="Đóng"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
