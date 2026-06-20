"use client";

import { useMemo } from "react";
import { Users, UserCheck, Image as ImageIcon, Coins, UserPlus, Activity, Sparkles, ScrollText } from "lucide-react";
import Link from "next/link";
import { StatCard } from "@/components/admin/stat-card";
import { ChartBar } from "@/components/admin/chart-bar";
import { TopModelsList } from "@/components/admin/top-models-list";
import { ActivityFeed, type FeedItem } from "@/components/admin/activity-feed";
import { MaintenanceBanner } from "@/components/admin/maintenance-banner";
import { useAdminAnalytics } from "@/hooks/use-admin-analytics";
import { useAdminSettings } from "@/hooks/use-admin-settings";
import { formatRelative } from "@/lib/format";
import { useAdminAudit } from "@/hooks/use-admin-audit";

export default function AdminDashboardPage() {
  const a = useAdminAnalytics();
  const { settings } = useAdminSettings();
  const { actions } = useAdminAudit();

  const auditFeed: FeedItem[] = useMemo(
    () =>
      actions.slice(0, 8).map((act) => ({
        id: act.id,
        icon: act.type.startsWith("user")
          ? Users
          : act.type.startsWith("credit")
          ? Coins
          : act.type.startsWith("content")
          ? ImageIcon
          : act.type === "auth.login"
          ? UserCheck
          : ScrollText,
        title: `${act.adminName} — ${prettyType(act.type)}`,
        meta: act.details,
        time: act.createdAt,
      })),
    [actions]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
          Dashboard
        </p>
        <h1 className="mt-1 text-[28px] font-bold leading-tight text-white">
          Tổng quan hệ thống
        </h1>
        <p className="mt-1 text-sm text-white/55">
          Số liệu thời gian thực về users, credit, generation và content.
        </p>
      </div>

      {settings?.maintenanceMode && <MaintenanceBanner />}

      {/* 4 Stat cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Tổng users"
          value={a.totalUsers}
          icon={Users}
          iconColor="text-[#a98bff]"
          iconBg="bg-[#7c5cff]/10"
          hint={`${a.activeUsers} active · ${a.bannedUsers} banned`}
        />
        <StatCard
          label="Active users"
          value={a.activeUsers}
          icon={UserCheck}
          iconColor="text-[#7af1a5]"
          iconBg="bg-[#03e65b]/10"
          hint={`${a.suspendedUsers} đang suspended`}
        />
        <StatCard
          label="Generations · 7d"
          value={a.generationsLast7d}
          icon={ImageIcon}
          iconColor="text-[#7adfff]"
          iconBg="bg-[#33d0ff]/10"
          hint={`${a.totalGenerations} toàn thời gian`}
          trend={a.generationsByDay}
        />
        <StatCard
          label="Credit đã tiêu · 7d"
          value={a.creditSpentLast7d.toLocaleString("vi-VN")}
          icon={Coins}
          iconColor="text-[#ffd76b]"
          iconBg="bg-[#ffc533]/10"
          hint={`${a.creditSpentLast30d.toLocaleString("vi-VN")} trong 30d`}
        />
      </div>

      {/* Chart + Top models */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-white">Generations 14 ngày qua</h2>
              <p className="text-[11px] text-white/40">Số lượt generate / ngày</p>
            </div>
          </div>
          <ChartBar data={a.generationsByDay} labels={a.chartLabels} height={180} />
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-4 text-[14px] font-semibold text-white">Top models</h2>
          <TopModelsList items={a.topModels} total={a.totalGenerations} />
        </div>
      </div>

      {/* Recent signups + Audit feed */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-white">Đăng ký mới</h2>
            <Link href="/admin/users" className="text-[11px] text-[#a98bff] hover:underline">
              Xem tất cả →
            </Link>
          </div>
          <div className="space-y-2">
            {a.recentSignups.length === 0 && (
              <div className="text-[12px] text-white/40">Chưa có user</div>
            )}
            {a.recentSignups.map((u) => (
              <div key={u.id} className="flex items-center gap-3 rounded-md p-2 hover:bg-white/[0.02]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7c5cff] to-[#d25fff] text-[11px] font-bold text-white">
                  {u.name.split(" ").slice(-1)[0]?.[0] ?? "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-medium text-white">{u.name}</div>
                  <div className="truncate text-[11px] text-white/40">{u.email}</div>
                </div>
                <div className="text-[10px] text-white/35">{formatRelative(u.createdAt)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-white">Audit feed</h2>
            <Link href="/admin/audit" className="text-[11px] text-[#a98bff] hover:underline">
              Xem tất cả →
            </Link>
          </div>
          <ActivityFeed items={auditFeed} empty="Chưa có admin action" />
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <QuickLink href="/admin/users" icon={Users} label="Quản lý users" />
        <QuickLink href="/admin/credits" icon={Coins} label="Điều chỉnh credits" />
        <QuickLink href="/admin/content" icon={ImageIcon} label="Duyệt content" />
        <QuickLink href="/admin/audit" icon={Activity} label="Audit log" />
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Users;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3.5 transition-all hover:border-[#7c5cff]/40 hover:bg-white/[0.05]"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#7c5cff]/10 text-[#a98bff]">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-[12px] font-medium text-white/85 group-hover:text-white">
        {label}
      </span>
    </Link>
  );
}

function prettyType(t: string): string {
  const map: Record<string, string> = {
    "user.create": "tạo user",
    "user.update": "cập nhật user",
    "user.delete": "xóa user",
    "user.ban": "ban user",
    "user.unban": "unban user",
    "user.suspend": "suspend user",
    "user.reactivate": "reactivate user",
    "user.status.change": "đổi trạng thái",
    "credit.topup": "top-up credit",
    "credit.adjust": "điều chỉnh credit",
    "credit.bulk_bonus": "bulk bonus",
    "content.hide": "ẩn content",
    "content.unhide": "hiện content",
    "content.delete": "xóa content",
    "settings.update": "cập nhật settings",
    "auth.login": "đăng nhập",
    "auth.logout": "đăng xuất",
  };
  return map[t] ?? t;
}

void Sparkles;
void UserPlus;
