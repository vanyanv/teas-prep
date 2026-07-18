import type { Section } from "@/lib/teas-blueprint";

/**
 * Structured content for a guided skill lesson: one concept per section,
 * each following the same pattern (concept, rule, worked example, common
 * mistake, quick check). Rendered by GuidedLessonView; math notation in any
 * string ("3/4", "2 3/5", "3^2") is rendered by the quiz's RichText parser,
 * so lesson math matches question math.
 */

export interface GuidedLesson {
  section: Section;
  topic: string; // blueprint topic key
  skill: string; // full skill name (matches skills.ts + question.subtopic)
  slug: string; // slugifySkill(skill)
  /** Display title; the full skill name is often too long for a heading. */
  title: string;
  summary: string;
  /** Estimated reading + checks time, minutes: [low, high]. */
  minutes: [number, number];
  /** "By the end of this lesson, you will be able to…" 3-5 items. */
  objectives: string[];
  sections: GuidedSection[];
}

export interface GuidedSection {
  id: string; // stable key for progress storage
  /** Short outline label, e.g. "Order of operations". */
  title: string;
  blocks: GuidedBlock[];
  /** One short question with immediate feedback; never affects mastery. */
  quickCheck: QuickCheck;
}

export type GuidedBlock =
  | ConceptBlock
  | RuleBlock
  | ExampleBlock
  | MistakeBlock
  | TipBlock
  | WhyBlock
  | TabsBlock
  | WordProblemBlock
  | FigureBlock;

/** Plain-language explanation. Paragraphs split on blank lines; "- " bullets. */
export interface ConceptBlock {
  kind: "concept";
  body: string;
}

/** The rule or process, visually isolated. Ordered = numbered steps. */
export interface RuleBlock {
  kind: "rule";
  title?: string;
  intro?: string;
  items: string[];
  ordered?: boolean;
}

/** A worked example revealed one step at a time. */
export interface ExampleBlock {
  kind: "example";
  title?: string;
  /** The starting expression, shown as a standalone equation line. */
  expression?: string;
  steps: ExampleStep[];
  answer: string;
}

export interface ExampleStep {
  /** What this step does, in one sentence. */
  note: string;
  /** The arithmetic lines of the step, one equation per entry. */
  work: string[];
  /** What the whole expression simplifies to after this step, if useful. */
  becomes?: string;
}

/** The error students commonly make. Restrained warning callout. */
export interface MistakeBlock {
  kind: "mistake";
  body: string;
}

/** A helpful habit; positive counterpart to a mistake. Used sparingly. */
export interface TipBlock {
  kind: "tip";
  body: string;
}

/** Collapsed "why does this work?" explanation, e.g. why reciprocals divide. */
export interface WhyBlock {
  kind: "why";
  label: string;
  body: string;
}

/** Segmented variants of one idea (e.g. decimal add/subtract vs multiply). */
export interface TabsBlock {
  kind: "tabs";
  tabs: { label: string; blocks: GuidedBlock[] }[];
}

/** A word problem broken into its reasoning scaffold. */
export interface WordProblemBlock {
  kind: "wordProblem";
  problem: string;
  asking: string;
  relevant: string[];
  extra?: string[];
  operation: string;
  calculation: string;
  answer: string;
}

/**
 * A labeled diagram. `src` is a schematic in /public (the same plates the
 * hot-spot questions use, so studying and answering share one visual
 * vocabulary); `legend` names each lettered region.
 */
export interface FigureBlock {
  kind: "figure";
  src: string;
  /** Describes the diagram for screen readers; never repeats the caption. */
  alt: string;
  caption?: string;
  /** Region letter → what it is, e.g. { A: "Right atrium" }. */
  legend?: { label: string; name: string; note?: string }[];
}

export interface QuickCheck {
  prompt: string;
  choices: string[];
  /** Index into choices. */
  answer: number;
  explanation: string;
}
