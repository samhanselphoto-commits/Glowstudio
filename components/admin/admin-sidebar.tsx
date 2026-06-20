"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  Users,
  Coins,
  FileImage,
  Settings,
  ScrollText,
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { NavLink } from "./nav-link";

const ROLE_LABEL: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  moderator: "Moderator",
};

const ROLE_COLOR: Record<string, string> = {
  super_admin: "bg-[#ffc533]/15 text-[#ffd76b] border-[#ffc533]/30",
  admin: "bg-[#7c5cff]/15 text-[#a98bff] border-[#7c5cff]/30",
  moderator: "bg-[#33d0ff]/15 text-[#7adfff] border-[#33d0ff]/30",
};

export function AdminSidebar() {
  const router = useRouter();
  const { admin, logout, isSuperAdmin } = useAdminAuth();

  if (!admin) return null;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-white/10 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff] shadow-[0_0_24px_rgba(124,92,255,0.55)]">
          <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-semibold tracking-tight">Glowstudio</div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-white/40">
            Admin Console
          </div>
        </div>
        <Shield className="h-4 w-4 text-[#7c5cff]" />
      </div>

      {/* Admin info card */}
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7c5cff] to-[#d25fff] text-sm font-bold text-white">
            {admin.name.split(" ").slice(-1)[0]?.[0] ?? "A"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-white">{admin.name}</div>
            <div className="truncate text-[11px] text-white/45">{admin.email}</div>
          </div>
        </div>
        <div className="mt-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              ROLE_COLOR[admin.role] ?? "bg-white/[0.06] text-white/70 border-white/10"
            }`}
          >
            {ROLE_LABEL[admin.role] ?? admin.role}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-4 overflow-y-auto p-3">
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/30">
            Tổng quan
          </div>
          <div className="space-y-0.5">
            <NavLink href="/admin" label="Dashboard" icon={LayoutDashboard} />
          </div>
        </div>
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/30">
            Quản lý
          </div>
          <div className="space-y-0.5">
            <NavLink href="/admin/users" label="Users" icon={Users} />
            <NavLink href="/admin/credits" label="Credits" icon={Coins} />
            <NavLink href="/admin/content" label="Content" icon={FileImage} />
          </div>
        </div>
        {isSuperAdmin && (
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/30">
              Hệ thống
            </div>
            <div className="space-y-0.5">
              <NavLink href="/admin/settings" label="Settings" icon={Settings} />
              <NavLink href="/admin/audit" label="Audit log" icon={ScrollText} />
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-[12px] text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white"
        >
          <ChevronRight className="h-3.5 w-3.5 rotate-180" />
          Về trang chính
        </Link>
        <button
          onClick={() => {
            logout();
            router.push("/admin/login");
          }}
          className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-[12px] text-white/55 transition-colors hover:bg-[#ff5d4b]/10 hover:text-[#ff9a8a]"
        >
          <LogOut className="h-3.5 w-3.5" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
