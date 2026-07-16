import type { AnswerFeedback } from "@/lib/quiz/attempt";
import type { ClientQuestion } from "@/lib/quiz/types";
import type { WeekStripDay } from "@/lib/plan/week-strip";
import type { SessionPreview } from "@/lib/study/dashboard";
import type { TodayAction } from "@/lib/study/today";

/**
 * Fixture data for the landing page. The previews render the same components
 * the app renders, so what a visitor sees is the product, not a mockup of it.
 * The numbers are representative of a learner a couple of weeks in.
 */

export const PREVIEW_ACTION: TodayAction = {
  kind: "session",
  label: "Today's session",
  detail: "Built from your diagnostic",
  href: "/signup",
};

export const PREVIEW_SESSION: SessionPreview = {
  whyLine:
    "Ratios and proportions is your lowest mastery and about 12% of the exam.",
  reviewCount: 4,
  practiceCount: 8,
  hasLesson: true,
  lessonTitle: "Solve Problems Involving Ratios and Proportions",
  estimatedMinutes: 18,
  focusLabel: "Ratios and proportions",
};

/**
 * A fixed week so the preview is deterministic across renders and time zones:
 * four days done, today in progress, two ahead.
 */
export const PREVIEW_WEEK: WeekStripDay[] = [
  { dayOfWeek: 0, taskCount: 2, doneCount: 2 },
  { dayOfWeek: 1, taskCount: 2, doneCount: 2 },
  { dayOfWeek: 2, taskCount: 1, doneCount: 1 },
  { dayOfWeek: 3, taskCount: 2, doneCount: 2 },
  { dayOfWeek: 4, taskCount: 2, doneCount: 1 },
  { dayOfWeek: 5, taskCount: 2, doneCount: 0 },
  { dayOfWeek: 6, taskCount: 1, doneCount: 0 },
].map((d, i) => ({
  ...d,
  date: new Date(Date.UTC(2026, 0, 5 + i)),
  isToday: d.dayOfWeek === 4,
}));

export const PREVIEW_QUESTION: ClientQuestion = {
  id: "preview-1",
  section: "MATH",
  topic: "numbers-algebra",
  subtopic: "Solve Problems Involving Ratios and Proportions",
  difficulty: 2,
  type: "SINGLE",
  stem: "A solution is mixed at a ratio of 3 parts saline to 2 parts water. How many milliliters of saline are in 250 mL of the solution?",
  options: ["100 mL", "125 mL", "150 mL", "167 mL"],
};

export const PREVIEW_FEEDBACK: AnswerFeedback = {
  isCorrect: false,
  correct: [2],
  explanation: null,
  rationale: {
    takeaway:
      "Add the ratio parts first: the parts describe the whole, not one piece of it.",
    steps: [
      "Add the parts: 3 + 2 = 5 total parts.",
      "Find one part: 250 ÷ 5 = 50 mL per part.",
      "Saline is 3 parts: 3 × 50 = 150 mL.",
    ],
    whyCorrect:
      "150 mL of saline leaves 100 mL of water, which is a 3 to 2 ratio and totals 250 mL.",
    distractors: {
      "0": "100 mL is the water, not the saline. This answers the wrong part of the ratio.",
      "1": "125 mL is half of 250. That would be a 1 to 1 ratio, not 3 to 2.",
      "3": "167 mL comes from treating the ratio as 3 to 2 of the whole rather than 3 of 5 parts.",
    },
    commonMistake:
      "Dividing by 3 or by 2 instead of by the 5 total parts. The denominator is always the sum of the parts.",
  },
  section: "MATH",
  topic: "numbers-algebra",
  subtopic: "Solve Problems Involving Ratios and Proportions",
  saved: false,
};

/** The learner's picked answer in the rationale preview: the water, not the saline. */
export const PREVIEW_ANSWER = 0;
