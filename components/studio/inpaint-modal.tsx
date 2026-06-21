"use client";

import { useEffect, useRef, useState } from "react";
import { Brush, Eraser, Undo2, Check } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onApply: (maskDataURL: string) => void;
};

type Stroke = {
  x: number;
  y: number;
  size: number;
  erase: boolean;
};

export function InpaintModal({ open, onOpenChange, imageSrc, onApply }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [brushSize, setBrushSize] = useState(28);
  const [erase, setErase] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[][]>([]); // history: array of strokes
  const drawingRef = useRef<{ current: Stroke[] } | null>(null);
  const [tick, setTick] = useState(0); // re-render trigger

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setStrokes([]);
      setImgLoaded(false);
      drawingRef.current = null;
      // Preload the image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        imgRef.current = img;
        setImgLoaded(true);
      };
      img.src = imageSrc;
    }
  }, [open, imageSrc]);

  // Setup canvas DPR + size when image loads
  useEffect(() => {
    if (!imgLoaded) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !imgRef.current) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const displayW = Math.max(1, Math.floor(rect.width));
    const displayH = Math.max(1, Math.floor(rect.height));
    canvas.width = displayW * dpr;
    canvas.height = displayH * dpr;
    canvas.style.width = `${displayW}px`;
    canvas.style.height = `${displayH}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
  }, [imgLoaded, tick]);

  // Redraw canvas on state change
  useEffect(() => {
    if (!imgLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const stroke of strokes) {
      if (stroke.length === 0) continue;
      const first = stroke[0];
      ctx.beginPath();
      ctx.globalCompositeOperation = first.erase ? "destination-out" : "source-over";
      ctx.strokeStyle = first.erase ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.55)";
      ctx.lineWidth = first.size;
      ctx.moveTo(first.x, first.y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  }, [strokes, imgLoaded]);

  function getPos(e: React.PointerEvent<HTMLCanvasElement>): { x: number; y: number } {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const { x, y } = getPos(e);
    const start: Stroke = { x, y, size: brushSize, erase };
    drawingRef.current = { current: [start] };
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const { x, y } = getPos(e);
    const last = drawingRef.current.current[drawingRef.current.current.length - 1];
    // Skip if no movement
    if (last && Math.abs(last.x - x) < 1 && Math.abs(last.y - y) < 1) return;
    drawingRef.current.current.push({ x, y, size: brushSize, erase });
    setTick((t) => t + 1);
  }

  function onPointerUp() {
    if (!drawingRef.current) return;
    setStrokes((prev) => [...prev, drawingRef.current!.current]);
    drawingRef.current = null;
  }

  function undo() {
    setStrokes((prev) => prev.slice(0, -1));
  }

  function clearAll() {
    setStrokes([]);
  }

  function apply() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (strokes.length === 0) {
      toast({ type: "info", message: "Vẽ vùng cần inpaint trước khi áp dụng" });
      return;
    }
    try {
      const dataURL = canvas.toDataURL("image/png");
      onApply(dataURL);
      toast({ type: "success", message: "Đã lưu ảnh inpaint vào Library" });
      onOpenChange(false);
    } catch {
      toast({ type: "error", message: "Không thể xuất mask" });
    }
  }

  const hasStrokes = strokes.length > 0;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Inpaint"
      description="Vẽ vùng bạn muốn AI chỉnh sửa lại. (Mockup — ảnh kết quả sẽ lưu vào Library.)"
    >
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-0.5">
            <button
              onClick={() => setErase(false)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] transition-colors",
                !erase ? "bg-white text-black" : "text-white/60 hover:text-white"
              )}
              type="button"
            >
              <Brush className="h-3 w-3" /> Vẽ
            </button>
            <button
              onClick={() => setErase(true)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] transition-colors",
                erase ? "bg-white text-black" : "text-white/60 hover:text-white"
              )}
              type="button"
            >
              <Eraser className="h-3 w-3" /> Xóa
            </button>
          </div>
          <div className="flex flex-1 items-center gap-2">
            <span className="text-[10px] text-white/40">Cỡ</span>
            <input
              type="range"
              min={8}
              max={80}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="h-1 flex-1 accent-white"
            />
            <span className="w-6 text-right text-[10px] text-white/60 tabular-nums">{brushSize}</span>
          </div>
          <button
            onClick={undo}
            disabled={!hasStrokes}
            type="button"
            className="inline-flex h-7 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 text-[11px] hover:bg-white/[0.08] disabled:opacity-40"
          >
            <Undo2 className="h-3 w-3" /> Undo
          </button>
          <button
            onClick={clearAll}
            disabled={!hasStrokes}
            type="button"
            className="inline-flex h-7 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 text-[11px] hover:bg-white/[0.08] disabled:opacity-40"
          >
            Xóa hết
          </button>
        </div>

        {/* Canvas + image */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden rounded-[8.4px] border border-white/10 bg-black"
          style={{ aspectRatio: "1 / 1" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt="Inpaint target"
            className="absolute inset-0 h-full w-full object-contain"
            crossOrigin="anonymous"
          />
          <canvas
            ref={canvasRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="absolute inset-0 touch-none"
            style={{ cursor: erase ? "cell" : "crosshair" }}
          />
        </div>

        {/* Apply */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onOpenChange(false)}
            type="button"
            className="h-9 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm hover:bg-white/[0.08]"
          >
            Huỷ
          </button>
          <button
            onClick={apply}
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-black hover:opacity-90"
          >
            <Check className="h-3.5 w-3.5" /> Áp dụng
          </button>
        </div>
      </div>
    </Modal>
  );
}
