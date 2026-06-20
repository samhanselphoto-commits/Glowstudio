"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
};

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between gap-2 text-[12px] text-white/55">
      <span>
        Trang <span className="text-white">{page}</span> / {totalPages}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className={cn(
            "rounded-md border border-white/10 bg-white/[0.03] p-1.5 transition-colors",
            page === 1 ? "cursor-not-allowed opacity-30" : "hover:bg-white/[0.06]"
          )}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className={cn(
            "rounded-md border border-white/10 bg-white/[0.03] p-1.5 transition-colors",
            page === totalPages ? "cursor-not-allowed opacity-30" : "hover:bg-white/[0.06]"
          )}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
