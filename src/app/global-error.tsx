"use client";

import { useEffect } from "react";

import "./globals.css";

/**
 * Last-resort boundary: this fires when the root layout itself fails, so it
 * replaces <html>/<body> and cannot rely on Providers, fonts, or the theme
 * script. Styling is therefore inline and theme-neutral rather than
 * token-based, and the recovery action is a hard reload rather than a router
 * navigation, since the router may be the thing that broke.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          background: "oklch(0.985 0.004 95)",
          color: "oklch(0.22 0.015 265)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <main style={{ maxWidth: "32rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "oklch(0.55 0.02 265)",
            }}
          >
            Something went wrong
          </p>
          <h1
            style={{
              margin: "0.5rem 0 0",
              fontSize: "1.75rem",
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            The app failed to load.
          </h1>
          <p style={{ margin: "0.75rem 0 0", lineHeight: 1.6 }}>
            Your answers and progress are saved on our side, not in this tab.
            Reload to get back in.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                minHeight: "2.75rem",
                padding: "0 1.25rem",
                borderRadius: "0.625rem",
                border: "none",
                background: "oklch(0.45 0.07 195)",
                color: "oklch(0.99 0.005 95)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/today"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "2.75rem",
                padding: "0 1.25rem",
                borderRadius: "0.625rem",
                border: "1px solid oklch(0.88 0.008 95)",
                color: "inherit",
                textDecoration: "none",
                fontSize: "0.9375rem",
                fontWeight: 500,
              }}
            >
              Back to Today
            </a>
          </div>
          {error.digest && (
            <p
              style={{
                marginTop: "2rem",
                fontFamily: "ui-monospace, monospace",
                fontSize: "0.75rem",
                color: "oklch(0.55 0.02 265)",
              }}
            >
              Error {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
