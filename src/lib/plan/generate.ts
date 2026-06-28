import {
  BLUEPRINT,
  SECTIONS,
  TOTAL_SCORED,
  topicLabel,
  type Section,
} from "@/lib/teas-blueprint";

export type TaskKind = "STUDY" | "DRILL" | "TEST" | "FLASHCARD" | "REVIEW";

export interface PlanTaskDraft {
  dayOfWeek: number; // 0 = Mon .. 6 = Sun
  kind: TaskKind;
  section: Section | null;
  topic: string | null;
  label: string;
  targetCount: number | null;
  durationMin: number | null;
}

export interface PlanWeekDraft {
  weekIndex: number;
  focus: string;
  tasks: PlanTaskDraft[];
}

export interface TopicMastery {
  section: Section;
  topic: string;
  pct: number | null; // null = not yet assessed
}

export interface GenerateInput {
  weeks: number;
  hoursPerWeek: number;
  masteries: TopicMastery[];
}

interface RankedTopic {
  section: Section;
  topic: string;
  priority: number;
}

/** weakness (0..1) × blueprint weight. Unassessed topics assumed mid-weakness. */
function rankTopics(masteries: TopicMastery[]): RankedTopic[] {
  const byKey = new Map(masteries.map((m) => [`${m.section}:${m.topic}`, m.pct]));
  const ranked: RankedTopic[] = [];

  for (const spec of SECTIONS) {
    for (const t of spec.topics) {
      const pct = byKey.get(`${spec.key}:${t.key}`);
      const weakness = pct == null ? 0.5 : 1 - pct / 100;
      const weight = t.scored / TOTAL_SCORED;
      ranked.push({
        section: spec.key,
        topic: t.key,
        priority: weakness * weight,
      });
    }
  }
  return ranked.sort((a, b) => b.priority - a.priority);
}

/**
 * Deterministic week-by-week plan. Weakest, highest-weight topics appear more
 * often; every week ends with a review; the final week(s) include a full mock
 * and taper new content. Daily A&P flashcard upkeep throughout.
 */
export function generatePlan(input: GenerateInput): PlanWeekDraft[] {
  const weeks = Math.max(1, Math.min(input.weeks, 16));
  const ranked = rankTopics(input.masteries);
  const minutesPerWeek = Math.max(60, input.hoursPerWeek * 60);

  const result: PlanWeekDraft[] = [];
  let rotation = 0;

  for (let w = 0; w < weeks; w++) {
    const isFinalPhase = w >= weeks - Math.min(2, weeks - 0) + 0 && w >= weeks - 2;
    const isLastWeek = w === weeks - 1;
    const tasks: PlanTaskDraft[] = [];

    // How many content sessions this week (taper in the final phase).
    const contentSessions = isFinalPhase ? 3 : 4;
    const minutesPerSession = Math.round(
      (minutesPerWeek * (isFinalPhase ? 0.6 : 0.8)) / contentSessions,
    );

    // Pick this week's focus topics by walking the ranked list (weakest first),
    // rotating so coverage spreads across weeks.
    const focusTopics: RankedTopic[] = [];
    for (let i = 0; i < contentSessions; i++) {
      focusTopics.push(ranked[(rotation + i) % ranked.length]);
    }
    rotation = (rotation + contentSessions) % ranked.length;

    let day = 0;
    focusTopics.forEach((ft, i) => {
      const label = topicLabel(ft.section, ft.topic);
      // Alternate study (learn) and drill (practice) per focus topic.
      if (i % 2 === 0) {
        tasks.push({
          dayOfWeek: day,
          kind: "STUDY",
          section: ft.section,
          topic: ft.topic,
          label: `Study: ${label} (${BLUEPRINT[ft.section].label})`,
          targetCount: null,
          durationMin: minutesPerSession,
        });
      } else {
        tasks.push({
          dayOfWeek: day,
          kind: "DRILL",
          section: ft.section,
          topic: ft.topic,
          label: `Drill: ${label}`,
          targetCount: 10,
          durationMin: minutesPerSession,
        });
      }
      day = (day + 1) % 6;
    });

    // Daily-ish A&P flashcard upkeep (3 sessions/week).
    for (const fd of [1, 3, 5]) {
      tasks.push({
        dayOfWeek: fd,
        kind: "FLASHCARD",
        section: "SCIENCE",
        topic: "anatomy-physiology",
        label: "A&P flashcards review",
        targetCount: 15,
        durationMin: 15,
      });
    }

    // Final phase: a full timed mock exam.
    if (isFinalPhase) {
      tasks.push({
        dayOfWeek: 5,
        kind: "TEST",
        section: null,
        topic: null,
        label: isLastWeek
          ? "Full timed mock exam (final dress rehearsal)"
          : "Full timed mock exam",
        targetCount: null,
        durationMin: 210,
      });
    }

    // Weekly review.
    tasks.push({
      dayOfWeek: 6,
      kind: "REVIEW",
      section: null,
      topic: null,
      label: "Review missed questions and weak spots",
      targetCount: null,
      durationMin: 45,
    });

    const focusLabel = isLastWeek
      ? "Final review & mock"
      : focusTopics
          .slice(0, 2)
          .map((ft) => topicLabel(ft.section, ft.topic))
          .join(" · ");

    tasks.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
    result.push({ weekIndex: w, focus: focusLabel, tasks });
  }

  return result;
}

export function weeksUntil(testDate: Date, from: Date): number {
  const ms = testDate.getTime() - from.getTime();
  return Math.max(1, Math.ceil(ms / (7 * 24 * 60 * 60 * 1000)));
}
