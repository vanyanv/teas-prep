"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";

export const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function isAnswered(a: Answer): boolean {
  if (a == null) return false;
  if (Array.isArray(a)) return a.length > 0;
  if (typeof a === "string") return a.trim().length > 0;
  return true;
}

/** Renders a question stem, optional figures, and the right input for its type. */
export function QuestionView({
  question,
  value,
  onChange,
  confidence,
  onConfidence,
}: {
  question: ClientQuestion;
  value: Answer;
  onChange: (v: Answer) => void;
  /** current confidence 1-3; omit `onConfidence` to hide the meter entirely */
  confidence?: number | null;
  onConfidence?: (c: number) => void;
}) {
  return (
    <div>
      {question.type === "MULTI" && (
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Select all that apply
        </p>
      )}
      <h2 className="mt-1 text-lg font-medium leading-snug text-pretty">
        {question.stem}
      </h2>

      {question.images && question.images.length > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          {question.images.map((src) => (
            <div
              key={src}
              className="relative w-full overflow-hidden rounded-lg border bg-muted"
            >
              <Image
                src={src}
                alt="Question figure"
                width={800}
                height={500}
                className="h-auto w-full object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <QuestionInput question={question} value={value} onChange={onChange} />
      </div>

      {onConfidence && (
        <ConfidenceMeter value={confidence ?? null} onChange={onConfidence} />
      )}
    </div>
  );
}

const CONFIDENCE_LEVELS = [
  { value: 1, label: "Guessed", active: "border-warning/50 bg-warning/10 text-warning" },
  { value: 2, label: "Unsure", active: "border-foreground/30 bg-secondary text-foreground" },
  { value: 3, label: "Confident", active: "border-success/50 bg-success/10 text-success" },
];

/**
 * Optional self-report of how sure the answer is. A correct-but-guessed answer
 * is a weak signal, so this feeds the confidence-weighted mastery the plan uses.
 */
function ConfidenceMeter({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (c: number) => void;
}) {
  return (
    <div className="mt-6 border-t pt-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        How sure are you?
      </p>
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {CONFIDENCE_LEVELS.map((c) => {
          const active = value === c.value;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => onChange(c.value)}
              aria-pressed={active}
              className={cn(
                "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
                active ? c.active : "text-muted-foreground hover:bg-secondary",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuestionInput({
  question,
  value,
  onChange,
}: {
  question: ClientQuestion;
  value: Answer;
  onChange: (v: Answer) => void;
}) {
  switch (question.type) {
    case "FILL_BLANK":
      return (
        <Input
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your answer"
          autoComplete="off"
        />
      );
    case "ORDERED":
      return (
        <OrderedInput
          options={question.options}
          value={Array.isArray(value) ? value : question.options.map((_, i) => i)}
          onChange={onChange}
        />
      );
    case "MULTI":
      return (
        <ChoiceList
          options={question.options}
          multi
          selected={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      );
    default:
      return (
        <ChoiceList
          options={question.options}
          selected={typeof value === "number" ? [value] : []}
          onChange={onChange}
        />
      );
  }
}

function ChoiceList({
  options,
  selected,
  multi = false,
  onChange,
}: {
  options: string[];
  selected: number[];
  multi?: boolean;
  onChange: (v: Answer) => void;
}) {
  function pick(i: number) {
    if (!multi) {
      onChange(i);
      return;
    }
    const set = new Set(selected);
    if (set.has(i)) set.delete(i);
    else set.add(i);
    onChange([...set].sort((a, b) => a - b));
  }

  return (
    <div className="flex flex-col gap-2.5">
      {options.map((opt, i) => {
        const active = selected.includes(i);
        return (
          <button
            key={i}
            type="button"
            onClick={() => pick(i)}
            aria-pressed={active}
            className={cn(
              "flex w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-colors",
              "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
              active
                ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                : "hover:bg-secondary",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-medium",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              {LETTERS[i] ?? i + 1}
            </span>
            <span className="text-sm leading-relaxed">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function OrderedInput({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: number[];
  onChange: (v: number[]) => void;
}) {
  function move(pos: number, dir: -1 | 1) {
    const next = [...value];
    const target = pos + dir;
    if (target < 0 || target >= next.length) return;
    [next[pos], next[target]] = [next[target], next[pos]];
    onChange(next);
  }

  return (
    <ol className="flex flex-col gap-2.5">
      {value.map((optIndex, pos) => (
        <li key={optIndex} className="flex items-center gap-3 rounded-lg border p-3">
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {pos + 1}.
          </span>
          <span className="flex-1 text-sm">{options[optIndex]}</span>
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Move up"
              onClick={() => move(pos, -1)}
              disabled={pos === 0}
            >
              <ChevronLeft className="rotate-90" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Move down"
              onClick={() => move(pos, 1)}
              disabled={pos === value.length - 1}
            >
              <ChevronRight className="rotate-90" />
            </Button>
          </div>
        </li>
      ))}
    </ol>
  );
}
