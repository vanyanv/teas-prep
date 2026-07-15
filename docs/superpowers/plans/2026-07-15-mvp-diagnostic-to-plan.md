# MVP: Diagnostic → Personalized Plan → Session Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing single-user TEAS study app into the core product loop: multi-user signup with onboarding (exam date + target score) → narrative diagnostic results → one-tap study-plan generation → a daily Session player with immediate per-question feedback.

**Architecture:** All features build on existing engines (mastery in `src/lib/mastery.ts`, SM-2 question SRS in `src/lib/review/question-srs.ts`, blueprint selection in `src/lib/quiz/select.ts`, plan generator in `src/lib/plan/generate.ts`). New code is: two nullable columns on `User`, a pure diagnostic-insights module, a pure plan-input-defaults module, per-question grade-now primitives on `Attempt` (`answerItem`/`finalizeAttempt`), a session composer, and three new UI surfaces (results v2, session player, Today session card). No rewrites of existing flows — mock, practice, flashcards, and the old submit path stay untouched.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, Prisma 7 (client generated to `src/generated/prisma`), NextAuth v5 credentials, Zod 4, react-hook-form, Tailwind v4, vitest, lucide-react.

## Global Constraints

- **This Next.js version has breaking changes** (AGENTS.md). If unsure about an API, read `node_modules/next/dist/docs/01-app/...` before writing code. Known conventions already used in this repo: page `params` is a `Promise` (must `await`), route handlers use `ctx: RouteContext<"/api/path/[id]">` and `await ctx.params`.
- DB access is always `import { db } from "@/lib/db"`. Never instantiate PrismaClient directly.
- Prisma client output is `src/generated/prisma` (regenerate with `npm run db:generate`; `prisma migrate dev` regenerates automatically).
- Question pool visibility filter everywhere: `OR: [{ ownerId: null }, { ownerId: userId }]`.
- Confidence encoding: `1=guessed, 2=unsure, 3=confident, null=unrated (treated as confident)`.
- Tests: vitest, colocated `*.test.ts` next to the module. Run `npm run test`. Typecheck: `npm run typecheck`.
- Commands: `npm run test`, `npm run typecheck`, `npx prisma migrate dev --name <name>` (if migrate fails because no dev DB is reachable, fall back to `npm run db:push && npm run db:generate` and say so in the commit body).
- UI copy is calm and non-punishing. No streaks, confetti, or guilt language.
- Match existing UI idioms: `cn()` from `@/lib/utils`, shadcn `Button/Card/Input/Label`, `font-mono text-xs uppercase tracking-[0.18em]` kickers, `rounded-xl border bg-card` cards, `focus-visible:ring-[3px] focus-visible:ring-ring/40`.
- Commit after every task with the message given in the task.

---

### Task 1: Open multi-user signup

The signup API self-disables after the first user (`src/app/api/auth/signup/route.ts:8-15`) and the signup page shows a "Registration is closed" wall. Remove both, and reject duplicate emails properly.

**Files:**
- Modify: `src/app/api/auth/signup/route.ts`
- Modify: `src/app/(auth)/signup/page.tsx`

**Interfaces:**
- Consumes: `signupSchema` from `@/lib/validators` (unchanged in this task).
- Produces: `POST /api/auth/signup` that creates an account for ANY new email, returns 409 `{ error: "An account with this email already exists." }` on duplicates. The `GET` handler is deleted.

- [ ] **Step 1: Rewrite the signup route**

Replace the entire contents of `src/app/api/auth/signup/route.ts` with:

```ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { signupSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { email, password, name } = parsed.data;

  const existing = await db.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.create({
    data: { email: email.toLowerCase(), name: name ?? null, passwordHash },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
```

(The `GET` handler is intentionally gone — registration is always open now.)

- [ ] **Step 2: Remove the closed-registration wall from the signup page**

In `src/app/(auth)/signup/page.tsx`:

1. Delete the `useEffect` import usage and the whole block:

```tsx
  const [open, setOpen] = useState<boolean | null>(null);
```

and

```tsx
  useEffect(() => {
    fetch("/api/auth/signup")
      .then((r) => r.json())
      .then((d) => setOpen(!!d.open))
      .catch(() => setOpen(true));
  }, []);
```

2. Delete the entire `if (open === false) { return ( <Card> ... Registration is closed ... </Card> ); }` block.

3. Change the import line `import { useEffect, useState } from "react";` to `import { useState } from "react";`.

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run test`
Expected: both pass with no errors (existing suite unaffected).

- [ ] **Step 4: Commit**

```bash
git add src/app/api/auth/signup/route.ts "src/app/(auth)/signup/page.tsx"
git commit -m "feat: open signup to multiple users"
```

---

### Task 2: Onboarding fields — exam date + target score at signup

Add `testDate` and `targetScore` to `User`, extend the signup schema/form/route to capture them. These drive plan pre-fill (Task 4) and results copy (Task 5).

**Files:**
- Modify: `prisma/schema.prisma` (User model)
- Modify: `src/lib/validators.ts`
- Create: `src/lib/validators.test.ts`
- Modify: `src/app/api/auth/signup/route.ts`
- Modify: `src/app/(auth)/signup/page.tsx`

**Interfaces:**
- Produces: `User.testDate: DateTime?` and `User.targetScore: Int @default(70)` columns; `signupSchema` additionally accepts `{ testDate?: string ("YYYY-MM-DD" or ""), targetScore?: number (coerced, 50–95) }`. Task 4 reads `user.testDate`.

- [ ] **Step 1: Write the failing validator test**

Create `src/lib/validators.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { signupSchema } from "./validators";

const base = { email: "test@example.com", password: "password123" };

describe("signupSchema onboarding fields", () => {
  it("still accepts a signup without onboarding fields", () => {
    const parsed = signupSchema.safeParse(base);
    expect(parsed.success).toBe(true);
  });

  it("accepts an exam date string and coerces target score", () => {
    const parsed = signupSchema.safeParse({
      ...base,
      testDate: "2026-09-01",
      targetScore: "75",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.testDate).toBe("2026-09-01");
      expect(parsed.data.targetScore).toBe(75);
    }
  });

  it("accepts an empty test date (field left blank)", () => {
    const parsed = signupSchema.safeParse({ ...base, testDate: "" });
    expect(parsed.success).toBe(true);
  });

  it("rejects an out-of-range target score", () => {
    const parsed = signupSchema.safeParse({ ...base, targetScore: 40 });
    expect(parsed.success).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/lib/validators.test.ts`
Expected: FAIL — `signupSchema` strips/rejects unknown keys or `targetScore` is not coerced (the second and fourth tests fail).

- [ ] **Step 3: Extend the schema**

In `src/lib/validators.ts`, replace:

```ts
export const signupSchema = credentialsSchema.extend({
  name: z.string().trim().min(1, "Enter your name").max(80).optional(),
});
```

with:

```ts
export const signupSchema = credentialsSchema.extend({
  name: z.string().trim().min(1, "Enter your name").max(80).optional(),
  /** "YYYY-MM-DD" from a date input; empty string = not scheduled yet */
  testDate: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "Enter a valid date")
    .optional(),
  targetScore: z.coerce
    .number()
    .int()
    .min(50, "Target must be at least 50")
    .max(95, "Target must be 95 or below")
    .optional(),
});
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/lib/validators.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Add the columns to the Prisma schema**

In `prisma/schema.prisma`, inside `model User`, after `passwordHash String` add:

```prisma
  testDate     DateTime? // target exam date from onboarding (nullable = not scheduled)
  targetScore  Int       @default(70) // readiness target the UI measures against
```

- [ ] **Step 6: Migrate**

Run: `npx prisma migrate dev --name user-onboarding-fields`
Expected: migration created + applied, client regenerated. If the dev DB is unreachable, run `npm run db:push && npm run db:generate` instead and note it in the commit body.

- [ ] **Step 7: Persist the fields in the signup route**

In `src/app/api/auth/signup/route.ts`, replace:

```ts
  const { email, password, name } = parsed.data;

  const existing = await db.user.findUnique({
```

with:

```ts
  const { email, password, name, testDate, targetScore } = parsed.data;

  const examDate = testDate ? new Date(`${testDate}T00:00:00`) : null;
  if (examDate && Number.isNaN(examDate.getTime())) {
    return NextResponse.json({ error: "Invalid exam date" }, { status: 400 });
  }

  const existing = await db.user.findUnique({
```

and replace the `db.user.create` call with:

```ts
  await db.user.create({
    data: {
      email: email.toLowerCase(),
      name: name ?? null,
      passwordHash,
      testDate: examDate,
      targetScore: targetScore ?? 70,
    },
  });
```

- [ ] **Step 8: Add the two fields to the signup form**

In `src/app/(auth)/signup/page.tsx`, after the password field's closing `</div>` (the one containing `errors.password`), insert:

```tsx
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="testDate">Exam date (optional)</Label>
              <Input
                id="testDate"
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                {...register("testDate")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="targetScore">Target score</Label>
              <select
                id="targetScore"
                defaultValue={70}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
                {...register("targetScore")}
              >
                {[60, 65, 70, 75, 80, 85, 90].map((n) => (
                  <option key={n} value={n}>
                    {n}%
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Not scheduled yet? Leave the date blank — you can set it anytime.
          </p>
```

- [ ] **Step 9: Verify**

Run: `npm run typecheck && npm run test`
Expected: both pass.

- [ ] **Step 10: Commit**

```bash
git add prisma/schema.prisma prisma/migrations src/lib/validators.ts src/lib/validators.test.ts src/app/api/auth/signup/route.ts "src/app/(auth)/signup/page.tsx"
git commit -m "feat: capture exam date and target score at signup"
```

---

### Task 3: Diagnostic insights library (pure, TDD)

A pure module that turns graded diagnostic items into the narrative the results page tells: headline sentence, per-section bands, top-3 priority topics (weakness × blueprint weight), and the guessed-answer insight.

**Files:**
- Create: `src/lib/quiz/diagnostic-insights.ts`
- Create: `src/lib/quiz/diagnostic-insights.test.ts`

**Interfaces:**
- Consumes: `SECTIONS`, `TOTAL_SCORED`, `sectionLabel`, `type Section` from `@/lib/teas-blueprint`.
- Produces (used by Task 5):

```ts
export interface InsightItem { section: Section; topic: string; isCorrect: boolean; confidence: number | null; }
export type Band = "strong" | "solid" | "needs-work" | "priority";
export const BAND_LABELS: Record<Band, string>;
export function bandFor(pct: number): Band;
export interface TopicInsight { topic: string; label: string; correct: number; total: number; pct: number | null; }
export interface SectionInsight { section: Section; label: string; correct: number; total: number; pct: number | null; band: Band | null; topics: TopicInsight[]; }
export interface PriorityTopic { section: Section; topic: string; label: string; sectionLabel: string; pct: number; examSharePct: number; correct: number; total: number; }
export interface DiagnosticInsights { overallPct: number; totalCorrect: number; totalItems: number; headline: string; sections: SectionInsight[]; priorities: PriorityTopic[]; guessed: { total: number; correct: number }; }
export function computeDiagnosticInsights(items: InsightItem[]): DiagnosticInsights;
```

- [ ] **Step 1: Write the failing tests**

Create `src/lib/quiz/diagnostic-insights.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import {
  bandFor,
  computeDiagnosticInsights,
  type InsightItem,
} from "./diagnostic-insights";
import type { Section } from "@/lib/teas-blueprint";

function mk(
  section: Section,
  topic: string,
  isCorrect: boolean,
  confidence: number | null = null,
): InsightItem {
  return { section, topic, isCorrect, confidence };
}

/** n items on one section/topic, `c` of them correct */
function batch(section: Section, topic: string, n: number, c: number): InsightItem[] {
  return Array.from({ length: n }, (_, i) => mk(section, topic, i < c));
}

describe("bandFor", () => {
  it("maps pct to bands at the documented cutoffs", () => {
    expect(bandFor(75)).toBe("strong");
    expect(bandFor(74)).toBe("solid");
    expect(bandFor(60)).toBe("solid");
    expect(bandFor(59)).toBe("needs-work");
    expect(bandFor(40)).toBe("needs-work");
    expect(bandFor(39)).toBe("priority");
  });
});

describe("computeDiagnosticInsights", () => {
  const items: InsightItem[] = [
    ...batch("READING", "key-ideas-details", 10, 8), // 80% strong
    ...batch("MATH", "numbers-algebra", 6, 2), // 33%, high weight (18 scored)
    ...batch("SCIENCE", "chemistry", 5, 1), // 20%, low weight (8 scored)
    ...batch("SCIENCE", "anatomy-physiology", 8, 6), // 75% — excluded from priorities
  ];

  it("tallies per-section and per-topic accuracy with bands", () => {
    const r = computeDiagnosticInsights(items);
    const reading = r.sections.find((s) => s.section === "READING")!;
    expect(reading.pct).toBe(80);
    expect(reading.band).toBe("strong");
    const kid = reading.topics.find((t) => t.topic === "key-ideas-details")!;
    expect(kid.correct).toBe(8);
    expect(kid.total).toBe(10);
    const english = r.sections.find((s) => s.section === "ENGLISH")!;
    expect(english.pct).toBeNull();
    expect(english.band).toBeNull();
  });

  it("ranks priorities by weakness × blueprint weight and excludes 75%+", () => {
    const r = computeDiagnosticInsights(items);
    const keys = r.priorities.map((p) => p.topic);
    // numbers-algebra: (1-.33) * 18/150 = .080 > chemistry: (1-.2) * 8/150 = .043
    expect(keys[0]).toBe("numbers-algebra");
    expect(keys[1]).toBe("chemistry");
    expect(keys).not.toContain("anatomy-physiology");
    expect(r.priorities.length).toBeLessThanOrEqual(3);
  });

  it("counts guessed answers and guessed-correct separately", () => {
    const r = computeDiagnosticInsights([
      mk("READING", "key-ideas-details", true, 1),
      mk("READING", "key-ideas-details", false, 1),
      mk("READING", "key-ideas-details", true, 3),
    ]);
    expect(r.guessed).toEqual({ total: 2, correct: 1 });
  });

  it("writes a headline naming the strongest section and top priorities", () => {
    const r = computeDiagnosticInsights(items);
    expect(r.headline).toContain(`${r.overallPct}%`);
    expect(r.headline).toContain("Reading");
    expect(r.headline).toContain("Numbers & algebra");
  });

  it("handles a uniformly strong result without priorities", () => {
    const r = computeDiagnosticInsights(batch("READING", "key-ideas-details", 10, 9));
    expect(r.priorities).toHaveLength(0);
    expect(r.headline).toContain("Solid across the board");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/quiz/diagnostic-insights.test.ts`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement the module**

Create `src/lib/quiz/diagnostic-insights.ts`:

```ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/quiz/diagnostic-insights.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Full verify + commit**

Run: `npm run typecheck && npm run test`
Expected: pass.

```bash
git add src/lib/quiz/diagnostic-insights.ts src/lib/quiz/diagnostic-insights.test.ts
git commit -m "feat: diagnostic insights — bands, priorities, guessed stats, headline"
```

---

### Task 4: One-tap plan generation (defaults from profile)

`POST /api/plan` currently requires `testDate` + `hoursPerWeek`. Make both optional: fall back to the user's onboarding `testDate` (if in the future), else +42 days; hours default to 8. Also persist the resolved date back to `user.testDate` so it becomes the single source for countdowns. This lets the results page's CTA post an empty body.

**Files:**
- Create: `src/lib/plan/defaults.ts`
- Create: `src/lib/plan/defaults.test.ts`
- Modify: `src/app/api/plan/route.ts`
- Modify: `src/lib/plan/service.ts` (persist testDate on user)

**Interfaces:**
- Consumes: `User.testDate` from Task 2; `createPlan(userId, testDate, hoursPerWeek)` from `@/lib/plan/service`.
- Produces:

```ts
// src/lib/plan/defaults.ts
export const DEFAULT_HOURS_PER_WEEK = 8;
export const DEFAULT_RUNWAY_DAYS = 42;
export interface PlanInputs { testDate: Date; hoursPerWeek: number; }
export function resolvePlanInputs(
  opts: { bodyTestDate?: string | null; bodyHours?: number | null; userTestDate?: Date | null },
  now?: Date,
): PlanInputs;
```

`POST /api/plan` accepts `{}` and returns `{ planId }`.

- [ ] **Step 1: Write the failing tests**

Create `src/lib/plan/defaults.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { resolvePlanInputs } from "./defaults";

const now = new Date("2026-07-15T12:00:00Z");
const day = 86_400_000;

describe("resolvePlanInputs", () => {
  it("prefers an explicit body test date over the profile date", () => {
    const r = resolvePlanInputs(
      { bodyTestDate: "2026-10-01", userTestDate: new Date("2026-09-01") },
      now,
    );
    expect(r.testDate.toISOString().slice(0, 10)).toBe("2026-10-01");
  });

  it("falls back to a future profile test date", () => {
    const r = resolvePlanInputs({ userTestDate: new Date("2026-09-01") }, now);
    expect(r.testDate.toISOString().slice(0, 10)).toBe("2026-09-01");
  });

  it("ignores a past profile date and defaults to ~6 weeks out", () => {
    const r = resolvePlanInputs({ userTestDate: new Date("2026-01-01") }, now);
    expect(r.testDate.getTime()).toBe(now.getTime() + 42 * day);
  });

  it("ignores an invalid body date string", () => {
    const r = resolvePlanInputs({ bodyTestDate: "not-a-date" }, now);
    expect(r.testDate.getTime()).toBe(now.getTime() + 42 * day);
  });

  it("defaults hours to 8 and clamps invalid values", () => {
    expect(resolvePlanInputs({}, now).hoursPerWeek).toBe(8);
    expect(resolvePlanInputs({ bodyHours: 0 }, now).hoursPerWeek).toBe(8);
    expect(resolvePlanInputs({ bodyHours: 61 }, now).hoursPerWeek).toBe(8);
    expect(resolvePlanInputs({ bodyHours: 12 }, now).hoursPerWeek).toBe(12);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/plan/defaults.test.ts`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement**

Create `src/lib/plan/defaults.ts`:

```ts
export const DEFAULT_HOURS_PER_WEEK = 8;
/** ATI's minimum recommended runway when no exam date is known. */
export const DEFAULT_RUNWAY_DAYS = 42;

export interface PlanInputs {
  testDate: Date;
  hoursPerWeek: number;
}

/**
 * Resolve plan inputs so "Build my study plan" works with one tap:
 * explicit request values win, then the profile's exam date (if still ahead),
 * then a ~6-week default runway.
 */
export function resolvePlanInputs(
  opts: {
    bodyTestDate?: string | null;
    bodyHours?: number | null;
    userTestDate?: Date | null;
  },
  now: Date = new Date(),
): PlanInputs {
  let testDate: Date | null = null;

  if (opts.bodyTestDate) {
    const d = new Date(opts.bodyTestDate);
    if (!Number.isNaN(d.getTime())) testDate = d;
  }
  if (!testDate && opts.userTestDate && opts.userTestDate.getTime() > now.getTime()) {
    testDate = opts.userTestDate;
  }
  if (!testDate) {
    testDate = new Date(now.getTime() + DEFAULT_RUNWAY_DAYS * 86_400_000);
  }

  const h = opts.bodyHours;
  const hoursPerWeek =
    typeof h === "number" && Number.isFinite(h) && h >= 1 && h <= 60
      ? Math.round(h)
      : DEFAULT_HOURS_PER_WEEK;

  return { testDate, hoursPerWeek };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/plan/defaults.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Use it in the route**

Replace the entire contents of `src/app/api/plan/route.ts` with:

```ts
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createPlan } from "@/lib/plan/service";
import { resolvePlanInputs } from "@/lib/plan/defaults";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { testDate: true },
  });

  const inputs = resolvePlanInputs({
    bodyTestDate: typeof body?.testDate === "string" ? body.testDate : null,
    bodyHours: body?.hoursPerWeek != null ? Number(body.hoursPerWeek) : null,
    userTestDate: user?.testDate ?? null,
  });

  const planId = await createPlan(session.user.id, inputs.testDate, inputs.hoursPerWeek);
  return NextResponse.json({ planId });
}
```

- [ ] **Step 6: Persist the resolved date on the user**

In `src/lib/plan/service.ts`, inside `createPlan`, after the line `await db.studyPlan.deleteMany({ where: { userId } });` add:

```ts
  // The plan's exam date becomes the profile's exam date (single countdown source).
  await db.user.update({ where: { id: userId }, data: { testDate } });
```

- [ ] **Step 7: Verify + commit**

Run: `npm run typecheck && npm run test`
Expected: pass.

```bash
git add src/lib/plan/defaults.ts src/lib/plan/defaults.test.ts src/app/api/plan/route.ts src/lib/plan/service.ts
git commit -m "feat: one-tap plan generation with profile-based defaults"
```

---

### Task 5: Diagnostic results v2 — the narrative diagnosis page

Replace the generic `AttemptResultView` on `/diagnostic/results/[attemptId]` with a narrative page: headline diagnosis → expandable section bands → top-3 priorities → confidence insight → sticky "Build my study plan" CTA (one tap, empty POST body) → full question review below.

**Files:**
- Create: `src/components/plan/build-plan-button.tsx`
- Create: `src/components/quiz/diagnostic-result-view.tsx`
- Modify: `src/app/(app)/diagnostic/results/[attemptId]/page.tsx`

**Interfaces:**
- Consumes: `computeDiagnosticInsights`, `BAND_LABELS`, types from Task 3; `POST /api/plan` with `{}` from Task 4; `ReviewList` from `@/components/quiz/review-list` (props: `{ items: AttemptResult["items"] }`); `weeksUntil(testDate, from)` from `@/lib/plan/generate`.
- Produces: `BuildPlanButton({ className? })` client component (also used nowhere else yet); `DiagnosticResultView({ insights, planPreview, items })`.

- [ ] **Step 1: Create the CTA button**

Create `src/components/plan/build-plan-button.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * One-tap plan creation: POSTs an empty body (the API resolves the exam date
 * from the profile) and lands on Today, where the new session card takes over.
 */
export function BuildPlanButton({ className }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function build() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error();
      router.push("/");
      router.refresh();
    } catch {
      setError("Could not build the plan. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      <Button size="lg" className="w-full" onClick={build} disabled={busy}>
        {busy ? (
          <>
            <Loader2 className="animate-spin" />
            Building your plan…
          </>
        ) : (
          <>
            Build my study plan
            <ArrowRight />
          </>
        )}
      </Button>
      {error && <p className="mt-2 text-center text-sm text-destructive">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Create the results view**

Create `src/components/quiz/diagnostic-result-view.tsx`:

```tsx
import { BuildPlanButton } from "@/components/plan/build-plan-button";
import { ReviewList } from "@/components/quiz/review-list";
import {
  BAND_LABELS,
  type Band,
  type DiagnosticInsights,
} from "@/lib/quiz/diagnostic-insights";
import type { AttemptResult } from "@/lib/quiz/attempt";
import { cn } from "@/lib/utils";

const BAND_BAR: Record<Band, string> = {
  strong: "bg-success",
  solid: "bg-primary",
  "needs-work": "bg-warning",
  priority: "bg-destructive",
};

const BAND_TEXT: Record<Band, string> = {
  strong: "text-success",
  solid: "text-primary",
  "needs-work": "text-warning",
  priority: "text-destructive",
};

/** The narrative diagnosis: headline → section bands → priorities → CTA → review. */
export function DiagnosticResultView({
  insights,
  planPreview,
  items,
}: {
  insights: DiagnosticInsights;
  planPreview: string;
  items: AttemptResult["items"];
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Diagnostic results
      </p>
      <h1 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-balance sm:text-3xl">
        {insights.headline}
      </h1>
      <p className="mt-3 max-w-prose text-sm text-muted-foreground">
        {insights.totalCorrect} of {insights.totalItems} correct. This is a starting
        point, not a verdict — it tells us exactly where to begin.
      </p>

      <section className="mt-8 space-y-3" aria-label="Results by section">
        {insights.sections.map((s) => (
          <details key={s.section} className="rounded-xl border bg-card p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="block text-sm font-medium">{s.label}</span>
                <span
                  className={cn(
                    "block text-xs font-medium",
                    s.band ? BAND_TEXT[s.band] : "text-muted-foreground",
                  )}
                >
                  {s.band ? BAND_LABELS[s.band] : "Not assessed"}
                  {s.pct != null && ` · ${s.correct}/${s.total} correct`}
                </span>
              </span>
              <span className="font-mono text-sm tabular-nums">
                {s.pct != null ? `${s.pct}%` : "—"}
              </span>
            </summary>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={cn("h-full rounded-full", s.band && BAND_BAR[s.band])}
                style={{ width: `${s.pct ?? 0}%` }}
              />
            </div>
            <ul className="mt-4 space-y-2">
              {s.topics.map((t) => (
                <li
                  key={t.topic}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-muted-foreground">{t.label}</span>
                  <span className="font-mono text-xs tabular-nums">
                    {t.pct != null ? `${t.correct}/${t.total} · ${t.pct}%` : "—"}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </section>

      {insights.priorities.length > 0 && (
        <section className="mt-8" aria-label="Top priorities">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Your top priorities
          </h2>
          <ol className="mt-3 space-y-2">
            {insights.priorities.map((p, i) => (
              <li
                key={`${p.section}:${p.topic}`}
                className="flex items-start gap-3 rounded-xl border bg-card p-4"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    {p.label}{" "}
                    <span className="font-normal text-muted-foreground">
                      · {p.sectionLabel}
                    </span>
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    About {p.examSharePct}% of the exam — you scored {p.correct}/
                    {p.total} here.
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {insights.guessed.total > 0 && (
        <section className="mt-4 rounded-xl border bg-card p-4">
          <p className="text-sm leading-relaxed">
            You guessed on{" "}
            <span className="font-medium">{insights.guessed.total}</span> questions
            and got {insights.guessed.correct} right. Lucky guesses count as gaps,
            not strengths — your plan includes them.
          </p>
        </section>
      )}

      <div className="sticky bottom-20 z-10 mt-8 rounded-2xl border bg-background/95 p-4 shadow-sm backdrop-blur sm:bottom-4">
        <p className="text-center text-xs text-muted-foreground">{planPreview}</p>
        <BuildPlanButton className="mt-3" />
      </div>

      <section className="mt-10">
        <h2 className="text-base font-semibold tracking-tight">
          Review every question
        </h2>
        <div className="mt-3">
          <ReviewList items={items} />
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Rewire the page**

Replace the entire contents of `src/app/(app)/diagnostic/results/[attemptId]/page.tsx` with:

```tsx
import { notFound } from "next/navigation";

import { requireUser } from "@/lib/session";
import { db } from "@/lib/db";
import { getAttemptResult } from "@/lib/quiz/attempt";
import { computeDiagnosticInsights } from "@/lib/quiz/diagnostic-insights";
import { weeksUntil } from "@/lib/plan/generate";
import { DiagnosticResultView } from "@/components/quiz/diagnostic-result-view";

export default async function DiagnosticResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await requireUser();
  const { attemptId } = await params;
  const [result, profile] = await Promise.all([
    getAttemptResult(user.id, attemptId),
    db.user.findUnique({ where: { id: user.id }, select: { testDate: true } }),
  ]);
  if (!result) notFound();

  const insights = computeDiagnosticInsights(
    result.items
      .filter((it) => it.isCorrect != null)
      .map((it) => ({
        section: it.question.section,
        topic: it.question.topic,
        isCorrect: !!it.isCorrect,
        confidence: it.confidence,
      })),
  );

  const testDate =
    profile?.testDate && profile.testDate.getTime() > Date.now()
      ? profile.testDate
      : new Date(Date.now() + 42 * 86_400_000);
  const weeks = weeksUntil(testDate, new Date());
  const focus = insights.priorities
    .slice(0, 2)
    .map((p) => p.label)
    .join(" and ");
  const planPreview = `~${weeks} week${weeks === 1 ? "" : "s"} · 4 sessions/week${
    focus ? ` · ${focus} first` : ""
  }`;

  return (
    <DiagnosticResultView
      insights={insights}
      planPreview={planPreview}
      items={result.items}
    />
  );
}
```

- [ ] **Step 4: Verify + commit**

Run: `npm run typecheck && npm run test`
Expected: pass.

```bash
git add src/components/plan/build-plan-button.tsx src/components/quiz/diagnostic-result-view.tsx "src/app/(app)/diagnostic/results/[attemptId]/page.tsx"
git commit -m "feat: narrative diagnostic results with one-tap plan CTA"
```

---

### Task 6: Attempt primitives for immediate feedback

The session player grades each question as it's answered (and finally records `timeMs`). Add three server functions to `src/lib/quiz/attempt.ts` and two API routes. The existing batch `submitAttempt` path stays untouched.

**Files:**
- Modify: `src/lib/quiz/attempt.ts`
- Create: `src/app/api/attempts/[id]/answer/route.ts`
- Create: `src/app/api/attempts/[id]/finish/route.ts`

**Interfaces:**
- Consumes: existing private helpers `toQuiz`, `toClient`, `gradeQuestion`, `scoreItems`, `recordQuestionReviews` (all already imported in `attempt.ts`).
- Produces (Tasks 7–8 rely on these exact signatures):

```ts
export async function startFromIds(userId: string, mode: AttemptMode, ids: string[], config?: Record<string, unknown>): Promise<StartedAttempt>;
export interface AnswerFeedback { isCorrect: boolean; correct: number[] | string[]; explanation: string | null; section: Section; topic: string; subtopic: string | null; }
export async function answerItem(userId: string, attemptId: string, questionId: string, answer: Answer, confidence: number | null, timeMs: number | null): Promise<AnswerFeedback>;
export async function finalizeAttempt(userId: string, attemptId: string): Promise<{ scorePct: number }>;
```

API: `POST /api/attempts/[id]/answer` body `{ questionId, answer, confidence?, timeMs? }` → `AnswerFeedback` JSON; `POST /api/attempts/[id]/finish` (no body) → `{ scorePct }`.

- [ ] **Step 1: Add the three functions**

In `src/lib/quiz/attempt.ts`, after the `startAttempt` function (after its closing `}`), insert:

```ts
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
```

- [ ] **Step 2: Create the answer route**

Create `src/app/api/attempts/[id]/answer/route.ts`:

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";
import { answerItem } from "@/lib/quiz/attempt";
import type { Answer } from "@/lib/quiz/types";

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/attempts/[id]/answer">,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof body.questionId !== "string") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    const feedback = await answerItem(
      session.user.id,
      id,
      body.questionId,
      (body.answer ?? null) as Answer,
      typeof body.confidence === "number" ? body.confidence : null,
      typeof body.timeMs === "number" ? body.timeMs : null,
    );
    return NextResponse.json(feedback);
  } catch {
    return NextResponse.json({ error: "Could not grade answer" }, { status: 400 });
  }
}
```

- [ ] **Step 3: Create the finish route**

Create `src/app/api/attempts/[id]/finish/route.ts`:

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";
import { finalizeAttempt } from "@/lib/quiz/attempt";

export async function POST(
  _request: NextRequest,
  ctx: RouteContext<"/api/attempts/[id]/finish">,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  try {
    const result = await finalizeAttempt(session.user.id, id);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not finish attempt" }, { status: 400 });
  }
}
```

- [ ] **Step 4: Verify + commit**

Run: `npm run typecheck && npm run test`
Expected: pass.

```bash
git add src/lib/quiz/attempt.ts "src/app/api/attempts/[id]/answer/route.ts" "src/app/api/attempts/[id]/finish/route.ts"
git commit -m "feat: per-question grading and finalize primitives (records timeMs)"
```

---

### Task 7: Session composition — review warm-up + focus lesson + unseen-first practice

Compose the daily session: up to 4 SRS-due questions, then 10 unseen-first questions from the weakest topic, plus the skill micro-lesson for the least-practiced skill in that topic. Pure helpers are TDD'd; the DB composer wires them.

**Files:**
- Modify: `src/lib/study/today.ts` (export `pickWeakest` — change `function pickWeakest` to `export function pickWeakest`, nothing else)
- Create: `src/lib/study/session.ts`
- Create: `src/lib/study/session.test.ts`
- Create: `src/app/api/session/start/route.ts`

**Interfaces:**
- Consumes: `getMasteryData` (`@/lib/mastery`), `pickWeakest` (`@/lib/study/today`, newly exported), `getDueQuestionIds` (`@/lib/review/question-srs`), `startFromIds` + `StartedAttempt` (Task 6), `getSkills`/`slugifySkill` (`@/content/skills`), `getSkillLesson` (`@/content/skill-lessons`), `SkillLesson` type (`@/content/skill-lesson-types`), `BLUEPRINT`/`TOTAL_SCORED` (`@/lib/teas-blueprint`).
- Produces (Task 8 relies on these):

```ts
export function orderUnseenFirst(pool: { id: string }[], seen: Set<string>, want: number, rand?: () => number): string[];
export interface SkillStat { skill: string; attempts: number; correct: number; }
export function pickFocusSkill(skills: string[], stats: SkillStat[], available: Set<string>): string | null;
export interface ComposedSession extends StartedAttempt { whyLine: string; reviewCount: number; lesson: SkillLesson | null; focus: { section: Section; topic: string; label: string }; }
export async function composeSession(userId: string): Promise<ComposedSession | null>; // null = no diagnostic data yet
```

API: `POST /api/session/start` → `ComposedSession` JSON, or 422 `{ error }` when there's no data yet.

- [ ] **Step 1: Write the failing tests for the pure helpers**

Create `src/lib/study/session.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { orderUnseenFirst, pickFocusSkill } from "./session";

describe("orderUnseenFirst", () => {
  const pool = ["a", "b", "c", "d", "e"].map((id) => ({ id }));

  it("puts every unseen question before any seen one", () => {
    const seen = new Set(["a", "b"]);
    const picked = orderUnseenFirst(pool, seen, 4, () => 0);
    expect(picked).toHaveLength(4);
    expect(new Set(picked.slice(0, 3))).toEqual(new Set(["c", "d", "e"]));
    expect(seen.has(picked[3])).toBe(true);
  });

  it("returns only unseen when enough exist", () => {
    const picked = orderUnseenFirst(pool, new Set(), 3, () => 0);
    expect(picked).toHaveLength(3);
  });

  it("caps at pool size", () => {
    const picked = orderUnseenFirst(pool, new Set(), 10, () => 0);
    expect(picked).toHaveLength(5);
  });
});

describe("pickFocusSkill", () => {
  const skills = ["Skill A", "Skill B", "Skill C"];
  const all = new Set(skills);

  it("prefers a never-attempted skill", () => {
    const picked = pickFocusSkill(
      skills,
      [
        { skill: "Skill A", attempts: 4, correct: 4 },
        { skill: "Skill B", attempts: 2, correct: 0 },
      ],
      all,
    );
    expect(picked).toBe("Skill C");
  });

  it("breaks attempt ties by lower accuracy", () => {
    const picked = pickFocusSkill(
      skills,
      [
        { skill: "Skill A", attempts: 2, correct: 2 },
        { skill: "Skill B", attempts: 2, correct: 0 },
        { skill: "Skill C", attempts: 2, correct: 1 },
      ],
      all,
    );
    expect(picked).toBe("Skill B");
  });

  it("only picks skills that have a lesson available", () => {
    const picked = pickFocusSkill(skills, [], new Set(["Skill B"]));
    expect(picked).toBe("Skill B");
  });

  it("returns null when nothing is available", () => {
    expect(pickFocusSkill(skills, [], new Set())).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/study/session.test.ts`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Export `pickWeakest` and implement the session module**

First, in `src/lib/study/today.ts`, change the line:

```ts
function pickWeakest(topics: TopicMasteryRow[]): TopicMasteryRow | null {
```

to:

```ts
export function pickWeakest(topics: TopicMasteryRow[]): TopicMasteryRow | null {
```

Then create `src/lib/study/session.ts`:

```ts
import { db } from "@/lib/db";
import { getMasteryData } from "@/lib/mastery";
import { pickWeakest } from "@/lib/study/today";
import { getDueQuestionIds } from "@/lib/review/question-srs";
import { startFromIds, type StartedAttempt } from "@/lib/quiz/attempt";
import { getSkills, slugifySkill } from "@/content/skills";
import { getSkillLesson } from "@/content/skill-lessons";
import type { SkillLesson } from "@/content/skill-lesson-types";
import { BLUEPRINT, TOTAL_SCORED, type Section } from "@/lib/teas-blueprint";

const REVIEW_CAP = 4;
const PRACTICE_COUNT = 10;

/**
 * Order a question pool unseen-first (both halves shuffled), returning up to
 * `want` ids. Protects the bank from feeling repetitive: fresh material leads,
 * repeats only fill gaps.
 */
export function orderUnseenFirst(
  pool: { id: string }[],
  seen: Set<string>,
  want: number,
  rand: () => number = Math.random,
): string[] {
  const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const unseen = shuffle(pool.filter((q) => !seen.has(q.id)));
  const rest = shuffle(pool.filter((q) => seen.has(q.id)));
  return [...unseen, ...rest].slice(0, Math.max(0, want)).map((q) => q.id);
}

export interface SkillStat {
  skill: string;
  attempts: number;
  correct: number;
}

/**
 * Pick the focus skill for the session's micro-lesson: least-attempted first
 * (new material beats re-teaching), then lowest accuracy. `available` limits
 * the choice to skills that actually have a lesson.
 */
export function pickFocusSkill(
  skills: string[],
  stats: SkillStat[],
  available: Set<string>,
): string | null {
  const byName = new Map(stats.map((s) => [s.skill, s]));
  const candidates = skills.filter((s) => available.has(s));
  if (candidates.length === 0) return null;
  return [...candidates].sort((a, b) => {
    const sa = byName.get(a) ?? { attempts: 0, correct: 0 };
    const sb = byName.get(b) ?? { attempts: 0, correct: 0 };
    if (sa.attempts !== sb.attempts) return sa.attempts - sb.attempts;
    const accA = sa.attempts ? sa.correct / sa.attempts : 0;
    const accB = sb.attempts ? sb.correct / sb.attempts : 0;
    return accA - accB;
  })[0];
}

export interface ComposedSession extends StartedAttempt {
  whyLine: string;
  reviewCount: number;
  lesson: SkillLesson | null;
  focus: { section: Section; topic: string; label: string };
}

/**
 * Compose today's session: due-review warm-up (≤4), a skill micro-lesson, and
 * unseen-first practice (≤10) on the weakest topic. Returns null when the user
 * has no answer history yet (the diagnostic comes first).
 */
export async function composeSession(userId: string): Promise<ComposedSession | null> {
  const mastery = await getMasteryData(userId);
  if (mastery.totalAnswered === 0) return null;
  const weakest = pickWeakest(mastery.topics);
  if (!weakest) return null;

  const now = new Date();
  const dueIds = await getDueQuestionIds(userId, now, REVIEW_CAP);
  const dueSet = new Set(dueIds);

  const seenRows = await db.attemptItem.findMany({
    where: { attempt: { userId }, isCorrect: { not: null } },
    select: { questionId: true },
    distinct: ["questionId"],
  });
  const seen = new Set(seenRows.map((r) => r.questionId));

  const pool = await db.question.findMany({
    where: {
      section: weakest.section,
      topic: weakest.topic,
      OR: [{ ownerId: null }, { ownerId: userId }],
    },
    select: { id: true },
  });
  const practiceIds = orderUnseenFirst(
    pool.filter((q) => !dueSet.has(q.id)),
    seen,
    PRACTICE_COUNT,
  );

  const ids = [...dueIds, ...practiceIds];
  if (ids.length === 0) return null;

  // Focus skill for the micro-lesson: least practiced, least accurate.
  const topicItems = await db.attemptItem.findMany({
    where: {
      attempt: { userId },
      isCorrect: { not: null },
      question: { section: weakest.section, topic: weakest.topic },
    },
    select: { isCorrect: true, question: { select: { subtopic: true } } },
  });
  const statMap = new Map<string, { attempts: number; correct: number }>();
  for (const it of topicItems) {
    const skill = it.question.subtopic;
    if (!skill) continue;
    const b = statMap.get(skill) ?? { attempts: 0, correct: 0 };
    b.attempts += 1;
    if (it.isCorrect) b.correct += 1;
    statMap.set(skill, b);
  }
  const skills = getSkills(weakest.section, weakest.topic);
  const withLessons = new Set(
    skills.filter((s) =>
      getSkillLesson(weakest.section, weakest.topic, slugifySkill(s)),
    ),
  );
  const focusSkill = pickFocusSkill(
    skills,
    [...statMap].map(([skill, b]) => ({ skill, ...b })),
    withLessons,
  );
  const lesson = focusSkill
    ? (getSkillLesson(weakest.section, weakest.topic, slugifySkill(focusSkill)) ?? null)
    : null;

  const scored =
    BLUEPRINT[weakest.section].topics.find((t) => t.key === weakest.topic)?.scored ?? 0;
  const weightPct = Math.round((scored / TOTAL_SCORED) * 100);
  const whyLine = `${weakest.label} is your weakest area${
    weakest.pct != null ? ` (${weakest.pct}% mastery)` : ""
  } and carries about ${weightPct}% of the exam.`;

  const started = await startFromIds(userId, "PRACTICE", ids, {
    variant: "session",
    section: weakest.section,
    topic: weakest.topic,
    lessonSkill: focusSkill,
    reviewCount: dueIds.length,
  });

  return {
    ...started,
    whyLine,
    reviewCount: dueIds.length,
    lesson,
    focus: { section: weakest.section, topic: weakest.topic, label: weakest.label },
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/study/session.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Create the start route**

Create `src/app/api/session/start/route.ts`:

```ts
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { composeSession } from "@/lib/study/session";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const composed = await composeSession(session.user.id);
  if (!composed) {
    return NextResponse.json(
      { error: "Take the diagnostic first — it builds your daily session." },
      { status: 422 },
    );
  }
  return NextResponse.json(composed);
}
```

- [ ] **Step 6: Verify + commit**

Run: `npm run typecheck && npm run test`
Expected: pass.

```bash
git add src/lib/study/today.ts src/lib/study/session.ts src/lib/study/session.test.ts src/app/api/session/start/route.ts
git commit -m "feat: compose daily session — review warm-up, focus lesson, unseen-first practice"
```

---

### Task 8: Session player UI — immediate per-question feedback

The session page: intro (what's in it and why) → micro-lesson → questions with check-answer-then-explanation → summary. Uses the Task 6 `answer`/`finish` APIs, so every answer records correctness, confidence, and time as it happens.

**Files:**
- Create: `src/components/session/session-runner.tsx`
- Create: `src/components/session/session-flow.tsx`
- Create: `src/app/(app)/session/page.tsx`

**Interfaces:**
- Consumes: `QuestionView`, `isAnswered`, `LETTERS` from `@/components/quiz/question-view`; `useEnterFocusMode` from `@/components/focus-mode`; `LessonContent` from `@/components/learn/lesson-content` (prop `sections: LessonBlock[]`); `learnSkillHref` from `@/lib/quiz/links`; `type AnswerFeedback` from `@/lib/quiz/attempt` (type-only import — safe in a client file); `POST /api/session/start`, `POST /api/attempts/[id]/answer`, `POST /api/attempts/[id]/finish`.
- Produces: `/session` route; `SessionRunner({ questions, onAnswer, onDone })`; `formatCorrectAnswer(q, correct)` exported for reuse.

- [ ] **Step 1: Create the runner**

Create `src/components/session/session-runner.tsx`:

```tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuestionView, isAnswered, LETTERS } from "@/components/quiz/question-view";
import { useEnterFocusMode } from "@/components/focus-mode";
import { learnSkillHref } from "@/lib/quiz/links";
import { cn } from "@/lib/utils";
import type { AnswerFeedback } from "@/lib/quiz/attempt";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";

/** Human-readable correct answer for the feedback panel, by question type. */
export function formatCorrectAnswer(
  q: ClientQuestion,
  correct: number[] | string[],
): string {
  if (q.type === "FILL_BLANK") return (correct as string[]).join(" or ");
  if (q.type === "ORDERED")
    return (correct as number[]).map((i) => q.options[i]).join(" → ");
  return (correct as number[])
    .map((i) => (q.options[i] != null ? `${LETTERS[i] ?? i + 1}. ${q.options[i]}` : `Region ${i + 1}`))
    .join("; ");
}

/**
 * One-question-at-a-time runner with immediate feedback: answer → check →
 * explanation → continue. No back navigation; the explanation is the point.
 */
export function SessionRunner({
  questions,
  onAnswer,
  onDone,
}: {
  questions: ClientQuestion[];
  onAnswer: (
    questionId: string,
    answer: Answer,
    confidence: number | null,
    timeMs: number,
  ) => Promise<AnswerFeedback>;
  onDone: (correctCount: number) => void;
}) {
  useEnterFocusMode();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<Answer>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const startedAtRef = useRef(Date.now());

  const q = questions[index];
  if (!q) return null;
  const isLast = index === questions.length - 1;

  async function check() {
    if (!q || checking || !isAnswered(answer)) return;
    setChecking(true);
    setError(null);
    try {
      const fb = await onAnswer(q.id, answer, confidence, Date.now() - startedAtRef.current);
      setFeedback(fb);
      if (fb.isCorrect) setCorrectCount((n) => n + 1);
    } catch {
      setError("Could not check that answer. Please try again.");
    }
    setChecking(false);
  }

  function next() {
    if (isLast) {
      onDone(correctCount);
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(null);
    setConfidence(null);
    setFeedback(null);
    setError(null);
    startedAtRef.current = Date.now();
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-28 pt-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Today&apos;s session
        </p>
        <p className="font-mono text-sm tabular-nums">
          {index + 1} <span className="text-muted-foreground">/ {questions.length}</span>
        </p>
      </div>

      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-6 flex-1">
        <div inert={feedback != null || undefined}>
          <QuestionView
            question={q}
            value={answer}
            onChange={setAnswer}
            confidence={confidence}
            onConfidence={(c) => setConfidence(c)}
          />
        </div>

        {feedback && <FeedbackPanel question={q} feedback={feedback} />}
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-end gap-3 px-4 py-3">
          {feedback ? (
            <Button onClick={next}>
              {isLast ? "Finish session" : "Continue"}
              <ArrowRight />
            </Button>
          ) : (
            <Button onClick={check} disabled={!isAnswered(answer) || checking}>
              {checking && <Loader2 className="animate-spin" />}
              Check answer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function FeedbackPanel({
  question,
  feedback,
}: {
  question: ClientQuestion;
  feedback: AnswerFeedback;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "mt-6 rounded-xl border p-4",
        feedback.isCorrect
          ? "border-success/40 bg-success/5"
          : "border-destructive/40 bg-destructive/5",
      )}
    >
      <p
        className={cn(
          "flex items-center gap-2 text-sm font-semibold",
          feedback.isCorrect ? "text-success" : "text-destructive",
        )}
      >
        {feedback.isCorrect ? <Check className="size-4" /> : <X className="size-4" />}
        {feedback.isCorrect ? "Correct" : "Not quite"}
      </p>
      {!feedback.isCorrect && (
        <p className="mt-2 text-sm">
          <span className="font-medium">Correct answer:</span>{" "}
          {formatCorrectAnswer(question, feedback.correct)}
        </p>
      )}
      {feedback.explanation && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {feedback.explanation}
        </p>
      )}
      {feedback.subtopic && (
        <Link
          href={learnSkillHref(feedback.section, feedback.topic, feedback.subtopic)}
          className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
        >
          Review this skill: {feedback.subtopic}
        </Link>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create the flow**

Create `src/components/session/session-flow.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, ClipboardCheck, Loader2, RotateCcw, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LessonContent } from "@/components/learn/lesson-content";
import { SessionRunner } from "@/components/session/session-runner";
import type { AnswerFeedback } from "@/lib/quiz/attempt";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";
import type { SkillLesson } from "@/content/skill-lesson-types";

type Phase = "loading" | "empty" | "intro" | "lesson" | "questions" | "finishing" | "done";

interface SessionData {
  attemptId: string;
  questions: ClientQuestion[];
  whyLine: string;
  reviewCount: number;
  lesson: SkillLesson | null;
  focus: { section: string; topic: string; label: string };
}

export function SessionFlow() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("loading");
  const [data, setData] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [scorePct, setScorePct] = useState<number | null>(null);

  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    fetch("/api/session/start", { method: "POST" })
      .then(async (res) => {
        if (res.status === 422) {
          setPhase("empty");
          return;
        }
        if (!res.ok) throw new Error();
        const d = (await res.json()) as SessionData;
        setData(d);
        setPhase("intro");
      })
      .catch(() => {
        setError("Could not build today's session. Please try again.");
        setPhase("empty");
      });
  }, []);

  async function onAnswer(
    questionId: string,
    answer: Answer,
    confidence: number | null,
    timeMs: number,
  ): Promise<AnswerFeedback> {
    const res = await fetch(`/api/attempts/${data!.attemptId}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, answer, confidence, timeMs }),
    });
    if (!res.ok) throw new Error();
    return (await res.json()) as AnswerFeedback;
  }

  async function onDone(correctCount: number) {
    setCorrect(correctCount);
    setPhase("finishing");
    try {
      const res = await fetch(`/api/attempts/${data!.attemptId}/finish`, {
        method: "POST",
      });
      if (res.ok) {
        const r = (await res.json()) as { scorePct: number };
        setScorePct(r.scorePct);
      }
    } catch {
      // The per-question answers are already saved; the summary still shows.
    }
    setPhase("done");
    router.refresh();
  }

  if (phase === "loading" || phase === "finishing") {
    return (
      <Centered>
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          {phase === "loading" ? "Building today's session…" : "Wrapping up…"}
        </p>
      </Centered>
    );
  }

  if (phase === "empty" || !data) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <ClipboardCheck className="size-7 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Your session starts with a baseline
        </h1>
        <p className="mt-3 text-muted-foreground">
          {error ??
            "Take the diagnostic first — it finds your weak spots so each session knows exactly what to work on."}
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/diagnostic">
            Take the diagnostic
            <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  }

  if (phase === "intro") {
    const minutes = Math.round(data.questions.length * 1.2 + (data.lesson ? 5 : 0));
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <Sparkles className="size-7 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Today&apos;s session
        </h1>
        <p className="mt-3 text-muted-foreground">{data.whyLine}</p>
        <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
          {data.reviewCount > 0 && (
            <li className="flex items-center gap-2.5">
              <RotateCcw className="size-4 shrink-0 text-primary/70" />
              {data.reviewCount} review question{data.reviewCount === 1 ? "" : "s"} you
              missed or were unsure about
            </li>
          )}
          {data.lesson && (
            <li className="flex items-center gap-2.5">
              <BookOpen className="size-4 shrink-0 text-primary/70" />
              Short lesson: {data.lesson.skill}
            </li>
          )}
          <li className="flex items-center gap-2.5">
            <ClipboardCheck className="size-4 shrink-0 text-primary/70" />
            {data.questions.length - data.reviewCount} targeted {data.focus.label}{" "}
            questions
          </li>
        </ul>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          ~{minutes} min
        </p>
        <Button
          className="mt-8"
          size="lg"
          onClick={() => setPhase(data.lesson ? "lesson" : "questions")}
        >
          Start
          <ArrowRight />
        </Button>
      </div>
    );
  }

  if (phase === "lesson" && data.lesson) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Lesson · {data.focus.label}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {data.lesson.skill}
        </h1>
        <p className="mt-3 text-muted-foreground">{data.lesson.summary}</p>
        <LessonContent sections={data.lesson.blocks} />
        <div className="sticky bottom-20 mt-10 sm:bottom-4">
          <Button size="lg" className="w-full" onClick={() => setPhase("questions")}>
            Continue to questions
            <ArrowRight />
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "questions") {
    return (
      <SessionRunner questions={data.questions} onAnswer={onAnswer} onDone={onDone} />
    );
  }

  // done
  return (
    <div className="mx-auto max-w-xl px-4 py-12 text-center sm:py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Session complete</h1>
      <p className="mt-3 text-muted-foreground">
        {correct} of {data.questions.length} correct
        {scorePct != null ? ` (${Math.round(scorePct)}%)` : ""}. Every answer updates
        your mastery and review schedule — tomorrow&apos;s session builds on it.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button asChild size="lg">
          <Link href="/">Back to Today</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={`/results/${data.attemptId}`}>Review this session</Link>
        </Button>
      </div>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-3">
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create the page**

Create `src/app/(app)/session/page.tsx`:

```tsx
import { requireUser } from "@/lib/session";
import { SessionFlow } from "@/components/session/session-flow";

export default async function SessionPage() {
  await requireUser();
  return <SessionFlow />;
}
```

- [ ] **Step 4: Verify + commit**

Run: `npm run typecheck && npm run test`
Expected: pass. (Note: `inert` as a boolean prop requires React 19 — this repo is on 19.2.4, so it typechecks. If it does not, replace `inert={feedback != null || undefined}` with `className={feedback ? "pointer-events-none opacity-90" : undefined}` on that wrapper div and `aria-hidden={feedback != null}`.)

```bash
git add src/components/session/session-runner.tsx src/components/session/session-flow.tsx "src/app/(app)/session/page.tsx"
git commit -m "feat: session player with immediate per-question feedback"
```

---

### Task 9: Today integration — the session is the primary action

When the user has diagnostic data, Today's primary card becomes "Start today's session" pointing at `/session`. The diagnostic stays primary for new users. Review/flashcards/drills remain as secondary actions.

**Files:**
- Modify: `src/lib/study/today.ts`
- Modify: `src/app/(app)/page.tsx` (icon map)

**Interfaces:**
- Consumes: `/session` route from Task 8.
- Produces: `TodayKind` union gains `"session"`; `getTodaySummary` returns the session as `primary` whenever `hasData` is true.

- [ ] **Step 1: Add the session action to today.ts**

In `src/lib/study/today.ts`:

1. Change the `TodayKind` union to include `"session"`:

```ts
export type TodayKind =
  | "diagnostic"
  | "session"
  | "review"
  | "flashcards"
  | "drill"
  | "study"
  | "mock";
```

2. Inside `getTodaySummary`, after the `mockAction` declaration, add:

```ts
  const sessionAction: TodayAction = {
    kind: "session",
    label: "Start today's session",
    detail: weakest
      ? `Review + ${weakest.label} practice with a short lesson. ~20 min.`
      : "A short review-and-practice session built from your results. ~20 min.",
    href: "/session",
  };
```

3. Replace the ranked-list block:

```ts
  // Build the priority-ordered list of applicable actions.
  const ranked: TodayAction[] = [];
  if (!hasData) ranked.push(diagnosticAction);
  if (dueQuestions > 0) ranked.push(reviewAction);
  if (dueCards > 0) ranked.push(cardsAction);
  if (weakest) ranked.push(drillAction(weakest), studyAction(weakest));
  if (hasData) ranked.push(mockAction);
```

with:

```ts
  // Build the priority-ordered list of applicable actions. Once there's data,
  // the composed session (review + lesson + weak-topic practice) leads.
  const ranked: TodayAction[] = [];
  if (!hasData) ranked.push(diagnosticAction);
  if (hasData) ranked.push(sessionAction);
  if (dueQuestions > 0) ranked.push(reviewAction);
  if (dueCards > 0) ranked.push(cardsAction);
  if (weakest) ranked.push(drillAction(weakest), studyAction(weakest));
  if (hasData) ranked.push(mockAction);
```

- [ ] **Step 2: Add the icon**

In `src/app/(app)/page.tsx`:

1. Add `Play` to the lucide-react import list (keep alphabetical order within the braces).
2. Add to `KIND_ICON`:

```ts
  session: Play,
```

- [ ] **Step 3: Verify + commit**

Run: `npm run typecheck && npm run test`
Expected: pass.

```bash
git add src/lib/study/today.ts "src/app/(app)/page.tsx"
git commit -m "feat: today's session is the primary dashboard action"
```

---

## Final Verification (after all tasks)

- [ ] Run the full suite: `npm run typecheck && npm run lint && npm run test` — all pass.
- [ ] Manual end-to-end walkthrough with `npm run dev` (use the superpowers verification-before-completion skill):
  1. Sign up with a NEW email (exam date ~5 weeks out, target 75) → lands on Today showing the diagnostic card.
  2. Take the diagnostic (answer a mix, mark some "Guessed") → submit → results v2 shows headline, section bands, priorities, guessed insight, plan preview line.
  3. Tap "Build my study plan" → lands on Today → primary card is "Start today's session".
  4. Start the session → intro shows why-line and contents → lesson → questions give immediate correct/incorrect feedback with explanation and a skill link → summary → "Back to Today".
  5. `/plan` shows the generated plan with the exam date from onboarding.
  6. Confirm the original account still signs in and existing practice/mock flows are unchanged.

## Deliberately Deferred (do not build in this plan)

Timing analytics UI, answer elimination, calculator, adaptive plan regeneration, structured per-distractor explanations, nav restructure (4 tabs), progress checks, reminders. These are later steps in the product build sequence.
