/**
 * SSR-safe typed localStorage wrapper.
 * Reads return `null` on the server (no `window`).
 * Writes are silent on the server too.
 */

export const KEY = {
  library: "glowstudio:library",
  generations: "glowstudio:generations",
  credits: "glowstudio:credits",
  creditLog: "glowstudio:credit-log",
  seeded: "glowstudio:seeded:v1",
  // Admin system
  adminSession: "glowstudio:admin-session",
  adminUsers: "glowstudio:admin-users",
  endUsers: "glowstudio:end-users",
  currentUser: "glowstudio:current-user",
  userActivity: "glowstudio:user-activity",
  auditLog: "glowstudio:audit-log",
  systemSettings: "glowstudio:system-settings",
  communityPosts: "glowstudio:community-posts",
  adminSeeded: "glowstudio:admin-seeded:v1",
} as const;

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getJSON<T>(key: string): T | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setJSON<T>(key: string, value: T): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    // QuotaExceededError or other
    console.warn(`[storage] setJSON(${key}) failed:`, err);
    return false;
  }
}

export function removeKey(key: string) {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

export function getString(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setString(key: string, value: string): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`[storage] setString(${key}) failed:`, err);
    return false;
  }
}
