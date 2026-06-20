"use client";

import { Sparkles, Shuffle, Wand2 } from "lucide-react";
import { surpriseMe } from "@/lib/prompts";
import { toast } from "@/hooks/use-toast";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  busy: boolean;
};

export function PromptBar({ value, onChange, onSubmit, busy }: Props) {
  function handleSurprise() {
    onChange(surpriseMe(value));
    toast({ type: "info", message: "Đã random một prompt mới" });
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 pl-4">
      <Wand2 className="h-4 w-4 text-[#7c5cff]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
        placeholder="Mô tả ảnh bạn muốn tạo…"
        className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
      />
      <button
        onClick={handleSurprise}
        className="inline-flex h-8 items-center gap-1 rounded-full px-3 text-xs text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        type="button"
        title="Random prompt"
      >
        <Shuffle className="h-3 w-3" /> Surprise
      </button>
      <button
        onClick={onSubmit}
        disabled={busy}
        className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        type="button"
      >
        {busy ? (
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
  );
}
