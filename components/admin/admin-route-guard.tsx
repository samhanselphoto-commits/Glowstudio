"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { ShieldAlert } from "lucide-react";

export type GuardMode = "any" | "moderate" | "super_admin";

export function AdminRouteGuard({
  children,
  require,
}: {
  children: React.ReactNode;
  require?: GuardMode;
}) {
  const router = useRouter();
  const { admin, hydrated, isSuperAdmin, canModerate } = useAdminAuth();

  useEffect(() => {
    if (!hydrated) return;
    if (!admin) {
      router.replace("/admin/login");
    }
  }, [hydrated, admin, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm text-white/40">Đang tải…</div>
      </div>
    );
  }

  if (!admin) return null;

  if (require === "super_admin" && !isSuperAdmin) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <ShieldAlert className="h-10 w-10 text-[#ff5d4b]" />
        <h2 className="text-lg font-semibold text-white">Không có quyền truy cập</h2>
        <p className="max-w-sm text-sm text-white/55">
          Trang này chỉ dành cho Super Admin. Tài khoản của bạn không đủ quyền.
        </p>
      </div>
    );
  }

  if (require === "moderate" && !canModerate) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <ShieldAlert className="h-10 w-10 text-[#ffc533]" />
        <h2 className="text-lg font-semibold text-white">Không có quyền</h2>
        <p className="max-w-sm text-sm text-white/55">
          Tài khoản của bạn không đủ quyền để thao tác trên trang này.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
