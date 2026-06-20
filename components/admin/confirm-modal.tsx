"use client";

import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/cn";

type Variant = "danger" | "warning" | "info";

const VARIANT: Record<Variant, { btn: string; title: string }> = {
  danger: { btn: "bg-[#ff5d4b] hover:bg-[#ff6e5e] text-white", title: "Xác nhận" },
  warning: { btn: "bg-[#ffc533] hover:bg-[#ffd040] text-[#0a0a0a]", title: "Xác nhận" },
  info: { btn: "bg-[#7c5cff] hover:bg-[#8a6dff] text-white", title: "Xác nhận" },
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: Variant;
  onConfirm: () => void;
  loading?: boolean;
};

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  variant = "info",
  onConfirm,
  loading,
}: Props) {
  const v = VARIANT[variant];
  return (
    <Modal open={open} onOpenChange={onOpenChange} title={title}>
      {description && (
        <div className="mb-5 text-sm text-white/60">{description}</div>
      )}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] text-white/75 transition-colors hover:bg-white/[0.08]"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={cn(
            "rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors disabled:opacity-50",
            v.btn
          )}
        >
          {loading ? "Đang xử lý…" : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
