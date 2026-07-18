"use client";

import { useEffect } from "react";

/**
 * Warn on refresh/close while an attempt is running. Covers full page unloads
 * only; in-app navigation is already limited by focus mode hiding the chrome.
 * Mount-scoped on purpose: runners unmount when the attempt is submitted, which
 * disarms the guard without any submit-state plumbing.
 */
export function useLeaveGuard(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [active]);
}
