"use client";

import * as React from "react";
import { TabPill } from "./tab-pill";
import { cn } from "@/lib/utils";

/**
 * §6.5 — Tab Filter Row.
 * Horizontal pills, gap 27px, scroll ngang trên mobile.
 * Controlled: parent truyền tabs[] + active + onChange.
 */
export interface TabFilterRowProps {
  tabs: string[];
  active: string;
  onChange?: (tab: string) => void;
  className?: string;
}

export function TabFilterRow({
  tabs,
  active,
  onChange,
  className,
}: TabFilterRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-7 overflow-x-auto pb-2",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {tabs.map((tab) => (
        <TabPill
          key={tab}
          active={tab === active}
          onClick={() => onChange?.(tab)}
        >
          {tab}
        </TabPill>
      ))}
    </div>
  );
}
