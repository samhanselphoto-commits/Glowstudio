"use client";

import { useEffect } from "react";
import { seedIfEmpty } from "@/lib/seed";
import { adminSeedIfEmpty } from "@/lib/admin-seed";

/** Mounted once in the root layout; seeds both public + admin data on first visit. */
export function SeedOnMount() {
  useEffect(() => {
    seedIfEmpty();
    adminSeedIfEmpty();
  }, []);
  return null;
}
