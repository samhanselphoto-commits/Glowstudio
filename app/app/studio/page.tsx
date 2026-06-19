"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PromptInput,
  GenerateButton,
  ModelSelector,
  AspectRatioSelector,
  CreditBadge,
  ButtonGhost,
} from "@/components/ui";
import { STUDIO_TOOLS, ASPECT_RATIOS } from "@/lib/constants";
import {
  DownloadIcon,
  RefreshIcon,
  SparkleIcon,
  ImageLucideIcon,
  CheckIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Tool = {
  id: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

const TOOLS: Tool[] = [
  { id: "create", label: "Tạo ảnh", icon: SparkleIcon, active: true },
  { id: "style-ref", label: "Style ref", icon: ImageLucideIcon },
  { id: "inpaint", label: "Inpaint", icon: ImageLucideIcon },
  { id: "upscale", label: "Upscale", icon: ImageLucideIcon },
  { id: "batch", label: "Batch", icon: ImageLucideIcon },
];

const RIGHT_TABS = ["Parameters", "History", "Prompt"] as const;
type RightTab = (typeof RIGHT_TABS)[number];

const REFERENCE_IMAGES = [
  "https://picsum.photos/seed/ref-1/200/200",
  "https://picsum.photos/seed/ref-2/200/200",
  "https://picsum.photos/seed/ref-3/200/200",
];

const MOCK_RESULTS = [
  { id: "r1", url: "https://picsum.photos/seed/result-1/600/600" },
  { id: "r2", url: "https://picsum.photos/seed/result-2/600/600" },
  { id: "r3", url: "https://picsum.photos/seed/result-3/600/600" },
  { id: "r4", url: "https://picsum.photos/seed/result-4/600/600" },
];

export default function StudioPage() {
  const [model, setModel] = React.useState("gpt-image");
  const [ratio, setRatio] = React.useState<string>("1:1");
  const [activeTool, setActiveTool] = React.useState("create");
  const [activeRight, setActiveRight] = React.useState<RightTab>("Parameters");
  const [generating, setGenerating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [results, setResults] = React.useState(MOCK_RESULTS);
  const [hasGenerated, setHasGenerated] = React.useState(false);

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
          return 100;
        }
        return p + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [generating]);

  return (
    <div className="h-screen flex flex-col bg-midnight">
      {/* Top bar */}
      <header className="h-16 border-b border-mist/10 flex items-center justify-between px-6 bg-obsidian">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-base text-bone-white">
            GLOWSTUDIO
          </Link>
          <span className="text-charcoal-mute">/</span>
          <span className="text-sm text-ash-text">Studio</span>
        </div>
        <div className="flex items-center gap-3">
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
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT RAIL — Tools */}
        <aside className="w-[280px] border-r border-mist/10 p-5 flex flex-col gap-2 overflow-y-auto">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.id === activeTool;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  "rounded-full px-5 py-3",
                  "text-sm font-medium",
                  "flex items-center gap-3",
                  "transition text-left",
                  isActive
                    ? "bg-aurora-soft text-aurora-violet border border-aurora-violet"
                    : "text-ash-text hover:text-bone-white hover:bg-obsidian border border-transparent",
                )}
              >
                <Icon className="w-4 h-4" />
                {tool.label}
              </button>
            );
          })}

          <div className="border-t border-mist/10 my-4" />

          <h4 className="text-xs font-bold text-charcoal-mute uppercase tracking-wider px-5 mb-2">
            Tham chiếu
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {REFERENCE_IMAGES.map((url, i) => (
              <div
                key={i}
                className="relative rounded-[8.4px] overflow-hidden border border-mist/10 aspect-square"
              >
                <Image
                  src={url}
                  alt={`Tham chiếu ${i + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER — Canvas */}
        <main className="flex-1 flex flex-col p-7 overflow-y-auto">
          {/* Prompt area */}
          <div className="rounded-[20px] bg-charcoal border border-mist/10 p-7">
            <PromptInput />

            <div className="flex items-center justify-between mt-5 flex-wrap gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <ModelSelector value={model} onChange={setModel} />
                <AspectRatioSelector value={ratio} onChange={setRatio} />
              </div>
              <GenerateButton
                cost={8}
                loading={generating}
                onClick={() => setGenerating(true)}
              >
                Tạo ảnh
              </GenerateButton>
            </div>
          </div>

          {/* Result canvas */}
          <div className="mt-5 flex-1 rounded-[20px] bg-charcoal border border-mist/10 p-7 min-h-[400px]">
            {generating ? (
              <GeneratingState progress={progress} />
            ) : hasGenerated ? (
              <ResultGrid results={results} />
            ) : (
              <EmptyCanvas />
            )}
          </div>
        </main>

        {/* RIGHT RAIL — Inspector */}
        <aside className="w-[320px] border-l border-mist/10 flex flex-col">
          <div className="flex border-b border-mist/10">
            {RIGHT_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveRight(tab)}
                className={cn(
                  "flex-1 px-5 py-4 text-sm font-medium border-b-2 transition",
                  activeRight === tab
                    ? "text-bone-white border-aurora-violet"
                    : "text-ash-text border-transparent hover:text-bone-white",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 p-5 overflow-y-auto">
            {activeRight === "Parameters" && <ParametersPanel />}
            {activeRight === "History" && <HistoryPanel />}
            {activeRight === "Prompt" && <PromptDetailPanel />}
          </div>
        </aside>
      </div>
    </div>
  );
}

function GeneratingState({ progress }: { progress: number }) {
  return (
    <div className="h-full flex flex-col items-center justify-center min-h-[360px]">
      <div className="relative w-full max-w-md aspect-square rounded-[8.4px] overflow-hidden bg-obsidian">
        <Image
          src="https://picsum.photos/seed/streaming/600/600"
          alt=""
          fill
          sizes="(max-width: 768px) 80vw, 448px"
          className="object-cover blur-md opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-aurora-violet border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-ash-text mt-4">
              Đang tạo ảnh... {progress}%
            </p>
          </div>
        </div>
      </div>
      <ButtonGhost size="default" className="mt-6">
        Hủy
      </ButtonGhost>
    </div>
  );
}

function ResultGrid({ results }: { results: { id: string; url: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3.5 h-full">
      {results.map((r) => (
        <div
          key={r.id}
          className="relative group rounded-[8.4px] overflow-hidden border border-mist/10 aspect-square"
        >
          <Image
            src={r.url}
            alt=""
            fill
            sizes="(max-width: 1024px) 40vw, 30vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-midnight/40 opacity-0 group-hover:opacity-100 transition flex items-end p-3">
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full bg-obsidian/80 backdrop-blur-sm p-2 hover:bg-aurora-violet transition"
                aria-label="Tải ảnh"
              >
                <DownloadIcon className="w-4 h-4 text-bone-white" />
              </button>
              <button
                type="button"
                className="rounded-full bg-obsidian/80 backdrop-blur-sm p-2 hover:bg-aurora-violet transition"
                aria-label="Tạo lại"
              >
                <RefreshIcon className="w-4 h-4 text-bone-white" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyCanvas() {
  return (
    <div className="h-full flex flex-col items-center justify-center min-h-[360px] text-center">
      <SparkleIcon className="w-12 h-12 text-aurora-violet mb-5" />
      <h3 className="text-[19px] font-medium text-bone-white">
        Sẵn sàng tạo ảnh
      </h3>
      <p className="text-sm text-ash-text mt-2 max-w-sm">
        Viết prompt, chọn model và aspect ratio, rồi bấm Tạo ảnh. Mỗi lượt tốn từ 2
        đến 8 credits tùy model.
      </p>
    </div>
  );
}

function ParametersPanel() {
  const params = [
    { label: "Model", value: "GPT Image" },
    { label: "Aspect ratio", value: "1:1" },
    { label: "Style strength", value: "0.7" },
    { label: "Seed", value: "—" },
    { label: "Steps", value: "30" },
    { label: "Guidance scale", value: "7.5" },
  ];
  return (
    <div className="flex flex-col gap-2.5">
      {params.map((p) => (
        <div
          key={p.label}
          className="flex items-center justify-between text-sm"
        >
          <span className="text-ash-text">{p.label}</span>
          <span className="text-bone-white font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

function HistoryPanel() {
  const history = [
    { time: "Vừa xong", prompt: "Lookbook áo dài minimalist...", status: "done" },
    { time: "5 phút trước", prompt: "Sản phẩm túi tote canvas...", status: "done" },
    { time: "1 giờ trước", prompt: "Social post quán cà phê...", status: "done" },
  ];
  return (
    <ul className="flex flex-col gap-2.5">
      {history.map((h, i) => (
        <li
          key={i}
          className="rounded-[8.4px] border border-mist/10 bg-obsidian p-3"
        >
          <div className="flex items-center justify-between text-xs text-charcoal-mute">
            <span>{h.time}</span>
            <span className="flex items-center gap-1 text-toxic-lime">
              <CheckIcon className="w-3 h-3" /> done
            </span>
          </div>
          <p className="text-sm text-bone-white mt-1 line-clamp-1">{h.prompt}</p>
        </li>
      ))}
    </ul>
  );
}

function PromptDetailPanel() {
  return (
    <div className="text-sm text-ash-text">
      <p className="text-bone-white font-medium mb-2">Prompt</p>
      <p className="leading-relaxed">
        Lookbook áo dài minimalist, nữ designer 25 tuổi, ánh sáng studio mềm, nền
        be trung tính, cận mặt, tông màu đất, cinematic, 85mm.
      </p>
      <p className="text-bone-white font-medium mt-5 mb-2">Negative prompt</p>
      <p>blurry, low quality, watermark, text, deformed</p>
    </div>
  );
}
