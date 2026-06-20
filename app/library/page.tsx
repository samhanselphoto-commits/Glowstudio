"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  Coins,
  Plus,
  Download,
  Heart,
  Trash2,
  Grid3x3,
  LayoutGrid,
  X,
  Settings,
  AlertTriangle,
} from "lucide-react";

import { CreditChip } from "@/components/ui/credit-chip";
import { Modal } from "@/components/ui/modal";
import { LibraryCard } from "@/components/library/library-card";
import { toast } from "@/hooks/use-toast";
import { useLibrary } from "@/hooks/use-library";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/cn";
import { formatThousand } from "@/lib/format";

const folders = ["Tất cả", "Chung", "Sản phẩm", "Lookbook", "Marketing", "Moodboard", "Branding"];

export default function LibraryPage() {
  const mounted = useMounted();
  const { items, hydrated, removeMany, clear, seedDemo } = useLibrary();

  const [view, setView] = useState<"grid" | "masonry">("grid");
  const [folder, setFolder] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [settingsOpen, setSettingsOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = items;
    if (folder !== "Tất cả") list = list.filter((i) => i.folder === folder);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.prompt.toLowerCase().includes(q) ||
          i.model.toLowerCase().includes(q) ||
          i.folder.toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, folder, search]);

  const totalCreditUsed = items.reduce((s, i) => s + i.credit, 0);
  const privateCount = items.filter((i) => i.private).length;

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleDownloadSelected() {
    if (selected.size === 0) return;
    const list = items.filter((i) => selected.has(i.id));
    list.forEach((item, i) => {
      // Stagger downloads so browser doesn't block
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = item.src.startsWith("data:") ? item.src : item.src;
        a.download = `glowstudio-${item.id}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, i * 150);
    });
    toast({ type: "success", message: `Đang tải ${list.length} ảnh` });
  }

  function handleDeleteSelected() {
    if (selected.size === 0) return;
    const ids = Array.from(selected);
    removeMany(ids);
    setSelected(new Set());
    toast({ type: "success", message: `Đã xoá ${ids.length} ảnh khỏi Library` });
  }

  function handleClearAll() {
    clear();
    setSelected(new Set());
    toast({ type: "success", message: "Đã xoá tất cả ảnh" });
    setSettingsOpen(false);
  }

  function handleSeedDemo() {
    seedDemo();
    toast({ type: "success", message: "Đã seed 12 ảnh demo vào Library" });
    setSettingsOpen(false);
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 right-[10%] h-[500px] w-[800px] rounded-full bg-[#7c5cff]/10 blur-[140px]" />
      </div>

      <div className="relative">
        {/* Top nav */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff] shadow-[0_0_24px_rgba(124,92,255,0.55)]">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[15px] font-semibold tracking-tight">Glowstudio</span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              <Link href="/studio" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Studio</Link>
              <Link href="/community" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Community</Link>
              <Link href="/library" className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">Library</Link>
              <Link href="/pricing" className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">Pricing</Link>
            </nav>
            <div className="flex items-center gap-3">
              <CreditChip className="hidden sm:inline-flex" />
              <Link
                href="/studio"
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" /> Tạo mới
              </Link>
            </div>
          </div>
        </header>

        {/* Header */}
        <section className="px-6 pt-12 pb-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                  Library
                </p>
                <h1 className="mt-2 text-[48px] font-extrabold leading-[0.9] tracking-[-0.02em]">
                  Thư viện của bạn.
                </h1>
                <p className="mt-3 text-white/55">
                  {mounted && hydrated ? (
                    <>
                      {items.length} ảnh · đã dùng {formatThousand(totalCreditUsed)} credit · {privateCount} riêng tư
                    </>
                  ) : (
                    <span className="opacity-50">Đang tải…</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSettingsOpen(true)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs hover:bg-white/[0.08]"
                  type="button"
                >
                  <Settings className="h-3.5 w-3.5" /> Cài đặt
                </button>
                <Link
                  href="/studio"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-black hover:opacity-90"
                >
                  <Plus className="h-3.5 w-3.5" /> Tạo ảnh mới
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="sticky top-16 z-20 border-y border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm trong library…"
                  className="w-full rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-9 pr-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#7c5cff]/60"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {folders.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFolder(f)}
                    type="button"
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors",
                      folder === f
                        ? "bg-white text-black font-semibold"
                        : "border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="ml-auto flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-0.5">
                <button
                  onClick={() => setView("grid")}
                  className={cn("rounded-full p-1.5", view === "grid" ? "bg-[#7c5cff] text-white" : "text-white/60")}
                  title="Grid"
                  type="button"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setView("masonry")}
                  className={cn("rounded-full p-1.5", view === "masonry" ? "bg-[#7c5cff] text-white" : "text-white/60")}
                  title="Masonry"
                  type="button"
                >
                  <Grid3x3 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Selection action bar */}
        {selected.size > 0 && (
          <div className="sticky top-[122px] z-10 border-b border-[#7c5cff]/40 bg-[#7c5cff]/[0.08] backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-2.5 text-sm">
              <span className="text-white">
                Đã chọn <span className="font-semibold">{selected.size}</span> ảnh
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadSelected}
                  type="button"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 text-xs hover:bg-white/[0.08]"
                >
                  <Download className="h-3 w-3" /> Tải về
                </button>
                <button
                  type="button"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 text-xs hover:bg-white/[0.08]"
                  title="Tính năng đang phát triển"
                  onClick={() => toast({ type: "info", message: "Đăng Community sẽ có trong phiên bản kế tiếp" })}
                >
                  <Heart className="h-3 w-3" /> Đăng Community
                </button>
                <button
                  onClick={handleDeleteSelected}
                  type="button"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#ff5d4b]/30 bg-[#ff5d4b]/10 px-3 text-xs text-[#ff9a8a] hover:bg-[#ff5d4b]/20"
                >
                  <Trash2 className="h-3 w-3" /> Xóa
                </button>
                <button
                  onClick={() => setSelected(new Set())}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/5"
                  type="button"
                  aria-label="Bỏ chọn"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <section className="px-6 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 text-xs text-white/40">
              {mounted && hydrated ? (
                <>
                  {filtered.length} ảnh trong <span className="text-white/70">“{folder}”</span>
                  {search && <> · tìm <span className="text-white/70">“{search}”</span></>}
                </>
              ) : (
                "Đang tải…"
              )}
            </div>

            {!mounted || !hydrated ? (
              <SkeletonGrid view={view} />
            ) : filtered.length === 0 ? (
              <EmptyState folder={folder} hasAny={items.length > 0} />
            ) : view === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((item) => (
                  <LibraryCard
                    key={item.id}
                    item={item}
                    selected={selected.has(item.id)}
                    onSelect={() => toggleSelect(item.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                {filtered.map((item) => (
                  <LibraryCard
                    key={item.id}
                    item={item}
                    selected={selected.has(item.id)}
                    onSelect={() => toggleSelect(item.id)}
                    masonry
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 px-6 py-12">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#7c5cff]">
                <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold">Glowstudio</span>
              <span className="text-xs text-white/40">© 2026 · Hà Nội, Việt Nam</span>
            </div>
            <div className="flex items-center gap-5 text-xs text-white/50">
              <Link href="/studio" className="hover:text-white">Studio</Link>
              <Link href="/community" className="hover:text-white">Community</Link>
              <Link href="/library" className="hover:text-white">Library</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
              <Link href="/docs" className="hover:text-white">Docs</Link>
            </div>
          </div>
        </footer>
      </div>

      {/* Settings modal */}
      <Modal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        title="Cài đặt Library"
        description="Quản lý dữ liệu demo và reset library."
      >
        <div className="space-y-3">
          <div className="rounded-md border border-white/10 bg-white/[0.02] p-3 text-xs text-white/55">
            Hiện có <span className="font-semibold text-white">{items.length}</span> ảnh trong library
            {privateCount > 0 && <> · <span className="font-semibold text-white">{privateCount}</span> riêng tư</>}.
            Dữ liệu lưu trong trình duyệt (localStorage).
          </div>

          <button
            onClick={handleSeedDemo}
            type="button"
            className="flex w-full items-center justify-between rounded-md border border-[#7c5cff]/30 bg-[#7c5cff]/[0.08] px-3 py-2.5 text-sm transition-colors hover:bg-[#7c5cff]/[0.14]"
          >
            <span>
              <span className="font-semibold text-white">Seed dữ liệu demo</span>
              <div className="text-[11px] text-white/55">Thêm 12 ảnh mẫu vào library</div>
            </span>
            <Plus className="h-4 w-4 text-[#c8b8ff]" />
          </button>

          <button
            onClick={handleClearAll}
            type="button"
            className="flex w-full items-center justify-between rounded-md border border-[#ff5d4b]/30 bg-[#ff5d4b]/[0.08] px-3 py-2.5 text-sm transition-colors hover:bg-[#ff5d4b]/[0.14]"
          >
            <span>
              <span className="font-semibold text-[#ff9a8a]">Xoá tất cả</span>
              <div className="text-[11px] text-white/55">Library trống — bạn có thể seed lại sau</div>
            </span>
            <AlertTriangle className="h-4 w-4 text-[#ff9a8a]" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

function SkeletonGrid({ view }: { view: "grid" | "masonry" }) {
  if (view === "grid") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-[8.4px] bg-white/[0.04]" />
        ))}
      </div>
    );
  }
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="mb-4 break-inside-avoid animate-pulse rounded-[8.4px] bg-white/[0.04]"
          style={{ height: `${180 + (i % 3) * 60}px` }}
        />
      ))}
    </div>
  );
}

function EmptyState({ folder, hasAny }: { folder: string; hasAny: boolean }) {
  return (
    <div className="rounded-[8.4px] border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
      <p className="text-sm text-white/50">
        {hasAny
          ? `Không tìm thấy ảnh nào trong “${folder}”.`
          : "Library của bạn đang trống."}
      </p>
      <p className="mt-2 text-xs text-white/30">
        Tạo ảnh đầu tiên trong Studio, hoặc vào Cài đặt để seed dữ liệu demo.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/studio"
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-semibold text-black hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" /> Tạo ảnh mới
        </Link>
        {!hasAny && (
          <Link
            href="/community"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 text-xs hover:bg-white/[0.08]"
          >
            Khám phá Community
          </Link>
        )}
      </div>
    </div>
  );
}
