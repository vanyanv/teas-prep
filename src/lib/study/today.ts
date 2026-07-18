import { getMasteryData, type TopicMasteryRow } from "@/lib/mastery";
import { getDueQuestionCount } from "@/lib/review/question-srs";
import { getDueCards } from "@/lib/flashcards/service";
import { practiceHref, learnTopicHref } from "@/lib/quiz/links";
import { BLUEPRINT, sectionLabel, SECTION_DIAGNOSTIC_TOTAL } from "@/lib/teas-blueprint";
import {
  getSectionDiagnosticStatus,
  nextUndiagnosedSection,
} from "@/lib/quiz/diagnostic-status";

export type TodayKind =
  | "diagnostic"
  | "session"
  | "review"
  | "flashcards"
  | "drill"
  | "study"
  | "mock";

export interface TodayAction {
  kind: TodayKind;
  label: string;
  detail: string;
  href: string;
  count?: number;
}

export interface TodaySummary {
  hasData: boolean;
  dueQuestions: number;
  dueCards: number;
  weakest: TopicMasteryRow | null;
  /** the single best next action */
  primary: TodayAction;
  /** other worthwhile actions right now */
  secondary: TodayAction[];
}

/**
 * Pick the weakest assessed topic, breaking ties toward higher exam weight. If
 * nothing is assessed yet, fall back to the highest-weight topic to start on.
 */
export function pickWeakest(topics: TopicMasteryRow[]): TopicMasteryRow | null {
  const assessed = topics.filter((t) => t.pct != null);
  const pool = assessed.length ? assessed : topics;
  if (pool.length === 0) return null;
  return [...pool].sort((a, b) => {
    const pa = a.pct ?? 50;
    const pb = b.pct ?? 50;
    if (pa !== pb) return pa - pb;
    const wa = BLUEPRINT[a.section].topics.find((t) => t.key === a.topic)?.scored ?? 0;
    const wb = BLUEPRINT[b.section].topics.find((t) => t.key === b.topic)?.scored ?? 0;
    return wb - wa;
  })[0];
}

function drillAction(weakest: TopicMasteryRow): TodayAction {
  return {
    kind: "drill",
    label: `Drill: ${weakest.label}`,
    detail: `Your lowest area${weakest.pct != null ? ` (${weakest.pct}% mastery)` : ""} in ${sectionLabel(weakest.section)}. 10 targeted questions.`,
    href: practiceHref({ section: weakest.section, topic: weakest.topic, count: 10 }),
  };
}

function studyAction(weakest: TopicMasteryRow): TodayAction {
  return {
    kind: "study",
    label: `Study: ${weakest.label}`,
    detail: `Review the lesson and key facts before drilling.`,
    href: learnTopicHref(weakest.section, weakest.topic),
  };
}

/**
 * Assemble the adaptive "Today" session — the one clear next action plus the
 * other worthwhile things to do right now. Priority: get a baseline first, then
 * clear spaced-review debt (questions, then cards), then attack the weakest
 * topic.
 */
export async function getTodaySummary(userId: string): Promise<TodaySummary> {
  const [mastery, dueQuestions, cards, diagStatus] = await Promise.all([
    getMasteryData(userId),
    getDueQuestionCount(userId),
    getDueCards(userId, 20),
    getSectionDiagnosticStatus(userId),
  ]);
  const dueCards = cards.dueCount + cards.newCount;
  const hasData = mastery.totalAnswered > 0;
  const weakest = pickWeakest(mastery.topics);

  const reviewAction: TodayAction = {
    kind: "review",
    label: "Review due questions",
    detail: "Questions you missed or were unsure about, resurfaced on schedule.",
    href: practiceHref({ review: true }),
    count: dueQuestions,
  };
  const cardsAction: TodayAction = {
    kind: "flashcards",
    label: "A&P flashcards",
    detail: cards.dueCount
      ? `${cards.dueCount} due, ${cards.newCount} new`
      : `${cards.newCount} new cards`,
    href: "/flashcards",
    count: dueCards,
  };
  const nextDiag = nextUndiagnosedSection(diagStatus);
  const diagnosedCount = diagStatus.filter((s) => s.attemptId != null).length;
  const diagnosticAction: TodayAction | null = nextDiag
    ? {
        kind: "diagnostic",
        label: `Take your ${nextDiag.label} diagnostic`,
        detail:
          diagnosedCount === 0
            ? `${SECTION_DIAGNOSTIC_TOTAL} questions, untimed. Sets the baseline that builds your study plan.`
            : `${diagnosedCount} of ${diagStatus.length} sections diagnosed. ${SECTION_DIAGNOSTIC_TOTAL} questions, untimed.`,
        href: "/diagnostic",
      }
    : null;
  const mockAction: TodayAction = {
    kind: "mock",
    label: "Full timed mock exam",
    detail: "A full-length run in real TEAS section order.",
    href: "/mock",
  };
  const sessionAction: TodayAction = {
    kind: "session",
    label: "Start today's session",
    detail: weakest
      ? `Review + ${weakest.label} practice with a short lesson. ~20 min.`
      : "A short review-and-practice session built from your results. ~20 min.",
    href: "/session",
  };

  // Build the priority-ordered list of applicable actions. Once there's data,
  // the composed session (review + lesson + weak-topic practice) leads.
  const ranked: TodayAction[] = [];
  if (!hasData && diagnosticAction) ranked.push(diagnosticAction);
  if (hasData) ranked.push(sessionAction);
  if (hasData && diagnosticAction) ranked.push(diagnosticAction);
  if (dueQuestions > 0) ranked.push(reviewAction);
  if (dueCards > 0) ranked.push(cardsAction);
  if (weakest) ranked.push(drillAction(weakest), studyAction(weakest));
  if (hasData) ranked.push(mockAction);

  const primary = ranked[0] ?? sessionAction;
  const secondary = ranked.slice(1, 4);

  return { hasData, dueQuestions, dueCards, weakest, primary, secondary };
}
