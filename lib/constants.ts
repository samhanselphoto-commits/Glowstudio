// 3 model AI — section 8.4
export const MODELS = [
  { id: "gpt-image", name: "GPT Image", cost: 8 },
  { id: "nano-banana", name: "NANO BANANA", cost: 6 },
  { id: "zturbo", name: "Zturbo", cost: 2 },
] as const;

// 5 aspect ratio — section 8.4
export const ASPECT_RATIOS = ["1:1", "4:5", "3:4", "16:9", "9:16"] as const;

// Nav links — section 8.1
export const NAV_LINKS = [
  { label: "Tạo ảnh", href: "/app/studio" },
  { label: "Thư viện", href: "/app/library" },
  { label: "Cộng đồng", href: "/community" },
  { label: "Giá", href: "/pricing" },
  { label: "Tài liệu", href: "/docs" },
  { label: "Liên hệ", href: "/contact" },
] as const;

// Library folders — section 7.5
export const FOLDERS = [
  { id: "all", name: "Tất cả ảnh", count: 0, active: true },
  { id: "liked", name: "Đã thích", count: 0 },
  { id: "recent", name: "Gần đây", count: 0 },
  { id: "trash", name: "Thùng rác", count: 0 },
] as const;

// Studio left rail tools — section 8.4
export const STUDIO_TOOLS = [
  { id: "create", label: "Tạo ảnh", active: true },
  { id: "style-ref", label: "Style ref" },
  { id: "inpaint", label: "Inpaint" },
  { id: "upscale", label: "Upscale" },
  { id: "batch", label: "Batch" },
] as const;

// Account sidebar — section 8.6
export const ACCOUNT_LINKS = [
  { label: "Hồ sơ", href: "/app/account", active: true },
  { label: "Thanh toán", href: "/app/account/billing" },
  { label: "Credits", href: "/app/account/credits" },
  { label: "API", href: "/app/account/api" },
  { label: "Đăng xuất", href: "/logout" },
] as const;

// Tag palette colors — 6 màu (chỉ dùng cho TagChip)
export const TAG_COLORS = [
  "lime",
  "yellow",
  "pink",
  "coral",
  "plasma",
  "blue",
] as const;

export type TagColor = (typeof TAG_COLORS)[number];
