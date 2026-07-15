import {
  SECTIONS,
  TOTAL_SCORED,
  sectionLabel,
  type Section,
} from "@/lib/teas-blueprint";

/** One graded diagnostic answer, reduced to what the narrative needs. */
export interface InsightItem {
  section: Section;
  topic: string;
  isCorrect: boolean;
  confidence: number | null; // 1=guessed, 2=unsure, 3=confident, null=unrated
}

export type Band = "strong" | "solid" | "needs-work" | "priority";

export const BAND_LABELS: Record<Band, string> = {
  strong: "Strong",
  solid: "Solid",
  "needs-work": "Needs work",
  priority: "Priority",
};

export function bandFor(pct: number): Band {
  if (pct >= 75) return "strong";
  if (pct >= 60) return "solid";
  if (pct >= 40) return "needs-work";
  return "priority";
}

export interface TopicInsight {
  topic: string;
  label: string;
  correct: number;
  total: number;
  pct: number | null;
}

export interface SectionInsight {
  section: Section;
  label: string;
  correct: number;
  total: number;
  pct: number | null; // null = no items answered in this section
  band: Band | null;
  topics: TopicInsight[];
}

export interface PriorityTopic {
  section: Section;
  topic: string;
  label: string;
  sectionLabel: string;
  pct: number;
  /** this topic's share of the real exam's scored questions, rounded % */
  examSharePct: number;
  correct: number;
  total: number;
}

export interface DiagnosticInsights {
  overallPct: number;
  totalCorrect: number;
  totalItems: number;
  headline: string;
  sections: SectionInsight[];
  priorities: PriorityTopic[]; // weakest high-weight topics, at most 3
  guessed: { total: number; correct: number };
}

/**
 * Turn graded diagnostic items into the story the results page tells:
 * where you stand, what's strong, and which topics your plan attacks first
 * (weakness × official blueprint weight, so a weak high-weight topic
 * outranks an equally weak low-weight one).
 */
export function computeDiagnosticInsights(items: InsightItem[]): DiagnosticInsights {
  const secAgg = new Map<Section, { correct: number; total: number }>();
  const topicAgg = new Map<string, { correct: number; total: number }>();
  let totalCorrect = 0;
  let guessedTotal = 0;
  let guessedCorrect = 0;

  for (const it of items) {
    const s = secAgg.get(it.section) ?? { correct: 0, total: 0 };
    s.total += 1;
    if (it.isCorrect) s.correct += 1;
    secAgg.set(it.section, s);

    const key = `${it.section}:${it.topic}`;
    const t = topicAgg.get(key) ?? { correct: 0, total: 0 };
    t.total += 1;
    if (it.isCorrect) t.correct += 1;
    topicAgg.set(key, t);

    if (it.isCorrect) totalCorrect += 1;
    if (it.confidence === 1) {
      guessedTotal += 1;
      if (it.isCorrect) guessedCorrect += 1;
    }
  }

  const sections: SectionInsight[] = SECTIONS.map((spec) => {
    const agg = secAgg.get(spec.key);
    const pct = agg && agg.total > 0 ? Math.round((agg.correct / agg.total) * 100) : null;
    return {
      section: spec.key,
      label: spec.label,
      correct: agg?.correct ?? 0,
      total: agg?.total ?? 0,
      pct,
      band: pct == null ? null : bandFor(pct),
      topics: spec.topics.map((t) => {
        const ta = topicAgg.get(`${spec.key}:${t.key}`);
        const tpct = ta && ta.total > 0 ? Math.round((ta.correct / ta.total) * 100) : null;
        return {
          topic: t.key,
          label: t.label,
          correct: ta?.correct ?? 0,
          total: ta?.total ?? 0,
          pct: tpct,
        };
      }),
    };
  });

  interface Scored extends PriorityTopic {
    score: number;
  }
  const priorities: PriorityTopic[] = SECTIONS.flatMap((spec) =>
    spec.topics.map((t): Scored | null => {
      const ta = topicAgg.get(`${spec.key}:${t.key}`);
      if (!ta || ta.total === 0) return null;
      const pct = Math.round((ta.correct / ta.total) * 100);
      if (pct >= 75) return null;
      return {
        section: spec.key,
        topic: t.key,
        label: t.label,
        sectionLabel: sectionLabel(spec.key),
        pct,
        examSharePct: Math.round((t.scored / TOTAL_SCORED) * 100),
        correct: ta.correct,
        total: ta.total,
        score: (1 - pct / 100) * (t.scored / TOTAL_SCORED),
      };
    }),
  )
    .filter((x): x is Scored => x != null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ score: _score, ...rest }) => rest);

  const totalItems = items.length;
  const overallPct = totalItems ? Math.round((totalCorrect / totalItems) * 100) : 0;

  const strongest = [...sections]
    .filter((s) => s.pct != null)
    .sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0))[0];
  const gains = priorities
    .slice(0, 2)
    .map((p) => p.label)
    .join(" and ");
  const headline =
    priorities.length > 0
      ? `You're starting from ${overallPct}%. ${
          strongest ? `${strongest.label} is your strongest section — ` : ""
        }your biggest gains will come from ${gains}.`
      : `You're starting from ${overallPct}%. Solid across the board — your plan will turn strong areas into sure things.`;

  return {
    overallPct,
    totalCorrect,
    totalItems,
    headline,
    sections,
    priorities,
    guessed: { total: guessedTotal, correct: guessedCorrect },
  };
}
