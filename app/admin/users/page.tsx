"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Users as UsersIcon,
  Plus,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle2,
  Trash2,
  Coins,
  AlertCircle,
} from "lucide-react";
import { FilterBar } from "@/components/admin/filter-bar";
import { StatusBadge } from "@/components/admin/status-badge";
import { EmptyState } from "@/components/admin/empty-state";
import { Pagination } from "@/components/admin/pagination";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { Modal } from "@/components/ui/modal";
import { useAdminUsers } from "@/hooks/use-admin-users";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useAdminCredits } from "@/hooks/use-admin-credits";
import { toast } from "@/hooks/use-toast";
import { formatDateVN, formatRelative, formatThousand } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { EndUser, UserStatus } from "@/lib/types";

const PAGE_SIZE = 20;

export default function AdminUsersPage() {
  const { users, hydrated, bulkBan, bulkDelete, setStatus, remove, create } = useAdminUsers();
  const { adjust, topUp } = useAdminCredits();
  const { admin } = useAdminAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Modals
  const [createOpen, setCreateOpen] = useState(false);
  const [banTarget, setBanTarget] = useState<EndUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EndUser | null>(null);
  const [adjustTarget, setAdjustTarget] = useState<EndUser | null>(null);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (statusFilter && u.status !== statusFilter) return false;
      if (q) {
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [users, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  function toggleSelect(id: string) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleSelectAll() {
    setSelected((s) => {
      if (pageRows.every((r) => s.has(r.id))) {
        const next = new Set(s);
        pageRows.forEach((r) => next.delete(r.id));
        return next;
      }
      const next = new Set(s);
      pageRows.forEach((r) => next.add(r.id));
      return next;
    });
  }

  if (!hydrated) {
    return <div className="py-12 text-center text-sm text-white/40">Đang tải…</div>;
  }

  const adminIdent = admin ? { id: admin.id, name: admin.name } : { id: "system", name: "System" };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
            Quản lý
          </p>
          <h1 className="mt-1 text-[26px] font-bold leading-tight text-white">Users</h1>
          <p className="mt-1 text-sm text-white/55">
            {users.length} user · {users.filter((u) => u.status === "active").length} active
          </p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#7c5cff] px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#8a6dff]"
        >
          <Plus className="h-4 w-4" /> Tạo user
        </button>
      </div>

      <FilterBar
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Tìm theo tên, email, ID…"
        selects={[
          {
            value: statusFilter,
            onChange: (v) => { setStatusFilter(v); setPage(1); },
            placeholder: "Tất cả trạng thái",
            options: [
              { value: "active", label: "Active" },
              { value: "banned", label: "Banned" },
              { value: "suspended", label: "Suspended" },
            ],
          },
        ]}
        onClear={() => { setSearch(""); setStatusFilter(""); setPage(1); setSelected(new Set()); }}
      />

      {selected.size > 0 && (
        <div className="flex items-center justify-between gap-2 rounded-md border border-[#7c5cff]/30 bg-[#7c5cff]/10 px-3 py-2 text-[12px]">
          <span className="text-white/85">Đã chọn {selected.size} user</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                bulkBan(Array.from(selected), "Bulk ban từ admin", adminIdent);
                toast({ type: "success", message: `Đã ban ${selected.size} user` });
                setSelected(new Set());
              }}
              className="rounded border border-[#ff5d4b]/40 bg-[#ff5d4b]/15 px-2 py-0.5 text-[11px] text-[#ff9a8a] hover:bg-[#ff5d4b]/25"
            >
              Ban hết
            </button>
            <button
              onClick={() => {
                bulkDelete(Array.from(selected), adminIdent);
                toast({ type: "success", message: `Đã xóa ${selected.size} user` });
                setSelected(new Set());
              }}
              className="rounded border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/75 hover:bg-white/[0.08]"
            >
              Xóa
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="rounded px-2 py-0.5 text-[11px] text-white/55 hover:text-white"
            >
              Bỏ chọn
            </button>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-white/10 bg-white/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px]">
            <thead className="border-b border-white/10 text-[10px] uppercase tracking-wider text-white/40">
              <tr>
                <th className="px-3 py-2.5 w-8">
                  <input
                    type="checkbox"
                    checked={pageRows.length > 0 && pageRows.every((r) => selected.has(r.id))}
                    onChange={toggleSelectAll}
                    className="h-3.5 w-3.5 cursor-pointer accent-[#7c5cff]"
                  />
                </th>
                <th className="px-3 py-2.5">User</th>
                <th className="px-3 py-2.5">Trạng thái</th>
                <th className="px-3 py-2.5 text-right">Credits</th>
                <th className="px-3 py-2.5 text-right">Đã tiêu</th>
                <th className="px-3 py-2.5">Tham gia</th>
                <th className="px-3 py-2.5">Online</th>
                <th className="px-3 py-2.5 w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-6">
                    <EmptyState
                      icon={UsersIcon}
                      title="Không tìm thấy user"
                      description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm."
                    />
                  </td>
                </tr>
              )}
              {pageRows.map((u) => (
                <tr key={u.id} className="text-white/80 hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={selected.has(u.id)}
                      onChange={() => toggleSelect(u.id)}
                      className="h-3.5 w-3.5 cursor-pointer accent-[#7c5cff]"
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#7c5cff] to-[#d25fff] text-[10px] font-bold text-white">
                        {u.name.split(" ").slice(-1)[0]?.[0] ?? "?"}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-white">{u.name}</div>
                        <div className="text-[10px] text-white/40">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={u.status} />
                    {u.banReason && (
                      <div className="mt-0.5 text-[10px] text-white/40">{u.banReason}</div>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-white">
                    {formatThousand(u.credits)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-white/55">
                    {formatThousand(u.totalSpent)}
                  </td>
                  <td className="px-3 py-2.5 text-white/55">{formatDateVN(u.createdAt)}</td>
                  <td className="px-3 py-2.5 text-white/55">
                    {u.lastSeenAt ? formatRelative(u.lastSeenAt) : "—"}
                  </td>
                  <td className="px-3 py-2.5 relative">
                    <button
                      onClick={() => setActionMenu(actionMenu === u.id ? null : u.id)}
                      className="rounded p-1 text-white/50 hover:bg-white/[0.06] hover:text-white"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {actionMenu === u.id && (
                      <div
                        className="absolute right-3 top-9 z-20 w-44 rounded-md border border-white/10 bg-[#0a0a0a] p-1 shadow-2xl"
                        onMouseLeave={() => setActionMenu(null)}
                      >
                        <Link
                          href={`/admin/users/detail?id=${u.id}`}
                          className="flex items-center gap-2 rounded px-2 py-1.5 text-[12px] text-white/85 hover:bg-white/[0.06]"
                          onClick={() => setActionMenu(null)}
                        >
                          <Eye className="h-3.5 w-3.5" /> Xem chi tiết
                        </Link>
                        <button
                          onClick={() => { setAdjustTarget(u); setActionMenu(null); }}
                          className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-[12px] text-white/85 hover:bg-white/[0.06]"
                        >
                          <Coins className="h-3.5 w-3.5" /> Điều chỉnh credit
                        </button>
                        {u.status === "active" ? (
                          <button
                            onClick={() => { setBanTarget(u); setActionMenu(null); }}
                            className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-[12px] text-[#ff9a8a] hover:bg-[#ff5d4b]/15"
                          >
                            <Ban className="h-3.5 w-3.5" /> Ban user
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setStatus(u.id, "active", undefined, adminIdent);
                              toast({ type: "success", message: `Đã reactivate ${u.name}` });
                              setActionMenu(null);
                            }}
                            className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-[12px] text-[#7af1a5] hover:bg-[#03e65b]/15"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Reactivate
                          </button>
                        )}
                        <button
                          onClick={() => { setDeleteTarget(u); setActionMenu(null); }}
                          className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-[12px] text-[#ff9a8a] hover:bg-[#ff5d4b]/15"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Xóa vĩnh viễn
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-white/10 px-3 py-2.5">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>

      <ConfirmModal
        open={!!banTarget}
        onOpenChange={(o) => !o && setBanTarget(null)}
        title="Ban user này?"
        description={banTarget && <span>User <strong className="text-white">{banTarget.name}</strong> sẽ bị cấm truy cập. Bạn có thể unban sau.</span>}
        confirmLabel="Ban"
        variant="danger"
        onConfirm={() => {
          if (!banTarget) return;
          setStatus(banTarget.id, "banned", "Vi phạm điều khoản", adminIdent);
          toast({ type: "success", message: `Đã ban ${banTarget.name}` });
          setBanTarget(null);
        }}
      />

      <ConfirmModal
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Xóa vĩnh viễn?"
        description={
          deleteTarget && (
            <span>
              User <strong className="text-white">{deleteTarget.name}</strong> sẽ bị xóa cùng toàn bộ dữ liệu liên quan.{" "}
              <span className="text-[#ff9a8a]">Không thể khôi phục.</span>
            </span>
          )
        }
        confirmLabel="Xóa"
        variant="danger"
        onConfirm={() => {
          if (!deleteTarget) return;
          remove(deleteTarget.id, adminIdent);
          toast({ type: "success", message: `Đã xóa ${deleteTarget.name}` });
          setDeleteTarget(null);
        }}
      />

      <CreateUserModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={(input) => {
          create(input, adminIdent);
          toast({ type: "success", message: `Đã tạo user ${input.name}` });
          setCreateOpen(false);
        }}
      />

      <AdjustCreditModal
        target={adjustTarget}
        onClose={() => setAdjustTarget(null)}
        onApply={(amount, reason) => {
          if (!adjustTarget) return;
          const res = adjust({ userId: adjustTarget.id, delta: amount, reason }, adminIdent);
          if (!res.ok) {
            toast({ type: "error", message: res.error ?? "Lỗi" });
          } else {
            toast({ type: "credit", message: `${amount > 0 ? "+" : ""}${amount} credit cho ${adjustTarget.name}` });
            setAdjustTarget(null);
          }
        }}
        onTopUp={(amount, reason) => {
          if (!adjustTarget) return;
          const res = topUp({ userId: adjustTarget.id, amount, reason }, adminIdent);
          if (!res.ok) {
            toast({ type: "error", message: res.error ?? "Lỗi" });
          } else {
            toast({ type: "credit", message: `+${amount} credit cho ${adjustTarget.name}` });
            setAdjustTarget(null);
          }
        }}
      />
    </div>
  );
}

function CreateUserModal({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onCreate: (input: { name: string; email: string; status: UserStatus; credits: number }) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [credits, setCredits] = useState(100);
  const valid = name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && credits >= 0;

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Tạo user mới" description="User mới sẽ nhận credit khởi đầu">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          onCreate({ name, email, status: "active", credits });
          setName(""); setEmail(""); setCredits(100);
        }}
        className="space-y-3"
      >
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">Họ tên</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
            className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7c5cff]/60"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.vn"
            className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7c5cff]/60"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">Credit khởi đầu</label>
          <input
            type="number"
            min={0}
            value={credits}
            onChange={(e) => setCredits(Number(e.target.value))}
            className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7c5cff]/60"
          />
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] text-white/75 hover:bg-white/[0.08]"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={!valid}
            className={cn(
              "rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors",
              valid ? "bg-[#7c5cff] text-white hover:bg-[#8a6dff]" : "bg-white/[0.06] text-white/30"
            )}
          >
            Tạo user
          </button>
        </div>
      </form>
    </Modal>
  );
}

function AdjustCreditModal({
  target,
  onClose,
  onApply,
  onTopUp,
}: {
  target: EndUser | null;
  onClose: () => void;
  onApply: (amount: number, reason: string) => void;
  onTopUp: (amount: number, reason: string) => void;
}) {
  const [mode, setMode] = useState<"topup" | "adjust">("topup");
  const [amount, setAmount] = useState(100);
  const [reason, setReason] = useState("");

  if (!target) return null;
  const newBalance = mode === "topup" ? target.credits + amount : Math.max(0, target.credits + amount);

  return (
    <Modal
      open={!!target}
      onOpenChange={(o) => !o && onClose()}
      title="Điều chỉnh credit"
      description={`User: ${target.name} (${target.email}) · Số dư hiện tại: ${formatThousand(target.credits)}`}
    >
      <div className="space-y-3">
        <div className="inline-flex rounded-md border border-white/10 bg-white/[0.03] p-0.5">
          <button
            onClick={() => setMode("topup")}
            className={cn(
              "rounded px-3 py-1 text-[12px] font-medium",
              mode === "topup" ? "bg-[#7c5cff]/20 text-[#a98bff]" : "text-white/55"
            )}
          >
            Top-up (+)
          </button>
          <button
            onClick={() => setMode("adjust")}
            className={cn(
              "rounded px-3 py-1 text-[12px] font-medium",
              mode === "adjust" ? "bg-[#7c5cff]/20 text-[#a98bff]" : "text-white/55"
            )}
          >
            Điều chỉnh (±)
          </button>
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Số credit (có thể âm khi adjust)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7c5cff]/60"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">Lý do</label>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="VD: Promotion Tết, Refund, Admin bonus…"
            className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7c5cff]/60"
          />
        </div>
        <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-white/55">Số dư mới</span>
            <span className="font-mono text-white">
              {formatThousand(target.credits)} → <strong className="text-[#7af1a5]">{formatThousand(newBalance)}</strong>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] text-white/75 hover:bg-white/[0.08]"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              if (mode === "topup") onTopUp(amount, reason || "Top-up từ admin");
              else onApply(amount, reason || "Admin adjust");
              setAmount(100); setReason("");
            }}
            disabled={amount === 0}
            className="rounded-md bg-[#7c5cff] px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-[#8a6dff] disabled:opacity-50"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </Modal>
  );
}

void AlertCircle;
