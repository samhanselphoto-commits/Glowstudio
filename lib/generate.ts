/**
 * Mock AI generation. Streams 4 variations of an image one by one,
 * picking from 3 base images with random seeds.
 *
 * When the real AI API is integrated, replace the body of `streamVariations`
 * — the async generator signature stays the same.
 */

import type { AspectRatio, ModelName, Variation } from "./types";
import { getModel } from "./models";

const BASE_IMAGES = ["/hero/studio-1.png", "/hero/studio-2.png", "/hero/studio-3.png"];

export type GenerateInput = {
  prompt: string;
  model: ModelName;
  aspect: AspectRatio;
  style?: string;
  refs?: string[]; // base64 dataURLs — currently ignored
  count?: number; // default 4
};

export type GenerateMeta = {
  model: ModelName;
  prompt: string;
  aspect: AspectRatio;
  style?: string;
  totalCredit: number;
};

function pickImage(seed: number): string {
  return BASE_IMAGES[Math.abs(seed) % BASE_IMAGES.length];
}

function makeId() {
  return `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("aborted", "AbortError"));
      return;
    }
    const t = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    function onAbort() {
      clearTimeout(t);
      reject(new DOMException("aborted", "AbortError"));
    }
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

const STYLE_HINT: Record<string, string> = {
  Cinematic: "cinematic lighting, color graded",
  Editorial: "editorial magazine composition",
  "Bento 3D": "bento grid, 3D clay rendering",
  "Vietnamese street": "Vietnamese street scene, authentic",
  "Vintage film": "vintage film grain, 35mm",
  "Studio minimal": "minimal studio setup, clean",
};

/**
 * Builds a textual prompt that combines the user prompt with the chosen
 * style preset's hint. Exposed for components that want to show the
 * effective prompt in the textarea / chip.
 */
export function composePrompt(userPrompt: string, style?: string): string {
  if (!style) return userPrompt;
  const hint = STYLE_HINT[style];
  return hint ? `${userPrompt}, ${hint}` : userPrompt;
}

/**
 * Async generator that yields Variation objects one at a time, simulating
 * streaming. Replace internals with real API calls when ready.
 */
export async function* streamVariations(
  input: GenerateInput,
  signal?: AbortSignal
): AsyncGenerator<Variation, GenerateMeta, void> {
  const count = input.count ?? 4;
  const model = getModel(input.model);
  const totalCredit = model.credit * count;
  const baseSeed = Math.floor(Math.random() * 9999);

  for (let i = 0; i < count; i++) {
    // 400–800ms per variation
    const delay = 400 + Math.floor(Math.random() * 400);
    await sleep(delay, signal);
    const seed = baseSeed + i * 37;
    const variation: Variation = {
      id: makeId(),
      src: pickImage(seed),
      seed,
    };
    yield variation;
  }

  return {
    model: input.model,
    prompt: input.prompt,
    aspect: input.aspect,
    style: input.style,
    totalCredit,
  };
}
