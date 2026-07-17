"use client";

import * as React from "react";
import { CheckCircle2, X } from "lucide-react";

/**
 * Quiet confirmation after checkout returns the student to what they were
 * doing (?upgraded=1). Reads and strips the param client-side so the page
 * underneath stays exactly the one they left.
 */
export function UpgradedNotice() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    // Defer (rAF) so this runs after hydration without a synchronous effect
    // setState; the server always renders the page without the notice.
    const id = requestAnimationFrame(() => {
      const url = new URL(window.location.href);
      if (url.searchParams.get("upgraded") === "1") {
        setShow(true);
        url.searchParams.delete("upgraded");
        window.history.replaceState({}, "", url.toString());
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!show) return null;
  return (
    <div className="border-b bg-accent/60">
      <div
        role="status"
        className="mx-auto flex h-11 max-w-4xl items-center gap-2.5 px-4 text-sm sm:px-6"
      >
        <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden />
        <p className="min-w-0 flex-1 truncate">
          <span className="font-medium">TEAS Pro is active.</span>{" "}
          <span className="text-muted-foreground">
            Everything is unlocked; pick up right where you were.
          </span>
        </p>
        <button
          type="button"
          onClick={() => setShow(false)}
          aria-label="Dismiss"
          className="rounded-md p-1 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
