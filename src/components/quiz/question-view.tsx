"use client";

import { useState } from "react";
import Image from "next/image";
import { Ban, Check, ChevronLeft, ChevronRight, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/page";
import { cn } from "@/lib/utils";
import { fillBlankInstruction, parseStem } from "@/lib/quiz/content";
import {
  ContentBlocks,
  DataTable,
  RichText,
} from "@/components/quiz/question-content";
import {
  CollapsiblePassage,
  InlinePassage,
  PassagePanel,
  isLongPassage,
} from "@/components/quiz/passage-panel";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";

export const LETTERS = ["A", "B", "C", "D", "E", "F"];

/** Standardized, near-the-prompt instruction line, by question type. */
function instructionFor(type: ClientQuestion["type"]): string | null {
  switch (type) {
    case "MULTI":
      return "Select all that apply";
    case "ORDERED":
      return "Arrange in the correct order";
    case "HOT_SPOT":
      return "Select the correct region";
    default:
      return null;
  }
}

/**
 * True when a question carries a passage long enough to earn the desktop
 * split layout. Runners use this to widen their container for the question.
 */
export function usesSplitLayout(question: ClientQuestion): boolean {
  return isLongPassage(parseStem(question.stem).passage);
}

export function isAnswered(a: Answer): boolean {
  if (a == null) return false;
  if (Array.isArray(a)) return a.length > 0;
  if (typeof a === "string") return a.trim().length > 0;
  return true;
}

/** Graded outcome to paint onto the choices after the answer is checked. */
export interface QuestionResult {
  isCorrect: boolean;
  correct: number[] | string[];
}

/** Renders a question stem, optional figures, and the right input for its type. */
export function QuestionView({
  question,
  value,
  onChange,
  confidence,
  onConfidence,
  result,
}: {
  question: ClientQuestion;
  value: Answer;
  onChange: (v: Answer) => void;
  /** current confidence 1-3; omit `onConfidence` to hide the meter entirely */
  confidence?: number | null;
  onConfidence?: (c: number) => void;
  /** when set, choices show correct/incorrect states and inputs lock */
  result?: QuestionResult | null;
}) {
  const parsed = parseStem(question.stem);
  const instruction = instructionFor(question.type);
  const longPassage = isLongPassage(parsed.passage);

  const figures = question.type !== "HOT_SPOT" &&
    question.images &&
    question.images.length > 0 && (
      <div className="mt-4 flex flex-col gap-3">
        {question.images.map((src) => (
          <div
            key={src}
            className="relative w-full overflow-hidden rounded-xl border bg-muted"
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
    );

  // For fill-in-the-blank, lift the trailing "Enter a number." style
  // instruction off the prompt; it is shown at the input instead.
  const promptText =
    question.type === "FILL_BLANK"
      ? fillBlankInstruction(parsed.prompt).prompt
      : parsed.prompt;

  const promptBlock = (
    <ContentBlocks
      text={promptText}
      paragraphClassName="text-lg font-medium leading-relaxed text-pretty sm:text-xl"
    />
  );

  const inputBlock = (
    <>
      {figures}
      {parsed.dataRows && (
        <DataTable rows={parsed.dataRows} caption={parsed.dataCaption} />
      )}
      <div className="mt-6">
        <QuestionInput
          question={question}
          value={value}
          onChange={onChange}
          result={result ?? null}
        />
      </div>
      {onConfidence && !result && (
        <ConfidenceMeter value={confidence ?? null} onChange={onConfidence} />
      )}
    </>
  );

  const header = (instruction || parsed.lead || (parsed.passage && !longPassage)) && (
    <>
      {instruction && <Kicker className="mb-1">{instruction}</Kicker>}
      {parsed.lead && !instruction && <Kicker className="mb-1">Reading</Kicker>}
    </>
  );

  // Long passage: split on desktop (passage left, question right, sticky),
  // question-first with a disclosure on mobile.
  if (parsed.passage && longPassage) {
    return (
      <div>
        {header}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-8">
          <div className="lg:sticky lg:top-4">
            <div className="hidden lg:block">
              <PassagePanel text={parsed.passage} />
            </div>
            <div className="lg:hidden">
              <CollapsiblePassage text={parsed.passage} />
            </div>
          </div>
          <div>
            {promptBlock}
            {inputBlock}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {header}
      {parsed.passage && !longPassage && <InlinePassage text={parsed.passage} />}
      {promptBlock}
      {inputBlock}
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
      <Kicker className="text-[11px]">How sure are you?</Kicker>
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
                "min-h-11 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
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
  result,
}: {
  question: ClientQuestion;
  value: Answer;
  onChange: (v: Answer) => void;
  result: QuestionResult | null;
}) {
  switch (question.type) {
    case "FILL_BLANK":
      return (
        <FillBlankInput
          stem={question.stem}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
          disabled={result != null}
        />
      );
    case "ORDERED":
      return (
        <OrderedInput
          options={question.options}
          value={Array.isArray(value) ? value : question.options.map((_, i) => i)}
          onChange={onChange}
          disabled={result != null}
        />
      );
    case "MULTI":
      return (
        <ChoiceList
          key={question.id}
          options={question.options}
          multi
          selected={Array.isArray(value) ? value : []}
          onChange={onChange}
          result={result}
        />
      );
    case "HOT_SPOT":
      if (question.images?.[0] && question.hotspots && question.hotspots.length) {
        return (
          <HotspotInput
            src={question.images[0]}
            hotspots={question.hotspots}
            selected={typeof value === "number" ? value : null}
            onChange={onChange}
            disabled={result != null}
          />
        );
      }
      // Label-based fallback when a hot-spot has no image/regions.
      return (
        <ChoiceList
          key={question.id}
          options={question.options}
          selected={typeof value === "number" ? [value] : []}
          onChange={onChange}
          result={result}
        />
      );
    default:
      return (
        <ChoiceList
          key={question.id}
          options={question.options}
          selected={typeof value === "number" ? [value] : []}
          onChange={onChange}
          result={result}
        />
      );
  }
}

/**
 * Fill-in-the-blank input with a format cue derived from the stem's own
 * instruction ("Enter a number", "nearest tenth", …) and a numeric keypad on
 * mobile when the answer is numeric.
 */
function FillBlankInput({
  stem,
  value,
  onChange,
  disabled,
}: {
  stem: string;
  value: string;
  onChange: (v: Answer) => void;
  disabled: boolean;
}) {
  const { cue, numeric } = fillBlankInstruction(stem);
  return (
    <div>
      <label className="mb-2 block text-xs text-muted-foreground">{cue}</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={numeric ? "e.g. 42" : "Type your answer"}
        inputMode={numeric ? "decimal" : "text"}
        autoComplete="off"
        disabled={disabled}
        className="max-w-xs"
      />
    </div>
  );
}

type Hotspot = { x: number; y: number; w: number; h: number; label?: string };

/**
 * Image with clickable overlay regions (real TEAS hot-spot format). Region
 * coordinates are percent of the rendered image box, so the overlay lines up
 * regardless of the image's aspect ratio. The region's array index is the
 * answer, matching how grading compares indices.
 */
function HotspotInput({
  src,
  hotspots,
  selected,
  onChange,
  disabled = false,
}: {
  src: string;
  hotspots: Hotspot[];
  selected: number | null;
  onChange: (v: Answer) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-lg border bg-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Diagram. Click the correct region."
          draggable={false}
          className="block h-auto w-full select-none"
        />
        <div className="absolute inset-0">
          {hotspots.map((h, i) => {
            const active = selected === i;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Region ${h.label ?? i + 1}`}
                aria-pressed={active}
                disabled={disabled}
                onClick={() => onChange(i)}
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  width: `${h.w}%`,
                  height: `${h.h}%`,
                }}
                className={cn(
                  "absolute rounded-md border-2 outline-none transition-colors",
                  "focus-visible:ring-[3px] focus-visible:ring-ring/60",
                  active
                    ? "border-primary bg-primary/25"
                    : "border-transparent hover:border-primary/60 hover:bg-primary/10",
                )}
              />
            );
          })}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Tap a region of the diagram to choose your answer.
      </p>
    </div>
  );
}

/**
 * The answer choices: large tap targets, an eliminate toggle while answering,
 * and explicit truth states (icon + text label, never color alone) once a
 * result is in.
 */
function ChoiceList({
  options,
  selected,
  multi = false,
  onChange,
  result,
}: {
  options: string[];
  selected: number[];
  multi?: boolean;
  onChange: (v: Answer) => void;
  result: QuestionResult | null;
}) {
  // Struck-out choices are a per-question scratchpad, never persisted; the
  // parent keys this component by question id so it resets between questions.
  const [eliminated, setEliminated] = useState<ReadonlySet<number>>(new Set());

  const showResult = result != null;
  const correctSet = new Set(
    showResult ? (result.correct as number[]).filter((c) => typeof c === "number") : [],
  );

  function pick(i: number) {
    if (showResult) return;
    if (eliminated.has(i)) {
      const next = new Set(eliminated);
      next.delete(i);
      setEliminated(next);
    }
    if (!multi) {
      onChange(i);
      return;
    }
    const set = new Set(selected);
    if (set.has(i)) set.delete(i);
    else set.add(i);
    onChange([...set].sort((a, b) => a - b));
  }

  function toggleEliminate(i: number) {
    const next = new Set(eliminated);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setEliminated(next);
  }

  return (
    <div className="flex flex-col gap-2.5">
      {options.map((opt, i) => {
        const active = selected.includes(i);
        const isCorrectChoice = showResult && correctSet.has(i);
        const isWrongPick = showResult && active && !correctSet.has(i);
        const isStruck = !showResult && eliminated.has(i);
        const dimmed = showResult && !isCorrectChoice && !isWrongPick;

        return (
          <div
            key={i}
            className={cn(
              "flex items-stretch rounded-lg border transition-colors",
              !showResult && !active && !isStruck && "hover:bg-secondary",
              !showResult && active && "border-primary bg-primary/5 ring-1 ring-primary/30",
              isStruck && "border-dashed opacity-50",
              isCorrectChoice && "border-success/60 bg-success/5",
              isWrongPick && "border-destructive/60 bg-destructive/5",
              dimmed && "opacity-55",
            )}
          >
            <button
              type="button"
              onClick={() => pick(i)}
              aria-pressed={active}
              disabled={showResult}
              className={cn(
                "flex min-h-11 w-full min-w-0 flex-1 items-start gap-3 rounded-lg p-3.5 text-left",
                "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
                showResult && "cursor-default",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-medium",
                  !showResult && !active && "text-muted-foreground",
                  !showResult && active && "border-primary bg-primary text-primary-foreground",
                  isCorrectChoice && "border-success/60 bg-success/10 text-success",
                  isWrongPick && "border-destructive/60 bg-destructive/10 text-destructive",
                  dimmed && "text-muted-foreground",
                )}
              >
                {LETTERS[i] ?? i + 1}
              </span>
              <RichText
                className={cn(
                  "min-w-0 flex-1 text-[15px] leading-relaxed",
                  isStruck && "line-through",
                )}
              >
                {opt}
              </RichText>
              {isCorrectChoice && (
                <span className="mt-0.5 flex shrink-0 items-center gap-1.5 text-xs font-medium text-success">
                  <Check className="size-4" aria-hidden />
                  {active ? "Your answer" : "Correct answer"}
                </span>
              )}
              {isWrongPick && (
                <span className="mt-0.5 flex shrink-0 items-center gap-1.5 text-xs font-medium text-destructive">
                  <X className="size-4" aria-hidden />
                  Your answer
                </span>
              )}
            </button>
            {!showResult && (
              <button
                type="button"
                onClick={() => toggleEliminate(i)}
                aria-pressed={eliminated.has(i)}
                aria-label={`${eliminated.has(i) ? "Restore" : "Eliminate"} choice ${LETTERS[i] ?? i + 1}`}
                title={eliminated.has(i) ? "Restore choice" : "Eliminate choice"}
                className={cn(
                  "mr-1.5 flex size-9 shrink-0 items-center justify-center self-center rounded-md",
                  "text-muted-foreground/50 outline-none transition-colors",
                  "hover:bg-secondary hover:text-foreground",
                  "focus-visible:ring-[3px] focus-visible:ring-ring/40",
                  eliminated.has(i) && "text-muted-foreground",
                )}
              >
                <Ban className="size-4" aria-hidden />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderedInput({
  options,
  value,
  onChange,
  disabled = false,
}: {
  options: string[];
  value: number[];
  onChange: (v: number[]) => void;
  disabled?: boolean;
}) {
  function move(pos: number, dir: -1 | 1) {
    if (disabled) return;
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
          <RichText className="flex-1 text-[15px] leading-relaxed">
            {options[optIndex]}
          </RichText>
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Move up"
              onClick={() => move(pos, -1)}
              disabled={disabled || pos === 0}
            >
              <ChevronLeft className="rotate-90" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Move down"
              onClick={() => move(pos, 1)}
              disabled={disabled || pos === value.length - 1}
            >
              <ChevronRight className="rotate-90" />
            </Button>
          </div>
        </li>
      ))}
    </ol>
  );
}
