"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FilterBar } from "@/components/admin/filter-bar";
import { EmptyState } from "@/components/admin/empty-state";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { useAdminContent } from "@/hooks/use-admin-content";
import { useAdminUsers } from "@/hooks/use-admin-users";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { toast } from "@/hooks/use-toast";
import { formatRelative, formatThousand } from "@/lib/format";
import { ImageIcon, Eye, EyeOff, Trash2, Heart, ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";
import { MODEL_OPTIONS } from "@/lib/models";
import type { ModelName } from "@/lib/types";

void (null as unknown as ModelName);

const TABS = ["library", "community", "generations"] as const;
type Tab = (typeof TABS)[number];

export default function AdminContentPage() {
  const { library, generations, community, hideLibrary, unhideLibrary, deleteLibrary, deleteGeneration, hideCommunity, unhideCommunity, deleteCommunity } = useAdminContent();
  const { users } = useAdminUsers();
  const { admin } = useAdminAuth();
  const [tab, setTab] = useState<Tab>("library");
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [modelFilter, setModelFilter] = useState<string>("");
  const [hiddenOnly, setHiddenOnly] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ kind: "library" | "community" | "generation"; id: string; name: string } | null>(null);

  const userMap = useMemo(() => {
    const m = new Map<string, string>();
    users.forEach((u) => m.set(u.id, u.name));
    return m;
  }, [users]);

  const filteredLib = useMemo(() => {
    return library.filter((i) => {
      if (userFilter && i.userId !== userFilter) return false;
      if (modelFilter && i.model !== modelFilter) return false;
      if (hiddenOnly && !i.hidden) return false;
      if (search) {
        const s = search.toLowerCase();
        if (!i.prompt.toLowerCase().includes(s) && !i.folder.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [library, userFilter, modelFilter, hiddenOnly, search]);

  const filteredComm = useMemo(() => {
    return community.filter((p) => {
      if (userFilter && p.userId !== userFilter) return false;
      if (modelFilter && p.model !== modelFilter) return false;
      if (hiddenOnly && !p.hidden) return false;
      if (search && !p.prompt.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [community, userFilter, modelFilter, hiddenOnly, search]);

  const filteredGens = useMemo(() => {
    return generations.filter((g) => {
      if (userFilter && g.userId !== userFilter) return false;
      if (modelFilter && g.model !== modelFilter) return false;
      if (search && !g.prompt.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [generations, userFilter, modelFilter, search]);

  const adminIdent = admin ? { id: admin.id, name: admin.name } : { id: "system", name: "System" };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5cff]">
          Quản lý
        </p>
        <h1 className="mt-1 text-[26px] font-bold leading-tight text-white">Content</h1>
        <p className="mt-1 text-sm text-white/55">
          Duyệt, ẩn và xóa nội dung trên Library, Community, Generations.
        </p>
      </div>

      <div className="flex items-center gap-1 border-b border-white/10">
        <TabButton active={tab === "library"} onClick={() => setTab("library")}>
          Library ({library.length})
        </TabButton>
        <TabButton active={tab === "community"} onClick={() => setTab("community")}>
          Community ({community.length})
        </TabButton>
        <TabButton active={tab === "generations"} onClick={() => setTab("generations")}>
          Generations ({generations.length})
        </TabButton>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Tìm theo prompt…"
        selects={[
          {
            value: userFilter,
            onChange: setUserFilter,
            placeholder: "Tất cả user",
            options: users.map((u) => ({ value: u.id, label: u.name })),
          },
          {
            value: modelFilter,
            onChange: setModelFilter,
            placeholder: "Tất cả model",
            options: MODEL_OPTIONS.map((m) => ({ value: m.name, label: m.name })),
          },
        ]}
        onClear={() => { setSearch(""); setUserFilter(""); setModelFilter(""); setHiddenOnly(false); }}
        right={
          <label className="flex cursor-pointer items-center gap-1.5 text-[11px] text-white/55">
            <input
              type="checkbox"
              checked={hiddenOnly}
              onChange={(e) => setHiddenOnly(e.target.checked)}
              className="h-3 w-3 accent-[#7c5cff]"
            />
            Chỉ hiện đã ẩn
          </label>
        }
      />

      {tab === "library" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredLib.length === 0 && (
            <div className="col-span-full">
              <EmptyState icon={ImageIcon} title="Không có ảnh nào" description="Thử bỏ filter hoặc seed dữ liệu." />
            </div>
          )}
          {filteredLib.map((i) => (
            <div key={i.id} className={cn("group relative overflow-hidden rounded-md border border-white/10 bg-white/[0.02]", i.hidden && "opacity-50")}>
              <div className="aspect-square w-full bg-white/[0.04]">
                <img src={i.src} alt="" className="h-full w-full object-cover" />
              </div>
              {i.hidden && (
                <div className="absolute right-2 top-2 rounded-full border border-[#ff5d4b]/40 bg-[#ff5d4b]/20 px-2 py-0.5 text-[9px] font-semibold text-[#ff9a8a]">
                  ĐÃ ẨN
                </div>
              )}
              <div className="p-2">
                <div className="line-clamp-1 text-[11px] text-white/85">{i.prompt}</div>
                <div className="mt-0.5 flex items-center justify-between text-[10px] text-white/40">
                  <span>{i.userId ? userMap.get(i.userId) ?? "?" : "—"}</span>
                  <span>{i.model}</span>
                </div>
                <div className="mt-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  {i.hidden ? (
                    <button
                      onClick={() => { unhideLibrary(i.id, adminIdent); toast({ type: "success", message: "Đã hiện ảnh" }); }}
                      className="flex-1 rounded border border-[#03e65b]/40 bg-[#03e65b]/10 px-1.5 py-0.5 text-[10px] text-[#7af1a5] hover:bg-[#03e65b]/20"
                    >
                      <Eye className="mx-auto h-3 w-3" />
                    </button>
                  ) : (
                    <button
                      onClick={() => { hideLibrary(i.id, "Vi phạm điều khoản", adminIdent); toast({ type: "info", message: "Đã ẩn ảnh" }); }}
                      className="flex-1 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-white/75 hover:bg-white/[0.08]"
                    >
                      <EyeOff className="mx-auto h-3 w-3" />
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteTarget({ kind: "library", id: i.id, name: i.prompt.slice(0, 30) })}
                    className="flex-1 rounded border border-[#ff5d4b]/40 bg-[#ff5d4b]/10 px-1.5 py-0.5 text-[10px] text-[#ff9a8a] hover:bg-[#ff5d4b]/20"
                  >
                    <Trash2 className="mx-auto h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "community" && (
        <div className="space-y-2">
          {filteredComm.length === 0 && (
            <EmptyState icon={ImageIcon} title="Chưa có community post" />
          )}
          {filteredComm.map((p) => (
            <div key={p.id} className={cn("flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.02] p-3", p.hidden && "opacity-50")}>
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-white/[0.04]">
                <img src={p.src} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-white">{p.authorName}</span>
                  {p.hidden && <span className="rounded-full border border-[#ff5d4b]/40 bg-[#ff5d4b]/15 px-1.5 py-0.5 text-[9px] font-semibold text-[#ff9a8a]">ĐÃ ẨN</span>}
                  <span className="rounded-full bg-white/[0.05] px-1.5 py-0.5 text-[9px] text-white/55">{p.model}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[12px] text-white/70">{p.prompt}</p>
                <div className="mt-1 flex items-center gap-3 text-[10px] text-white/40">
                  <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {p.likes}</span>
                  <span>{formatThousand(p.views)} views</span>
                  <span>{formatRelative(p.createdAt)}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {p.hidden ? (
                  <button
                    onClick={() => { unhideCommunity(p.id, adminIdent); toast({ type: "success", message: "Đã hiện post" }); }}
                    className="rounded border border-[#03e65b]/40 bg-[#03e65b]/10 px-2 py-0.5 text-[10px] text-[#7af1a5] hover:bg-[#03e65b]/20"
                  >
                    Hiện
                  </button>
                ) : (
                  <button
                    onClick={() => { hideCommunity(p.id, "Vi phạm điều khoản", adminIdent); toast({ type: "info", message: "Đã ẩn post" }); }}
                    className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/75 hover:bg-white/[0.08]"
                  >
                    Ẩn
                  </button>
                )}
                <button
                  onClick={() => setDeleteTarget({ kind: "community", id: p.id, name: p.prompt.slice(0, 30) })}
                  className="rounded border border-[#ff5d4b]/40 bg-[#ff5d4b]/10 px-2 py-0.5 text-[10px] text-[#ff9a8a] hover:bg-[#ff5d4b]/20"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "generations" && (
        <div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
          <table className="w-full text-left text-[12px]">
            <thead className="border-b border-white/10 text-[10px] uppercase tracking-wider text-white/40">
              <tr>
                <th className="px-3 py-2.5">Prompt</th>
                <th className="px-3 py-2.5">User</th>
                <th className="px-3 py-2.5">Model</th>
                <th className="px-3 py-2.5 text-right">Variations</th>
                <th className="px-3 py-2.5 text-right">Credit</th>
                <th className="px-3 py-2.5">Ngày</th>
                <th className="px-3 py-2.5 w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {filteredGens.length === 0 && (
                <tr><td colSpan={7} className="py-6"><EmptyState icon={ImageIcon} title="Chưa có generation" /></td></tr>
              )}
              {filteredGens.map((g) => (
                <tr key={g.id} className="text-white/80 hover:bg-white/[0.02]">
                  <td className="max-w-xs truncate px-3 py-2">{g.prompt}</td>
                  <td className="px-3 py-2 text-white/70">{g.userId ? userMap.get(g.userId) ?? "?" : "—"}</td>
                  <td className="px-3 py-2 text-white/55">{g.model}</td>
                  <td className="px-3 py-2 text-right font-mono">{g.variations.length}</td>
                  <td className="px-3 py-2 text-right font-mono text-white/70">{g.totalCredit}</td>
                  <td className="px-3 py-2 text-white/55">{formatRelative(g.createdAt)}</td>
                  <td className="px-3 py-2">
                    {g.userId && (
                      <Link href={`/admin/users/detail?id=${g.userId}`} className="text-white/40 hover:text-white">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title="Xóa vĩnh viễn?"
        description={
          deleteTarget && (
            <span>
              <strong className="text-white">&ldquo;{deleteTarget.name}&rdquo;</strong> sẽ bị xóa.{" "}
              <span className="text-[#ff9a8a]">Không thể khôi phục.</span>
            </span>
          )
        }
        confirmLabel="Xóa"
        variant="danger"
        onConfirm={() => {
          if (!deleteTarget) return;
          if (deleteTarget.kind === "library") {
            deleteLibrary(deleteTarget.id, adminIdent);
            toast({ type: "success", message: "Đã xóa ảnh" });
          } else if (deleteTarget.kind === "community") {
            deleteCommunity(deleteTarget.id, adminIdent);
            toast({ type: "success", message: "Đã xóa post" });
          } else {
            deleteGeneration(deleteTarget.id, adminIdent);
            toast({ type: "success", message: "Đã xóa generation" });
          }
          setDeleteTarget(null);
        }}
      />
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
