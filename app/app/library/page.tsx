"use client";

import * as React from "react";
import Link from "next/link";
import {
  ImageCard,
  EmptyState,
  CreditBadge,
  TabFilterRow,
} from "@/components/ui";
import { FOLDERS } from "@/lib/constants";
import { FolderIcon, PlusIcon, ImageLucideIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const TABS = ["Tất cả", "Đã thích", "Gần đây", "Thùng rác"];

export default function LibraryPage() {
  const [activeFolder, setActiveFolder] = React.useState<string>(FOLDERS[0].id);
  const [activeTab, setActiveTab] = React.useState(TABS[0]);

  // Mock: empty for first render; user clicks "+ Tạo ảnh mới" → /app/studio
  const images: { id: string; url: string; title?: string }[] = [];

  return (
    <div className="min-h-screen bg-midnight flex">
      {/* Sidebar */}
      <aside className="w-[240px] border-r border-mist/10 p-5 flex flex-col gap-1 sticky top-0 h-screen overflow-y-auto">
        <Link
          href="/app/studio"
          className={cn(
            "rounded-full bg-bone-white text-midnight",
            "px-5 py-2.5 text-sm font-medium mb-5",
            "inline-flex items-center justify-center gap-2",
            "hover:bg-fog transition",
          )}
        >
          <PlusIcon className="w-4 h-4" /> Tạo ảnh mới
        </Link>

        {FOLDERS.map((folder) => {
          const isActive = folder.id === activeFolder;
          return (
            <button
              key={folder.id}
              type="button"
              onClick={() => setActiveFolder(folder.id)}
              className={cn(
                "relative rounded-md px-4 py-2.5",
                "text-sm font-medium",
                "flex items-center gap-2",
                "transition text-left",
                isActive
                  ? "bg-aurora-soft text-bone-white"
                  : "text-ash-text hover:text-bone-white hover:bg-obsidian",
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-aurora-violet" />
              )}
              <FolderIcon className="w-4 h-4" />
              {folder.name}
              <span className="ml-auto text-xs text-charcoal-mute">
                {folder.count}
              </span>
            </button>
          );
        })}

        <div className="mt-auto pt-5 border-t border-mist/10">
          <CreditBadge credits={1247} className="w-full justify-center" />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-7">
        <div className="flex items-center justify-between mb-7 gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <input
              placeholder="Tìm ảnh..."
              className={cn(
                "flex-1 rounded-full",
                "border border-mist bg-obsidian",
                "px-5 py-2.5 text-sm text-bone-white",
                "outline-none placeholder:text-charcoal-mute",
                "focus:border-aurora-violet transition",
              )}
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <TabFilterRow
              tabs={TABS}
              active={activeTab}
              onChange={setActiveTab}
            />
            <select
              className={cn(
                "rounded-full border border-mist bg-obsidian",
                "px-4 py-2 text-sm text-bone-white",
                "outline-none cursor-pointer",
              )}
              defaultValue="newest"
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="liked">Nhiều like nhất</option>
            </select>
          </div>
        </div>

        {images.length === 0 ? (
          <EmptyState
            icon={<ImageLucideIcon className="w-16 h-16" />}
            title="Chưa có ảnh nào"
            description="Hãy tạo ảnh đầu tiên của bạn. Mỗi ảnh tiêu tốn từ 2 đến 8 credits tùy model."
            cta="Tạo ảnh ngay"
            ctaHref="/app/studio"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {images.map((img) => (
              <ImageCard key={img.id} src={img.url} alt={img.title ?? ""} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
