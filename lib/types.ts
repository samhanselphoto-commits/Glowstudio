export type AspectRatio = "1:1" | "4:3" | "3:4" | "16:9" | "9:16";

export const ASPECT_RATIOS: AspectRatio[] = ["1:1", "4:3", "3:4", "16:9", "9:16"];

export type ModelName =
  | "GPT Image"
  | "NANO BANANA"
  | "Flux Pro"
  | "Zturbo"
  | "Ideogram"
  | "Recraft v3";

export const MODEL_NAMES: ModelName[] = [
  "GPT Image",
  "NANO BANANA",
  "Flux Pro",
  "Zturbo",
  "Ideogram",
  "Recraft v3",
];

export function isModelName(value: string): value is ModelName {
  return (MODEL_NAMES as string[]).includes(value);
}

export type ModelTag = "Free" | "Pro" | "Beta";

export type Variation = {
  id: string;
  src: string; // dataURL or /hero/studio-N.png
  seed: number;
  liked?: boolean;
};

export type Generation = {
  id: string;
  prompt: string;
  model: ModelName;
  aspect: AspectRatio;
  style?: string;
  refs?: string[]; // base64 dataURLs
  variations: Variation[];
  totalCredit: number;
  createdAt: number;
};

export type LibraryItem = {
  id: string; // = generationId:variationId
  src: string;
  prompt: string;
  model: ModelName;
  aspect: AspectRatio;
  credit: number;
  folder: string; // default "Chung"
  private: boolean;
  liked: boolean;
  createdAt: number;
  // Optional provenance
  generationId?: string;
  variationId?: string;
  source?: "generate" | "inpaint" | "upscale" | "reuse" | "demo";
};

export type ToastItem = {
  id: string;
  type: "success" | "error" | "info" | "credit";
  message: string;
  createdAt: number;
};

export type CreditLog = {
  id: string;
  delta: number; // negative for spend, positive for top-up
  reason: string;
  createdAt: number;
};
