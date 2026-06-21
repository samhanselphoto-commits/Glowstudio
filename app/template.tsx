"use client";

// Template intentionally minimal — page transitions live in `layout.tsx`
// so AnimatePresence sees a stable parent that just re-renders on
// pathname change. Putting it here (in template, which re-mounts on every
// nav) caused the exit animation to never fire in production.

export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}