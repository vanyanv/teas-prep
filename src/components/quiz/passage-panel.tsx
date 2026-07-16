"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Kicker } from "@/components/ui/page";
import { cn } from "@/lib/utils";
import { ContentBlocks } from "@/components/quiz/question-content";

/** A passage longer than this earns the split / disclosure treatment. */
export const LONG_PASSAGE_CHARS = 360;

export function isLongPassage(passage: string | undefined): boolean {
  return !!passage && passage.length > LONG_PASSAGE_CHARS;
}

/**
 * The passage body: numbered paragraphs when there are several, a calm reading
 * surface, comfortable measure. Used inside every passage variant below.
 */
function PassageBody({ text, numbered }: { text: string; numbered?: boolean }) {
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  if (!numbered || paragraphs.length < 2) {
    return (
      <ContentBlocks
        text={text}
        className="max-w-prose text-base leading-relaxed text-pretty"
      />
    );
  }
  return (
    <div className="max-w-prose">
      {paragraphs.map((para, i) => (
        <div key={i} className={cn("flex gap-3", i > 0 && "mt-3")}>
          <span className="mt-1 font-mono text-xs text-muted-foreground/70 tabular-nums">
            {i + 1}
          </span>
          <ContentBlocks text={para} className="text-base leading-relaxed text-pretty" />
        </div>
      ))}
    </div>
  );
}

/**
 * Short passage: a quiet inset block above the prompt. Distinct from the prompt
 * by surface and a leading rule, never mistaken for the question itself.
 */
export function InlinePassage({ text, title }: { text: string; title?: string }) {
  return (
    <div className="my-4 rounded-xl border-l-2 border-primary/30 bg-secondary/30 py-3 pl-4 pr-3">
      <Kicker className="text-[11px]">{title ?? "Passage"}</Kicker>
      <div className="mt-2">
        <PassageBody text={text} />
      </div>
    </div>
  );
}

/**
 * Long passage on mobile / narrow screens: question-first, with an accessible
 * disclosure that remembers its open state for this question so returning to
 * the answers never loses the reading position.
 */
export function CollapsiblePassage({
  text,
  title,
  defaultOpen = false,
}: {
  text: string;
  title?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="my-4 overflow-hidden rounded-xl border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3 text-left",
          "outline-none transition-colors hover:bg-secondary/40",
          "focus-visible:ring-[3px] focus-visible:ring-ring/40",
        )}
      >
        <span className="flex items-baseline gap-2">
          <Kicker className="text-[11px]">{title ?? "Passage"}</Kicker>
          <span className="text-xs text-muted-foreground">
            {open ? "Hide" : "View"}
          </span>
        </span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open && (
        <div className="border-t px-4 py-4">
          <PassageBody text={text} numbered />
        </div>
      )}
    </div>
  );
}

/**
 * Long passage on desktop: a bordered panel that scrolls independently so the
 * question column beside it stays put. Rendered as the left column of the split
 * layout QuestionView builds.
 */
export function PassagePanel({ text, title }: { text: string; title?: string }) {
  return (
    <aside className="rounded-xl border bg-card">
      <div className="border-b px-4 py-2.5">
        <Kicker className="text-[11px]">{title ?? "Passage"}</Kicker>
      </div>
      <div className="max-h-[calc(100dvh-12rem)] overflow-y-auto px-4 py-4">
        <PassageBody text={text} numbered />
      </div>
    </aside>
  );
}
