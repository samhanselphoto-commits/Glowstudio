"use client";

import { useRef, useState } from "react";
import { Upload, X, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/cn";

type Props = {
  value: string[]; // dataURLs
  onChange: (next: string[]) => void;
  max?: number;
};

export function ReferenceUploader({ value, onChange, max = 4 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  async function handleFiles(files: FileList | File[]) {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (arr.length === 0) return;
    const room = Math.max(0, max - value.length);
    if (room === 0) {
      toast({ type: "error", message: `Đã đạt tối đa ${max} ảnh tham chiếu` });
      return;
    }
    const accepted = arr.slice(0, room);
    try {
      const dataURLs = await Promise.all(accepted.map((f) => readFile(f)));
      onChange([...value, ...dataURLs]);
      toast({ type: "success", message: `Đã thêm ${dataURLs.length} ảnh tham chiếu` });
    } catch {
      toast({ type: "error", message: "Không đọc được file" });
    }
  }

  function removeAt(i: number) {
    const next = value.slice();
    next.splice(i, 1);
    onChange(next);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-dashed bg-white/[0.02] px-3 py-2.5 text-sm transition-colors",
          dragOver ? "border-white/60 bg-white/[0.08]" : "border-white/10 text-white/70 hover:border-white/30"
        )}
      >
        <span className="flex items-center gap-2">
          {value.length === 0 ? <Upload className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          {value.length === 0
            ? "Upload ảnh tham chiếu"
            : `Thêm ảnh (${value.length}/${max})`}
        </span>
        <span className="text-[10px] text-white/40">PNG, JPG, WEBP</span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = ""; // allow re-selecting same file
        }}
      />

      {value.length > 0 && (
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {value.map((src, i) => (
            <div key={i} className="group/thumb relative aspect-square overflow-hidden rounded-md border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`ref ${i + 1}`} className="h-full w-full object-cover" />
              <button
                onClick={() => removeAt(i)}
                type="button"
                className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover/thumb:opacity-100"
                aria-label="Xóa"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
