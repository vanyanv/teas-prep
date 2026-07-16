"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Bookmark toggle: adds the question to the user's saved-for-review pool
 * (drillable from Practice). Optimistic, reverts on failure.
 */
export function SaveQuestionButton({
  questionId,
  initialSaved = false,
  className,
}: {
  questionId: string;
  initialSaved?: boolean;
  className?: string;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    if (busy) return;
    const next = !saved;
    setSaved(next);
    setBusy(true);
    try {
      const res = await fetch("/api/questions/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, saved: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setSaved(!next);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium",
        "outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/40",
        saved
          ? "text-primary hover:bg-secondary/60"
          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
        className,
      )}
    >
      {saved ? (
        <BookmarkCheck className="size-4" aria-hidden />
      ) : (
        <Bookmark className="size-4" aria-hidden />
      )}
      {saved ? "Saved for review" : "Save for review"}
    </button>
  );
}
