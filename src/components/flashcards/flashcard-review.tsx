"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, Layers, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEnterFocusMode } from "@/components/focus-mode";
import { review, type Grade } from "@/lib/flashcards/sm2";
import { cn } from "@/lib/utils";

interface Card {
  id: string;
  topic: string;
  front: string;
  back: string;
  ease: number;
  intervalDays: number;
  reps: number;
}

const GRADES: { grade: Grade; label: string; key: string; cls: string }[] = [
  { grade: "again", label: "Again", key: "1", cls: "border-destructive/40 text-destructive hover:bg-destructive/10" },
  { grade: "hard", label: "Hard", key: "2", cls: "border-warning/40 text-warning hover:bg-warning/10" },
  { grade: "good", label: "Good", key: "3", cls: "border-primary/40 text-primary hover:bg-primary/10" },
  { grade: "easy", label: "Easy", key: "4", cls: "border-success/40 text-success hover:bg-success/10" },
];

function intervalHint(card: Card, grade: Grade): string {
  if (grade === "again") return "<10m";
  // performance.now-based date is unavailable; new Date() is fine in the browser.
  const next = review(
    { ease: card.ease, intervalDays: card.intervalDays, reps: card.reps, lapses: 0 },
    grade,
    new Date(),
  );
  const d = next.intervalDays;
  return d <= 0 ? "<1d" : d === 1 ? "1d" : d < 30 ? `${d}d` : `${Math.round(d / 30)}mo`;
}

export function FlashcardReview() {
  useEnterFocusMode();
  const [cards, setCards] = useState<Card[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch("/api/flashcards/due")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => setCards(d.cards ?? []))
      .catch(() => setLoadError(true));
  }, []);

  const card = cards && idx < cards.length ? cards[idx] : null;

  const grade = useCallback(
    async (g: Grade) => {
      if (!card || saving) return;
      setSaving(true);
      try {
        await fetch("/api/flashcards/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardId: card.id, grade: g }),
        });
        setReviewed((n) => n + 1);
        setRevealed(false);
        setIdx((i) => i + 1);
      } finally {
        setSaving(false);
      }
    },
    [card, saving],
  );

  // Keyboard: space/enter flips, 1-4 grades once revealed.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!card) return;
      if ((e.key === " " || e.key === "Enter") && !revealed) {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && /^[1-4]$/.test(e.key)) {
        e.preventDefault();
        void grade(GRADES[Number(e.key) - 1].grade);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, revealed, grade]);

  if (loadError) {
    return (
      <div className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center px-4 text-center">
        <AlertCircle className="size-8 text-destructive" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Couldn&apos;t load your cards
        </h1>
        <p className="mt-2 text-muted-foreground">
          Something went wrong reaching the server. Check your connection and try again.
        </p>
        <Button className="mt-6" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  if (cards === null) {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center px-4 text-center">
        <Layers className="size-8 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          {reviewed > 0 ? "Nice work" : "You're all caught up"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {reviewed > 0
            ? `You reviewed ${reviewed} card${reviewed === 1 ? "" : "s"}. Come back when more are due.`
            : "No A&P cards are due right now. Check back later, or keep practicing."}
        </p>
        <Button asChild className="mt-6" variant="outline">
          <Link href="/">Back to dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          A&P flashcards
        </p>
        <p className="font-mono text-xs text-muted-foreground tabular-nums">
          {idx + 1} / {cards.length}
        </p>
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{
            width: `${(idx / cards.length) * 100}%`,
            transitionTimingFunction: "var(--ease-out-quint)",
          }}
        />
      </div>

      <div className="flex flex-1 flex-col justify-center py-8">
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          aria-label={revealed ? "Hide answer" : "Show answer"}
          className="group [perspective:1600px] outline-none"
        >
          <div
            className={cn(
              "relative min-h-[16rem] w-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none",
              revealed && "[transform:rotateY(180deg)]",
            )}
            style={{ transitionTimingFunction: "var(--ease-out-quint)" }}
          >
            {/* front */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border bg-card p-8 text-center shadow-sm [backface-visibility:hidden]">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {card.topic}
              </p>
              <p className="mt-4 text-xl font-medium leading-snug text-balance">
                {card.front}
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70">
                Tap or press space
              </p>
            </div>
            {/* back */}
            <div className="absolute inset-0 flex flex-col justify-center rounded-2xl border bg-card p-8 text-left shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Answer
              </p>
              <p className="mt-3 leading-relaxed text-pretty">{card.back}</p>
            </div>
          </div>
        </button>
      </div>

      <div className="pb-6">
        {!revealed ? (
          <Button className="w-full" size="lg" onClick={() => setRevealed(true)}>
            Show answer
          </Button>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {GRADES.map((g) => (
              <Button
                key={g.grade}
                variant="outline"
                className={cn("h-auto flex-col gap-0.5 py-2.5", g.cls)}
                disabled={saving}
                onClick={() => grade(g.grade)}
              >
                <span className="text-sm font-medium">{g.label}</span>
                <span className="font-mono text-[10px] tabular-nums opacity-70">
                  {intervalHint(card, g.grade)}
                </span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
