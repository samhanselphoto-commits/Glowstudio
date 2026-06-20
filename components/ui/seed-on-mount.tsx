"use client";

import { useEffect } from "react";
import { seedIfEmpty } from "@/lib/seed";

/** Mounted once in the root layout; calls seedIfEmpty on first visit. */
export function SeedOnMount() {
  useEffect(() => {
    seedIfEmpty();
  }, []);
  return null;
}
