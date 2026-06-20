"use client";

import { AdminRouteGuard } from "./admin-route-guard";
import { AdminSidebar } from "./admin-sidebar";
import { usePathname } from "next/navigation";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isLogin = pathname === "/admin/login";

  // Login page render full-bleed (no sidebar)
  if (isLogin) {
    return <AdminRouteGuard>{children}</AdminRouteGuard>;
  }

  return (
    <AdminRouteGuard>
      <div className="min-h-screen bg-[#0a0a0b] text-white">
        <AdminSidebar />
        <div className="lg:pl-64">
          <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
