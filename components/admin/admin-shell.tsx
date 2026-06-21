"use client";

import { AdminRouteGuard } from "./admin-route-guard";
import { AdminSidebar } from "./admin-sidebar";

/**
 * Layout shell cho /admin/*. Tự wrap children trong AdminRouteGuard + sidebar.
 * Trang /admin/login sẽ tự kiểm tra admin ở page-level và redirect, không cần guard.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
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
