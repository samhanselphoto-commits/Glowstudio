"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Coins,
  Settings2,
  Brush,
  Maximize2,
  Upload,
  Image as ImageIcon,
  Shuffle,
  Download,
  Heart,
  Wand2,
  Sliders,
  ChevronDown,
  Play,
  History,
  X,
  Plus,
  Check,
} from "lucide-react";

/* ---------- Data ---------- */

const modelOptions = [
  {
    name: "GPT Image",
    credit: 12,
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    desc: "Hiểu prompt phức tạp, text trong ảnh cực tốt",
  },
  {
    name: "NANO BANANA",
    credit: 10,
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    desc: "Editorial, chân dung, cinematic color",
  },
  {
    name: "Flux Pro",
    credit: 15,
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    desc: "Flagship quality, ảnh sản phẩm & quảng cáo",
  },
  {
    name: "Zturbo",
    credit: 3,
    tag: "Free",
    tagColor: "bg-[#03e65b]/15 text-[#03e65b]",
    desc: "Tốc độ cao, giá rẻ, phù hợp draft",
  },
  {
    name: "Ideogram",
    credit: 8,
    tag: "Pro",
    tagColor: "bg-[#d25fff]/15 text-[#d25fff]",
    desc: "Typography, poster có chữ Việt có dấu",
  },
  {
    name: "Recraft v3",
    credit: 9,
    tag: "Beta",
    tagColor: "bg-[#ff3386]/15 text-[#ff3386]",
    desc: "Vector & brand system, xuất SVG",
  },
];

const aspectRatios = ["1:1", "4:3", "3:4", "16:9", "9:16"];

const stylePresets = [
  { name: "Cinematic", color: "#7c5cff" },
  { name: "Editorial", color: "#d25fff" },
  { name: "Bento 3D", color: "#03e65b" },
  { name: "Vietnamese street", color: "#ffc533" },
  { name: "Vintage film", color: "#ff5d4b" },
  { name: "Studio minimal", color: "#33d0ff" },
];

const recentGenerations = [
  { src: "hero/studio-1.png", model: "GPT Image", time: "2 phút trước" },
  { src: "hero/studio-2.png", model: "NANO BANANA", time: "8 phút trước" },
  { src: "hero/studio-3.png", model: "Flux Pro", time: "1 giờ trước" },
];

export default function StudioPage() {
  const [model, setModel] = useState(modelOptions[0]);
  const [aspect, setAspect] = useState("1:1");
  const [style, setStyle] = useState("Cinematic");
  const [prompt, setPrompt] = useState(
    "Bento UI dashboard cho SaaS, soft gradient tím, 3D clay, ánh sáng studio"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [variations, setVariations] = useState<string[]>([]);
  const [activeVariation, setActiveVariation] = useState<number | null>(null);

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setVariations([]);
    setActiveVariation(null);

    // Simulate streaming: 4 variations arrive one by one
    const seq = ["hero/studio-1.png", "hero/studio-2.png", "hero/studio-3.png", "hero/studio-1.png"];
    seq.forEach((src, i) => {
      setTimeout(() => {
        setVariations((v) => [...v, src]);
        if (i === seq.length - 1) {
          setIsGenerating(false);
          setActiveVariation(0);
        }
      }, 600 + i * 700);
    });
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      {/* Aurora ambient */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-10%] left-[20%] h-[500px] w-[800px] rounded-full bg-[#7c5cff]/15 blur-[140px]" />
      </div>

      <div className="relative">
        {/* ---------- Top bar ---------- */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff] shadow-[0_0_24px_rgba(124,92,255,0.55)]">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-semibold tracking-tight">Glowstudio</span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              <Link href="/studio" className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                Studio
              </Link>
              <Link href="/community" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                Community
              </Link>
              <Link href="/library" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                Library
              </Link>
              <Link href="/pricing" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs sm:flex">
                <Coins className="h-3.5 w-3.5 text-[#ffc533]" />
                <span className="text-white/60">Còn</span>
                <span className="font-semibold">1,488</span>
                <span className="text-white/40">credit</span>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7c5cff] to-[#d25fff] text-xs font-semibold">
                LN
              </div>
            </div>
          </div>
        </header>

        {/* ---------- Studio layout ---------- */}
        <div className="mx-auto grid max-w-[1600px] gap-6 px-6 py-6 lg:grid-cols-12">
          {/* ---- Left: controls ---- */}
          <aside className="space-y-4 lg:col-span-4 xl:col-span-3">
            {/* Prompt */}
            <div className="rounded-[8.4px] border border-white/10 bg-black p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  Prompt
                </h3>
                <button className="flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-white">
                  <Shuffle className="h-3 w-3" /> Surprise me
                </button>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                placeholder="Mô tả ảnh bạn muốn tạo…"
                className="w-full resize-none rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm leading-relaxed text-white placeholder-white/30 outline-none focus:border-[#7c5cff]/60"
              />
              <div className="mt-2 flex items-center justify-between text-[11px] text-white/40">
                <span>{prompt.length} ký tự</span>
                <span>Tiếng Việt có dấu OK</span>
              </div>
            </div>

            {/* Model picker */}
            <div className="rounded-[8.4px] border border-white/10 bg-black p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Model
              </h3>
              <button
                onClick={() => setShowModelPicker((s) => !s)}
                className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.03] p-3 text-left transition-colors hover:border-white/20"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{model.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${model.tagColor}`}>
                      {model.tag}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs text-white/50">{model.desc}</div>
                </div>
                <ChevronDown className={`h-4 w-4 text-white/40 transition-transform ${showModelPicker ? "rotate-180" : ""}`} />
              </button>

              {showModelPicker && (
                <div className="mt-2 space-y-1 rounded-md border border-white/10 bg-[#0a0a0a] p-1">
                  {modelOptions.map((m) => (
                    <button
                      key={m.name}
                      onClick={() => {
                        setModel(m);
                        setShowModelPicker(false);
                      }}
                      className={`flex w-full items-start justify-between gap-3 rounded px-2.5 py-2 text-left transition-colors ${
                        m.name === model.name ? "bg-[#7c5cff]/10" : "hover:bg-white/5"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{m.name}</span>
                          <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${m.tagColor}`}>
                            {m.tag}
                          </span>
                        </div>
                        <div className="mt-0.5 truncate text-[11px] text-white/40">
                          {m.desc}
                        </div>
                      </div>
                      <div className="shrink-0 text-right text-[11px] text-white/60">
                        <div className="flex items-center gap-1">
                          <Coins className="h-3 w-3 text-[#ffc533]" />
                          {m.credit}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Aspect ratio */}
            <div className="rounded-[8.4px] border border-white/10 bg-black p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Aspect
              </h3>
              <div className="grid grid-cols-5 gap-1.5">
                {aspectRatios.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAspect(a)}
                    className={`rounded-md border py-2 text-xs transition-colors ${
                      aspect === a
                        ? "border-[#7c5cff]/60 bg-[#7c5cff]/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Style ref */}
            <div className="rounded-[8.4px] border border-white/10 bg-black p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Style ref
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {stylePresets.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setStyle(s.name)}
                    className={`group relative overflow-hidden rounded-md border p-2 text-left transition-colors ${
                      style === s.name
                        ? "border-[#7c5cff]/60 bg-[#7c5cff]/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div
                      className="aspect-square w-full rounded"
                      style={{ background: `linear-gradient(135deg, ${s.color}, #000)` }}
                    />
                    <div className="mt-1.5 text-[10px] font-medium text-white/80">
                      {s.name}
                    </div>
                    {style === s.name && (
                      <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#7c5cff]">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced tools */}
            <div className="rounded-[8.4px] border border-white/10 bg-black p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Tools
              </h3>
              <div className="space-y-1.5">
                <button className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white">
                  <span className="flex items-center gap-2">
                    <Upload className="h-3.5 w-3.5" /> Upload ảnh tham chiếu
                  </span>
                  <span className="text-[10px] text-white/40">tối đa 4</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white">
                  <span className="flex items-center gap-2">
                    <Brush className="h-3.5 w-3.5" /> Inpaint
                  </span>
                  <span className="text-[10px] text-white/40">chỉnh cục bộ</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white">
                  <span className="flex items-center gap-2">
                    <Maximize2 className="h-3.5 w-3.5" /> Upscale 4×
                  </span>
                  <span className="text-[10px] text-white/40">+8 credit</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white">
                  <span className="flex items-center gap-2">
                    <Sliders className="h-3.5 w-3.5" /> Nâng cao
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-white/40" />
                </button>
              </div>
            </div>
          </aside>

          {/* ---- Right: canvas + result ---- */}
          <section className="lg:col-span-8 xl:col-span-9">
            <div className="rounded-[8.4px] border border-white/10 bg-black p-6">
              {/* Canvas header */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-[19px] font-semibold leading-[1.15]">Canvas</h2>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-white/60">
                    {aspect} · {model.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-white/50">
                    <Coins className="h-3.5 w-3.5 text-[#ffc533]" />
                    Tiêu hao <span className="text-white">{model.credit}</span> credit / ảnh
                  </span>
                </div>
              </div>

              {/* Prompt bar */}
              <div className="mb-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 pl-4">
                <Wand2 className="h-4 w-4 text-[#7c5cff]" />
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Mô tả ảnh bạn muốn tạo…"
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      Generating
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" /> Generate
                    </>
                  )}
                </button>
              </div>

              {/* Result grid */}
              {variations.length === 0 && !isGenerating && (
                <div className="flex aspect-[4/3] items-center justify-center rounded-[8.4px] border border-dashed border-white/10 bg-white/[0.02]">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-10 w-10 text-white/20" strokeWidth={1.2} />
                    <p className="mt-3 text-sm text-white/50">
                      Nhập prompt và bấm <span className="text-white">Generate</span> để bắt đầu
                    </p>
                    <p className="mt-1 text-xs text-white/30">
                      4 variations sẽ hiện ra cùng lúc
                    </p>
                  </div>
                </div>
              )}

              {isGenerating && variations.length === 0 && (
                <div className="flex aspect-[4/3] items-center justify-center rounded-[8.4px] border border-white/10 bg-gradient-to-br from-[#7c5cff]/10 via-black to-[#d25fff]/10">
                  <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[#7c5cff]" />
                    <p className="mt-4 text-sm text-white">
                      Đang generate với <span className="font-semibold">{model.name}</span>…
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      Thường mất 6–12 giây
                    </p>
                  </div>
                </div>
              )}

              {variations.length > 0 && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    {variations.map((src, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveVariation(i)}
                        className={`group relative cursor-pointer overflow-hidden rounded-[8.4px] border transition-colors ${
                          activeVariation === i
                            ? "border-[#7c5cff]"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="relative aspect-square w-full">
                          <Image
                            src={src}
                            alt={`Variation ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        {isGenerating && i === variations.length - 1 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#7c5cff]" />
                          </div>
                        )}
                        <div className="absolute right-2 top-2 flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80"
                          >
                            <Heart className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium backdrop-blur-md">
                          Variation {i + 1}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action bar */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Sparkles className="h-3.5 w-3.5 text-[#7c5cff]" />
                      Đã generate {variations.length}/4 variations · tổng −
                      {model.credit * variations.length} credit
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs hover:bg-white/[0.08]">
                        <Brush className="h-3 w-3" /> Inpaint
                      </button>
                      <button className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs hover:bg-white/[0.08]">
                        <Maximize2 className="h-3 w-3" /> Upscale
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-black hover:opacity-90"
                      >
                        <Shuffle className="h-3 w-3" /> Re-roll
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Recent */}
            <div className="mt-6 rounded-[8.4px] border border-white/10 bg-black p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <History className="h-3.5 w-3.5 text-white/50" />
                  Generation gần đây
                </h3>
                <Link
                  href="/library"
                  className="text-xs text-white/50 transition-colors hover:text-white"
                >
                  Xem tất cả →
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {recentGenerations.map((r, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-md border border-white/10"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={r.src}
                        alt={r.model}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="33vw"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <div className="text-[10px] font-medium text-white">{r.model}</div>
                      <div className="text-[10px] text-white/50">{r.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
