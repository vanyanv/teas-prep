// ── Official ATI TEAS 7 blueprint ──────────────────────────────────────
// Source: ATI TEAS 7 spec, verified against NurseHub's Free TEAS 7 Practice
// Test (2023). Single source of truth for diagnostic composition, the mock
// exam, and study-plan weighting.

export type Section = "READING" | "MATH" | "SCIENCE" | "ENGLISH";

export interface Topic {
  /** stable key used as Question.topic */
  key: string;
  label: string;
  /** scored questions on the real exam (drives weighting) */
  scored: number;
}

export interface SectionSpec {
  key: Section;
  label: string;
  /** total items shown on the real section (scored + unscored) */
  total: number;
  scored: number;
  /** section time limit, minutes */
  minutes: number;
  topics: Topic[];
}

export const SECTION_ORDER: Section[] = [
  "READING",
  "MATH",
  "SCIENCE",
  "ENGLISH",
];

/** Real exam inserts a 10-minute break after Math. */
export const BREAK_AFTER: Section = "MATH";
export const BREAK_MINUTES = 10;

export const BLUEPRINT: Record<Section, SectionSpec> = {
  READING: {
    key: "READING",
    label: "Reading",
    total: 45,
    scored: 39,
    minutes: 55,
    topics: [
      { key: "key-ideas-details", label: "Key ideas & details", scored: 15 },
      { key: "craft-structure", label: "Craft & structure", scored: 9 },
      {
        key: "integration-knowledge",
        label: "Integration of knowledge & ideas",
        scored: 15,
      },
    ],
  },
  MATH: {
    key: "MATH",
    label: "Math",
    total: 38,
    scored: 34,
    minutes: 57,
    topics: [
      { key: "numbers-algebra", label: "Numbers & algebra", scored: 18 },
      { key: "measurement-data", label: "Measurement & data", scored: 16 },
    ],
  },
  SCIENCE: {
    key: "SCIENCE",
    label: "Science",
    total: 50,
    scored: 44,
    minutes: 60,
    topics: [
      { key: "anatomy-physiology", label: "Human anatomy & physiology", scored: 18 },
      { key: "biology", label: "Biology", scored: 9 },
      { key: "chemistry", label: "Chemistry", scored: 8 },
      { key: "scientific-reasoning", label: "Scientific reasoning", scored: 9 },
    ],
  },
  ENGLISH: {
    key: "ENGLISH",
    label: "English & language usage",
    total: 37,
    scored: 33,
    minutes: 37,
    topics: [
      {
        key: "conventions",
        label: "Conventions of standard English",
        scored: 12,
      },
      { key: "knowledge-language", label: "Knowledge of language", scored: 11 },
      {
        key: "vocabulary",
        label: "Vocabulary to express ideas",
        scored: 10,
      },
    ],
  },
};

export const SECTIONS: SectionSpec[] = SECTION_ORDER.map((s) => BLUEPRINT[s]);

export const TOTAL_ITEMS = SECTIONS.reduce((n, s) => n + s.total, 0); // 170
export const TOTAL_SCORED = SECTIONS.reduce((n, s) => n + s.scored, 0); // 150
/** Testing time (sum of section limits), excluding the 10-min break. */
export const TOTAL_MINUTES = SECTIONS.reduce((n, s) => n + s.minutes, 0); // 209

/**
 * Real-exam pace in seconds per question for a section, or the all-section
 * blend when none is given. Drives timed practice sets.
 */
export function examPaceSeconds(section?: Section): number {
  if (section) {
    const s = BLUEPRINT[section];
    return Math.round((s.minutes * 60) / s.total);
  }
  const minutes = SECTIONS.reduce((n, s) => n + s.minutes, 0);
  const total = SECTIONS.reduce((n, s) => n + s.total, 0);
  return Math.round((minutes * 60) / total);
}

export function sectionLabel(s: Section): string {
  return BLUEPRINT[s].label;
}

export function topicLabel(s: Section, topicKey: string): string {
  return BLUEPRINT[s].topics.find((t) => t.key === topicKey)?.label ?? topicKey;
}

export function allTopics(): { section: Section; topic: Topic }[] {
  return SECTIONS.flatMap((spec) =>
    spec.topics.map((topic) => ({ section: spec.key, topic })),
  );
}

/**
 * Proportional question counts for a quiz of `total` items, weighted by each
 * section's scored share of the exam. Largest-remainder method so the parts
 * sum exactly to `total`.
 */
export function sectionCountsFor(total: number): Record<Section, number> {
  const weights = SECTIONS.map((s) => ({ key: s.key, w: s.scored / TOTAL_SCORED }));
  return largestRemainder(total, weights);
}

/** Topic counts within a section for `total` items, weighted by scored share. */
export function topicCountsFor(
  section: Section,
  total: number,
): Record<string, number> {
  const spec = BLUEPRINT[section];
  const sectionScored = spec.topics.reduce((n, t) => n + t.scored, 0);
  const weights = spec.topics.map((t) => ({
    key: t.key,
    w: t.scored / sectionScored,
  }));
  return largestRemainder(total, weights);
}

function largestRemainder<K extends string>(
  total: number,
  weights: { key: K; w: number }[],
): Record<K, number> {
  const raw = weights.map((x) => ({ key: x.key, exact: x.w * total }));
  const floors = raw.map((x) => ({ key: x.key, n: Math.floor(x.exact), rem: x.exact - Math.floor(x.exact) }));
  let used = floors.reduce((n, x) => n + x.n, 0);
  const order = [...floors].sort((a, b) => b.rem - a.rem);
  let i = 0;
  while (used < total && order.length > 0) {
    order[i % order.length].n += 1;
    used += 1;
    i += 1;
  }
  const out = {} as Record<K, number>;
  for (const f of floors) out[f.key] = f.n;
  return out;
}
