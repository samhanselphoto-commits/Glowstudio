"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavBar,
  ImageGalleryGrid,
  EmptyState,
  CreditBadge,
  ModelSelector,
  AspectRatioSelector,
  GenerateButton,
  ButtonGhost,
  ToastNotification,
} from "@/components/ui";
import { galleryAll, galleryShowcase, type GalleryItem } from "@/lib/mock-data";
import {
  ImageLucideIcon,
  ChevronDownIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface TabDef {
  id: TabId;
  label: string;
  disabled?: boolean;
  badge?: string;
}

type TabId = "all" | "image" | "video" | "audio" | "supercomputer";

const TABS: TabDef[] = [
  { id: "all", label: "Tất cả" },
  { id: "image", label: "Ảnh" },
  { id: "video", label: "Video", disabled: true, badge: "Soon" },
  { id: "audio", label: "Audio", disabled: true, badge: "Soon" },
  { id: "supercomputer", label: "Supercomputer", disabled: true, badge: "Soon" },
];

/** Filter the showcase feed by category. */
function filterByTab(items: GalleryItem[], tab: TabId): GalleryItem[] {
  if (tab === "all") return items;
  if (tab === "image") {
    return items.filter(
      (i) => i.category === "Lookbook" || i.category === "Sản phẩm",
    );
  }
  return items;
}

export default function StudioPage() {
  const [activeTab, setActiveTab] = React.useState<TabId>("all");
  const [model, setModel] = React.useState("gpt-image");
  const [ratio, setRatio] = React.useState("1:1");
  const [count, setCount] = React.useState(4);
  const [prompt, setPrompt] = React.useState("");
  const [generating, setGenerating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [hasGenerated, setHasGenerated] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);

  const items = React.useMemo(
    () =>
      activeTab === "all"
        ? galleryShowcase
        : filterByTab(galleryAll, activeTab),
    [activeTab],
  );

  // Mock progress for generating state
  React.useEffect(() => {
    if (!generating) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setHasGenerated(true);
          setToast(`Đã tạo xong ${count} ảnh với ${ratio}`);
          return 100;
        }
        return p + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [generating, count, ratio]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      setToast("Viết prompt trước khi tạo nhé");
      return;
    }
    setGenerating(true);
  };

  // Custom middle slot for NavBar: TabFilterRow (compact)
  const tabsMiddle = (
    <div className="hidden md:flex items-center gap-2 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          disabled={t.disabled}
          onClick={() => !t.disabled && setActiveTab(t.id)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition whitespace-nowrap",
            activeTab === t.id
              ? "bg-aurora-violet text-bone-white shadow-[0_0_20px_rgba(124,92,255,0.45)]"
              : "text-bone-white/80 hover:text-bone-white",
            t.disabled && "opacity-40 cursor-not-allowed hover:text-bone-white/80",
          )}
        >
          {t.label}
          {t.badge && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                activeTab === t.id
                  ? "bg-bone-white/20 text-bone-white"
                  : "bg-aurora-soft text-aurora-violet border border-aurora-violet/30",
              )}
            >
              {t.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  // Custom right slot for NavBar
  const rightSlot = (
    <>
      <CreditBadge credits={1247} />
      <Link
        href="/app/account"
        className="rounded-full bg-obsidian border border-mist p-1.5 hover:border-aurora-violet transition"
        aria-label="Tài khoản"
      >
        <span className="block w-7 h-7 rounded-full bg-aurora-violet text-bone-white text-xs font-bold flex items-center justify-center">
          ML
        </span>
      </Link>
    </>
  );

  return (
    <div className="h-screen flex flex-col bg-midnight relative overflow-hidden">
      <BackgroundDecor />

      <div className="relative z-10 flex flex-col h-full">
        {/* TOP HEADER — NavBar với breadcrumbs + tabs + credits */}
        <NavBar
          variant="app"
          breadcrumbs="Studio"
          middle={tabsMiddle}
          right={rightSlot}
        />

        {/* SCROLL CONTENT — full-bleed gallery feed */}
        <main className="flex-1 overflow-y-auto pb-44">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-8">
            {/* Section title nhỏ + filter indicator */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-display text-[28px] font-extrabold text-bone-white tracking-[-0.02em]">
                  {activeTab === "all" ? "Khám phá" : "Ảnh"}
                </h1>
                <p className="text-sm text-ash-text mt-1">
                  {items.length} ảnh · Tạo bởi cộng đồng Glowstudio
                </p>
              </div>

              {/* Quick filter chips */}
              <div className="hidden md:flex items-center gap-2">
                {["Trending", "Mới nhất", "Lookbook", "Sản phẩm", "Social"].map(
                  (f) => (
                    <button
                      key={f}
                      type="button"
                      className="rounded-full px-3.5 py-1.5 text-xs font-medium text-ash-text border border-mist/20 hover:border-aurora-violet hover:text-bone-white transition"
                    >
                      {f}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Gallery feed */}
            {items.length > 0 ? (
              <ImageGalleryGrid
                items={items}
                columns={5}
                className="animate-fade-up"
              />
            ) : (
              <EmptyState
                title="Chưa có ảnh nào"
                description="Hãy thử chuyển tab khác hoặc tạo ảnh mới ở thanh dưới."
                icon={<ImageLucideIcon className="w-16 h-16" />}
              />
            )}
          </div>
        </main>

        {/* BOTTOM DOCK — floating prompt + controls */}
        <BottomDock
          prompt={prompt}
          setPrompt={setPrompt}
          model={model}
          setModel={setModel}
          ratio={ratio}
          setRatio={setRatio}
          count={count}
          setCount={setCount}
          generating={generating}
          progress={progress}
          onGenerate={handleGenerate}
          hasGenerated={hasGenerated}
        />

        {/* Toast feedback */}
        {toast && (
          <ToastNotification
            title={toast}
            variant="success"
            duration={3500}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}

/* ============================================================
   BOTTOM DOCK — floating prompt + inline controls
   ============================================================ */

interface BottomDockProps {
  prompt: string;
  setPrompt: (v: string) => void;
  model: string;
  setModel: (v: string) => void;
  ratio: string;
  setRatio: (v: string) => void;
  count: number;
  setCount: (n: number) => void;
  generating: boolean;
  progress: number;
  onGenerate: () => void;
  hasGenerated: boolean;
}

function BottomDock({
  prompt,
  setPrompt,
  model,
  setModel,
  ratio,
  setRatio,
  count,
  setCount,
  generating,
  progress,
  onGenerate,
  hasGenerated,
}: BottomDockProps) {
  return (
    <div className="absolute bottom-4 left-0 right-0 z-40 pointer-events-none px-4 animate-fade-up">
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <div className="relative">
          {/* Glow under dock */}
          <div
            aria-hidden
            className="absolute -inset-2 bg-aurora-violet/25 blur-2xl rounded-3xl pointer-events-none"
          />
          <div className="relative rounded-[20px] surface-aurora shadow-[0_20px_60px_-15px_rgba(124,92,255,0.5),0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Prompt row */}
            <div className="flex items-start gap-3 p-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Mô tả ảnh bạn muốn tạo... ví dụ: 'Lookbook áo dài minimalist, ánh sáng studio mềm'"
                rows={1}
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = Math.min(el.scrollHeight, 120) + "px";
                }}
                className="flex-1 bg-transparent text-bone-white text-sm placeholder:text-charcoal-mute outline-none resize-none leading-relaxed py-2"
              />
              <button
                type="button"
                title="Ảnh tham chiếu"
                className="flex-shrink-0 rounded-full border border-mist/30 p-2 text-ash-text hover:border-aurora-violet hover:text-aurora-violet transition"
              >
                <ImageLucideIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Controls row OR progress */}
            {generating ? (
              <div className="px-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-obsidian overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-aurora-violet via-plasma-pink to-arc-blue transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-aurora-violet tabular-nums min-w-[3rem] text-right">
                    {progress}%
                  </span>
                  <ButtonGhost size="sm">Hủy</ButtonGhost>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 pb-3 flex-wrap">
                {/* Model */}
                <ModelSelector value={model} onChange={setModel} />

                {/* Aspect ratio */}
                <AspectRatioSelector value={ratio} onChange={setRatio} />

                {/* Count stepper */}
                <div className="inline-flex items-center gap-1 rounded-full border border-mist bg-obsidian px-1.5 py-1">
                  <button
                    type="button"
                    onClick={() => setCount(Math.max(1, count - 1))}
                    disabled={count <= 1}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-ash-text hover:text-bone-white hover:bg-mist/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Giảm"
                  >
                    <ChevronDownIcon className="w-3.5 h-3.5 rotate-90" />
                  </button>
                  <span className="text-sm font-medium text-bone-white min-w-[1.5rem] text-center tabular-nums">
                    {count}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCount(Math.min(8, count + 1))}
                    disabled={count >= 8}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-ash-text hover:text-bone-white hover:bg-mist/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Tăng"
                  >
                    <ChevronDownIcon className="w-3.5 h-3.5 -rotate-90" />
                  </button>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Generate CTA */}
                <GenerateButton
                  cost={count * 8}
                  loading={generating}
                  onClick={onGenerate}
                >
                  {hasGenerated ? "Tạo lại" : "Tạo ảnh"}
                </GenerateButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BACKGROUND DECOR — aurora mesh + orbs (lighter than landing)
   ============================================================ */

function BackgroundDecor() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-aurora-page animate-aurora-mesh"
        style={{ backgroundSize: "120% 120%" }}
      />
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-aurora-violet/20 blur-[140px] animate-float" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-neon-magenta/15 blur-[140px] animate-float-reverse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyber-cyan/10 blur-[120px] animate-glow-pulse" />
      <div className="absolute inset-0 bg-noise opacity-50" />

      {/* Vignette top + bottom — focus on gallery */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(5,2,22,0.7), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(5,2,22,0.8), transparent)",
        }}
      />
    </div>
  );
}
