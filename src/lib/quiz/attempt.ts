import { db } from "@/lib/db";
import { selectBalanced, selectFromPool } from "@/lib/quiz/select";
import { gradeQuestion, scoreItems, type GradedItem } from "@/lib/quiz/score";
import {
  recordQuestionReviews,
  getDueQuestionIds,
} from "@/lib/review/question-srs";
import type {
  Answer,
  ClientQuestion,
  QuizQuestion,
  QuestionType,
} from "@/lib/quiz/types";
import type { Section } from "@/lib/teas-blueprint";
import type { AttemptMode } from "@/generated/prisma/enums";

type QuestionRow = {
  id: string;
  section: Section;
  topic: string;
  subtopic: string | null;
  difficulty: number;
  type: QuestionType;
  stem: string;
  options: unknown;
  correct: unknown;
  explanation: string | null;
  images: unknown;
  hotspots: unknown;
  attribution: string | null;
};

function toQuiz(row: QuestionRow): QuizQuestion {
  return {
    id: row.id,
    section: row.section,
    topic: row.topic,
    subtopic: row.subtopic,
    difficulty: row.difficulty,
    type: row.type,
    stem: row.stem,
    options: (row.options as string[]) ?? [],
    correct: (row.correct as number[] | string[]) ?? [],
    explanation: row.explanation,
    images: (row.images as string[] | null) ?? null,
    hotspots: (row.hotspots as QuizQuestion["hotspots"]) ?? null,
    attribution: row.attribution,
  };
}

function toClient(q: QuizQuestion): ClientQuestion {
  // strip correct + explanation
  const { correct: _c, explanation: _e, ...rest } = q;
  void _c;
  void _e;
  return rest;
}

export interface StartedAttempt {
  attemptId: string;
  questions: ClientQuestion[];
}

export interface QuestionFilter {
  section?: Section;
  topic?: string;
  subtopic?: string;
  difficulty?: number;
}

/** Create an attempt, select a balanced question set, return client-safe items. */
export async function startAttempt(
  userId: string,
  mode: AttemptMode,
  total: number,
  filter?: QuestionFilter,
): Promise<StartedAttempt> {
  // Pool: global seed + this user's private imports, narrowed by any filter.
  const pool = (await db.question.findMany({
    where: {
      AND: [
        { OR: [{ ownerId: null }, { ownerId: userId }] },
        filter?.section ? { section: filter.section } : {},
        filter?.topic ? { topic: filter.topic } : {},
        filter?.subtopic ? { subtopic: filter.subtopic } : {},
        filter?.difficulty ? { difficulty: filter.difficulty } : {},
      ],
    },
    select: { id: true, section: true, topic: true },
  })) as { id: string; section: Section; topic: string }[];

  // When narrowed to a single section/topic/skill, keep all matches (don't rebalance).
  const ids =
    filter?.section || filter?.topic || filter?.subtopic
      ? selectFromPool(pool, total)
      : selectBalanced(pool, total);

  const rows = (await db.question.findMany({
    where: { id: { in: ids } },
  })) as unknown as QuestionRow[];

  // preserve the selected (shuffled) order
  const byId = new Map(rows.map((r) => [r.id, r]));
  const ordered = ids.map((id) => byId.get(id)).filter(Boolean) as QuestionRow[];
  const quiz = ordered.map(toQuiz);

  const attempt = await db.attempt.create({
    data: {
      userId,
      mode,
      config: { questionIds: ids, total },
    },
  });

  // pre-create attempt items to lock the question set + order
  await db.attemptItem.createMany({
    data: quiz.map((q, i) => ({
      attemptId: attempt.id,
      questionId: q.id,
      orderIndex: i,
    })),
  });

  return { attemptId: attempt.id, questions: quiz.map(toClient) };
}

/** Create an attempt from an explicit ordered id list (composed sessions). */
export async function startFromIds(
  userId: string,
  mode: AttemptMode,
  ids: string[],
  config: Record<string, unknown> = {},
): Promise<StartedAttempt> {
  const rows = (await db.question.findMany({
    where: { id: { in: ids }, OR: [{ ownerId: null }, { ownerId: userId }] },
  })) as unknown as QuestionRow[];
  const byId = new Map(rows.map((r) => [r.id, r]));
  const ordered = ids.map((id) => byId.get(id)).filter(Boolean) as QuestionRow[];
  const quiz = ordered.map(toQuiz);

  const attempt = await db.attempt.create({
    data: {
      userId,
      mode,
      config: { ...config, questionIds: quiz.map((q) => q.id), total: quiz.length },
    },
  });
  await db.attemptItem.createMany({
    data: quiz.map((q, i) => ({
      attemptId: attempt.id,
      questionId: q.id,
      orderIndex: i,
    })),
  });

  return { attemptId: attempt.id, questions: quiz.map(toClient) };
}

export interface AnswerFeedback {
  isCorrect: boolean;
  correct: number[] | string[];
  explanation: string | null;
  section: Section;
  topic: string;
  subtopic: string | null;
}

/**
 * Grade one question immediately (session mode): persist the item's answer,
 * correctness, confidence, and time, and return everything the feedback panel
 * teaches with. The attempt is finalized separately via `finalizeAttempt`.
 */
export async function answerItem(
  userId: string,
  attemptId: string,
  questionId: string,
  answer: Answer,
  confidence: number | null,
  timeMs: number | null,
): Promise<AnswerFeedback> {
  const item = await db.attemptItem.findFirst({
    where: { attemptId, questionId, attempt: { userId } },
    select: { id: true },
  });
  if (!item) throw new Error("Item not found");

  const row = (await db.question.findUnique({
    where: { id: questionId },
  })) as unknown as QuestionRow | null;
  if (!row) throw new Error("Question not found");

  const q = toQuiz(row);
  const isCorrect = gradeQuestion(q, answer);
  const conf = confidence === 1 || confidence === 2 || confidence === 3 ? confidence : null;

  await db.attemptItem.update({
    where: { id: item.id },
    data: {
      selected: answer as never,
      isCorrect,
      confidence: conf,
      timeMs:
        timeMs != null && Number.isFinite(timeMs)
          ? Math.max(0, Math.round(timeMs))
          : null,
    },
  });

  return {
    isCorrect,
    correct: q.correct,
    explanation: q.explanation ?? null,
    section: q.section,
    topic: q.topic,
    subtopic: q.subtopic ?? null,
  };
}

/** Finalize an incrementally-answered attempt: score it and schedule reviews. */
export async function finalizeAttempt(
  userId: string,
  attemptId: string,
): Promise<{ scorePct: number }> {
  const attempt = await db.attempt.findFirst({
    where: { id: attemptId, userId },
    include: {
      items: {
        include: {
          question: { select: { section: true, topic: true, subtopic: true } },
        },
      },
    },
  });
  if (!attempt) throw new Error("Attempt not found");

  const answered = attempt.items.filter((it) => it.isCorrect !== null);
  const graded: GradedItem[] = answered.map((it) => ({
    questionId: it.questionId,
    section: it.question.section as Section,
    topic: it.question.topic,
    subtopic: it.question.subtopic,
    isCorrect: !!it.isCorrect,
  }));

  const score = scoreItems(graded);
  await db.attempt.update({
    where: { id: attempt.id },
    data: { finishedAt: new Date(), scorePct: score.pct },
  });
  await recordQuestionReviews(
    userId,
    answered.map((it) => ({
      questionId: it.questionId,
      isCorrect: !!it.isCorrect,
      confidence: it.confidence ?? null,
    })),
    new Date(),
  );

  return { scorePct: score.pct };
}

/**
 * Spaced-repetition review session: the questions that are due now (missed or
 * low-confidence answers resurfaced on schedule), soonest-due first. Returns an
 * empty set when nothing is due so the caller can show an "all caught up" state.
 */
export async function startReviewSession(
  userId: string,
  limit = 20,
): Promise<StartedAttempt> {
  const dueIds = await getDueQuestionIds(userId, new Date(), limit);
  if (dueIds.length === 0) return { attemptId: "", questions: [] };

  const rows = (await db.question.findMany({
    where: { id: { in: dueIds } },
  })) as unknown as QuestionRow[];
  const byId = new Map(rows.map((r) => [r.id, r]));
  const ordered = dueIds.map((id) => byId.get(id)).filter(Boolean) as QuestionRow[];
  const quiz = ordered.map(toQuiz);

  const attempt = await db.attempt.create({
    data: {
      userId,
      mode: "PRACTICE",
      config: { variant: "review", questionIds: quiz.map((q) => q.id), total: quiz.length },
    },
  });
  await db.attemptItem.createMany({
    data: quiz.map((q, i) => ({
      attemptId: attempt.id,
      questionId: q.id,
      orderIndex: i,
    })),
  });

  return { attemptId: attempt.id, questions: quiz.map(toClient) };
}

/**
 * NurseHub diagnostic: the user's imported NurseHub questions in section order,
 * graded into a per-skill score sheet (each question maps to a NurseHub skill).
 */
export async function startNurseHubDiagnostic(
  userId: string,
): Promise<StartedAttempt> {
  const { SECTION_ORDER } = await import("@/lib/teas-blueprint");
  const rows = (await db.question.findMany({
    where: { ownerId: userId, source: "nursehub" },
  })) as unknown as QuestionRow[];

  // No imported NurseHub questions: return empty without creating an attempt.
  if (rows.length === 0) return { attemptId: "", questions: [] };

  const order = new Map(SECTION_ORDER.map((s, i) => [s, i]));
  rows.sort(
    (a, b) => (order.get(a.section) ?? 9) - (order.get(b.section) ?? 9),
  );

  const quiz = rows.map(toQuiz);
  const attempt = await db.attempt.create({
    data: {
      userId,
      mode: "DIAGNOSTIC",
      config: { variant: "nursehub", total: quiz.length },
    },
  });
  await db.attemptItem.createMany({
    data: quiz.map((q, i) => ({
      attemptId: attempt.id,
      questionId: q.id,
      orderIndex: i,
    })),
  });
  return { attemptId: attempt.id, questions: quiz.map(toClient) };
}

export interface MockSection {
  section: Section;
  label: string;
  minutes: number;
  questions: ClientQuestion[];
}

export interface StartedMock {
  attemptId: string;
  sections: MockSection[];
}

/**
 * Build a full-length mock mirroring the real exam: each section in order, sized
 * to official counts (capped by available content), with per-section minutes
 * scaled to keep the real ~1.2 min/question pace.
 */
export async function startMock(userId: string): Promise<StartedMock> {
  const { SECTIONS, BLUEPRINT } = await import("@/lib/teas-blueprint");
  const sections: MockSection[] = [];
  const allOrderedIds: string[] = [];
  const quizById = new Map<string, QuizQuestion>();

  for (const spec of SECTIONS) {
    const pool = (await db.question.findMany({
      where: {
        AND: [{ OR: [{ ownerId: null }, { ownerId: userId }] }, { section: spec.key }],
      },
      select: { id: true, section: true, topic: true },
    })) as { id: string; section: Section; topic: string }[];

    const take = Math.min(spec.total, pool.length);
    if (take === 0) continue;
    const ids = selectFromPool(pool, take);

    const rows = (await db.question.findMany({
      where: { id: { in: ids } },
    })) as unknown as QuestionRow[];
    const byId = new Map(rows.map((r) => [r.id, r]));
    const ordered = ids
      .map((id) => byId.get(id))
      .filter(Boolean) as QuestionRow[];
    const quiz = ordered.map(toQuiz);
    quiz.forEach((q) => quizById.set(q.id, q));
    allOrderedIds.push(...quiz.map((q) => q.id));

    const minutes = Math.max(
      1,
      Math.round((take / spec.total) * BLUEPRINT[spec.key].minutes),
    );
    sections.push({
      section: spec.key,
      label: spec.label,
      minutes,
      questions: quiz.map(toClient),
    });
  }

  const attempt = await db.attempt.create({
    data: {
      userId,
      mode: "MOCK",
      config: { questionIds: allOrderedIds, total: allOrderedIds.length },
    },
  });
  await db.attemptItem.createMany({
    data: allOrderedIds.map((id, i) => ({
      attemptId: attempt.id,
      questionId: id,
      orderIndex: i,
    })),
  });

  return { attemptId: attempt.id, sections };
}

/** Grade an attempt, persist per-item results, set score + finishedAt. */
export async function submitAttempt(
  userId: string,
  attemptId: string,
  answers: Record<string, Answer>,
  flagged: string[],
  confidence: Record<string, number> = {},
): Promise<{ scorePct: number }> {
  const attempt = await db.attempt.findFirst({
    where: { id: attemptId, userId },
    include: { items: true },
  });
  if (!attempt) throw new Error("Attempt not found");

  const questionIds = attempt.items.map((it) => it.questionId);
  const rows = (await db.question.findMany({
    where: { id: { in: questionIds } },
  })) as unknown as QuestionRow[];
  const byId = new Map(rows.map((r) => [r.id, toQuiz(r)]));

  const graded: GradedItem[] = [];
  const reviewBatch: {
    questionId: string;
    isCorrect: boolean;
    confidence: number | null;
  }[] = [];
  for (const item of attempt.items) {
    const q = byId.get(item.questionId);
    if (!q) continue;
    const ans = answers[item.questionId] ?? null;
    const isCorrect = gradeQuestion(q, ans);
    graded.push({
      questionId: q.id,
      section: q.section,
      topic: q.topic,
      subtopic: q.subtopic,
      isCorrect,
    });
    const raw = confidence[item.questionId];
    const conf = raw === 1 || raw === 2 || raw === 3 ? raw : null;
    reviewBatch.push({ questionId: q.id, isCorrect, confidence: conf });
    await db.attemptItem.update({
      where: { id: item.id },
      data: {
        selected: ans as never,
        isCorrect,
        confidence: conf,
        flagged: flagged.includes(item.questionId),
      },
    });
  }

  const score = scoreItems(graded);
  await db.attempt.update({
    where: { id: attempt.id },
    data: { finishedAt: new Date(), scorePct: score.pct },
  });

  // Schedule each answered question for spaced review (misses come back soon).
  await recordQuestionReviews(userId, reviewBatch, new Date());

  return { scorePct: score.pct };
}

export interface AttemptResult {
  id: string;
  mode: AttemptMode;
  finishedAt: Date | null;
  score: ReturnType<typeof scoreItems>;
  items: {
    question: QuizQuestion;
    selected: Answer;
    isCorrect: boolean | null;
    confidence: number | null;
    flagged: boolean;
  }[];
}

/** Full result with correct answers + explanations for the review screen. */
export async function getAttemptResult(
  userId: string,
  attemptId: string,
): Promise<AttemptResult | null> {
  const attempt = await db.attempt.findFirst({
    where: { id: attemptId, userId },
    include: { items: { orderBy: { orderIndex: "asc" } } },
  });
  if (!attempt) return null;

  const rows = (await db.question.findMany({
    where: { id: { in: attempt.items.map((i) => i.questionId) } },
  })) as unknown as QuestionRow[];
  const byId = new Map(rows.map((r) => [r.id, toQuiz(r)]));

  const items = attempt.items
    .map((it) => {
      const q = byId.get(it.questionId);
      if (!q) return null;
      return {
        question: q,
        selected: (it.selected as Answer) ?? null,
        isCorrect: it.isCorrect,
        confidence: it.confidence ?? null,
        flagged: it.flagged,
      };
    })
    .filter(Boolean) as AttemptResult["items"];

  const graded: GradedItem[] = items.map((it) => ({
    questionId: it.question.id,
    section: it.question.section,
    topic: it.question.topic,
    subtopic: it.question.subtopic,
    isCorrect: !!it.isCorrect,
  }));

  return {
    id: attempt.id,
    mode: attempt.mode,
    finishedAt: attempt.finishedAt,
    score: scoreItems(graded),
    items,
  };
}
