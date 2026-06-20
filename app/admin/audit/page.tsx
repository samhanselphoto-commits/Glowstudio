"use client";

import { useMemo, useState } from "react";
import { ScrollText, Download, Search } from "lucide-react";
import { FilterBar } from "@/components/admin/filter-bar";
import { DateRangePicker, type DateRange, rangeToMs } from "@/components/admin/date-range-picker";
import { EmptyState } from "@/components/admin/empty-state";
import { useAdminAudit } from "@/hooks/use-admin-audit";
import { useAdminUsers } from "@/hooks/use-admin-users";
import { formatDateVN, formatRelative } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { AdminActionType } from "@/lib/types";

const TYPE_LABEL: Record<AdminActionType, string> = {
  "user.create": "Tạo user",
  "user.update": "Sửa user",
  "user.delete": "Xóa user",
  "user.ban": "Ban",
  "user.unban": "Unban",
  "user.suspend": "Suspend",
  "user.reactivate": "Reactivate",
  "user.status.change": "Đổi status",
  "credit.topup": "Top-up",
  "credit.adjust": "Adjust",
  "credit.bulk_bonus": "Bulk bonus",
  "content.hide": "Ẩn",
  "content.unhide": "Hiện",
  "content.delete": "Xóa",
  "settings.update": "Settings",
  "auth.login": "Login",
  "auth.logout": "Logout",
};

const TYPE_COLOR: Record<string, string> = {
  "user.delete": "bg-[#ff5d4b]/15 text-[#ff9a8a] border-[#ff5d4b]/30",
  "content.delete": "bg-[#ff5d4b]/15 text-[#ff9a8a] border-[#ff5d4b]/30",
  "user.ban": "bg-[#ff5d4b]/15 text-[#ff9a8a] border-[#ff5d4b]/30",
  "content.hide": "bg-[#ffc533]/15 text-[#ffd76b] border-[#ffc533]/30",
  "credit.topup": "bg-[#03e65b]/15 text-[#7af1a5] border-[#03e65b]/30",
  "credit.bulk_bonus": "bg-[#03e65b]/15 text-[#7af1a5] border-[#03e65b]/30",
  "settings.update": "bg-[#7c5cff]/15 text-[#a98bff] border-[#7c5cff]/30",
  "auth.login": "bg-[#33d0ff]/15 text-[#7adfff] border-[#33d0ff]/30",
};

const ALL_TYPES = Object.keys(TYPE_LABEL) as AdminActionType[];

export default function AdminAuditPage() {
  const { actions, hydrated, exportJSON } = useAdminAudit();
  const { users } = useAdminUsers();
  const [search, setSearch] = useState("");
  const [adminFilter, setAdminFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [range, setRange] = useState<DateRange>("30d");

  const adminMap = useMemo(() => {
    const m = new Map<string, string>();
    // Admins come from auth but we only have current admin; use unique from actions
    actions.forEach((a) => {
      if (!m.has(a.adminId)) m.set(a.adminId, a.adminName);
    });
    users.forEach((u) => m.set(u.id, u.name));
    return m;
  }, [actions, users]);

  const adminOptions = useMemo(() => {
    const set = new Map<string, string>();
    actions.forEach((a) => set.set(a.adminId, a.adminName));
    return Array.from(set.entries()).map(([value, label]) => ({ value, label }));
  }, [actions]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const since = rangeToMs(range);
    return actions.filter((a) => {
      if (since && a.createdAt < Date.now() - since) return false;
      if (adminFilter && a.adminId !== adminFilter) return false;
      if (typeFilter && a.type !== typeFilter) return false;
      if (q) {
        const inDetails = (a.details ?? "").toLowerCase().includes(q);
        const inTarget = (a.target ?? "").toLowerCase().includes(q);
        const inName = a.adminName.toLowerCase().includes(q);
        if (!inDetails && !inTarget && !inName) return false;
      }
      return true;
    });
  }, [actions, search, adminFilter, typeFilter, range]);

  if (!hydrated) return <div className="py-12 text-center text-sm text-white/40">Đang tải…</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
            Hệ thống
          </p>
          <h1 className="mt-1 text-[26px] font-bold leading-tight text-white">Audit log</h1>
          <p className="mt-1 text-sm text-white/55">
            Mọi admin action đều được ghi log để truy vết.
          </p>
        </div>
        <button
          onClick={exportJSON}
          disabled={filtered.length === 0}
          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 text-[12px] font-semibold text-white/85 transition-colors hover:bg-white/[0.08] disabled:opacity-50"
        >
          <Download className="h-3.5 w-3.5" /> Export JSON ({filtered.length})
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Tìm theo tên admin, target, details…"
          selects={[
            {
              value: adminFilter,
              onChange: setAdminFilter,
              placeholder: "Tất cả admin",
              options: adminOptions,
            },
            {
              value: typeFilter,
              onChange: setTypeFilter,
              placeholder: "Tất cả action",
              options: ALL_TYPES.map((t) => ({ value: t, label: TYPE_LABEL[t] })),
            },
          ]}
          onClear={() => { setSearch(""); setAdminFilter(""); setTypeFilter(""); }}
        />
        <DateRangePicker value={range} onChange={setRange} />
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
        <table className="w-full text-left text-[12px]">
          <thead className="border-b border-white/10 text-[10px] uppercase tracking-wider text-white/40">
            <tr>
              <th className="px-3 py-2.5">Thời gian</th>
              <th className="px-3 py-2.5">Admin</th>
              <th className="px-3 py-2.5">Action</th>
              <th className="px-3 py-2.5">Target</th>
              <th className="px-3 py-2.5">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6">
                  <EmptyState icon={ScrollText} title="Chưa có audit log" description="Mọi admin action sẽ hiện ở đây." />
                </td>
              </tr>
            )}
            {filtered.map((a) => (
              <tr key={a.id} className="text-white/80 hover:bg-white/[0.02]">
                <td className="px-3 py-2 text-white/55">
                  <div>{formatDateVN(a.createdAt)}</div>
                  <div className="text-[10px] text-white/35">{formatRelative(a.createdAt)}</div>
                </td>
                <td className="px-3 py-2">
                  <div className="font-medium text-white">{a.adminName}</div>
                  <div className="text-[10px] text-white/35">{a.adminId}</div>
                </td>
                <td className="px-3 py-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-semibold",
                      TYPE_COLOR[a.type] ?? "bg-white/[0.05] text-white/70 border-white/10"
                    )}
                  >
                    {TYPE_LABEL[a.type] ?? a.type}
                  </span>
                </td>
                <td className="px-3 py-2 font-mono text-[11px] text-white/55">
                  {a.target ?? "—"}
                </td>
                <td className="max-w-xs truncate px-3 py-2 text-white/65" title={a.details}>
                  {a.details ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center text-[11px] text-white/30">
        Hiển thị {filtered.length} / {actions.length} actions
      </div>
    </div>
  );
}

void Search;
