"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Coins,
  Brush,
  Maximize2,
  Settings2,
  ChevronDown,
  Check,
  Upload,
  Shuffle,
  Sliders,
  History,
} from "lucide-react";

import { CreditChip } from "@/components/ui/credit-chip";
import { Modal } from "@/components/ui/modal";
import { PromptBar } from "@/components/studio/prompt-bar";
import { ReferenceUploader } from "@/components/studio/reference-uploader";
import { ResultGrid } from "@/components/studio/result-grid";
import { RecentGenerations } from "@/components/studio/recent-generations";
import { InpaintModal } from "@/components/studio/inpaint-modal";
import { StickyNav } from "@/components/public/sticky-nav";
import { RouteContent } from "@/components/ui/route-content";
import { AnimatePresence, motion } from "motion/react";

import { useCredits } from "@/hooks/use-credits";
import { useGenerations } from "@/hooks/use-generations";
import { useLibrary } from "@/hooks/use-library";
import { useMounted } from "@/hooks/use-mounted";
import { toast } from "@/hooks/use-toast";

import { MODEL_OPTIONS, getModel, getStyle, STYLE_PRESETS } from "@/lib/models";
import { streamVariations, composePrompt } from "@/lib/generate";
import { isAspect } from "@/lib/format";
import { isModelName, type AspectRatio, type LibraryItem, type ModelName, type Variation } from "@/lib/types";
import { cn } from "@/lib/cn";

/* ---------- Page (no useSearchParams — read window.location directly) ---------- */

export default function StudioPage() {
  const mounted = useMounted();
  const { balance, hydrated: creditsReady, deduct } = useCredits();
  const { add: addGeneration } = useGenerations();
  const { addMany: addManyToLibrary, add: addToLibrary, update: updateLibrary } = useLibrary();

  // ---------- Form state ----------
  const [prompt, setPrompt] = useState(
    "Bento UI dashboard cho SaaS, soft gradient tím, 3D clay, ánh sáng studio"
  );
  const [model, setModel] = useState<ModelName>("GPT Image");
  const [aspect, setAspect] = useState<AspectRatio>("1:1");
  const [style, setStyle] = useState<string>("Cinematic");
  const [refs, setRefs] = useState<string[]>([]);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // ---------- Generation state ----------
  const [variations, setVariations] = useState<Variation[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [inpaintOpen, setInpaintOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // ---------- URL prefill on mount (read window.location, not useSearchParams) ----------
  const urlAppliedRef = useRef(false);
  useEffect(() => {
    if (urlAppliedRef.current) return;
    if (typeof window === "undefined") return;
    urlAppliedRef.current = true;
    const params = new URLSearchParams(window.location.search);
    const p = params.get("prompt");
    const m = params.get("model");
    const a = params.get("aspect");
    let changed = false;
    if (p) {
      setPrompt(p);
      changed = true;
    }
    if (m && isModelName(m)) {
      setModel(m);
      changed = true;
    }
    if (a && isAspect(a)) {
      setAspect(a);
      changed = true;
    }
    if (changed && window.history?.replaceState) {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const modelMeta = getModel(model);
  const styleMeta = getStyle(style);
  const totalCost = modelMeta.credit * 4;
  const enoughCredits = balance >= totalCost;
  const validPrompt = prompt.trim().length > 0;

  // ---------- Generate ----------
  const handleGenerate = useCallback(async () => {
    if (busy) return;
    if (!validPrompt) {
      toast({ type: "error", message: "Vui lòng nhập prompt" });
      return;
    }
    if (!enoughCredits) {
      toast({
        type: "error",
        message: `Không đủ credit — cần ${totalCost}, còn ${balance}`,
      });
      return;
    }

    // Reset
    setVariations([]);
    setActiveIndex(null);
    setBusy(true);

    const abort = new AbortController();
    abortRef.current?.abort();
    abortRef.current = abort;

    const finalPrompt = composePrompt(prompt, style);
    const genId = `gen_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const collected: Variation[] = [];

    try {
      const stream = streamVariations(
        { prompt: finalPrompt, model, aspect, style, refs, count: 4 },
        abort.signal
      );
      while (true) {
        const { value, done } = await stream.next();
        if (done) break;
        if (value) {
          collected.push(value);
          setVariations([...collected]);
        }
      }

      // Done — persist
      const success = deduct(totalCost, `Generate với ${model}`);
      if (!success) {
        toast({ type: "error", message: "Không trừ được credit" });
      }
      addGeneration({
        id: genId,
        prompt: finalPrompt,
        model,
        aspect,
        style,
        refs: refs.length > 0 ? refs : undefined,
        variations: collected,
        totalCredit: totalCost,
        createdAt: Date.now(),
      });

      const items: LibraryItem[] = collected.map((v, i) => ({
        id: `${genId}:${v.id}`,
        src: v.src,
        prompt: finalPrompt,
        model,
        aspect,
        credit: modelMeta.credit,
        folder: "Chung",
        private: true,
        liked: false,
        createdAt: Date.now(),
        generationId: genId,
        variationId: v.id,
        source: "generate",
        // Vary createdAt slightly so order is stable
        ...(i > 0 ? {} : {}),
      }));
      addManyToLibrary(items);

      setActiveIndex(0);
      toast({
        type: "credit",
        message: `Đã generate 4 variations · −${totalCost} credit · đã lưu Library`,
      });
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") {
        toast({ type: "info", message: "Đã huỷ generation" });
      } else {
        console.error(err);
        toast({ type: "error", message: "Generation thất bại, thử lại" });
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busy, validPrompt, enoughCredits, totalCost, balance, prompt, style, model, aspect, refs, deduct]);

  // ---------- Variation helpers ----------
  function toggleLikeVariation(variationId: string) {
    setVariations((prev) =>
      prev.map((v) => (v.id === variationId ? { ...v, liked: !v.liked } : v))
    );
  }

  function downloadVariation(v: Variation) {
    const a = document.createElement("a");
    a.href = v.src;
    a.download = `glowstudio-${v.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleUpscale() {
    if (activeIndex == null) return;
    const v = variations[activeIndex];
    if (!v) return;
    const newItem: LibraryItem = {
      id: `up_${v.id}`,
      src: v.src,
      prompt: prompt,
      model,
      aspect,
      credit: 8,
      folder: "Chung",
      private: true,
      liked: false,
      createdAt: Date.now(),
      source: "upscale",
    };
    addToLibrary(newItem);
    toast({ type: "success", message: "Đã upscale (mock) — thêm vào Library · −8 credit" });
  }

  function handleInpaintApply(maskDataURL: string) {
    if (activeIndex == null) return;
    const v = variations[activeIndex];
    if (!v) return;
    // For the mockup, the mask is saved as its own library item (dataURL).
    // A real implementation would POST the original + mask to the AI endpoint.
    const newItem: LibraryItem = {
      id: `inp_${v.id}`,
      src: maskDataURL,
      prompt: `${prompt} [inpainted]`,
      model,
      aspect,
      credit: 6,
      folder: "Chung",
      private: true,
      liked: false,
      createdAt: Date.now(),
      source: "inpaint",
    };
    addToLibrary(newItem);
    setInpaintOpen(false);
  }

  function handleReroll() {
    handleGenerate();
  }

  const activeVariation: Variation | null =
    activeIndex != null ? variations[activeIndex] ?? null : null;

  return (
    <RouteContent className="relative min-h-screen bg-[#0a0a0a] text-white">
      <div className="relative">
        {/* ---------- Top bar ---------- */}
        <StickyNav variant="studio" />

        {/* ---------- Studio layout ---------- */}
        <div className="mx-auto grid max-w-[1600px] gap-6 px-6 py-6 lg:grid-cols-12">
          {/* ---- Left: controls ---- */}
          <aside className="space-y-4 lg:col-span-4 xl:col-span-3">
            {/* Prompt textarea */}
            <div className="rounded-[8.4px] border border-white/10 bg-[#0f0f0f] p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  Prompt
                </h3>
                <button
                  onClick={() => {
                    setPrompt(""); // small UX nicety
                    // Re-set after a tick? No — just empty + focus
                  }}
                  className="text-[11px] text-white/30 transition-colors hover:text-white/60"
                  type="button"
                >
                  Xoá
                </button>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                placeholder="Mô tả ảnh bạn muốn tạo…"
                className="w-full resize-none rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm leading-relaxed text-white placeholder-white/30 outline-none focus:border-white/40"
              />
              <div className="mt-2 flex items-center justify-between text-[11px] text-white/40">
                <span>{prompt.length} ký tự</span>
                {styleMeta && (
                  <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/70">
                    + {styleMeta.hint}
                  </span>
                )}
              </div>
            </div>

            {/* Model picker */}
            <div className="rounded-[8.4px] border border-white/10 bg-[#0f0f0f] p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Model
              </h3>
              <button
                onClick={() => setShowModelPicker((s) => !s)}
                className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.03] p-3 text-left transition-colors hover:border-white/20"
                type="button"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{modelMeta.name}</span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", modelMeta.tagColor)}>
                      {modelMeta.tag}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs text-white/50">{modelMeta.desc}</div>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/40 transition-transform", showModelPicker && "rotate-180")} />
              </button>

              <AnimatePresence initial={false}>
                {showModelPicker && (
                  <motion.div
                    key="model-picker"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1 rounded-md border border-white/10 bg-[#0a0a0a] p-1">
                      {MODEL_OPTIONS.map((m) => (
                        <button
                          key={m.name}
                          onClick={() => {
                            setModel(m.name);
                            setShowModelPicker(false);
                          }}
                          type="button"
                          className={cn(
                            "flex w-full items-start justify-between gap-3 rounded px-2.5 py-2 text-left transition-colors",
                            m.name === model ? "bg-white/[0.08]" : "hover:bg-white/5"
                          )}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{m.name}</span>
                              <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-semibold", m.tagColor)}>
                                {m.tag}
                              </span>
                            </div>
                            <div className="mt-0.5 truncate text-[11px] text-white/40">{m.desc}</div>
                          </div>
                          <div className="shrink-0 text-right text-[11px] text-white/60">
                            <div className="flex items-center gap-1">
                              <Coins className="h-3 w-3 text-white/70" />
                              {m.credit}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Aspect ratio */}
            <div className="rounded-[8.4px] border border-white/10 bg-[#0f0f0f] p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Aspect
              </h3>
              <div className="grid grid-cols-5 gap-1.5">
                {(["1:1", "4:3", "3:4", "16:9", "9:16"] as const).map((a) => {
                  const selected = aspect === a;
                  return (
                    <motion.button
                      key={a}
                      onClick={() => setAspect(a)}
                      type="button"
                      layout
                      className={cn(
                        "relative rounded-md border py-2 text-xs transition-colors",
                        selected ? "text-white" : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                      )}
                    >
                      {selected && (
                        <motion.span
                          layoutId="aspect-indicator"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-md border border-white/60 bg-white/[0.08]"
                        />
                      )}
                      <span className="relative">{a}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Style ref */}
            <div className="rounded-[8.4px] border border-white/10 bg-[#0f0f0f] p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Style
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {STYLE_PRESETS.map((s) => {
                  const selected = style === s.name;
                  return (
                    <motion.button
                      key={s.name}
                      onClick={() => setStyle(s.name)}
                      type="button"
                      layout
                      className={cn(
                        "group relative overflow-hidden rounded-md border p-2 text-left transition-colors",
                        selected
                          ? "border-white/60 bg-white/[0.08]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20"
                      )}
                    >
                      <div
                        className="aspect-square w-full rounded bg-gradient-to-br from-white/[0.10] to-white/[0.02]"
                      />
                      <div className="mt-1.5 text-[10px] font-medium text-white/80">{s.name}</div>
                      {selected && (
                        <motion.div
                          layoutId="style-check"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white"
                        >
                          <Check className="h-2.5 w-2.5 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Advanced tools */}
            <div className="rounded-[8.4px] border border-white/10 bg-[#0f0f0f] p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Tools
              </h3>
              <div className="space-y-1.5">
                <ReferenceUploader value={refs} onChange={setRefs} max={4} />
                <button
                  onClick={() => toast({ type: "info", message: "Mở Inpaint từ variation đang chọn" })}
                  type="button"
                  className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Brush className="h-3.5 w-3.5" /> Inpaint
                  </span>
                  <span className="text-[10px] text-white/40">trên variation</span>
                </button>
                <button
                  onClick={() => toast({ type: "info", message: "Mở Upscale từ variation đang chọn" })}
                  type="button"
                  className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Maximize2 className="h-3.5 w-3.5" /> Upscale 4×
                  </span>
                  <span className="text-[10px] text-white/40">+8 credit</span>
                </button>
                <button
                  onClick={() => setShowAdvanced((s) => !s)}
                  type="button"
                  className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Sliders className="h-3.5 w-3.5" /> Nâng cao
                  </span>
                  <ChevronDown className={cn("h-3.5 w-3.5 text-white/40 transition-transform", showAdvanced && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {showAdvanced && (
                    <motion.div
                      key="advanced-panel"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-md border border-white/10 bg-white/[0.02] p-3 text-[11px] text-white/55">
                        <label className="flex items-center justify-between">
                          Steps
                          <span className="text-white/80">30</span>
                        </label>
                        <label className="mt-2 flex items-center justify-between">
                          Guidance
                          <span className="text-white/80">7.5</span>
                        </label>
                        <label className="mt-2 flex items-center justify-between">
                          Seed
                          <span className="text-white/80">random</span>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </aside>

          {/* ---- Right: canvas + result ---- */}
          <section className="lg:col-span-8 xl:col-span-9">
            <div className="rounded-[8.4px] border border-white/10 bg-[#0f0f0f] p-6">
              {/* Canvas header */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-[19px] font-semibold leading-[1.15]">Canvas</h2>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-white/60">
                    {aspect} · {modelMeta.name}
                  </span>
                  {mounted && creditsReady && !enoughCredits && (
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[10px] text-white/70">
                      Không đủ credit
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Coins className="h-3.5 w-3.5 text-white/70" />
                  <span>
                    Tiêu hao <span className="text-white">{totalCost}</span> credit / 4 ảnh
                  </span>
                </div>
              </div>

              {/* Prompt bar */}
              <div className="mb-4">
                <PromptBar
                  value={prompt}
                  onChange={setPrompt}
                  onSubmit={handleGenerate}
                  busy={busy}
                />
              </div>

              {/* Result grid */}
              <ResultGrid
                variations={variations}
                aspect={aspect}
                activeIndex={activeIndex}
                busy={busy}
                creditPerImage={modelMeta.credit}
                modelName={model}
                totalReceived={variations.length}
                onSelect={setActiveIndex}
                onToggleLike={toggleLikeVariation}
                onDownload={downloadVariation}
                onInpaint={() => {
                  if (activeVariation) {
                    setInpaintOpen(true);
                  } else {
                    toast({ type: "info", message: "Chọn một variation trước" });
                  }
                }}
                onUpscale={handleUpscale}
                onReroll={handleReroll}
              />
            </div>

            <RecentGenerations />
          </section>
        </div>
      </div>

      {/* Inpaint modal */}
      {activeVariation && (
        <InpaintModal
          open={inpaintOpen}
          onOpenChange={setInpaintOpen}
          imageSrc={activeVariation.src}
          onApply={handleInpaintApply}
        />
      )}
    </RouteContent>
  );
}
