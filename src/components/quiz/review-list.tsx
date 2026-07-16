"use client";

import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { parseStem } from "@/lib/quiz/content";
import { ContentBlocks, RichText } from "@/components/quiz/question-content";
import { InlinePassage } from "@/components/quiz/passage-panel";
import { sectionLabel } from "@/lib/teas-blueprint";
import type { AttemptResult } from "@/lib/quiz/attempt";
import type { Answer, QuizQuestion } from "@/lib/quiz/types";

type Item = AttemptResult["items"][number];
type Filter = "all" | "wrong" | "flagged" | "guessed";

const isGuessed = (it: Item) => it.confidence === 1;

export function ReviewList({
  items,
  groupBySection = false,
}: {
  items: Item[];
  groupBySection?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      all: items.length,
      wrong: items.filter((it) => it.isCorrect === false).length,
      flagged: items.filter((it) => it.flagged).length,
      guessed: items.filter(isGuessed).length,
    }),
    [items],
  );

  const shown = useMemo(() => {
    const withIndex = items.map((it, i) => ({ it, i }));
    switch (filter) {
      case "wrong":
        return withIndex.filter((x) => x.it.isCorrect === false);
      case "flagged":
        return withIndex.filter((x) => x.it.flagged);
      case "guessed":
        return withIndex.filter((x) => isGuessed(x.it));
      default:
        return withIndex;
    }
  }, [items, filter]);

  // Group rows by section (mock review) so a long list stays navigable.
  const groups = useMemo(() => {
    if (!groupBySection) return [{ label: "", rows: shown }];
    const map = new Map<string, typeof shown>();
    for (const x of shown) {
      const key = x.it.question.section;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(x);
    }
    return [...map.entries()].map(([key, rows]) => ({
      label: sectionLabel(key as QuizQuestion["section"]),
      rows,
    }));
  }, [shown, groupBySection]);

  return (
    <div>
      <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All {counts.all}</TabsTrigger>
          <TabsTrigger value="wrong">Wrong {counts.wrong}</TabsTrigger>
          <TabsTrigger value="flagged">Flagged {counts.flagged}</TabsTrigger>
          <TabsTrigger value="guessed">Guessed {counts.guessed}</TabsTrigger>
        </TabsList>
      </Tabs>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          Nothing here. Switch filters to see other questions.
        </p>
      ) : (
        <div className="mt-4 space-y-5">
          {groups.map((g) => (
            <div key={g.label || "all"}>
              {g.label && (
                <p className="mb-2 px-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {g.label}
                </p>
              )}
              <div className="space-y-3">
                {g.rows.map(({ it, i }) => (
                  <ReviewItem
                    key={it.question.id}
                    index={i}
                    question={it.question}
                    selected={it.selected}
                    isCorrect={it.isCorrect}
                    confidence={it.confidence}
                    flagged={it.flagged}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewItem({
  index,
  question,
  selected,
  isCorrect,
  confidence,
  flagged,
}: {
  index: number;
  question: QuizQuestion;
  selected: Answer;
  isCorrect: boolean | null;
  confidence: number | null;
  flagged: boolean;
}) {
  const guessedRight = isCorrect === true && confidence === 1;
  const isHotspot =
    question.type === "HOT_SPOT" &&
    !!question.images?.[0] &&
    !!question.hotspots?.length;
  const parsed = parseStem(question.stem);

  return (
    <details className="group rounded-xl border bg-card transition-colors hover:border-foreground/15">
      <summary className="flex cursor-pointer list-none items-start gap-3 rounded-lg p-4 outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40">
        <span
          className={cn(
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
            isCorrect
              ? "bg-success/15 text-success"
              : "bg-destructive/15 text-destructive",
          )}
        >
          {isCorrect ? <Check className="size-3.5" /> : <X className="size-3.5" />}
        </span>
        <span className="flex-1 text-sm">
          <span className="font-mono text-xs text-muted-foreground">{index + 1}.</span>{" "}
          <RichText>{parsed.prompt}</RichText>
          {guessedRight && (
            <span className="ml-2 inline-block rounded-full border border-warning/30 bg-warning/10 px-1.5 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wide text-warning">
              guessed
            </span>
          )}
          {flagged && (
            <span className="ml-1.5 inline-block rounded-full border px-1.5 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              flagged
            </span>
          )}
        </span>
      </summary>
      <div className="border-t px-4 py-3 text-sm">
        {parsed.passage && (
          <div className="mb-3">
            <InlinePassage text={parsed.passage} />
          </div>
        )}
        {isHotspot ? (
          <HotspotReview question={question} selected={selected} />
        ) : (
          <>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Your answer: </span>
              {formatAnswer(question, selected)}
            </p>
            <p className="mt-1 text-muted-foreground">
              <span className="font-medium text-foreground">Correct: </span>
              {formatCorrect(question)}
            </p>
          </>
        )}
        {question.explanation && (
          <ContentBlocks
            text={question.explanation}
            className="mt-2 text-muted-foreground"
          />
        )}
        {question.attribution && (
          <p className="mt-2 font-mono text-[10px] text-muted-foreground/70">
            {question.attribution}
          </p>
        )}
      </div>
    </details>
  );
}

function HotspotReview({
  question,
  selected,
}: {
  question: QuizQuestion;
  selected: Answer;
}) {
  const hotspots = question.hotspots ?? [];
  const correct = (question.correct as number[]) ?? [];
  const picked = typeof selected === "number" ? selected : null;
  return (
    <div className="relative w-full overflow-hidden rounded-xl border bg-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={question.images![0]} alt="Answer diagram" className="block h-auto w-full" />
      <div className="absolute inset-0">
        {hotspots.map((h, i) => {
          const isRight = correct.includes(i);
          const isPicked = picked === i;
          return (
            <span
              key={i}
              style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
              className={cn(
                "absolute rounded-md border-2",
                isRight
                  ? "border-success bg-success/25"
                  : isPicked
                    ? "border-destructive bg-destructive/25"
                    : "border-transparent",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

function formatAnswer(q: QuizQuestion, a: Answer): string {
  if (a == null || (Array.isArray(a) && a.length === 0) || a === "")
    return "Not answered";
  if (q.type === "FILL_BLANK") return String(a);
  const idxs = Array.isArray(a) ? a : [a as number];
  const labels = idxs.map((i) => q.options[i as number]).filter(Boolean);
  // Sequence answers keep their order visible so users can see where
  // their arrangement diverged from the correct one.
  return labels.join(q.type === "ORDERED" ? " → " : ", ");
}

function formatCorrect(q: QuizQuestion): string {
  if (q.type === "FILL_BLANK") return (q.correct as string[]).join(" / ");
  const idxs = q.correct as number[];
  if (q.type === "ORDERED") return idxs.map((i) => q.options[i]).join(" → ");
  return idxs.map((i) => q.options[i]).filter(Boolean).join(", ");
}
