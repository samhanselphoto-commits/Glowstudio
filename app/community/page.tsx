"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Sparkles,
  Heart,
  Search,
  TrendingUp,
  Sparkle,
  Clock,
  Coins,
  ArrowRight,
  Filter,
  Wand2,
  Eye,
} from "lucide-react";

/* ---------- Data ---------- */

type Post = {
  src: string;
  author: string;
  handle: string;
  avatar: string;
  model: string;
  modelTag: string;
  modelColor: string;
  credit: number;
  likes: number;
  views: number;
  prompt: string;
  time: string;
};

const posts: Post[] = [
  {
    src: "hero/studio-1.png",
    author: "Linh Nguyễn",
    handle: "linh.design",
    avatar: "from-[#7c5cff] to-[#d25fff]",
    model: "GPT Image",
    modelTag: "Pro",
    modelColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: 12,
    likes: 248,
    views: 1820,
    prompt: "Bento UI dashboard cho SaaS productivity, soft gradient tím, 3D clay, ánh sáng studio từ trái",
    time: "2 giờ trước",
  },
  {
    src: "hero/studio-2.png",
    author: "Khoa Trần",
    handle: "khoa.creative",
    avatar: "from-[#03e65b] to-[#33d0ff]",
    model: "NANO BANANA",
    modelTag: "Pro",
    modelColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: 10,
    likes: 412,
    views: 3140,
    prompt: "Editorial fashion shot, cinematic teal & amber grading, model áo dài hiện đại",
    time: "5 giờ trước",
  },
  {
    src: "hero/studio-3.png",
    author: "Mai Phạm",
    handle: "mai.studio",
    avatar: "from-[#ffc533] to-[#ff5d4b]",
    model: "Flux Pro",
    modelTag: "Pro",
    modelColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: 15,
    likes: 187,
    views: 940,
    prompt: "Sản phẩm skincare trên marble trắng, soft shadow, ánh sáng tự nhiên cửa sổ",
    time: "8 giờ trước",
  },
  {
    src: "hero/studio-1.png",
    author: "Hùng Lê",
    handle: "hung.type",
    avatar: "from-[#ff3386] to-[#d25fff]",
    model: "Ideogram",
    modelTag: "Pro",
    modelColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: 8,
    likes: 156,
    views: 720,
    prompt: "Poster Tết 2026, typography tiếng Việt có dấu, màu đỏ & vàng chủ đạo",
    time: "12 giờ trước",
  },
  {
    src: "hero/studio-2.png",
    author: "Trang Đỗ",
    handle: "trang.mood",
    avatar: "from-[#33d0ff] to-[#7c5cff]",
    model: "Zturbo",
    modelTag: "Free",
    modelColor: "bg-[#03e65b]/15 text-[#03e65b]",
    credit: 3,
    likes: 94,
    views: 510,
    prompt: "Moodboard concept quán cà phê Hà Nội, vintage & gạch bông",
    time: "1 ngày trước",
  },
  {
    src: "hero/studio-3.png",
    author: "Sơn Bùi",
    handle: "son.brand",
    avatar: "from-[#7c5cff] to-[#03e65b]",
    model: "Recraft v3",
    modelTag: "Beta",
    modelColor: "bg-[#ff3386]/15 text-[#ff3386]",
    credit: 9,
    likes: 320,
    views: 2150,
    prompt: "Logo + brand guideline cho studio nhỏ, vector sạch, phong cách tối giản",
    time: "1 ngày trước",
  },
  {
    src: "hero/studio-1.png",
    author: "Vy Hoàng",
    handle: "vy.illus",
    avatar: "from-[#d25fff] to-[#ff3386]",
    model: "NANO BANANA",
    modelTag: "Pro",
    modelColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: 10,
    likes: 502,
    views: 4280,
    prompt: "Minh họa trẻ em đọc sách, màu nước ấm, không gian vintage",
    time: "2 ngày trước",
  },
  {
    src: "hero/studio-2.png",
    author: "Đức Ngô",
    handle: "duc.product",
    avatar: "from-[#ff5d4b] to-[#ffc533]",
    model: "GPT Image",
    modelTag: "Pro",
    modelColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: 12,
    likes: 178,
    views: 880,
    prompt: "Mockup tai nghe bluetooth trên nền pastel, soft 3D",
    time: "2 ngày trước",
  },
  {
    src: "hero/studio-3.png",
    author: "Hà Vũ",
    handle: "ha.editorial",
    avatar: "from-[#33d0ff] to-[#03e65b]",
    model: "Flux Pro",
    modelTag: "Pro",
    modelColor: "bg-[#d25fff]/15 text-[#d25fff]",
    credit: 15,
    likes: 263,
    views: 1640,
    prompt: "Travel editorial Vịnh Hạ Long, drone shot, ánh sáng golden hour",
    time: "3 ngày trước",
  },
];

const models = ["Tất cả", "GPT Image", "NANO BANANA", "Flux Pro", "Zturbo", "Ideogram", "Recraft v3"];

const sortOptions = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "new", label: "Mới nhất", icon: Clock },
  { id: "top", label: "Top tuần", icon: Sparkle },
];

export default function CommunityPage() {
  const [activeModel, setActiveModel] = useState("Tất cả");
  const [sort, setSort] = useState("trending");
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const list = activeModel === "Tất cả" ? posts : posts.filter((p) => p.model === activeModel);
    if (sort === "new") return [...list].reverse();
    if (sort === "top") return [...list].sort((a, b) => b.likes - a.likes);
    return [...list].sort((a, b) => b.likes + b.views / 100 - (a.likes + a.views / 100));
  }, [activeModel, sort]);

  const toggleLike = (i: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#7c5cff]/10 blur-[140px]" />
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
              <Link href="/community" className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">Community</Link>
              <Link href="/library" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Library</Link>
              <Link href="/pricing" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Pricing</Link>
            </nav>
            <Link href="/signup" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-black transition-opacity hover:opacity-90">
              Đăng ảnh
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="px-6 pt-16 pb-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
              Community
            </p>
            <h1 className="mt-3 text-[56px] font-extrabold leading-[0.9] tracking-[-0.02em] sm:text-[78px]">
              Ảnh người khác đã tạo.
            </h1>
            <p className="mt-4 max-w-xl text-white/55">
              Xem prompt, model và credit người khác dùng. Re-use ngay trong Studio của bạn.
            </p>
          </div>
        </section>

        {/* Toolbar */}
        <section className="sticky top-16 z-20 border-y border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Tìm theo prompt, tác giả…"
                  className="w-full rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-9 pr-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#7c5cff]/60"
                />
              </div>

              {/* Model filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {models.map((m) => (
                  <button
                    key={m}
                    onClick={() => setActiveModel(m)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors ${
                      activeModel === m
                        ? "bg-white text-black font-semibold"
                        : "border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="ml-auto flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-0.5">
                {sortOptions.map((o) => {
                  const Icon = o.icon;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setSort(o.id)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] transition-colors ${
                        sort === o.id
                          ? "bg-[#7c5cff] text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Masonry feed */}
        <section className="px-6 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center justify-between text-xs text-white/40">
              <span>{filtered.length} ảnh · {activeModel}</span>
              <span className="inline-flex items-center gap-1.5">
                <Filter className="h-3 w-3" /> {sortOptions.find((o) => o.id === sort)?.label}
              </span>
            </div>

            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
              {filtered.map((p, i) => (
                <article
                  key={i}
                  className="group mb-4 break-inside-avoid overflow-hidden rounded-[8.4px] border border-white/10 bg-black transition-colors hover:border-[#7c5cff]/40"
                >
                  {/* Image */}
                  <div className="relative w-full">
                    <div className="relative w-full" style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "1/1" : "3/4" }}>
                      <Image
                        src={p.src}
                        alt={p.prompt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Model badge */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 backdrop-blur-xl">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7c5cff]" />
                      <span className={`rounded-full px-1.5 py-0 text-[10px] font-semibold ${p.modelColor}`}>
                        {p.modelTag}
                      </span>
                      <span className="text-[10px] font-medium text-white">{p.model}</span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex w-full items-center justify-between p-3">
                        <button
                          onClick={() => toggleLike(i)}
                          className={`flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] backdrop-blur-md transition-colors ${
                            liked.has(i) ? "text-[#ff3386]" : "text-white"
                          }`}
                        >
                          <Heart className={`h-3 w-3 ${liked.has(i) ? "fill-current" : ""}`} />
                          {p.likes + (liked.has(i) ? 1 : 0)}
                        </button>
                        <Link
                          href="/studio"
                          className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-black"
                        >
                          <Wand2 className="h-3 w-3" />
                          Re-use prompt
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 shrink-0 rounded-full bg-gradient-to-br ${p.avatar}`} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-medium text-white">{p.author}</div>
                        <div className="truncate text-[10px] text-white/40">@{p.handle} · {p.time}</div>
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/70">
                      {p.prompt}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[10px] text-white/40">
                      <span className="inline-flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {p.likes + (liked.has(i) ? 1 : 0)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {p.views.toLocaleString()}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Coins className="h-3 w-3 text-[#ffc533]" /> {p.credit}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="rounded-[8.4px] border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
                <p className="text-sm text-white/50">Chưa có ảnh nào với model {activeModel}.</p>
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
