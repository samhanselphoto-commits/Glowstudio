"use client";

import { useEffect, useState } from "react";
import type { ToastItem } from "@/lib/types";

/**
 * Module-singleton toast bus. Components anywhere can call `toast(...)`
 * and the ToastViewport rendered in the root layout will display it.
 */

const subscribers = new Set<(toasts: ToastItem[]) => void>();
let toasts: ToastItem[] = [];
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function notify() {
  for (const sub of subscribers) sub(toasts);
}

function dismiss(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }
  notify();
}

function makeId() {
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function toast(input: { type?: ToastItem["type"]; message: string; durationMs?: number }): string {
  const item: ToastItem = {
    id: makeId(),
    type: input.type ?? "info",
    message: input.message,
    createdAt: Date.now(),
  };
  toasts = [...toasts, item];
  notify();
  const duration = input.durationMs ?? 3000;
  const t = setTimeout(() => dismiss(item.id), duration);
  timers.set(item.id, t);
  return item.id;
}

export function useToasts(): ToastItem[] {
  const [list, setList] = useState<ToastItem[]>(toasts);
  useEffect(() => {
    subscribers.add(setList);
    setList(toasts);
    return () => {
      subscribers.delete(setList);
    };
  }, []);
  return list;
}

export const dismissToast = dismiss;
