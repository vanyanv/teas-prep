import { db } from "@/lib/db";
import {
  selectBalanced,
  selectFromPool,
  selectSectionBalanced,
  selectWithCooldown,
  type Exposure,
} from "@/lib/quiz/select";
import { gradeQuestion, scoreItems, type GradedItem } from "@/lib/quiz/score";
import {
  recordQuestionReviews,
  getDueQuestionIds,
} from "@/lib/review/question-srs";
import { recomputeProgress } from "@/lib/progress/recompute";
import { captureBaseline } from "@/lib/progress/baseline";
import { parseRationale, type StructuredRationale } from "@/lib/quiz/rationale";
import type {
  Answer,
  ClientQuestion,
  QuizQuestion,
  QuestionType,
  QuestionImage,
} from "@/lib/quiz/types";
import {
  SECTION_DIAGNOSTIC_TOTAL,
  SECTION_ORDER,
  BLUEPRINT,
  sectionLabel,
  type Section,
} from "@/lib/teas-blueprint";
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
  rationale: unknown;
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
    rationale: row.rationale ?? null,
    images: (row.images as QuestionImage[] | null) ?? null,
    hotspots: (row.hotspots as QuizQuestion["hotspots"]) ?? null,
    attribution: row.attribution,
  };
}

function toClient(q: QuizQuestion): ClientQuestion {
  // strip everything that reveals the answer: correct, explanation, rationale
  const { correct: _c, explanation: _e, rationale: _r, ...rest } = q;
  void _c;
  void _e;
  void _r;
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
  opts?: { timed?: boolean },
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

  // `timed` + `scoped` let Progress tell exam-grade measurements (timed, mixed
  // sets: the "progress check") apart from casual filtered drills.
  const scoped = Boolean(filter?.section || filter?.topic || filter?.subtopic);
  const attempt = await db.attempt.create({
    data: {
      userId,
      mode,
      config: {
        questionIds: ids,
        total,
        ...(opts?.timed ? { timed: true } : {}),
        ...(scoped ? { scoped: true } : {}),
      },
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

/** Practice drill over the user's bookmarked ("saved for review") questions. */
export async function startSavedSession(
  userId: string,
  limit = 20,
): Promise<StartedAttempt> {
  const savedRows = await db.questionReview.findMany({
    where: { userId, saved: true },
    orderBy: { savedAt: "desc" },
    take: limit,
    select: { questionId: true },
  });
  const ids = savedRows.map((r) => r.questionId);
  if (ids.length === 0) return { attemptId: "", questions: [] };

  const rows = (await db.question.findMany({
    where: { id: { in: ids } },
  })) as unknown as QuestionRow[];
  const byId = new Map(rows.map((r) => [r.id, r]));
  const ordered = ids.map((id) => byId.get(id)).filter(Boolean) as QuestionRow[];
  const quiz = ordered.map(toQuiz);

  const attempt = await db.attempt.create({
    data: {
      userId,
      mode: "PRACTICE",
      config: { variant: "saved", questionIds: quiz.map((q) => q.id), total: quiz.length },
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
  rationale: StructuredRationale | null;
  section: Section;
  topic: string;
  subtopic: string | null;
  /** whether the user has bookmarked this question for review */
  saved: boolean;
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
    select: { id: true, attempt: { select: { config: true, finishedAt: true } } },
  });
  if (!item) throw new Error("Item not found");
  // Immediate grading is a session-only affordance. Refuse to grade (and thus
  // reveal the answer) for diagnostic/mock/batch-practice attempts, which stay
  // feedback-free until their own submit path runs.
  const variant = (item.attempt.config as { variant?: string } | null)?.variant;
  if (variant !== "session") throw new Error("Not a session attempt");
  if (item.attempt.finishedAt) throw new Error("Attempt already finished");

  const row = (await db.question.findUnique({
    where: { id: questionId },
  })) as unknown as QuestionRow | null;
  if (!row) throw new Error("Question not found");

  const q = toQuiz(row);
  const isCorrect = gradeQuestion(q, answer);
  const conf = confidence === 1 || confidence === 2 || confidence === 3 ? confidence : null;

  const [, review] = await Promise.all([
    db.attemptItem.update({
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
    }),
    db.questionReview.findUnique({
      where: { userId_questionId: { userId, questionId } },
      select: { saved: true },
    }),
  ]);

  return {
    isCorrect,
    correct: q.correct,
    explanation: q.explanation ?? null,
    rationale: parseRationale(q.rationale),
    section: q.section,
    topic: q.topic,
    subtopic: q.subtopic ?? null,
    saved: review?.saved ?? false,
  };
}

/**
 * Autosave an in-progress answer WITHOUT grading it. Used by the mock and any
 * batch-graded flow so a refresh or crash never loses answers. Writes only
 * `selected`/`confidence`/`flagged`; `isCorrect` stays null (no reveal, no
 * mastery effect) until the attempt is submitted.
 */
export async function saveAttemptItem(
  userId: string,
  attemptId: string,
  questionId: string,
  patch: { selected?: Answer; confidence?: number | null; flagged?: boolean },
): Promise<void> {
  const item = await db.attemptItem.findFirst({
    where: { attemptId, questionId, attempt: { userId } },
    select: { id: true, attempt: { select: { finishedAt: true } } },
  });
  if (!item) throw new Error("Item not found");
  if (item.attempt.finishedAt) throw new Error("Attempt already finished");

  const rawConf = patch.confidence;
  const conf =
    rawConf === 1 || rawConf === 2 || rawConf === 3
      ? rawConf
      : rawConf === null
        ? null
        : undefined;

  await db.attemptItem.update({
    where: { id: item.id },
    data: {
      ...(patch.selected !== undefined ? { selected: patch.selected as never } : {}),
      ...(conf !== undefined ? { confidence: conf } : {}),
      ...(patch.flagged !== undefined ? { flagged: patch.flagged } : {}),
    },
  });
}

export interface ResumableMock {
  attemptId: string;
  sections: MockSection[];
  answers: Record<string, Answer>;
  confidence: Record<string, number>;
  flagged: string[];
}

/**
 * The user's in-progress mock (started, not submitted), reconstructed for
 * resume: the same section structure plus every answer/confidence/flag saved so
 * far. Section timers restart on resume — recovering answers matters more than
 * perfect timer continuity for an interrupted study session.
 */
export async function getResumableMock(userId: string): Promise<ResumableMock | null> {
  const attempt = await db.attempt.findFirst({
    where: { userId, mode: "MOCK", finishedAt: null },
    orderBy: { startedAt: "desc" },
    include: { items: { orderBy: { orderIndex: "asc" } } },
  });
  if (!attempt || attempt.items.length === 0) return null;

  const rows = (await db.question.findMany({
    where: { id: { in: attempt.items.map((i) => i.questionId) } },
  })) as unknown as QuestionRow[];
  const byId = new Map(rows.map((r) => [r.id, toQuiz(r)]));

  const bySection = new Map<Section, QuizQuestion[]>();
  const answers: Record<string, Answer> = {};
  const confidence: Record<string, number> = {};
  const flagged: string[] = [];
  for (const item of attempt.items) {
    const q = byId.get(item.questionId);
    if (!q) continue;
    (bySection.get(q.section) ?? bySection.set(q.section, []).get(q.section)!).push(q);
    if (item.selected != null) answers[q.id] = item.selected as Answer;
    if (item.confidence != null) confidence[q.id] = item.confidence;
    if (item.flagged) flagged.push(q.id);
  }

  const sections: MockSection[] = SECTION_ORDER.filter((s) => bySection.has(s)).map((key) => {
    const questions = bySection.get(key)!;
    const spec = BLUEPRINT[key];
    const minutes = Math.max(1, Math.round((questions.length / spec.total) * spec.minutes));
    return { section: key, label: sectionLabel(key), minutes, questions: questions.map(toClient) };
  });

  return { attemptId: attempt.id, sections, answers, confidence, flagged };
}

/** Discard an in-progress mock (user chose to start over). */
export async function discardMock(userId: string, attemptId: string): Promise<void> {
  await db.attempt.deleteMany({ where: { id: attemptId, userId, mode: "MOCK", finishedAt: null } });
}

export interface ResumableSession {
  attemptId: string;
  questions: ClientQuestion[];
  /** first unanswered question (answers happen strictly in order) */
  startIndex: number;
  correctSoFar: number;
  reviewCount: number;
  focus: { section: Section; topic: string } | null;
}

/**
 * Today's partially-answered session, if any. Answers are graded per question,
 * so nothing is lost by leaving; picking the attempt back up keeps mastery,
 * SRS, and the free-tier session count honest. Only same-day sessions resume:
 * an older one was composed for a different day's weaknesses.
 */
export async function getResumableSession(
  userId: string,
): Promise<ResumableSession | null> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const attempt = await db.attempt.findFirst({
    where: {
      userId,
      mode: "PRACTICE",
      finishedAt: null,
      startedAt: { gte: startOfDay },
      config: { path: ["variant"], equals: "session" },
    },
    orderBy: { startedAt: "desc" },
    include: { items: { orderBy: { orderIndex: "asc" } } },
  });
  if (!attempt || attempt.items.length === 0) return null;

  const startIndex = attempt.items.findIndex((i) => i.selected == null);
  // Untouched attempts compose fresh; fully-answered ones have nothing to run.
  if (startIndex <= 0) return null;

  const rows = (await db.question.findMany({
    where: { id: { in: attempt.items.map((i) => i.questionId) } },
  })) as unknown as QuestionRow[];
  const byId = new Map(rows.map((r) => [r.id, toQuiz(r)]));
  const questions = attempt.items
    .map((i) => byId.get(i.questionId))
    .filter((q): q is QuizQuestion => q != null)
    .map(toClient);
  if (questions.length !== attempt.items.length) return null;

  const cfg = attempt.config as {
    section?: Section;
    topic?: string;
    reviewCount?: number;
  } | null;

  return {
    attemptId: attempt.id,
    questions,
    startIndex,
    correctSoFar: attempt.items.filter((i) => i.isCorrect === true).length,
    reviewCount: cfg?.reviewCount ?? 0,
    focus: cfg?.section && cfg?.topic ? { section: cfg.section, topic: cfg.topic } : null,
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
  // Session attempts only, and finalize exactly once: re-running would
  // double-advance every answered question's spaced-repetition state.
  const variant = (attempt.config as { variant?: string } | null)?.variant;
  if (variant !== "session") throw new Error("Not a session attempt");
  if (attempt.finishedAt) return { scorePct: attempt.scorePct ?? 0 };

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

  await refreshProgress(userId);
  return { scorePct: score.pct };
}

/**
 * Rebuild the derived progress caches after grading. The caches are
 * rebuildable projections, so a failure here must never fail the grade that
 * already committed — log and move on; the next read/ensure will recover.
 */
async function refreshProgress(userId: string): Promise<void> {
  try {
    await recomputeProgress(userId);
  } catch (err) {
    console.error("recomputeProgress failed after grading", err);
  }
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
 * Per-section diagnostic (NurseHub-style): ~35 questions from one TEAS
 * section, topic mix weighted by the official blueprint. Returns empty
 * without creating an attempt when the section has no questions.
 */
export async function startSectionDiagnostic(
  userId: string,
  section: Section,
): Promise<StartedAttempt> {
  const pool = (await db.question.findMany({
    where: {
      AND: [{ OR: [{ ownerId: null }, { ownerId: userId }] }, { section }],
    },
    select: { id: true, section: true, topic: true },
  })) as { id: string; section: Section; topic: string }[];
  if (pool.length === 0) return { attemptId: "", questions: [] };

  const ids = selectSectionBalanced(pool, section, SECTION_DIAGNOSTIC_TOTAL);
  const rows = (await db.question.findMany({
    where: { id: { in: ids } },
  })) as unknown as QuestionRow[];
  const byId = new Map(rows.map((r) => [r.id, r]));
  const ordered = ids.map((id) => byId.get(id)).filter(Boolean) as QuestionRow[];
  const quiz = ordered.map(toQuiz);

  const attempt = await db.attempt.create({
    data: {
      userId,
      mode: "DIAGNOSTIC",
      config: { variant: "section", section, questionIds: ids, total: quiz.length },
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

  // Cooldown map: prefer questions this user has seen least/longest-ago, so a
  // second or third simulation doesn't recycle the same items.
  const exposureRows = await db.questionExposure.findMany({
    where: { userId },
    select: { questionId: true, timesServed: true, lastServedAt: true },
  });
  const exposure = new Map<string, Exposure>(
    exposureRows.map((r) => [
      r.questionId,
      { timesServed: r.timesServed, lastServedMs: r.lastServedAt.getTime() },
    ]),
  );

  for (const spec of SECTIONS) {
    const pool = (await db.question.findMany({
      where: {
        AND: [{ OR: [{ ownerId: null }, { ownerId: userId }] }, { section: spec.key }],
      },
      select: { id: true, section: true, topic: true },
    })) as { id: string; section: Section; topic: string }[];

    const take = Math.min(spec.total, pool.length);
    if (take === 0) continue;
    const ids = selectWithCooldown(pool, take, exposure);

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
      config: {
        questionIds: allOrderedIds,
        total: allOrderedIds.length,
        formId: crypto.randomUUID(),
      },
    },
  });
  await db.attemptItem.createMany({
    data: allOrderedIds.map((id, i) => ({
      attemptId: attempt.id,
      questionId: id,
      orderIndex: i,
    })),
  });

  await recordExposure(userId, allOrderedIds);
  return { attemptId: attempt.id, sections };
}

/** Bump served-count and served-time for a set of questions (exam cooldown). */
async function recordExposure(userId: string, questionIds: string[]): Promise<void> {
  const now = new Date();
  await Promise.all(
    questionIds.map((questionId) =>
      db.questionExposure.upsert({
        where: { userId_questionId: { userId, questionId } },
        create: { userId, questionId, timesServed: 1, lastServedAt: now },
        update: { timesServed: { increment: 1 }, lastServedAt: now },
      }),
    ),
  );
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

  // First completed diagnostic per section becomes the permanent baseline.
  const cfg = attempt.config as { variant?: string; section?: Section } | null;
  if (attempt.mode === "DIAGNOSTIC" && cfg?.variant === "section" && cfg.section) {
    await captureBaseline(userId, cfg.section, attempt.id, score.pct).catch((err) =>
      console.error("captureBaseline failed", err),
    );
  }

  // Schedule each answered question for spaced review (misses come back soon).
  await recordQuestionReviews(userId, reviewBatch, new Date());

  await refreshProgress(userId);
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
  /** ids of these questions the user has bookmarked for review */
  savedQuestionIds: string[];
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

  const savedRows = await db.questionReview.findMany({
    where: {
      userId,
      saved: true,
      questionId: { in: attempt.items.map((i) => i.questionId) },
    },
    select: { questionId: true },
  });

  return {
    id: attempt.id,
    mode: attempt.mode,
    finishedAt: attempt.finishedAt,
    score: scoreItems(graded),
    items,
    savedQuestionIds: savedRows.map((r) => r.questionId),
  };
}
