"use client";

import { useMemo, useState } from "react";
import { Coins, TrendingUp, TrendingDown, Users, Search, Check, Plus, Minus } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { FilterBar } from "@/components/admin/filter-bar";
import { EmptyState } from "@/components/admin/empty-state";
import { DateRangePicker, type DateRange, rangeToMs } from "@/components/admin/date-range-picker";
import { Modal } from "@/components/ui/modal";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { useAdminCredits } from "@/hooks/use-admin-credits";
import { useAdminUsers } from "@/hooks/use-admin-users";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { toast } from "@/hooks/use-toast";
import { formatDateVN, formatThousand } from "@/lib/format";
import { cn } from "@/lib/cn";

const TABS = ["all", "topup", "adjust", "bulk"] as const;
type Tab = (typeof TABS)[number];

export default function AdminCreditsPage() {
  const { logs, hydrated, stats, topUp, adjust, bulkBonus } = useAdminCredits();
  const { users } = useAdminUsers();
  const { admin } = useAdminAuth();
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [range, setRange] = useState<DateRange>("30d");
  const [topupOpen, setTopupOpen] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);

  const userMap = useMemo(() => {
    const m = new Map<string, string>();
    users.forEach((u) => m.set(u.id, u.name));
    return m;
  }, [users]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const since = rangeToMs(range);
    return logs.filter((l) => {
      if (since && l.createdAt < Date.now() - since) return false;
      if (q) {
        const name = l.userId ? (userMap.get(l.userId) ?? "").toLowerCase() : "";
        if (!name.includes(q) && !l.reason.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [logs, search, range, userMap]);

  if (!hydrated) return <div className="py-12 text-center text-sm text-white/40">Đang tải…</div>;

  const adminIdent = admin ? { id: admin.id, name: admin.name } : { id: "system", name: "System" };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
          Quản lý
        </p>
        <h1 className="mt-1 text-[26px] font-bold leading-tight text-white">Credits</h1>
        <p className="mt-1 text-sm text-white/55">
          Theo dõi và điều chỉnh credit cho users.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Tổng credit in"
          value={formatThousand(stats.totalIn)}
          icon={TrendingUp}
          iconColor="text-[#7af1a5]"
          iconBg="bg-[#03e65b]/10"
        />
        <StatCard
          label="Tổng credit out"
          value={formatThousand(stats.totalOut)}
          icon={TrendingDown}
          iconColor="text-[#ff9a8a]"
          iconBg="bg-[#ff5d4b]/10"
        />
        <StatCard
          label="Spent 7 ngày"
          value={formatThousand(stats.spent7d)}
          icon={Coins}
          iconColor="text-[#ffd76b]"
          iconBg="bg-[#ffc533]/10"
          hint={`${stats.count7d} giao dịch`}
        />
        <StatCard
          label="Users có giao dịch"
          value={new Set(logs.map((l) => l.userId).filter(Boolean)).size}
          icon={Users}
          iconColor="text-[#a98bff]"
          iconBg="bg-[#7c5cff]/10"
        />
      </div>

      <div className="flex items-center gap-1 border-b border-white/10">
        <TabButton active={tab === "all"} onClick={() => setTab("all")}>Tất cả giao dịch</TabButton>
        <TabButton active={tab === "topup"} onClick={() => setTab("topup")}>Top-up</TabButton>
        <TabButton active={tab === "adjust"} onClick={() => setTab("adjust")}>Điều chỉnh</TabButton>
        <TabButton active={tab === "bulk"} onClick={() => setTab("bulk")}>Bulk bonus</TabButton>
      </div>

      {tab === "all" && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <FilterBar
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Tìm theo tên user, lý do…"
              onClear={() => setSearch("")}
            />
            <DateRangePicker value={range} onChange={setRange} />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
            <table className="w-full text-left text-[12px]">
              <thead className="border-b border-white/10 text-[10px] uppercase tracking-wider text-white/40">
                <tr>
                  <th className="px-3 py-2.5">Thời gian</th>
                  <th className="px-3 py-2.5">User</th>
                  <th className="px-3 py-2.5 text-right">Delta</th>
                  <th className="px-3 py-2.5">Lý do</th>
                  <th className="px-3 py-2.5">Loại</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="py-6"><EmptyState icon={Search} title="Chưa có giao dịch" /></td></tr>
                )}
                {filtered.map((l) => (
                  <tr key={l.id} className="text-white/80 hover:bg-white/[0.02]">
                    <td className="px-3 py-2 text-white/55">{formatDateVN(l.createdAt)}</td>
                    <td className="px-3 py-2">
                      {l.userId ? (
                        <span className="text-white">{userMap.get(l.userId) ?? l.userId}</span>
                      ) : (
                        <span className="text-white/40">—</span>
                      )}
                    </td>
                    <td className={cn("px-3 py-2 text-right font-mono", l.delta >= 0 ? "text-[#7af1a5]" : "text-[#ff9a8a]")}>
                      {l.delta > 0 ? "+" : ""}{formatThousand(l.delta)}
                    </td>
                    <td className="px-3 py-2">{l.reason}</td>
                    <td className="px-3 py-2 text-white/55">{l.source ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "topup" && (
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-1 text-[16px] font-semibold text-white">Top-up credit cho 1 user</h2>
          <p className="mb-4 text-[12px] text-white/55">Cộng thêm credit vào số dư user.</p>
          <SingleCreditForm
            mode="topup"
            users={users}
            onSubmit={(userId, amount, reason) => {
              const res = topUp({ userId, amount, reason }, adminIdent);
              if (!res.ok) toast({ type: "error", message: res.error ?? "Lỗi" });
              else toast({ type: "credit", message: `+${amount} credit` });
            }}
          />
        </div>
      )}

      {tab === "adjust" && (
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-1 text-[16px] font-semibold text-white">Điều chỉnh credit</h2>
          <p className="mb-4 text-[12px] text-white/55">Có thể cộng hoặc trừ (cho phép delta âm).</p>
          <SingleCreditForm
            mode="adjust"
            users={users}
            onSubmit={(userId, amount, reason) => {
              const res = adjust({ userId, delta: amount, reason }, adminIdent);
              if (!res.ok) toast({ type: "error", message: res.error ?? "Lỗi" });
              else toast({ type: "credit", message: `${amount > 0 ? "+" : ""}${amount} credit` });
            }}
          />
        </div>
      )}

      {tab === "bulk" && (
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-1 text-[16px] font-semibold text-white">Bulk bonus</h2>
          <p className="mb-4 text-[12px] text-white/55">Tặng cùng số credit cho nhiều user.</p>
          <BulkBonusForm
            users={users}
            onSubmit={(ids, amount, reason) => {
              const res = bulkBonus({ userIds: ids, amount, reason }, adminIdent);
              if (!res.ok) toast({ type: "error", message: res.error ?? "Lỗi" });
              else toast({ type: "credit", message: `Đã tặng ${amount} credit cho ${res.count} user` });
            }}
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setTopupOpen(true)}
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#7c5cff] px-3 text-[12px] font-semibold text-white hover:bg-[#8a6dff]"
        >
          <Plus className="h-3.5 w-3.5" /> Top-up nhanh
        </button>
        <button
          onClick={() => setAdjustOpen(true)}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 text-[12px] text-white/85 hover:bg-white/[0.08]"
        >
          <Minus className="h-3.5 w-3.5" /> Adjust nhanh
        </button>
        <button
          onClick={() => setBulkOpen(true)}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 text-[12px] text-white/85 hover:bg-white/[0.08]"
        >
          <Coins className="h-3.5 w-3.5" /> Bulk bonus
        </button>
      </div>

      <Modal open={topupOpen} onOpenChange={setTopupOpen} title="Top-up nhanh">
        <SingleCreditForm
          mode="topup"
          users={users}
          onSubmit={(userId, amount, reason) => {
            topUp({ userId, amount, reason }, adminIdent);
            toast({ type: "credit", message: `+${amount} credit` });
            setTopupOpen(false);
          }}
        />
      </Modal>
      <Modal open={adjustOpen} onOpenChange={setAdjustOpen} title="Adjust nhanh">
        <SingleCreditForm
          mode="adjust"
          users={users}
          onSubmit={(userId, amount, reason) => {
            const res = adjust({ userId, delta: amount, reason }, adminIdent);
            if (!res.ok) toast({ type: "error", message: res.error ?? "Lỗi" });
            else toast({ type: "credit", message: `${amount > 0 ? "+" : ""}${amount} credit` });
            setAdjustOpen(false);
          }}
        />
      </Modal>
      <Modal open={bulkOpen} onOpenChange={setBulkOpen} title="Bulk bonus">
        <BulkBonusForm
          users={users}
          onSubmit={(ids, amount, reason) => {
            const res = bulkBonus({ userIds: ids, amount, reason }, adminIdent);
            if (!res.ok) toast({ type: "error", message: res.error ?? "Lỗi" });
            else toast({ type: "credit", message: `Đã tặng ${amount} credit cho ${res.count} user` });
            setBulkOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

function TabButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border-b-2 px-3 py-2 text-[12px] font-medium transition-colors",
        active ? "border-[#7c5cff] text-white" : "border-transparent text-white/55 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

function SingleCreditForm({
  mode,
  users,
  onSubmit,
}: {
  mode: "topup" | "adjust";
  users: Array<{ id: string; name: string; email: string; credits: number }>;
  onSubmit: (userId: string, amount: number, reason: string) => void;
}) {
  const [userId, setUserId] = useState(users[0]?.id ?? "");
  const [amount, setAmount] = useState(100);
  const [reason, setReason] = useState("");
  const target = users.find((u) => u.id === userId);
  const newBalance = target ? (mode === "topup" ? target.credits + amount : target.credits + amount) : 0;

  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">User</label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7c5cff]/60"
        >
          {users.map((u) => (
            <option key={u.id} value={u.id} className="bg-[#0a0a0a] text-white">
              {u.name} — {u.email} (còn {formatThousand(u.credits)})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">Số credit {mode === "adjust" ? "(có thể âm)" : "(> 0)"}</label>
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
          placeholder="VD: Promotion Tết, Refund, Admin bonus"
          className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7c5cff]/60"
        />
      </div>
      {target && (
        <div className="rounded-md border border-white/10 bg-white/[0.03] p-3 text-[12px]">
          <div className="flex items-center justify-between">
            <span className="text-white/55">Số dư mới</span>
            <span className="font-mono text-white">
              {formatThousand(target.credits)} → <strong className="text-[#7af1a5]">{formatThousand(newBalance)}</strong>
            </span>
          </div>
        </div>
      )}
      <div className="flex items-center justify-end pt-1">
        <button
          onClick={() => onSubmit(userId, amount, reason || (mode === "topup" ? "Top-up từ admin" : "Admin adjust"))}
          disabled={!userId || amount === 0 || (mode === "topup" && amount < 0)}
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#7c5cff] px-3 text-[12px] font-semibold text-white hover:bg-[#8a6dff] disabled:opacity-50"
        >
          <Check className="h-3.5 w-3.5" /> Xác nhận
        </button>
      </div>
    </div>
  );
}

function BulkBonusForm({
  users,
  onSubmit,
}: {
  users: Array<{ id: string; name: string; email: string; status: string }>;
  onSubmit: (ids: string[], amount: number, reason: string) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [amount, setAmount] = useState(100);
  const [reason, setReason] = useState("Bulk bonus");
  const [q, setQ] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const filtered = users.filter((u) => {
    const s = q.toLowerCase();
    return !q || u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s);
  });

  function toggle(id: string) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    if (filtered.every((u) => selected.has(u.id))) {
      setSelected((s) => {
        const next = new Set(s);
        filtered.forEach((u) => next.delete(u.id));
        return next;
      });
    } else {
      setSelected((s) => {
        const next = new Set(s);
        filtered.forEach((u) => next.add(u.id));
        return next;
      });
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">Số credit / user</label>
          <input
            type="number"
            min={1}
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
            className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7c5cff]/60"
          />
        </div>
      </div>
      <div className="rounded-md border border-white/10 bg-white/[0.02]">
        <div className="border-b border-white/10 p-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm user…"
            className="w-full rounded border border-white/10 bg-white/[0.03] px-2 py-1.5 text-[12px] text-white outline-none focus:border-[#7c5cff]/60"
          />
        </div>
        <div className="max-h-64 overflow-y-auto">
          <div className="flex items-center gap-2 border-b border-white/[0.05] px-3 py-1.5 text-[11px] text-white/55">
            <input
              type="checkbox"
              checked={filtered.length > 0 && filtered.every((u) => selected.has(u.id))}
              onChange={toggleAll}
              className="h-3 w-3 accent-[#7c5cff]"
            />
            <span>Chọn tất cả ({selected.size} đã chọn)</span>
          </div>
          {filtered.map((u) => (
            <label key={u.id} className="flex cursor-pointer items-center gap-2 border-b border-white/[0.05] px-3 py-1.5 text-[12px] hover:bg-white/[0.02]">
              <input
                type="checkbox"
                checked={selected.has(u.id)}
                onChange={() => toggle(u.id)}
                className="h-3 w-3 accent-[#7c5cff]"
              />
              <span className="flex-1 truncate text-white/85">{u.name}</span>
              <span className="truncate text-[10px] text-white/40">{u.email}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={() => setConfirmOpen(true)}
          disabled={selected.size === 0 || amount <= 0}
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#7c5cff] px-3 text-[12px] font-semibold text-white hover:bg-[#8a6dff] disabled:opacity-50"
        >
          <Check className="h-3.5 w-3.5" /> Tặng {selected.size} user × {amount} credit
        </button>
      </div>
      <ConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Xác nhận bulk bonus"
        description={
          <span>
            Tặng <strong className="text-white">+{amount} credit</strong> cho <strong className="text-white">{selected.size} user</strong>?
            Tổng: <strong className="text-[#7af1a5]">{formatThousand(amount * selected.size)} credit</strong>
          </span>
        }
        confirmLabel="Tặng"
        onConfirm={() => {
          onSubmit(Array.from(selected), amount, reason);
          setSelected(new Set());
        }}
      />
    </div>
  );
}
