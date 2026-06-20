"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Sparkles,
  Search,
  Coins,
  Plus,
  Download,
  Heart,
  Wand2,
  Trash2,
  Grid3x3,
  LayoutGrid,
  Filter,
  Calendar,
  X,
  Settings,
  ChevronDown,
} from "lucide-react";

/* ---------- Data ---------- */

type LibItem = {
  id: number;
  src: string;
  model: string;
  modelColor: string;
  prompt: string;
  date: string;
  aspect: string;
  credit: number;
  private: boolean;
  folder: string;
};

const items: LibItem[] = [
  { id: 1, src: "hero/studio-1.png", model: "GPT Image", modelColor: "bg-[#d25fff]/15 text-[#d25fff]", prompt: "Bento UI dashboard cho SaaS productivity, soft gradient tím", date: "20/06/2026", aspect: "1:1", credit: 12, private: true, folder: "Sản phẩm" },
  { id: 2, src: "hero/studio-2.png", model: "NANO BANANA", modelColor: "bg-[#d25fff]/15 text-[#d25fff]", prompt: "Editorial fashion, cinematic teal & amber grading", date: "20/06/2026", aspect: "4:3", credit: 10, private: true, folder: "Lookbook" },
  { id: 3, src: "hero/studio-3.png", model: "Flux Pro", modelColor: "bg-[#d25fff]/15 text-[#d25fff]", prompt: "Sản phẩm skincare trên marble trắng, soft shadow", date: "19/06/2026", aspect: "1:1", credit: 15, private: false, folder: "Sản phẩm" },
  { id: 4, src: "hero/studio-1.png", model: "Ideogram", modelColor: "bg-[#d25fff]/15 text-[#d25fff]", prompt: "Poster quảng cáo Tết 2026 với typography tiếng Việt", date: "18/06/2026", aspect: "4:3", credit: 8, private: true, folder: "Marketing" },
  { id: 5, src: "hero/studio-2.png", model: "Zturbo", modelColor: "bg-[#03e65b]/15 text-[#03e65b]", prompt: "Moodboard concept quán cà phê Hà Nội, vintage gạch bông", date: "17/06/2026", aspect: "1:1", credit: 3, private: true, folder: "Moodboard" },
  { id: 6, src: "hero/studio-3.png", model: "Recraft v3", modelColor: "bg-[#ff3386]/15 text-[#ff3386]", prompt: "Logo + brand guideline cho studio nhỏ, vector sạch", date: "15/06/2026", aspect: "1:1", credit: 9, private: false, folder: "Branding" },
  { id: 7, src: "hero/studio-1.png", model: "NANO BANANA", modelColor: "bg-[#d25fff]/15 text-[#d25fff]", prompt: "Minh họa trẻ em đọc sách, màu nước ấm, vintage", date: "12/06/2026", aspect: "4:3", credit: 10, private: true, folder: "Lookbook" },
  { id: 8, src: "hero/studio-2.png", model: "GPT Image", modelColor: "bg-[#d25fff]/15 text-[#d25fff]", prompt: "Mockup tai nghe bluetooth trên nền pastel, soft 3D", date: "10/06/2026", aspect: "1:1", credit: 12, private: true, folder: "Sản phẩm" },
  { id: 9, src: "hero/studio-3.png", model: "Flux Pro", modelColor: "bg-[#d25fff]/15 text-[#d25fff]", prompt: "Travel editorial Vịnh Hạ Long, drone golden hour", date: "08/06/2026", aspect: "16:9", credit: 15, private: true, folder: "Marketing" },
  { id: 10, src: "hero/studio-1.png", model: "Zturbo", modelColor: "bg-[#03e65b]/15 text-[#03e65b]", prompt: "Quick test bảng màu gradient tím sang hồng", date: "05/06/2026", aspect: "1:1", credit: 3, private: true, folder: "Moodboard" },
  { id: 11, src: "hero/studio-2.png", model: "Ideogram", modelColor: "bg-[#d25fff]/15 text-[#d25fff]", prompt: "Bảng hiệu quán ăn tên Việt, typography đặc trưng", date: "02/06/2026", aspect: "4:3", credit: 8, private: false, folder: "Branding" },
  { id: 12, src: "hero/studio-3.png", model: "NANO BANANA", modelColor: "bg-[#d25fff]/15 text-[#d25fff]", prompt: "Chân dung nghệ thuật, ánh sáng Rembrandt", date: "01/06/2026", aspect: "3:4", credit: 10, private: true, folder: "Lookbook" },
];

const folders = ["Tất cả", "Sản phẩm", "Lookbook", "Marketing", "Moodboard", "Branding"];

export default function LibraryPage() {
  const [view, setView] = useState<"grid" | "masonry">("grid");
  const [folder, setFolder] = useState("Tất cả");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = items;
    if (folder !== "Tất cả") list = list.filter((i) => i.folder === folder);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((i) => i.prompt.toLowerCase().includes(q) || i.model.toLowerCase().includes(q));
    }
    return list;
  }, [folder, search]);

  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalCreditUsed = items.reduce((s, i) => s + i.credit, 0);

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 right-[10%] h-[500px] w-[800px] rounded-full bg-[#7c5cff]/10 blur-[140px]" />
      </div>

      <div className="relative">
        {/* Top nav */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff] shadow-[0_0_24px_rgba(124,92,255,0.55)]">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-semibold tracking-tight">Glowstudio</span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              <Link href="/studio" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Studio</Link>
              <Link href="/community" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Community</Link>
              <Link href="/library" className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">Library</Link>
              <Link href="/pricing" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Pricing</Link>
            </nav>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs sm:flex">
                <Coins className="h-3.5 w-3.5 text-[#ffc533]" />
                <span className="text-white/60">Còn</span>
                <span className="font-semibold">1,488</span>
              </div>
              <Link
                href="/studio"
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" /> Tạo mới
              </Link>
            </div>
          </div>
        </header>

        {/* Header */}
        <section className="px-6 pt-12 pb-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                  Library
                </p>
                <h1 className="mt-2 text-[48px] font-extrabold leading-[0.9] tracking-[-0.02em]">
                  Thư viện của bạn.
                </h1>
                <p className="mt-3 text-white/55">
                  {items.length} ảnh · đã dùng {totalCreditUsed} credit · {items.filter((i) => i.private).length} riêng tư
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs hover:bg-white/[0.08]">
                  <Settings className="h-3.5 w-3.5" /> Cài đặt
                </button>
                <Link
                  href="/studio"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-black hover:opacity-90"
                >
                  <Plus className="h-3.5 w-3.5" /> Tạo ảnh mới
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="sticky top-16 z-20 border-y border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm trong library…"
                  className="w-full rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-9 pr-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#7c5cff]/60"
                />
              </div>

              {/* Folders */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {folders.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFolder(f)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors ${
                      folder === f
                        ? "bg-white text-black font-semibold"
                        : "border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* View toggle */}
              <div className="ml-auto flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-0.5">
                <button
                  onClick={() => setView("grid")}
                  className={`rounded-full p-1.5 ${view === "grid" ? "bg-[#7c5cff] text-white" : "text-white/60"}`}
                  title="Grid"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setView("masonry")}
                  className={`rounded-full p-1.5 ${view === "masonry" ? "bg-[#7c5cff] text-white" : "text-white/60"}`}
                  title="Masonry"
                >
                  <Grid3x3 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Selection action bar */}
        {selected.size > 0 && (
          <div className="sticky top-[122px] z-10 border-b border-[#7c5cff]/40 bg-[#7c5cff]/[0.08] backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-2.5 text-sm">
              <span className="text-white">
                Đã chọn <span className="font-semibold">{selected.size}</span> ảnh
              </span>
              <div className="flex items-center gap-2">
                <button className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 text-xs hover:bg-white/[0.08]">
                  <Download className="h-3 w-3" /> Tải về
                </button>
                <button className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 text-xs hover:bg-white/[0.08]">
                  <Heart className="h-3 w-3" /> Đăng Community
                </button>
                <button className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#ff5d4b]/30 bg-[#ff5d4b]/10 px-3 text-xs text-[#ff5d4b] hover:bg-[#ff5d4b]/20">
                  <Trash2 className="h-3 w-3" /> Xóa
                </button>
                <button
                  onClick={() => setSelected(new Set())}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <section className="px-6 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 text-xs text-white/40">
              {filtered.length} ảnh trong "{folder}"{search && ` · tìm "${search}"`}
            </div>

            {view === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((item) => (
                  <LibraryCard
                    key={item.id}
                    item={item}
                    selected={selected.has(item.id)}
                    onSelect={() => toggleSelect(item.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                {filtered.map((item) => (
                  <LibraryCard
                    key={item.id}
                    item={item}
                    selected={selected.has(item.id)}
                    onSelect={() => toggleSelect(item.id)}
                    masonry
                  />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="rounded-[8.4px] border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
                <p className="text-sm text-white/50">Không tìm thấy ảnh nào trong "{folder}".</p>
                <Link
                  href="/studio"
                  className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-semibold text-black hover:opacity-90"
                >
                  <Plus className="h-3.5 w-3.5" /> Tạo ảnh mới
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 px-6 py-12">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#7c5cff]">
                <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold">Glowstudio</span>
              <span className="text-xs text-white/40">© 2026 · Hà Nội, Việt Nam</span>
            </div>
            <div className="flex items-center gap-5 text-xs text-white/50">
              <Link href="/studio" className="hover:text-white">Studio</Link>
              <Link href="/community" className="hover:text-white">Community</Link>
              <Link href="/library" className="hover:text-white">Library</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
              <Link href="/docs" className="hover:text-white">Docs</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function LibraryCard({
  item,
  selected,
  onSelect,
  masonry,
}: {
  item: LibItem;
  selected: boolean;
  onSelect: () => void;
  masonry?: boolean;
}) {
  const aspect =
    item.aspect === "1:1" ? "1/1" : item.aspect === "4:3" ? "4/3" : item.aspect === "3:4" ? "3/4" : "16/9";

  return (
    <div
      className={
        "group relative overflow-hidden rounded-[8.4px] border bg-black transition-colors " +
        (selected ? "border-[#7c5cff]" : "border-white/10 hover:border-white/30") +
        (masonry ? " mb-4 break-inside-avoid" : "")
      }
    >
      <div
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: aspect }}
        onClick={onSelect}
      >
        <Image
          src={item.src}
          alt={item.prompt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Selected check */}
        <div
          className={`absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
            selected ? "border-[#7c5cff] bg-[#7c5cff]" : "border-white/40 bg-black/40 backdrop-blur-md"
          }`}
        >
          {selected && (
            <svg viewBox="0 0 12 12" className="h-3 w-3 text-white">
              <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Private badge */}
        {item.private && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2 py-0.5 text-[10px] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffc533]" /> Riêng tư
          </div>
        )}

        {/* Hover actions */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-2 bg-gradient-to-t from-black/90 to-transparent p-3 transition-transform group-hover:translate-y-0">
          <div className="flex items-center gap-1.5">
            <Link
              href="/studio"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              title="Re-use prompt"
            >
              <Wand2 className="h-3.5 w-3.5" />
            </Link>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              title="Tải về"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.modelColor}`}>
            {item.model}
          </span>
        </div>
      </div>

      {!masonry && (
        <div className="p-3">
          <p className="line-clamp-1 text-xs text-white/70">{item.prompt}</p>
          <div className="mt-2 flex items-center justify-between text-[10px] text-white/40">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {item.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Coins className="h-3 w-3 text-[#ffc533]" /> −{item.credit}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
