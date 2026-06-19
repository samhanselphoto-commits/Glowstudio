import * as React from "react";
import { cn } from "@/lib/utils";
import { SparkleIcon, CheckIcon } from "@/components/icons";

/**
 * §6.22 — Studio Mockup (CSS-only).
 * Mini dashboard cho Hero visual. Không phụ thuộc ảnh ngoài, dùng gradient + shapes.
 * Layout: top bar + 3-column (tools | canvas | params).
 *
 * V2 — gradient hairline border, chrome bar with brand wordmark, brighter tiles.
 */
export interface StudioMockupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const TOOLS: { label: string; active?: boolean }[] = [
  { label: "Tạo ảnh", active: true },
  { label: "Style ref" },
  { label: "Inpaint" },
  { label: "Upscale" },
  { label: "Batch" },
];

const PARAMS: { label: string; value: string }[] = [
  { label: "Model", value: "GPT Image" },
  { label: "Aspect", value: "1:1" },
  { label: "Style", value: "0.7" },
  { label: "Seed", value: "—" },
  { label: "Steps", value: "30" },
  { label: "Guidance", value: "7.5" },
];

/** Result tile — bolder gradient + shape variations */
const RESULT_GRADIENTS = [
  "from-aurora-violet/70 via-shock-pink/50 to-arc-blue/60",
  "from-toxic-lime/50 via-aurora-violet/40 to-plasma-pink/60",
  "from-ember-coral/50 via-voltage-yellow/40 to-aurora-violet/60",
  "from-arc-blue/60 via-plasma-pink/50 to-toxic-lime/50",
] as const;

export function StudioMockup({ className, ...props }: StudioMockupProps) {
  return (
    <div
      className={cn(
        "relative rounded-[16px] overflow-hidden",
        "bg-gradient-to-br from-obsidian via-charcoal to-obsidian",
        "border border-aurora-violet/30",
        "shadow-[0_30px_80px_-20px_rgba(124,92,255,0.6),0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]",
        className,
      )}
      {...props}
    >
      {/* Gradient hairline on top edge */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,92,255,0.6) 30%, rgba(255,61,191,0.6) 70%, transparent)",
        }}
      />

      {/* Top bar — window chrome */}
      <div className="h-7 bg-gradient-to-r from-charcoal/90 to-obsidian/90 border-b border-mist/10 flex items-center px-3 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-ember-coral/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-voltage-yellow/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-toxic-lime/80" />
        <span className="ml-3 text-[10px] font-bold text-aurora-gradient tracking-wider">
          GLOWSTUDIO
        </span>
      </div>

      {/* Body — 3 columns */}
      <div className="grid grid-cols-[60px_1fr_120px] h-[300px] md:h-[360px]">
        {/* LEFT — tools */}
        <div className="border-r border-mist/10 p-2 flex flex-col gap-1.5 bg-midnight/40">
          {TOOLS.map((t) => (
            <div
              key={t.label}
              className={cn(
                "rounded-md px-1.5 py-1.5 text-[8px] font-medium text-center transition",
                t.active
                  ? "bg-gradient-to-br from-aurora-violet/30 to-neon-magenta/20 text-aurora-violet border border-aurora-violet/50 shadow-[0_0_12px_rgba(124,92,255,0.3)]"
                  : "text-ash-text/70 hover:text-bone-white",
              )}
            >
              {t.label}
            </div>
          ))}
        </div>

        {/* CENTER — canvas */}
        <div className="p-2.5 flex flex-col gap-2">
          {/* Prompt input */}
          <div className="rounded-md bg-gradient-to-r from-charcoal/70 to-obsidian/70 border border-mist/10 px-2.5 py-1.5 flex items-center justify-between">
            <span className="text-[9px] text-ash-text truncate">
              Lookbook áo dài minimalist, ánh sáng studio mềm...
            </span>
            <span className="text-[8px] text-charcoal-mute ml-2">68/500</span>
          </div>

          {/* Toolbar — model + ratio + generate */}
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1">
              <div className="rounded-full bg-aurora-soft border border-aurora-violet/40 px-2 py-0.5 text-[8px] font-medium text-aurora-violet">
                GPT Image
              </div>
              <div className="rounded-full bg-charcoal/60 border border-mist/10 px-2 py-0.5 text-[8px] font-medium text-ash-text">
                1:1
              </div>
            </div>
            <div className="rounded-full bg-bone-white px-2.5 py-0.5 text-[8px] font-bold text-midnight flex items-center gap-1">
              <SparkleIcon className="w-2.5 h-2.5" />
              8c
            </div>
          </div>

          {/* Result grid — 4 gradient tiles with glow */}
          <div className="grid grid-cols-2 gap-1.5 flex-1">
            {RESULT_GRADIENTS.map((g, i) => (
              <div
                key={i}
                className={cn(
                  "relative rounded-[6px] overflow-hidden bg-gradient-to-br",
                  g,
                  "border border-mist/10",
                  "shadow-[inset_0_0_20px_rgba(255,255,255,0.06)]",
                )}
              >
                {/* Floating sparkle decoration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <SparkleIcon
                    className={cn(
                      "w-3.5 h-3.5 text-bone-white/80",
                      i % 2 === 0 ? "animate-float" : "animate-float-reverse",
                    )}
                  />
                </div>
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — params */}
        <div className="border-l border-mist/10 p-2 flex flex-col gap-1 bg-midnight/40">
          <span className="text-[8px] font-bold text-aurora-violet uppercase tracking-wider mb-0.5">
            Params
          </span>
          {PARAMS.map((p) => (
            <div
              key={p.label}
              className="flex items-center justify-between text-[8px]"
            >
              <span className="text-ash-text/80">{p.label}</span>
              <span className="text-bone-white/90 font-medium">{p.value}</span>
            </div>
          ))}
          <div className="mt-auto pt-1.5 border-t border-mist/10 flex items-center gap-1 text-[8px] text-toxic-lime">
            <CheckIcon className="w-2.5 h-2.5" />
            <span>done</span>
          </div>
        </div>
      </div>
    </div>
  );
}
