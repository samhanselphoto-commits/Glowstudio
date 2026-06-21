"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Calendar,
  Coins,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Ban,
  CheckCircle2,
  Trash2,
  Layers,
} from "lucide-react";
import { useAdminUsers } from "@/hooks/use-admin-users";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useAdminContent } from "@/hooks/use-admin-content";
import { useAdminCredits } from "@/hooks/use-admin-credits";
import { StatusBadge } from "@/components/admin/status-badge";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { EmptyState } from "@/components/admin/empty-state";
import { toast } from "@/hooks/use-toast";
import { formatDateVN, formatRelative, formatThousand } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { UserActivityType } from "@/lib/types";

const TABS = ["overview", "credits", "generations", "library", "activity"] as const;
type Tab = (typeof TABS)[number];

const ACT_LABEL: Record<UserActivityType, string> = {
  signup: "Đăng ký",
  login: "Đăng nhập",
  generate: "Tạo ảnh",
  inpaint: "Inpaint",
  upscale: "Upscale",
  library_add: "Thêm vào Library",
  community_post: "Đăng Community",
  credit_spend: "Tiêu credit",
};

export default function AdminUserDetailPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-white/40">Đang tải…</div>}>
      <UserDetailInner />
    </Suspense>
  );
}

function UserDetailInner() {
  const search = useSearchParams();
  const router = useRouter();
  const id = search?.get("id") ?? "";
  const { findById, setStatus, remove } = useAdminUsers();
  const { library, generations } = useAdminContent();
  const { logs } = useAdminCredits();
  const { admin } = useAdminAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [banOpen, setBanOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const user = findById(id);
  const userLogs = useMemo(() => logs.filter((l) => l.userId === id), [logs, id]);
  const userGens = useMemo(() => generations.filter((g) => g.userId === id), [generations, id]);
  const userLib = useMemo(() => library.filter((i) => i.userId === id), [library, id]);

  if (!user) {
    return (
      <div className="py-12">
        <EmptyState
          icon={EyeOff}
          title="Không tìm thấy user"
          description="User này có thể đã bị xóa hoặc không tồn tại."
          action={
            <Link
              href="/admin/users"
              className="rounded-md bg-[#7c5cff] px-3 py-1.5 text-[12px] font-semibold text-white"
            >
              Quay lại danh sách
            </Link>
          }
        />
      </div>
    );
  }

  const adminIdent = admin ? { id: admin.id, name: admin.name } : { id: "system", name: "System" };

  return (
    <div className="space-y-5">
      <button
        onClick={() => router.push("/admin/users")}
        className="inline-flex items-center gap-1.5 text-[12px] text-white/55 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Quay lại
      </button>

      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7c5cff] to-[#d25fff] text-2xl font-bold text-white">
            {user.name.split(" ").slice(-1)[0]?.[0] ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-[22px] font-bold text-white">{user.name}</h1>
              <StatusBadge status={user.status} />
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white/55">
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {user.email}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Tham gia {formatDateVN(user.createdAt)}</span>
              <span>ID: <code className="text-white/70">{user.id}</code></span>
            </div>
            {user.banReason && (
              <div className="mt-2 rounded border border-[#ff5d4b]/30 bg-[#ff5d4b]/10 px-2 py-1 text-[11px] text-[#ff9a8a]">
                Lý do: {user.banReason} · {user.bannedAt && formatRelative(user.bannedAt)}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/credits"
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 text-[12px] text-white/85 hover:bg-white/[0.08]"
            >
              <Coins className="h-3.5 w-3.5" /> Adjust credit
            </Link>
            {user.status === "active" ? (
              <button
                onClick={() => setBanOpen(true)}
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#ff5d4b]/40 bg-[#ff5d4b]/10 px-2.5 text-[12px] text-[#ff9a8a] hover:bg-[#ff5d4b]/20"
              >
                <Ban className="h-3.5 w-3.5" /> Ban
              </button>
            ) : (
              <button
                onClick={() => {
                  setStatus(user.id, "active", undefined, adminIdent);
                  toast({ type: "success", message: "Đã reactivate user" });
                }}
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#03e65b]/40 bg-[#03e65b]/10 px-2.5 text-[12px] text-[#7af1a5] hover:bg-[#03e65b]/20"
              >
                <CheckCircle2 className="h-3.5 w-3.5" /> Reactivate
              </button>
            )}
            <button
              onClick={() => setDeleteOpen(true)}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 text-[12px] text-white/55 hover:bg-[#ff5d4b]/15 hover:text-[#ff9a8a]"
            >
              <Trash2 className="h-3.5 w-3.5" /> Xóa
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-b border-white/10">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "border-b-2 px-3 py-2 text-[12px] font-medium capitalize transition-colors",
              tab === t
                ? "border-[#7c5cff] text-white"
                : "border-transparent text-white/55 hover:text-white"
            )}
          >
            {t === "overview" ? "Tổng quan" :
              t === "credits" ? `Credits (${userLogs.length})` :
              t === "generations" ? `Generations (${userGens.length})` :
              t === "library" ? `Library (${userLib.length})` :
              `Activity`}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Metric label="Số dư" value={formatThousand(user.credits)} sub="credit" />
          <Metric label="Đã tiêu" value={formatThousand(user.totalSpent)} sub="credit lifetime" />
          <Metric label="Generations" value={userGens.length} sub="lifetime" />
          <Metric label="Library items" value={userLib.length} sub="lifetime" />
          <Metric label="Signup bonus" value={user.signupBonusClaimed ? "Đã nhận" : "Chưa nhận"} />
          <Metric label="Last seen" value={user.lastSeenAt ? formatRelative(user.lastSeenAt) : "—"} />
        </div>
      )}

      {tab === "credits" && (
        <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
          <table className="w-full text-left text-[12px]">
            <thead className="border-b border-white/10 text-[10px] uppercase tracking-wider text-white/40">
              <tr>
                <th className="px-3 py-2.5">Thời gian</th>
                <th className="px-3 py-2.5 text-right">Delta</th>
                <th className="px-3 py-2.5">Lý do</th>
                <th className="px-3 py-2.5">Loại</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {userLogs.length === 0 && (
                <tr><td colSpan={4} className="py-6 text-center text-white/40">Chưa có giao dịch</td></tr>
              )}
              {userLogs.map((l) => (
                <tr key={l.id} className="text-white/80">
                  <td className="px-3 py-2 text-white/55">{formatDateVN(l.createdAt)}</td>
                  <td className={cn("px-3 py-2 text-right font-mono", l.delta >= 0 ? "text-[#7af1a5]" : "text-[#ff9a8a]")}>
                    {l.delta > 0 ? "+" : ""}{l.delta}
                  </td>
                  <td className="px-3 py-2">{l.reason}</td>
                  <td className="px-3 py-2 text-white/55">{l.source ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "generations" && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {userGens.length === 0 && (
            <div className="col-span-full">
              <EmptyState icon={ImageIcon} title="Chưa có generation" />
            </div>
          )}
          {userGens.map((g) => (
            <div key={g.id} className="rounded-md border border-white/10 bg-white/[0.02] p-2">
              <div className="aspect-square w-full overflow-hidden rounded bg-white/[0.04]">
                {g.variations[0] && (
                  <img src={g.variations[0].src} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="mt-2 truncate text-[11px] text-white/85">{g.prompt}</div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-white/40">
                <span>{g.model}</span>
                <span>{formatRelative(g.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "library" && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {userLib.length === 0 && (
            <div className="col-span-full">
              <EmptyState icon={Layers} title="Chưa có library item" />
            </div>
          )}
          {userLib.map((i) => (
            <div key={i.id} className={cn("rounded-md border border-white/10 bg-white/[0.02] p-2", i.hidden && "opacity-50")}>
              <div className="aspect-square w-full overflow-hidden rounded bg-white/[0.04]">
                <img src={i.src} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="mt-2 truncate text-[11px] text-white/85">{i.prompt}</div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-white/40">
                <span>{i.folder}</span>
                {i.hidden && <span className="text-[#ff5d4b]">Đã ẩn</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "activity" && (
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <div className="text-center text-[12px] text-white/40">Chưa có activity log chi tiết</div>
        </div>
      )}

      <ConfirmModal
        open={banOpen}
        onOpenChange={setBanOpen}
        title="Ban user này?"
        description={`User ${user.name} sẽ bị cấm truy cập. Bạn có thể unban sau.`}
        confirmLabel="Ban"
        variant="danger"
        onConfirm={() => {
          setStatus(user.id, "banned", "Vi phạm điều khoản", adminIdent);
          toast({ type: "success", message: `Đã ban ${user.name}` });
          setBanOpen(false);
        }}
      />
      <ConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Xóa vĩnh viễn?"
        description={<span>User <strong className="text-white">{user.name}</strong> sẽ bị xóa. <span className="text-[#ff9a8a]">Không thể khôi phục.</span></span>}
        confirmLabel="Xóa"
        variant="danger"
        onConfirm={() => {
          remove(user.id, adminIdent);
          toast({ type: "success", message: "Đã xóa user" });
          router.push("/admin/users");
        }}
      />
    </div>
  );
}

function Metric({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.03] p-3.5">
      <div className="text-[10px] font-medium uppercase tracking-wider text-white/40">{label}</div>
      <div className="mt-1 text-[20px] font-bold leading-none text-white">{value}</div>
      {sub && <div className="mt-1 text-[10px] text-white/35">{sub}</div>}
    </div>
  );
}

void ACT_LABEL;
