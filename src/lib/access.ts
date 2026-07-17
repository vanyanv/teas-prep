import { auth } from "@clerk/nextjs/server";

// Deliberately no top-level db import: it would connect Prisma the moment
// this module loads, and the pure parts (limits, lesson sampling, copy) are
// used in tests and client-adjacent code that never touch the database.
async function getDb() {
  const { db } = await import("@/lib/db");
  return db;
}

/** Clerk Billing plan slug configured in the Clerk Dashboard. */
export const PRO_PLAN = "pro";

/**
 * Master billing switch. Until BILLING_ENABLED=true (set once Clerk Billing
 * is enabled and the `pro` plan exists), the product runs fully unlocked:
 * every account passes isPro(), so no paywalls, upgrade prompts, or
 * dead-end checkout ever render.
 */
export function billingEnabled(): boolean {
  return process.env.BILLING_ENABLED === "true";
}

/**
 * What a free account gets. Free is a working sample, not a crippled demo:
 * the full diagnostic, complete results, one genuinely personalized session,
 * a real practice allowance, and one sample lesson per section.
 */
export const FREE_LIMITS = {
  /** Personalized daily sessions (attempts with config.variant "session"). */
  sessions: 1,
  /** Practice questions served across standalone drills. */
  practiceQuestions: 25,
  /** Weeks of the generated study plan shown. */
  planWeeks: 1,
  /** One representative guided lesson per section. */
  lessonSlugs: [
    "distinguish-between-fact-and-opinion", // Reading
    "compare-order-rational-numbers", // Math (the lesson on the landing page)
    "cardiovascular-system", // Science
    "correct-use-of-end-punctuation", // English
  ] as readonly string[],
} as const;

/** Server-side plan check. Never trust a client-supplied value for this. */
export async function isPro(): Promise<boolean> {
  if (!billingEnabled()) return true;
  const { userId, has } = await auth();
  if (!userId) return false;
  return has({ plan: PRO_PLAN });
}

export function isFreeLesson(slug: string): boolean {
  return FREE_LIMITS.lessonSlugs.includes(slug);
}

/**
 * Personalized sessions this user has actually used (free plan allows one).
 * "Used" means finished or at least one question answered, so a refresh
 * before answering anything never burns the free session.
 */
export async function countSessionsUsed(userId: string): Promise<number> {
  const db = await getDb();
  return db.attempt.count({
    where: {
      userId,
      mode: "PRACTICE",
      config: { path: ["variant"], equals: "session" },
      OR: [
        { finishedAt: { not: null } },
        { items: { some: { isCorrect: { not: null } } } },
      ],
    },
  });
}

/**
 * Practice questions served to this user outside personalized sessions.
 * Counted as served rather than answered so abandoning mid-quiz cannot be
 * used to farm unlimited fresh questions.
 */
export async function countPracticeQuestionsServed(
  userId: string,
): Promise<number> {
  const db = await getDb();
  const [all, inSessions] = await Promise.all([
    db.attemptItem.count({
      where: { attempt: { userId, mode: "PRACTICE" } },
    }),
    db.attemptItem.count({
      where: {
        attempt: {
          userId,
          mode: "PRACTICE",
          config: { path: ["variant"], equals: "session" },
        },
      },
    }),
  ]);
  return Math.max(0, all - inSessions);
}

export interface Access {
  isPro: boolean;
  /** Personalized sessions remaining (Infinity for Pro). */
  sessionsLeft: number;
  /** Practice questions remaining (Infinity for Pro). */
  practiceLeft: number;
}

/** One call for pages that render free-plan state. */
export async function getAccess(userId: string): Promise<Access> {
  if (await isPro()) {
    return { isPro: true, sessionsLeft: Infinity, practiceLeft: Infinity };
  }
  const [sessions, practice] = await Promise.all([
    countSessionsUsed(userId),
    countPracticeQuestionsServed(userId),
  ]);
  return {
    isPro: false,
    sessionsLeft: Math.max(0, FREE_LIMITS.sessions - sessions),
    practiceLeft: Math.max(0, FREE_LIMITS.practiceQuestions - practice),
  };
}

/** Standard 402 payload for API routes; flows surface `error` as-is. */
export function proRequiredError(context: string) {
  return {
    error: "This is part of TEAS Pro. Upgrade for $4.99/month, cancel anytime.",
    reason: "pro-required" as const,
    context,
  };
}
