/**
 * Demo seed data. Used on first visit (and via "Seed dữ liệu demo" button
 * in /library) to populate localStorage so the experience isn't empty.
 */

import type { Generation, LibraryItem } from "./types";
import { KEY, getString, setJSON } from "./storage";
import { getModelTagColor } from "./models";

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

type DemoDef = {
  prompt: string;
  model: LibraryItem["model"];
  aspect: LibraryItem["aspect"];
  folder: string;
  isPrivate: boolean;
  credit: number;
  src: string;
  ageDays: number;
};

const DEMO_DEFS: DemoDef[] = [
  { prompt: "Bento UI dashboard cho SaaS productivity, soft gradient tím", model: "GPT Image", aspect: "1:1", folder: "Sản phẩm", isPrivate: true, credit: 12, src: "hero/studio-1.png", ageDays: 0 },
  { prompt: "Editorial fashion, cinematic teal & amber grading", model: "NANO BANANA", aspect: "4:3", folder: "Lookbook", isPrivate: true, credit: 10, src: "hero/studio-2.png", ageDays: 0 },
  { prompt: "Sản phẩm skincare trên marble trắng, soft shadow", model: "Flux Pro", aspect: "1:1", folder: "Sản phẩm", isPrivate: false, credit: 15, src: "hero/studio-3.png", ageDays: 1 },
  { prompt: "Poster quảng cáo Tết 2026 với typography tiếng Việt", model: "Ideogram", aspect: "4:3", folder: "Marketing", isPrivate: true, credit: 8, src: "hero/studio-1.png", ageDays: 2 },
  { prompt: "Moodboard concept quán cà phê Hà Nội, vintage gạch bông", model: "Zturbo", aspect: "1:1", folder: "Moodboard", isPrivate: true, credit: 3, src: "hero/studio-2.png", ageDays: 3 },
  { prompt: "Logo + brand guideline cho studio nhỏ, vector sạch", model: "Recraft v3", aspect: "1:1", folder: "Branding", isPrivate: false, credit: 9, src: "hero/studio-3.png", ageDays: 5 },
  { prompt: "Minh họa trẻ em đọc sách, màu nước ấm, vintage", model: "NANO BANANA", aspect: "4:3", folder: "Lookbook", isPrivate: true, credit: 10, src: "hero/studio-1.png", ageDays: 8 },
  { prompt: "Mockup tai nghe bluetooth trên nền pastel, soft 3D", model: "GPT Image", aspect: "1:1", folder: "Sản phẩm", isPrivate: true, credit: 12, src: "hero/studio-2.png", ageDays: 10 },
  { prompt: "Travel editorial Vịnh Hạ Long, drone golden hour", model: "Flux Pro", aspect: "16:9", folder: "Marketing", isPrivate: true, credit: 15, src: "hero/studio-3.png", ageDays: 12 },
  { prompt: "Quick test bảng màu gradient tím sang hồng", model: "Zturbo", aspect: "1:1", folder: "Moodboard", isPrivate: true, credit: 3, src: "hero/studio-1.png", ageDays: 15 },
  { prompt: "Bảng hiệu quán ăn tên Việt, typography đặc trưng", model: "Ideogram", aspect: "4:3", folder: "Branding", isPrivate: false, credit: 8, src: "hero/studio-2.png", ageDays: 18 },
  { prompt: "Chân dung nghệ thuật, ánh sáng Rembrandt", model: "NANO BANANA", aspect: "3:4", folder: "Lookbook", isPrivate: true, credit: 10, src: "hero/studio-3.png", ageDays: 19 },
];

export function buildDemoLibrary(): LibraryItem[] {
  return DEMO_DEFS.map((d, i) => {
    const id = `demo_${i + 1}`;
    return {
      id,
      src: d.src,
      prompt: d.prompt,
      model: d.model,
      aspect: d.aspect,
      credit: d.credit,
      folder: d.folder,
      private: d.isPrivate,
      liked: false,
      createdAt: now - d.ageDays * day,
      source: "demo",
    };
  });
}

export function buildDemoGenerations(): Generation[] {
  // Group demo items by their model + prompt prefix to make 4 fake generations
  return DEMO_DEFS.slice(0, 4).map((d, i) => {
    const genId = `demo_gen_${i + 1}`;
    const item = {
      id: `${genId}:v1`,
      src: d.src,
      prompt: d.prompt,
      model: d.model,
      aspect: d.aspect,
      credit: d.credit,
      folder: d.folder,
      private: d.isPrivate,
      liked: false,
      createdAt: now - d.ageDays * day,
      generationId: genId,
      variationId: "v1",
      source: "demo" as const,
    };
    void item;
    return {
      id: genId,
      prompt: d.prompt,
      model: d.model,
      aspect: d.aspect,
      variations: [
        { id: "v1", src: d.src, seed: i * 13 + 1 },
        { id: "v2", src: d.src, seed: i * 13 + 2 },
        { id: "v3", src: d.src, seed: i * 13 + 3 },
        { id: "v4", src: d.src, seed: i * 13 + 4 },
      ],
      totalCredit: d.credit * 4,
      createdAt: now - d.ageDays * day,
    };
  });
}

export const DEMO_STARTING_CREDITS = 1488;

/** Idempotent first-visit seed. */
export function seedIfEmpty(): boolean {
  if (typeof window === "undefined") return false;
  const flag = getString(KEY.seeded);
  if (flag === "v1") return false;
  setJSON(KEY.library, buildDemoLibrary());
  setJSON(KEY.generations, buildDemoGenerations());
  if (getString(KEY.credits) == null) {
    setJSON(KEY.credits, DEMO_STARTING_CREDITS);
  }
  if (getString(KEY.creditLog) == null) {
    setJSON(KEY.creditLog, []);
  }
  try {
    window.localStorage.setItem(KEY.seeded, "v1");
  } catch {
    /* noop */
  }
  return true;
}

export { getModelTagColor };
