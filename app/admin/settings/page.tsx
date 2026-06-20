"use client";

import { useState } from "react";
import { Save, Settings as SettingsIcon, Coins, Sparkles, Wrench, AlertTriangle, Power } from "lucide-react";
import { useAdminSettings } from "@/hooks/use-admin-settings";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { toast } from "@/hooks/use-toast";
import { MODEL_OPTIONS } from "@/lib/models";
import { AdminRouteGuard } from "@/components/admin/admin-route-guard";
import { formatDateVN, formatThousand } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { ModelName } from "@/lib/types";

export default function AdminSettingsPage() {
  return (
    <AdminRouteGuard require="super_admin">
      <SettingsContent />
    </AdminRouteGuard>
  );
}

function SettingsContent() {
  const { settings, hydrated, update, setModelCredit, toggleModel } = useAdminSettings();
  const { admin } = useAdminAuth();
  const [creditPerDollar, setCreditPerDollar] = useState(settings?.creditPerDollar ?? 100);
  const [signupBonus, setSignupBonus] = useState(settings?.signupBonus ?? 100);
  const [confirmMaint, setConfirmMaint] = useState(false);

  if (!hydrated || !settings) {
    return <div className="py-12 text-center text-sm text-white/40">Đang tải…</div>;
  }

  const adminIdent = admin ? { id: admin.id, name: admin.name } : { id: "system", name: "System" };

  function savePricing() {
    update({ creditPerDollar, signupBonus }, adminIdent);
    toast({ type: "success", message: "Đã lưu cấu hình giá" });
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
          Hệ thống
        </p>
        <h1 className="mt-1 text-[26px] font-bold leading-tight text-white">Settings</h1>
        <p className="mt-1 text-sm text-white/55">
          Cấu hình giá credit, model catalog, maintenance mode.
        </p>
      </div>

      {/* Pricing */}
      <section className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center gap-2">
          <Coins className="h-4 w-4 text-[#a98bff]" />
          <h2 className="text-[15px] font-semibold text-white">Pricing chung</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            label="Credit / 1 USD"
            value={creditPerDollar}
            onChange={setCreditPerDollar}
            hint={`1 USD = ${formatThousand(creditPerDollar)} credit`}
          />
          <Field
            label="Signup bonus (credit)"
            value={signupBonus}
            onChange={setSignupBonus}
            hint="Tặng cho user mới đăng ký"
          />
        </div>
        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={savePricing}
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#7c5cff] px-3 text-[12px] font-semibold text-white hover:bg-[#8a6dff]"
          >
            <Save className="h-3.5 w-3.5" /> Lưu pricing
          </button>
        </div>
      </section>

      {/* Models */}
      <section className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#a98bff]" />
          <h2 className="text-[15px] font-semibold text-white">Models</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px]">
            <thead className="border-b border-white/10 text-[10px] uppercase tracking-wider text-white/40">
              <tr>
                <th className="px-2 py-2">Model</th>
                <th className="px-2 py-2">Tag</th>
                <th className="px-2 py-2 w-32">Credit / ảnh</th>
                <th className="px-2 py-2 w-20 text-center">Enabled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {MODEL_OPTIONS.map((m) => {
                const p = settings.pricing[m.name];
                return (
                  <tr key={m.name}>
                    <td className="px-2 py-2 font-medium text-white">{m.name}</td>
                    <td className="px-2 py-2">
                      <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider", m.tagColor)}>
                        {m.tag}
                      </span>
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        min={0}
                        value={p.credit}
                        onChange={(e) => setModelCredit(m.name, Number(e.target.value), adminIdent)}
                        className="w-20 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[12px] text-white outline-none focus:border-[#7c5cff]/60"
                      />
                    </td>
                    <td className="px-2 py-2 text-center">
                      <button
                        onClick={() => toggleModel(m.name, !p.enabled, adminIdent)}
                        className={cn(
                          "relative h-5 w-10 rounded-full transition-colors",
                          p.enabled ? "bg-[#03e65b]/60" : "bg-white/10"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform",
                            p.enabled ? "translate-x-5" : "translate-x-0.5"
                          )}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* System */}
      <section className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4 flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#a98bff]" />
          <h2 className="text-[15px] font-semibold text-white">System</h2>
        </div>
        <div className="space-y-3">
          <ToggleRow
            label="Maintenance mode"
            description="Tạm dừng đăng ký mới. Người dùng hiện tại vẫn truy cập được."
            value={settings.maintenanceMode}
            onChange={(v) => {
              if (v) setConfirmMaint(true);
              else {
                update({ maintenanceMode: false }, adminIdent);
                toast({ type: "info", message: "Đã tắt maintenance" });
              }
            }}
          />
          <ToggleRow
            label="Cho phép đăng ký mới"
            description="Nếu tắt, form signup sẽ bị disable."
            value={settings.signupEnabled}
            onChange={(v) => {
              update({ signupEnabled: v }, adminIdent);
              toast({ type: "info", message: v ? "Đã bật đăng ký" : "Đã tắt đăng ký" });
            }}
          />
        </div>
        <div className="mt-4 border-t border-white/10 pt-3 text-[10px] text-white/30">
          Cập nhật lần cuối: {formatDateVN(settings.updatedAt)} bởi {settings.updatedBy}
        </div>
      </section>

      <ConfirmModal
        open={confirmMaint}
        onOpenChange={setConfirmMaint}
        title="Bật Maintenance mode?"
        description={
          <span>
            <span className="text-[#ffd76b]">Người dùng mới sẽ không thể đăng ký.</span> Bạn có thể tắt lại bất cứ lúc nào.
          </span>
        }
        confirmLabel="Bật"
        variant="warning"
        onConfirm={() => {
          update({ maintenanceMode: true }, adminIdent);
          toast({ type: "info", message: "Maintenance mode đã BẬT" });
          setConfirmMaint(false);
        }}
      />
    </div>
  );
}

function Field({ label, value, onChange, hint }: { label: string; value: number; onChange: (v: number) => void; hint?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/40">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white outline-none focus:border-[#7c5cff]/60"
      />
      {hint && <p className="mt-1 text-[10px] text-white/40">{hint}</p>}
    </div>
  );
}

function ToggleRow({ label, description, value, onChange }: { label: string; description: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.02] p-3">
      <div>
        <div className="text-[13px] font-medium text-white">{label}</div>
        <div className="text-[11px] text-white/45">{description}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          value ? "bg-[#7c5cff]" : "bg-white/10"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            value ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

void SettingsIcon;
void AlertTriangle;
void Power;
