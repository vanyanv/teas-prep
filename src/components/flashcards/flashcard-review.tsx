"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, Layers, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Grade } from "@/lib/flashcards/sm2";

interface Card {
  id: string;
  topic: string;
  front: string;
  back: string;
}

const GRADES: { grade: Grade; label: string; cls: string }[] = [
  { grade: "again", label: "Again", cls: "border-destructive/40 text-destructive hover:bg-destructive/10" },
  { grade: "hard", label: "Hard", cls: "border-warning/40 text-warning hover:bg-warning/10" },
  { grade: "good", label: "Good", cls: "border-primary/40 text-primary hover:bg-primary/10" },
  { grade: "easy", label: "Easy", cls: "border-success/40 text-success hover:bg-success/10" },
];

export function FlashcardReview() {
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

  async function grade(g: Grade) {
    if (!cards || saving) return;
    const card = cards[idx];
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
  }

  if (loadError) {
    return (
      <div className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center px-4 text-center">
        <AlertCircle className="size-8 text-destructive" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Couldn&apos;t load your cards
        </h1>
        <p className="mt-2 text-muted-foreground">
          Something went wrong reaching the server. Check your connection and try
          again.
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

  const done = idx >= cards.length;

  if (cards.length === 0 || done) {
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

  const card = cards[idx];

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
          style={{ width: `${(idx / cards.length) * 100}%` }}
        />
      </div>

      <div className="flex flex-1 flex-col justify-center py-8">
        <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {card.topic}
          </p>
          <p className="mt-4 text-xl font-medium leading-snug text-balance">
            {card.front}
          </p>
          <div
            className={cn(
              "grid transition-all duration-300",
              revealed ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <div className="border-t pt-5 text-left text-muted-foreground">
                {card.back}
              </div>
            </div>
          </div>
        </div>
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
                className={cn("flex-col", g.cls)}
                disabled={saving}
                onClick={() => grade(g.grade)}
              >
                {g.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
