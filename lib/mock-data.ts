import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Palette,
  Brush,
  Layers,
  Zap,
  Award,
} from "lucide-react";

/** picsum.photos URL with explicit dimensions to prevent layout shift */
const img = (seed: string, w = 800, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export type FeatureIconName =
  | "Sparkles"
  | "Palette"
  | "Brush"
  | "Layers"
  | "Zap"
  | "Award";

/** Map icon name → component. Used in client components to render the icon. */
export const featureIconMap: Record<FeatureIconName, LucideIcon> = {
  Sparkles,
  Palette,
  Brush,
  Layers,
  Zap,
  Award,
};

// ============================================================
// GALLERY — landing showcase (8 items)
// ============================================================
export const galleryShowcase = [
  { id: "g1", url: img("glow-1"), title: "Lookbook 1" },
  { id: "g2", url: img("glow-2"), title: "Sản phẩm 1" },
  { id: "g3", url: img("glow-3"), title: "Social 1" },
  { id: "g4", url: img("glow-4"), title: "Concept 1" },
  { id: "g5", url: img("glow-5"), title: "Lookbook 2" },
  { id: "g6", url: img("glow-6"), title: "Sản phẩm 2" },
  { id: "g7", url: img("glow-7"), title: "Social 2" },
  { id: "g8", url: img("glow-8"), title: "Concept 2" },
];

// ============================================================
// GALLERY — full feed với category + tag color (24 items)
// ============================================================
export type GalleryItem = {
  id: string;
  url: string;
  title: string;
  category: "Lookbook" | "Sản phẩm" | "Social" | "Concept art";
  tagColor: "lime" | "yellow" | "pink" | "coral" | "plasma" | "blue";
};

const CATEGORIES: GalleryItem["category"][] = [
  "Lookbook",
  "Sản phẩm",
  "Social",
  "Concept art",
];
const TAG_COLORS: GalleryItem["tagColor"][] = [
  "lime",
  "yellow",
  "pink",
  "coral",
  "plasma",
  "blue",
];

export const galleryAll: GalleryItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: `ga-${i + 1}`,
  url: img(`gallery-${i + 1}`),
  title: `Ảnh ${i + 1}`,
  category: CATEGORIES[i % 4],
  tagColor: TAG_COLORS[i % 6],
}));

// ============================================================
// FEATURES — landing features grid
// ============================================================
export type Feature = {
  icon: FeatureIconName;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: "Sparkles",
    title: "3 model AI mạnh mẽ",
    description:
      "GPT Image, NANO BANANA, Zturbo — chọn model phù hợp từng brief, từ lookbook cao cấp đến social post nhanh.",
  },
  {
    icon: "Palette",
    title: "Style reference",
    description:
      "Upload ảnh tham chiếu, AI giữ nguyên palette, mood và composition. On-brand mọi lúc.",
  },
  {
    icon: "Brush",
    title: "Inpaint thông minh",
    description:
      "Tô vùng cần sửa, mô tả thay đổi — ảnh mới ra khớp phần còn lại đến từng pixel.",
  },
  {
    icon: "Layers",
    title: "Batch generation",
    description:
      "Một prompt, 4 variation. Tạo cả set ảnh sản phẩm trong vài giây, không phải ngồi lặp lại.",
  },
  {
    icon: "Zap",
    title: "Credit minh bạch",
    description:
      "Hiển thị rõ cost trước khi tạo. Mua thêm gói top-up 100–5.000 credits, hạn 12 tháng.",
  },
  {
    icon: "Award",
    title: "Brand kit riêng",
    description:
      "Lưu logo, font, palette của thương hiệu. Mọi ảnh ra đều áp dụng tự động.",
  },
];

// ============================================================
// PLANS — pricing tiers
// ============================================================
export type Plan = {
  id: string;
  name: string;
  tag: string | null;
  price: number; // VND
  credits: number;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    tag: "Miễn phí",
    price: 0,
    credits: 50,
    description: "Dùng thử Zturbo, không cần thẻ",
    features: [
      "50 credits / tháng",
      "Model Zturbo",
      "Ảnh watermark nhỏ",
      "Cộng đồng gallery",
    ],
    cta: "Đăng ký miễn phí",
  },
  {
    id: "pro",
    name: "Pro",
    tag: "Phổ biến nhất",
    price: 399000,
    credits: 2000,
    description: "Cho freelancer và creator",
    features: [
      "2.000 credits / tháng",
      "Tất cả 3 model",
      "Không watermark",
      "Style reference",
      "Inpaint + Upscale",
      "Batch generation",
    ],
    popular: true,
    cta: "Bắt đầu Pro",
  },
  {
    id: "max",
    name: "Max",
    tag: null,
    price: 999000,
    credits: 6000,
    description: "Cho team nhỏ và agency",
    features: [
      "6.000 credits / tháng",
      "Tất cả model + ưu tiên queue",
      "5 thành viên team",
      "Brand kit riêng",
      "API access",
      "Hỗ trợ ưu tiên",
    ],
    cta: "Bắt đầu Max",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tag: "Liên hệ",
    price: 0,
    credits: 0,
    description: "API, SSO, brand kit riêng",
    features: [
      "Custom credits",
      "SSO + SCIM",
      "Onboarding riêng",
      "SLA 99.9%",
      "Account manager",
    ],
    cta: "Liên hệ sales",
  },
];

// ============================================================
// TOP-UP PACKS
// ============================================================
export const topupPacks = [
  { id: "tu-100", credits: 100, price: 99000 },
  { id: "tu-500", credits: 500, price: 449000 },
  { id: "tu-2000", credits: 2000, price: 1590000 },
  { id: "tu-5000", credits: 5000, price: 3690000 },
];

// ============================================================
// FAQ
// ============================================================
export const faqItems = [
  {
    q: "Glowstudio dùng cho ai?",
    a: "Designer, marketer, content creator Việt Nam cần tạo ảnh nhanh và on-brand — từ lookbook thời trang, ảnh sản phẩm, đến social post.",
  },
  {
    q: "Credit tính như thế nào?",
    a: "Mỗi lượt tạo tốn từ 2 đến 8 credits tùy model. Zturbo rẻ nhất (2c), GPT Image chất lượng cao nhất (8c). Bạn thấy cost trước khi bấm Tạo.",
  },
  {
    q: "Tôi có thể dùng ảnh thương mại không?",
    a: "Có. Ảnh tạo ra từ gói Pro trở lên thuộc quyền sử dụng thương mại của bạn. Gói Free có watermark nhỏ ở góc.",
  },
  {
    q: "Style reference hoạt động ra sao?",
    a: "Upload 1–3 ảnh tham chiếu, AI sẽ giữ palette, mood và composition. Bạn vẫn viết prompt riêng — tham chiếu chỉ là 'anchor' phong cách.",
  },
  {
    q: "Tôi có thể hủy gói không?",
    a: "Được. Hủy bất kỳ lúc nào trong Cài đặt → Thanh toán. Credits đã mua không hoàn tiền nhưng giữ nguyên đến hết hạn 12 tháng.",
  },
  {
    q: "Glowstudio có hỗ trợ tiếng Việt không?",
    a: "Có, UI 100% tiếng Việt. Prompt bạn viết tiếng Việt hay tiếng Anh đều được — model AI đa ngôn ngữ.",
  },
];

// ============================================================
// COMMUNITY — masonry gallery
// ============================================================
export type CommunityItem = {
  id: string;
  url: string;
  creator: { name: string; avatar: string };
  likes: number;
};

export const communityImages: CommunityItem[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: `c-${i + 1}`,
    url: img(`community-${i + 1}`, 600, 600 + (i % 4) * 100),
    creator: {
      name: ["Mai Linh", "Quang Minh", "Hà Trang", "Đức Anh", "Phương Thảo"][
        i % 5
      ],
      avatar: img(`avatar-${i % 5}`, 100, 100),
    },
    likes: 24 + (i * 7) % 380,
  }),
);

// ============================================================
// FOOTER
// ============================================================
export const footerSections = [
  {
    title: "Sản phẩm",
    links: [
      { label: "Tạo ảnh", href: "/app/studio" },
      { label: "Thư viện", href: "/app/library" },
      { label: "Cộng đồng", href: "/community" },
      { label: "Bảng giá", href: "/pricing" },
    ],
  },
  {
    title: "Tài nguyên",
    links: [
      { label: "Tài liệu", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "API", href: "/docs/api" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Công ty",
    links: [
      { label: "Về chúng tôi", href: "/about" },
      { label: "Liên hệ", href: "/contact" },
      { label: "Tuyển dụng", href: "/careers" },
      { label: "Báo chí", href: "/press" },
    ],
  },
];
