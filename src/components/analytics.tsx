"use client";

import * as React from "react";

/**
 * Browser-side event reporting. sendBeacon so navigation is never delayed,
 * with a keepalive fetch fallback. Fire-and-forget by design.
 */
export function trackClient(name: string, props?: Record<string, unknown>) {
  try {
    const body = JSON.stringify({ name, props });
    if (navigator.sendBeacon?.("/api/events", new Blob([body], { type: "application/json" }))) {
      return;
    }
    void fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Analytics never interrupts the student.
  }
}

/** Report a view event once per mount. Renders nothing. */
export function TrackView({
  name,
  props,
}: {
  name: string;
  props?: Record<string, unknown>;
}) {
  const sent = React.useRef(false);
  // Stable across re-renders; intentionally captured once.
  const propsRef = React.useRef(props);
  React.useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackClient(name, propsRef.current);
  }, [name]);
  return null;
}
