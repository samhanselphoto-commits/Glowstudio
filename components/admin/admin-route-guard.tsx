"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { ShieldAlert } from "lucide-react";

export type GuardMode = "any" | "moderate" | "super_admin";

export function AdminRouteGuard({
  children,
  require,
  allowUnauth = false,
}: {
  children: React.ReactNode;
  require?: GuardMode;
  /** Khi true (vd trang /admin/login), cho phép chưa login xem nội dung. */
  allowUnauth?: boolean;
}) {
  const router = useRouter();
  const { admin, hydrated, isSuperAdmin, canModerate } = useAdminAuth();

  // Redirect sau khi hydrate (tránh flicker SSR)
  useEffect(() => {
    if (!hydrated) return;
    if (allowUnauth) {
      if (admin) router.replace("/admin");
      return;
    }
    if (!admin) router.replace("/admin/login");
  }, [hydrated, admin, router, allowUnauth]);

  // SSR + pre-hydrate: luôn render children để tránh trắng trang / "Đang tải…"
  if (!hydrated) return <>{children}</>;

  // allowUnauth + đã login → page login sẽ redirect, cứ render
  if (allowUnauth) return <>{children}</>;

  // Chưa login + không allowUnauth → render null (useEffect sẽ redirect ngay)
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
