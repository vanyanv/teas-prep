import {
  BLUEPRINT,
  SECTIONS,
  TOTAL_SCORED,
  sectionLabel,
  type Section,
} from "@/lib/teas-blueprint";
import { resolveSkill } from "@/content/taxonomy";

/** One graded diagnostic answer, reduced to what the narrative needs. */
export interface InsightItem {
  section: Section;
  topic: string;
  subtopic: string | null; // skill name, for skill-level priorities
  isCorrect: boolean;
  confidence: number | null; // 1=guessed, 2=unsure, 3=confident, null=unrated
  answered: boolean; // false = left blank (graded incorrect at submit)
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

export interface PrioritySkill {
  skillId: string;
  name: string;
  section: Section;
  topic: string;
  sectionLabel: string;
  pct: number;
  correct: number;
  total: number;
}

export interface ConfidencePatterns {
  /** correct-but-guessed: right by luck, treated as gaps */
  guessedTotal: number;
  guessedCorrect: number;
  /** incorrect-but-confident: sure and wrong — the dangerous misconceptions */
  confidentWrong: number;
  /** questions left blank */
  unanswered: number;
}

export interface DiagnosticInsights {
  overallPct: number;
  totalCorrect: number;
  totalItems: number;
  headline: string;
  sections: SectionInsight[];
  priorities: PriorityTopic[]; // weakest high-weight topics, at most 3
  prioritySkills: PrioritySkill[]; // five highest-priority skills
  guessed: { total: number; correct: number };
  confidence: ConfidencePatterns;
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
  const skillAgg = new Map<string, { correct: number; total: number }>();
  let totalCorrect = 0;
  let guessedTotal = 0;
  let guessedCorrect = 0;
  let confidentWrong = 0;
  let unanswered = 0;

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

    if (it.subtopic) {
      const sk = skillAgg.get(it.subtopic) ?? { correct: 0, total: 0 };
      sk.total += 1;
      if (it.isCorrect) sk.correct += 1;
      skillAgg.set(it.subtopic, sk);
    }

    if (it.isCorrect) totalCorrect += 1;
    if (it.confidence === 1) {
      guessedTotal += 1;
      if (it.isCorrect) guessedCorrect += 1;
    }
    if (it.confidence === 3 && !it.isCorrect) confidentWrong += 1;
    if (!it.answered) unanswered += 1;
  }

  // Five highest-priority skills: weakness × the exam weight of the skill's
  // topic (a weak skill in a heavily-weighted topic outranks the rest).
  const prioritySkills: PrioritySkill[] = [...skillAgg.entries()]
    .map(([name, agg]) => {
      const node = resolveSkill(name);
      if (!node || agg.total < 2) return null;
      const pct = Math.round((agg.correct / agg.total) * 100);
      if (pct >= 75) return null;
      const topicScored =
        BLUEPRINT[node.sectionId].topics.find((t) => t.key === node.topicId)?.scored ?? 1;
      return {
        skillId: node.skillId,
        name: node.name,
        section: node.sectionId,
        topic: node.topicId,
        sectionLabel: sectionLabel(node.sectionId),
        pct,
        correct: agg.correct,
        total: agg.total,
        score: (1 - pct / 100) * (topicScored / TOTAL_SCORED),
      };
    })
    .filter((x): x is PrioritySkill & { score: number } => x != null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => ({
      skillId: s.skillId,
      name: s.name,
      section: s.section,
      topic: s.topic,
      sectionLabel: s.sectionLabel,
      pct: s.pct,
      correct: s.correct,
      total: s.total,
    }));

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
    .map((s) => ({
      section: s.section,
      topic: s.topic,
      label: s.label,
      sectionLabel: s.sectionLabel,
      pct: s.pct,
      examSharePct: s.examSharePct,
      correct: s.correct,
      total: s.total,
    }));

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
          strongest ? `${strongest.label} is your strongest section, and ` : ""
        }your biggest gains will come from ${gains}.`
      : `You're starting from ${overallPct}%. Solid across the board: your plan will turn strong areas into sure things.`;

  return {
    overallPct,
    totalCorrect,
    totalItems,
    headline,
    sections,
    priorities,
    prioritySkills,
    guessed: { total: guessedTotal, correct: guessedCorrect },
    confidence: {
      guessedTotal,
      guessedCorrect,
      confidentWrong,
      unanswered,
    },
  };
}
