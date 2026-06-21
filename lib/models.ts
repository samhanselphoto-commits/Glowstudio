import type { ModelName, ModelTag } from "./types";

export type ModelOption = {
  name: ModelName;
  credit: number;
  tag: ModelTag;
  tagColor: string;
  desc: string;
};

export const MODEL_OPTIONS: ModelOption[] = [
  {
    name: "GPT Image",
    credit: 12,
    tag: "Pro",
    tagColor: "bg-white/[0.08] text-white/70",
    desc: "Hiểu prompt phức tạp, text trong ảnh cực tốt",
  },
  {
    name: "NANO BANANA",
    credit: 10,
    tag: "Pro",
    tagColor: "bg-white/[0.08] text-white/70",
    desc: "Editorial, chân dung, cinematic color",
  },
  {
    name: "Flux Pro",
    credit: 15,
    tag: "Pro",
    tagColor: "bg-white/[0.08] text-white/70",
    desc: "Flagship quality, ảnh sản phẩm & quảng cáo",
  },
  {
    name: "Zturbo",
    credit: 3,
    tag: "Free",
    tagColor: "bg-white/[0.08] text-white/70",
    desc: "Tốc độ cao, giá rẻ, phù hợp draft",
  },
  {
    name: "Ideogram",
    credit: 8,
    tag: "Pro",
    tagColor: "bg-white/[0.08] text-white/70",
    desc: "Typography, poster có chữ Việt có dấu",
  },
  {
    name: "Recraft v3",
    credit: 9,
    tag: "Beta",
    tagColor: "bg-white/[0.08] text-white/70",
    desc: "Vector & brand system, xuất SVG",
  },
];

export function getModel(name: ModelName): ModelOption {
  const m = MODEL_OPTIONS.find((x) => x.name === name);
  if (!m) throw new Error(`Unknown model: ${name}`);
  return m;
}

export function getModelTagColor(name: ModelName): string {
  return getModel(name).tagColor;
}

export type StylePreset = {
  name: string;
  color: string;
  hint: string;
};

export const STYLE_PRESETS: StylePreset[] = [
  { name: "Cinematic", color: "#7c5cff", hint: "phong cách cinematic" },
  { name: "Editorial", color: "#d25fff", hint: "phong cách editorial" },
  { name: "Bento 3D", color: "#03e65b", hint: "phong cách bento 3D clay" },
  { name: "Vietnamese street", color: "#ffc533", hint: "phong cách đường phố Việt Nam" },
  { name: "Vintage film", color: "#ff5d4b", hint: "phong cách vintage film" },
  { name: "Studio minimal", color: "#33d0ff", hint: "phong cách studio tối giản" },
];

export function getStyle(name: string): StylePreset | undefined {
  return STYLE_PRESETS.find((s) => s.name === name);
}
