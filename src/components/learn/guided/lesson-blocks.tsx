"use client";

import * as React from "react";
import { AlertCircle, ChevronDown, Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RichText } from "@/components/quiz/question-content";
import { figureDimensions } from "@/content/figure-dimensions";
import { MathExpression } from "./math-expression";
import type {
  ExampleBlock,
  FigureBlock,
  GuidedBlock,
  MistakeBlock,
  RuleBlock,
  TabsBlock,
  TipBlock,
  WhyBlock,
  WordProblemBlock,
} from "@/content/guided-lesson-types";

/** Small mono label used to name a region inside a section. */
function RegionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Kicker className={cn("text-[11px]", className)}>{children}</Kicker>;
}

/** Instructional prose: 17px, generous line height, "- " lines become bullets. */
export function ConceptText({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim().length > 0);
        const isList =
          lines.length > 0 && lines.every((l) => l.trim().startsWith("- "));
        if (isList) {
          return (
            <ul key={i} className="space-y-1.5">
              {lines.map((l, j) => (
                <li key={j} className="flex items-start gap-2.5 text-[17px] leading-relaxed">
                  <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-primary/60" />
                  <RichText>{l.trim().slice(2)}</RichText>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-[17px] leading-relaxed text-pretty">
            <RichText>{block}</RichText>
          </p>
        );
      })}
    </div>
  );
}

/** The rule or process, visually isolated from the prose around it. */
function RuleView({ block }: { block: RuleBlock }) {
  const Items = block.ordered ? "ol" : "ul";
  return (
    <section className="rounded-xl border bg-card p-4 sm:p-5">
      <RegionLabel>{block.title ?? "Rule"}</RegionLabel>
      {block.intro && (
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          <RichText>{block.intro}</RichText>
        </p>
      )}
      <Items className="mt-3 space-y-2">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
            {block.ordered ? (
              <span className="mt-px w-4 shrink-0 text-right font-mono text-sm tabular-nums text-muted-foreground">
                {i + 1}
              </span>
            ) : (
              <span className="mt-[10px] size-1.5 shrink-0 rounded-full bg-primary/60" />
            )}
            <RichText className="min-w-0">{item}</RichText>
          </li>
        ))}
      </Items>
    </section>
  );
}

/**
 * A worked example that reveals its solution one step at a time, so the
 * student predicts before they read. "Show all steps" is always available.
 */
function WorkedExample({ block }: { block: ExampleBlock }) {
  const total = block.steps.length;
  const [shown, setShown] = React.useState(total <= 1 ? total : 1);
  const done = shown >= total;

  return (
    <section>
      <RegionLabel>{block.title ?? "Worked example"}</RegionLabel>
      {block.expression && (
        <MathExpression size="lg" className="mt-2.5">
          {block.expression}
        </MathExpression>
      )}
      <ol className="mt-4 space-y-4">
        {block.steps.slice(0, shown).map((step, i) => (
          <li key={i}>
            {total > 1 && (
              <RegionLabel>Step {i + 1}</RegionLabel>
            )}
            <p className="mt-1 text-[15px] leading-relaxed">
              <RichText>{step.note}</RichText>
            </p>
            {step.work.length > 0 && (
              <div className="mt-2 space-y-1 border-l-2 border-border pl-4">
                {step.work.map((line, j) => (
                  <MathExpression key={j}>{line}</MathExpression>
                ))}
              </div>
            )}
            {step.becomes && (
              <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-xs text-muted-foreground">
                  which gives
                </span>
                <MathExpression className="w-auto">{step.becomes}</MathExpression>
              </div>
            )}
          </li>
        ))}
      </ol>
      {!done ? (
        <div className="mt-4 flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setShown((n) => Math.min(total, n + 1))}
          >
            Next step
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShown(total)}
          >
            Show all steps
          </Button>
        </div>
      ) : (
        <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t pt-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Answer
          </span>
          <span className="font-mono text-base font-semibold tabular-nums">
            <RichText>{block.answer}</RichText>
          </span>
        </p>
      )}
    </section>
  );
}

/** Restrained callout for the error students commonly make. */
function MistakeView({ block }: { block: MistakeBlock }) {
  return (
    <aside className="flex items-start gap-3 rounded-xl border p-4">
      <AlertCircle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
      <div className="min-w-0">
        <p className="text-sm font-medium">Common mistake</p>
        <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
          <RichText>{block.body}</RichText>
        </p>
      </div>
    </aside>
  );
}

/** Positive counterpart to a mistake; a habit worth keeping. */
function TipView({ block }: { block: TipBlock }) {
  return (
    <aside className="flex items-start gap-3 rounded-xl border p-4">
      <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
      <div className="min-w-0">
        <p className="text-sm font-medium">Tip</p>
        <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
          <RichText>{block.body}</RichText>
        </p>
      </div>
    </aside>
  );
}

/** Collapsed "why does this work?" explanation, one click away. */
function WhyView({ block }: { block: WhyBlock }) {
  return (
    <details className="group rounded-xl border">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl p-4 text-sm font-medium outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/40 [&::-webkit-details-marker]:hidden">
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
        {block.label}
      </summary>
      <p className="px-4 pb-4 pl-10 text-[15px] leading-relaxed text-muted-foreground">
        <RichText>{block.body}</RichText>
      </p>
    </details>
  );
}

/** Segmented variants of one idea, e.g. decimal add/subtract vs multiply. */
function TabsView({ block }: { block: TabsBlock }) {
  return (
    <Tabs defaultValue={block.tabs[0]?.label}>
      <TabsList>
        {block.tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {block.tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label} className="mt-5">
          <LessonBlocks blocks={tab.blocks} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

/**
 * A word problem taught as reasoning: what's asked, what matters, what's
 * extra, which operation, then the calculation. Revealed in stages so the
 * student thinks each question through before reading the answer.
 */
function WordProblem({ block }: { block: WordProblemBlock }) {
  const stages: { label: string; content: React.ReactNode }[] = [
    {
      label: "What is the question asking?",
      content: (
        <p className="text-[15px] leading-relaxed">
          <RichText>{block.asking}</RichText>
        </p>
      ),
    },
    {
      label: "What information matters?",
      content: (
        <div className="space-y-2.5">
          <ul className="space-y-1">
            {block.relevant.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
                <span className="mt-[10px] size-1.5 shrink-0 rounded-full bg-primary/60" />
                <RichText>{item}</RichText>
              </li>
            ))}
          </ul>
          {block.extra && block.extra.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Extra information, included to distract:
              </p>
              <ul className="mt-1 space-y-1">
                {block.extra.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-[10px] size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                    <RichText>{item}</RichText>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Which operation?",
      content: (
        <div className="space-y-2">
          <p className="text-[15px] leading-relaxed">
            <RichText>{block.operation}</RichText>
          </p>
          <MathExpression>{block.calculation}</MathExpression>
        </div>
      ),
    },
    {
      label: "Answer",
      content: (
        <p className="text-[15px] font-medium leading-relaxed">
          <RichText>{block.answer}</RichText>
        </p>
      ),
    },
  ];
  const [shown, setShown] = React.useState(0);
  const done = shown >= stages.length;

  return (
    <section className="rounded-xl border bg-card p-4 sm:p-5">
      <RegionLabel>Word problem</RegionLabel>
      <p className="mt-2.5 text-[15px] leading-relaxed">
        <RichText>{block.problem}</RichText>
      </p>
      {shown > 0 && (
        <dl className="mt-4 space-y-4 border-t pt-4">
          {stages.slice(0, shown).map((stage) => (
            <div key={stage.label}>
              <dt className="text-sm font-medium">{stage.label}</dt>
              <dd className="mt-1.5">{stage.content}</dd>
            </div>
          ))}
        </dl>
      )}
      {!done && (
        <div className="mt-4 flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setShown((n) => n + 1)}
          >
            {shown === 0 ? "Work through it" : "Next"}
          </Button>
          {shown > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShown(stages.length)}
            >
              Show everything
            </Button>
          )}
        </div>
      )}
    </section>
  );
}

/**
 * A labeled diagram with its legend. The plate keeps its own light ground in
 * both themes (the schematics are drawn on paper), so it reads as a printed
 * figure rather than a UI surface that failed to theme.
 */
function FigureView({ block }: { block: FigureBlock }) {
  return (
    <figure className="overflow-hidden rounded-xl border bg-card">
      <div className="bg-[oklch(0.97_0.006_285)] p-3 sm:p-4">
        {/* eslint-disable-next-line @next/next/no-img-element -- schematic SVG, intrinsically sized */}
        <img
          src={block.src}
          {...figureDimensions(block.src)}
          alt={block.alt}
          className="mx-auto h-auto w-full max-w-md"
          loading="lazy"
        />
      </div>
      {(block.caption || block.legend) && (
        <figcaption className="border-t p-4 sm:p-5">
          {block.caption && (
            <p className="text-[15px] leading-relaxed">
              <RichText>{block.caption}</RichText>
            </p>
          )}
          {block.legend && (
            <dl className={cn("grid gap-x-6 gap-y-2 sm:grid-cols-2", block.caption && "mt-3")}>
              {block.legend.map((item) => (
                <div key={item.label} className="flex items-baseline gap-2.5">
                  <dt className="flex size-6 shrink-0 items-center justify-center rounded-md bg-secondary font-mono text-xs font-semibold">
                    {item.label}
                  </dt>
                  <dd className="text-[15px] leading-relaxed">
                    {item.name}
                    {item.note && (
                      <span className="text-muted-foreground"> — {item.note}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/** Render a section's blocks in order. */
export function LessonBlocks({ blocks }: { blocks: GuidedBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "concept":
            return <ConceptText key={i} body={block.body} />;
          case "rule":
            return <RuleView key={i} block={block} />;
          case "example":
            return <WorkedExample key={i} block={block} />;
          case "mistake":
            return <MistakeView key={i} block={block} />;
          case "tip":
            return <TipView key={i} block={block} />;
          case "why":
            return <WhyView key={i} block={block} />;
          case "tabs":
            return <TabsView key={i} block={block} />;
          case "wordProblem":
            return <WordProblem key={i} block={block} />;
          case "figure":
            return <FigureView key={i} block={block} />;
        }
      })}
    </div>
  );
}
