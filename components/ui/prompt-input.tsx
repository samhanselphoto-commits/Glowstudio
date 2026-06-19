"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ImageLucideIcon, PaletteIcon, BanIcon } from "@/components/icons";

/**
 * §6.13 — Prompt Input Box.
 * 6px radius, 1px mist border, focus ring aurora violet.
 * 3 nút phụ (image ref, style ref, negative prompt) + char counter.
 */
export interface PromptInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
}

export const PromptInput = React.forwardRef<
  HTMLTextAreaElement,
  PromptInputProps
>(({ className, maxLength = 2000, value, onChange, ...props }, ref) => {
  const [count, setCount] = React.useState(0);

  return (
    <div
      className={cn(
        "rounded-md",
        "border border-mist",
        "bg-obsidian",
        "transition",
        "focus-within:border-aurora-violet",
        "focus-within:shadow-[0_0_0_3px_rgba(124,92,255,0.2)]",
      )}
    >
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => {
          setCount(e.target.value.length);
          onChange?.(e);
        }}
        placeholder="Mô tả ảnh bạn muốn tạo..."
        rows={4}
        className={cn(
          "w-full",
          "bg-transparent",
          "text-bone-white",
          "text-base",
          "p-5",
          "resize-none",
          "outline-none",
          "placeholder:text-charcoal-mute",
          className,
        )}
        {...props}
      />
      <div className="flex items-center justify-between border-t border-mist/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-mist p-2 hover:border-aurora-violet hover:text-aurora-violet transition"
            title="Ảnh tham chiếu"
            aria-label="Ảnh tham chiếu"
          >
            <ImageLucideIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="rounded-full border border-mist p-2 hover:border-aurora-violet hover:text-aurora-violet transition"
            title="Style ref"
            aria-label="Style ref"
          >
            <PaletteIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="rounded-full border border-mist p-2 hover:border-aurora-violet hover:text-aurora-violet transition"
            title="Negative prompt"
            aria-label="Negative prompt"
          >
            <BanIcon className="w-4 h-4" />
          </button>
        </div>
        <span className="text-xs text-charcoal-mute">
          {count} / {maxLength} ký tự
        </span>
      </div>
    </div>
  );
});
PromptInput.displayName = "PromptInput";
