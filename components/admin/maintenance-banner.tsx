"use client";

import { AlertTriangle } from "lucide-react";

export function MaintenanceBanner() {
  return (
    <div className="flex items-start gap-3 rounded-md border border-[#ffc533]/30 bg-[#ffc533]/10 px-4 py-3">
      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ffc533]" />
      <div className="text-[12px] text-[#ffd76b]">
        <strong>Maintenance mode đang BẬT.</strong> Người dùng cuối không thể đăng ký mới. Tắt ở
        <span className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-white/85">Settings → System</span>
        sau khi hoàn tất.
      </div>
    </div>
  );
}
