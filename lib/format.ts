import type { AspectRatio } from "./types";

/** Maps AspectRatio to CSS aspect-ratio value. */
export function aspectToCss(aspect: AspectRatio): string {
  switch (aspect) {
    case "1:1":
      return "1 / 1";
    case "4:3":
      return "4 / 3";
    case "3:4":
      return "3 / 4";
    case "16:9":
      return "16 / 9";
    case "9:16":
      return "9 / 16";
  }
}

/** Reverse mapping for URL search param. */
export function isAspect(value: string): value is AspectRatio {
  return value === "1:1" || value === "4:3" || value === "3:4" || value === "16:9" || value === "9:16";
}

/** Format a Date.now() timestamp as relative Vietnamese time. */
export function formatRelative(ts: number, now: number = Date.now()): string {
  const diff = Math.max(0, now - ts);
  const s = Math.floor(diff / 1000);
  if (s < 30) return "vừa xong";
  if (s < 60) return `${s} giây trước`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} phút trước`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} giờ trước`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} ngày trước`;
  if (d < 30) return `${Math.floor(d / 7)} tuần trước`;
  return formatDateVN(ts);
}

/** Format a timestamp as DD/MM/YYYY. */
export function formatDateVN(ts: number): string {
  const d = new Date(ts);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/** Format a number with thousand separator. */
export function formatThousand(n: number): string {
  return n.toLocaleString("vi-VN");
}
