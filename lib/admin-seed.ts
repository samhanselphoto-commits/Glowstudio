/**
 * Admin seed data. Idempotent via KEY.adminSeeded.
 *
 * Tạo sẵn:
 * - 2 admin users (1 super_admin, 1 moderator) với mock credentials
 * - 12 end users Việt Nam, role/status/totalSpent đa dạng
 * - 30 generations phân bổ users
 * - 80 library items
 * - 50 credit transactions
 * - 30 user activity events
 * - 20 admin actions (audit history)
 * - 10 community posts
 * - Default SystemSettings
 *
 * NOTE: app/community/page.tsx hiện render từ data inline.
 * Admin content moderation tab dùng data từ KEY.communityPosts (duplication chấp nhận được ở mockup).
 */

import { KEY, getJSON, getString, setJSON } from "./storage";
import { MODEL_OPTIONS } from "./models";
import type {
  AdminUser,
  CommunityPost,
  CreditLog,
  EndUser,
  LibraryItem,
  Generation,
  ModelName,
  SystemSettings,
  UserActivity,
  UserStatus,
  AdminAction,
} from "./types";

/** Make a stable id with prefix. */
export function makeId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.floor(Math.random() * 1e6).toString(36)}`;
}

/** Mock password "hash" — base64. MOCK ONLY, never use in production. */
export function mockHash(plain: string): string {
  if (typeof window === "undefined") return "";
  try {
    return window.btoa(unescape(encodeURIComponent(plain)));
  } catch {
    return plain;
  }
}

export function mockVerify(plain: string, hash: string): boolean {
  return mockHash(plain) === hash;
}

// === Timestamps (computed once at module init) ===
const NOW = Date.now();
const day = 24 * 60 * 60 * 1000;
const ago = (d: number) => NOW - d * day;
const agoMs = (ms: number) => NOW - ms;

// === Default settings (uses current MODEL_OPTIONS pricing) ===
export const DEFAULT_SETTINGS: SystemSettings = {
  creditPerDollar: 100,
  signupBonus: 100,
  maintenanceMode: false,
  signupEnabled: true,
  pricing: MODEL_OPTIONS.reduce((acc, m) => {
    acc[m.name] = { credit: m.credit, enabled: true };
    return acc;
  }, {} as SystemSettings["pricing"]),
  updatedAt: NOW,
  updatedBy: "system",
};

// === Admin seed ===
const ADMIN_SEED: AdminUser[] = [
  {
    id: "adm_001",
    email: "admin@glowstudio.vn",
    name: "Nguyễn Minh Khoa",
    role: "super_admin",
    avatar: "hero/studio-1.png",
    createdAt: ago(120),
    lastLoginAt: ago(0.1),
    passwordHash: mockHash("Glowstudio@2026"),
  },
  {
    id: "adm_002",
    email: "mod@glowstudio.vn",
    name: "Trần Khánh Linh",
    role: "moderator",
    avatar: "hero/studio-2.png",
    createdAt: ago(80),
    lastLoginAt: ago(0.5),
    passwordHash: mockHash("Mod@2026"),
  },
];

// === End users seed ===
const END_USERS_SEED: EndUser[] = [
  { id: "usr_001", email: "linh.nguyen@studio.vn", name: "Nguyễn Khánh Linh", status: "active", credits: 1488, totalSpent: 320, signupBonusClaimed: true, avatar: "hero/studio-1.png", createdAt: ago(45), lastSeenAt: ago(0.1) },
  { id: "usr_002", email: "minh.pham@brand.vn", name: "Phạm Quang Minh", status: "active", credits: 720, totalSpent: 580, signupBonusClaimed: true, avatar: "hero/studio-2.png", createdAt: ago(38), lastSeenAt: ago(0.3) },
  { id: "usr_003", email: "hoa.tran@design.vn", name: "Trần Thanh Hoa", status: "active", credits: 2840, totalSpent: 1620, signupBonusClaimed: true, avatar: "hero/studio-3.png", createdAt: ago(30), lastSeenAt: ago(0.05) },
  { id: "usr_004", email: "tuan.le@marketing.vn", name: "Lê Anh Tuấn", status: "active", credits: 510, totalSpent: 890, signupBonusClaimed: true, avatar: "hero/studio-1.png", createdAt: ago(25), lastSeenAt: ago(1) },
  { id: "usr_005", email: "mai.bui@art.vn", name: "Bùi Thị Tuyết Mai", status: "active", credits: 1240, totalSpent: 460, signupBonusClaimed: true, avatar: "hero/studio-2.png", createdAt: ago(22), lastSeenAt: ago(0.5) },
  { id: "usr_006", email: "duc.vo@photo.vn", name: "Võ Hoàng Đức", status: "banned", credits: 12, totalSpent: 188, signupBonusClaimed: true, avatar: "hero/studio-3.png", createdAt: ago(18), lastSeenAt: ago(7), bannedAt: ago(3), banReason: "Vi phạm bản quyền" },
  { id: "usr_007", email: "thu.dang@illu.vn", name: "Đặng Phương Thu", status: "active", credits: 3680, totalSpent: 920, signupBonusClaimed: true, avatar: "hero/studio-1.png", createdAt: ago(15), lastSeenAt: ago(0.2) },
  { id: "usr_008", email: "long.ngo@3d.vn", name: "Ngô Bảo Long", status: "suspended", credits: 0, totalSpent: 220, signupBonusClaimed: true, avatar: "hero/studio-2.png", createdAt: ago(12), lastSeenAt: ago(4), bannedAt: ago(2), banReason: "Tạm khóa — chờ xác minh" },
  { id: "usr_009", email: "han.pham@startup.vn", name: "Phạm Thúy Hân", status: "active", credits: 920, totalSpent: 380, signupBonusClaimed: true, avatar: "hero/studio-3.png", createdAt: ago(10), lastSeenAt: ago(0.8) },
  { id: "usr_010", email: "kiet.ly@freelance.vn", name: "Lý Tuấn Kiệt", status: "active", credits: 1560, totalSpent: 740, signupBonusClaimed: true, avatar: "hero/studio-1.png", createdAt: ago(8), lastSeenAt: ago(0.4) },
  { id: "usr_011", email: "tram.do@content.vn", name: "Đỗ Bích Trâm", status: "active", credits: 480, totalSpent: 120, signupBonusClaimed: true, avatar: "hero/studio-2.png", createdAt: ago(5), lastSeenAt: ago(1.2) },
  { id: "usr_012", email: "nam.bui@new.vn", name: "Bùi Hải Nam", status: "active", credits: 200, totalSpent: 0, signupBonusClaimed: true, avatar: "hero/studio-3.png", createdAt: ago(1), lastSeenAt: ago(0.05) },
];

// === Generations seed (phân bổ qua users) ===
const PROMPTS = [
  "Bento UI dashboard cho SaaS productivity, soft gradient tím",
  "Editorial fashion, cinematic teal & amber grading",
  "Sản phẩm skincare trên marble trắng, soft shadow",
  "Poster quảng cáo Tết 2026 với typography tiếng Việt",
  "Moodboard concept quán cà phê Hà Nội, vintage gạch bông",
  "Logo + brand guideline cho studio nhỏ, vector sạch",
  "Minh họa trẻ em đọc sách, màu nước ấm, vintage",
  "Mockup tai nghe bluetooth trên nền pastel, soft 3D",
  "Travel editorial Vịnh Hạ Long, drone golden hour",
  "Quick test bảng màu gradient tím sang hồng",
  "Bảng hiệu quán ăn tên Việt, typography đặc trưng",
  "Chân dung nghệ thuật, ánh sáng Rembrandt",
  "Lookbook streetwear Sài Gòn, neon cyberpunk",
  "Moodboard trang sức bạc, soft 3D clay",
  "Sản phẩm nước hoa nam, glass reflection",
  "Background zoom meeting minimalist gradient",
  "Packaging bánh trung thu 2026, luxury",
  "Thời trang công sở nữ, pastel mint & cream",
  "Quán cà phê rooftop Đà Lạt, sương mù sáng sớm",
  "Bìa sách văn học Việt, typography cổ điển",
];

const FOLDERS = ["Sản phẩm", "Lookbook", "Marketing", "Moodboard", "Branding"];
const ASPECTS: LibraryItem["aspect"][] = ["1:1", "4:3", "3:4", "16:9", "9:16"];
const SRCS = ["hero/studio-1.png", "hero/studio-2.png", "hero/studio-3.png"];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

function buildGenerations(): Generation[] {
  const list: Generation[] = [];
  for (let i = 0; i < 30; i++) {
    const user = END_USERS_SEED[i % END_USERS_SEED.length];
    const model = MODEL_OPTIONS[i % MODEL_OPTIONS.length];
    const gen: Generation = {
      id: `gen_${1000 + i}`,
      prompt: pick(PROMPTS, i),
      model: model.name,
      aspect: pick(ASPECTS, i),
      style: i % 3 === 0 ? "Cinematic" : i % 3 === 1 ? "Editorial" : "Studio minimal",
      variations: Array.from({ length: 4 }, (_, v) => ({
        id: `v${v + 1}`,
        src: pick(SRCS, i + v),
        seed: i * 100 + v,
      })),
      totalCredit: model.credit * 4,
      createdAt: ago(i * 0.7),
      userId: user.id,
    };
    list.push(gen);
  }
  return list;
}

function buildLibrary(): LibraryItem[] {
  const list: LibraryItem[] = [];
  for (let i = 0; i < 80; i++) {
    const user = END_USERS_SEED[i % END_USERS_SEED.length];
    const model = MODEL_OPTIONS[i % MODEL_OPTIONS.length];
    const gen = buildGenerations()[i % 30];
    const folder = pick(FOLDERS, i);
    const item: LibraryItem = {
      id: `lib_${2000 + i}`,
      src: pick(SRCS, i),
      prompt: pick(PROMPTS, i),
      model: model.name,
      aspect: pick(ASPECTS, i),
      credit: model.credit,
      folder,
      private: i % 4 === 0,
      liked: i % 5 === 0,
      createdAt: ago(i * 0.4),
      source: i % 3 === 0 ? "generate" : "demo",
      userId: user.id,
      hidden: i === 17 || i === 43, // 2 demo hidden items
    };
    void gen;
    list.push(item);
  }
  return list;
}

function buildCreditLogs(): CreditLog[] {
  const logs: CreditLog[] = [];
  for (let i = 0; i < 50; i++) {
    const user = END_USERS_SEED[i % END_USERS_SEED.length];
    const isSpend = i % 3 !== 0;
    const amount = isSpend
      ? -((i % 5 + 1) * 8 + 4)
      : (i % 4 + 1) * 100;
    logs.push({
      id: `cl_${3000 + i}`,
      delta: amount,
      reason: isSpend
        ? pick(["Generate ảnh", "Inpaint", "Upscale 4×", "Variation"], i)
        : pick(["Top-up Pro Max", "Sign-up bonus", "Admin bonus", "Promotion Tết"], i),
      createdAt: ago(i * 0.5),
      userId: user.id,
      source: isSpend ? "generate" : "topup",
    });
  }
  return logs;
}

function buildUserActivity(): UserActivity[] {
  const acts: UserActivity[] = [];
  for (let i = 0; i < 30; i++) {
    const user = END_USERS_SEED[i % END_USERS_SEED.length];
    const types: UserActivity["type"][] = ["generate", "inpaint", "upscale", "library_add", "community_post", "credit_spend"];
    acts.push({
      id: `act_${4000 + i}`,
      userId: user.id,
      type: pick(types, i),
      createdAt: agoMs(i * 60 * 60 * 1000),
    });
  }
  return acts;
}

function buildAuditLog(): AdminAction[] {
  const actions: AdminAction[] = [];
  for (let i = 0; i < 20; i++) {
    const admin = ADMIN_SEED[i % ADMIN_SEED.length];
    const types: AdminAction["type"][] = [
      "user.ban", "user.unban", "credit.topup", "credit.adjust", "content.hide", "settings.update", "user.update",
    ];
    const user = END_USERS_SEED[i % END_USERS_SEED.length];
    actions.push({
      id: `aud_${5000 + i}`,
      adminId: admin.id,
      adminName: admin.name,
      type: pick(types, i),
      target: user.id,
      details: `Mock action #${i + 1}`,
      createdAt: ago(i * 0.3),
    });
  }
  return actions;
}

function buildCommunityPosts(): CommunityPost[] {
  const posts: CommunityPost[] = [];
  for (let i = 0; i < 10; i++) {
    const user = END_USERS_SEED[i % END_USERS_SEED.length];
    const model = MODEL_OPTIONS[i % MODEL_OPTIONS.length];
    posts.push({
      id: `cp_${6000 + i}`,
      userId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      prompt: pick(PROMPTS, i),
      model: model.name,
      src: pick(SRCS, i),
      aspect: pick(ASPECTS, i),
      likes: 12 + i * 7,
      views: 80 + i * 25,
      hidden: i === 5,
      createdAt: ago(i * 0.6),
    });
  }
  return posts;
}

/** Idempotent. Returns true nếu đã seed lần đầu. */
export function adminSeedIfEmpty(): boolean {
  if (typeof window === "undefined") return false;
  if (getString(KEY.adminSeeded) === "v1") return false;

  setJSON(KEY.adminUsers, ADMIN_SEED);
  setJSON(KEY.endUsers, END_USERS_SEED);
  setJSON(KEY.communityPosts, buildCommunityPosts());
  setJSON(KEY.auditLog, buildAuditLog());
  setJSON(KEY.userActivity, buildUserActivity());
  setJSON(KEY.systemSettings, DEFAULT_SETTINGS);

  // Build generations + library if not present (preserve existing public seed)
  if (getJSON<Generation[]>(KEY.generations) == null) {
    setJSON(KEY.generations, buildGenerations());
  }
  if (getJSON<LibraryItem[]>(KEY.library) == null) {
    setJSON(KEY.library, buildLibrary());
  }
  if (getJSON<CreditLog[]>(KEY.creditLog) == null) {
    setJSON(KEY.creditLog, buildCreditLogs());
  }

  // Current user default
  if (getString(KEY.currentUser) == null) {
    try {
      window.localStorage.setItem(KEY.currentUser, "usr_001");
    } catch { /* noop */ }
  }

  try {
    window.localStorage.setItem(KEY.adminSeeded, "v1");
  } catch { /* noop */ }
  return true;
}

// Re-export status type for convenience
export type { UserStatus };
