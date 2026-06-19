"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { ButtonGhost, ButtonPrimary } from "./index";
import { formatVND } from "@/lib/format";
import { topupPacks } from "@/lib/mock-data";

/**
 * §6.19 — Buy Credits Modal.
 * Centered 480px, charcoal surface, 20px radius, 3 top-up cards bên trong.
 * Radix Dialog primitive.
 */
export interface BuyCreditsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BuyCreditsModal({ open, onOpenChange }: BuyCreditsModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50",
            "bg-midnight/80",
            "backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50",
            "-translate-x-1/2 -translate-y-1/2",
            "w-full max-w-[480px]",
            "rounded-[20px]",
            "bg-charcoal",
            "border border-mist/10",
            "shadow-[0_0_0_1px_rgba(229,229,229,0.1),0_40px_80px_rgba(0,0,0,0.7)]",
            "p-8",
            "focus:outline-none",
          )}
        >
          <Dialog.Title
            className={cn(
              "font-display",
              "text-[34px] leading-[0.92] tracking-[-0.02em]",
              "font-extrabold text-bone-white",
            )}
          >
            Cần thêm credits?
          </Dialog.Title>
          <Dialog.Description className="text-sm text-ash-text mt-3">
            Mua thêm credits để tiếp tục tạo ảnh. Hạn sử dụng 12 tháng.
          </Dialog.Description>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {topupPacks.map((pack) => (
              <div
                key={pack.id}
                className={cn(
                  "rounded-[8.4px]",
                  "border border-mist/20",
                  "bg-obsidian",
                  "p-5",
                  "text-center",
                  "cursor-pointer",
                  "hover:border-aurora-violet",
                  "transition",
                )}
              >
                <p
                  className={cn(
                    "font-display text-[44px] leading-[0.9] font-extrabold text-aurora-violet",
                  )}
                >
                  {pack.credits}
                </p>
                <p className="text-xs text-ash-text mt-1">credits</p>
                <p className="text-base font-medium text-bone-white mt-3">
                  {formatVND(pack.price)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <ButtonGhost
              size="lg"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </ButtonGhost>
            <ButtonPrimary size="lg" className="flex-1">
              Thanh toán
            </ButtonPrimary>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
