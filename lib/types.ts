export type AspectRatio = "1:1" | "4:3" | "3:4" | "16:9" | "9:16";

export const ASPECT_RATIOS: AspectRatio[] = ["1:1", "4:3", "3:4", "16:9", "9:16"];

export type ModelName =
  | "GPT Image"
  | "NANO BANANA"
  | "Flux Pro"
  | "Zturbo"
  | "Ideogram"
  | "Recraft v3";

export const MODEL_NAMES: ModelName[] = [
  "GPT Image",
  "NANO BANANA",
  "Flux Pro",
  "Zturbo",
  "Ideogram",
  "Recraft v3",
];

export function isModelName(value: string): value is ModelName {
  return (MODEL_NAMES as string[]).includes(value);
}

export type ModelTag = "Free" | "Pro" | "Beta";

export type Variation = {
  id: string;
  src: string; // dataURL or /hero/studio-N.png
  seed: number;
  liked?: boolean;
};

export type Generation = {
  id: string;
  prompt: string;
  model: ModelName;
  aspect: AspectRatio;
  style?: string;
  refs?: string[]; // base64 dataURLs
  variations: Variation[];
  totalCredit: number;
  createdAt: number;
  userId?: string;
};

export type LibraryItem = {
  id: string; // = generationId:variationId
  src: string;
  prompt: string;
  model: ModelName;
  aspect: AspectRatio;
  credit: number;
  folder: string; // default "Chung"
  private: boolean;
  liked: boolean;
  createdAt: number;
  // Optional provenance
  generationId?: string;
  variationId?: string;
  source?: "generate" | "inpaint" | "upscale" | "reuse" | "demo";
  // Admin moderation
  userId?: string;
  hidden?: boolean;
  hiddenReason?: string;
};

export type ToastItem = {
  id: string;
  type: "success" | "error" | "info" | "credit";
  message: string;
  createdAt: number;
};

export type CreditLog = {
  id: string;
  delta: number; // negative for spend, positive for top-up
  reason: string;
  createdAt: number;
  userId?: string; // optional, present for per-user tracking
  source?: "generate" | "inpaint" | "upscale" | "topup" | "admin_adjust" | "signup_bonus";
};

// === Admin system types ===

export type AdminRole = "super_admin" | "admin" | "moderator";
export type UserStatus = "active" | "banned" | "suspended";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  avatar?: string;
  createdAt: number;
  lastLoginAt?: number;
  /** Mock password hash (base64). MOCK ONLY — never use in production. */
  passwordHash: string;
};

export type EndUser = {
  id: string;
  email: string;
  name: string;
  status: UserStatus;
  credits: number;
  totalSpent: number;
  signupBonusClaimed: boolean;
  avatar?: string;
  createdAt: number;
  lastSeenAt?: number;
  bannedAt?: number;
  banReason?: string;
};

export type AdminActionType =
  | "user.create"
  | "user.update"
  | "user.delete"
  | "user.ban"
  | "user.unban"
  | "user.suspend"
  | "user.reactivate"
  | "user.status.change"
  | "credit.topup"
  | "credit.adjust"
  | "credit.bulk_bonus"
  | "content.hide"
  | "content.unhide"
  | "content.delete"
  | "settings.update"
  | "auth.login"
  | "auth.logout";

export type AdminAction = {
  id: string;
  adminId: string;
  adminName: string;
  type: AdminActionType;
  target?: string;
  details?: string;
  createdAt: number;
};

export type UserActivityType =
  | "signup"
  | "login"
  | "generate"
  | "inpaint"
  | "upscale"
  | "library_add"
  | "community_post"
  | "credit_spend";

export type UserActivity = {
  id: string;
  userId: string;
  type: UserActivityType;
  payload?: Record<string, unknown>;
  createdAt: number;
};

export type ModelPricing = Record<ModelName, { credit: number; enabled: boolean }>;

export type SystemSettings = {
  creditPerDollar: number;
  signupBonus: number;
  maintenanceMode: boolean;
  signupEnabled: boolean;
  pricing: ModelPricing;
  updatedAt: number;
  updatedBy: string;
};

export type CommunityPost = {
  id: string;
  userId: string;
  authorName: string;
  authorAvatar?: string;
  prompt: string;
  model: ModelName;
  src: string;
  aspect: AspectRatio;
  likes: number;
  views: number;
  hidden?: boolean;
  hiddenReason?: string;
  createdAt: number;
};

/** Optional hidden flag on library items for moderation. */
declare module "./types" {
  // Augment via type intersection on LibraryItem in the future; for now we cast.
}
