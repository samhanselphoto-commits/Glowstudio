"use client";

import { useEffect, useState } from "react";

/** Returns `true` after the component mounts on the client. Use to guard SSR. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
