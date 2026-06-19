"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon } from "@/components/icons";
import { MODELS } from "@/lib/constants";

/**
 * §6.15 — Model Selector Pill.
 * 60px radius, 1px mist border. Radix DropdownMenu cho list.
 */
export interface ModelSelectorProps {
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function ModelSelector({
  value = "gpt-image",
  onChange,
  className,
}: ModelSelectorProps) {
  const current = MODELS.find((m) => m.id === value) ?? MODELS[0];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-between gap-2",
            "rounded-full",
            "border border-mist",
            "bg-obsidian",
            "px-4 py-2",
            "text-sm font-medium",
            "text-bone-white",
            "hover:border-aurora-violet",
            "transition",
            "min-w-[200px]",
            className,
          )}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-aurora-violet" />
            <span>{current.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-ash-text">{current.cost}c</span>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={6}
          className={cn(
            "z-50 min-w-[200px]",
            "rounded-[8.4px]",
            "border border-mist/20",
            "bg-charcoal",
            "p-1.5",
            "shadow-[0_0_0_1px_rgba(229,229,229,0.1),0_40px_80px_rgba(0,0,0,0.7)]",
          )}
        >
          {MODELS.map((m) => (
            <DropdownMenu.Item
              key={m.id}
              onSelect={() => onChange?.(m.id)}
              className={cn(
                "flex items-center justify-between gap-2",
                "rounded-md",
                "px-3 py-2",
                "text-sm",
                "cursor-pointer",
                "outline-none",
                "data-[highlighted]:bg-aurora-soft data-[highlighted]:text-bone-white",
                m.id === value ? "text-bone-white" : "text-ash-text",
              )}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-aurora-violet" />
                <span>{m.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-ash-text text-xs">{m.cost}c</span>
                {m.id === value && <CheckIcon className="w-3.5 h-3.5 text-aurora-violet" />}
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
