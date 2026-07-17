# Section Diagnostics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single 24-question diagnostic with four NurseHub-style per-section diagnostics (~35 questions each) behind a hub at `/diagnostic`.

**Architecture:** A section diagnostic is a normal `DIAGNOSTIC` attempt with `config: { variant: "section", section, questionIds, total }` — mastery, spaced review, and the study plan already read finished attempt items, so no schema or scoring changes. New pieces: a blueprint-weighted section selector, a `startSectionDiagnostic` service, a per-section status lib, a hub page, a `/diagnostic/[section]` runner route, and a section-aware Today action. The dead NurseHub-import diagnostic path is removed.

**Tech Stack:** Next.js App Router (see `node_modules/next/dist/docs/` — this repo's Next has breaking changes vs. training data), Prisma, Vitest, Tailwind + existing UI primitives (`PageContainer`, `Button`, `QuizRunner`).

**Spec:** `docs/superpowers/specs/2026-07-17-section-diagnostics-design.md`

## Global Constraints

- 35 questions per section diagnostic (`SECTION_DIAGNOSTIC_TOTAL = 35`), topic mix from `topicCountsFor`.
- Untimed — never pass `durationSec` to `QuizRunner` for diagnostics.
- No Prisma schema changes.
- `/nursehub/results/[attemptId]` page must keep working (historical score sheets).
- Test command: `npx vitest run <file>`; full suite `npm test`. Typecheck: `npm run typecheck`.
- All app pages require auth via `requireUser()` (pages) / `requireUserApi()` (API routes).
- Route params in this Next version are async: `params: Promise<{...}>` and must be awaited.

---

### Task 1: Blueprint slug helpers + section diagnostic size

**Files:**
- Modify: `src/lib/teas-blueprint.ts` (add near the other exported constants/helpers, after `sectionLabel`)
- Test: `src/lib/teas-blueprint.test.ts`

**Interfaces:**
- Produces: `SECTION_DIAGNOSTIC_TOTAL: number` (= 35), `sectionSlug(s: Section): string` (e.g. `"READING"` → `"reading"`), `parseSectionSlug(slug: string): Section | null` (case-insensitive; `null` for unknown). Later tasks (API route, `[section]` page, hub, results CTA) all use these.

- [ ] **Step 1: Write the failing tests** — append to `src/lib/teas-blueprint.test.ts`:

```ts
describe("section slugs", () => {
  it("round-trips every section", () => {
    for (const s of SECTIONS) {
      expect(parseSectionSlug(sectionSlug(s.key))).toBe(s.key);
    }
  });

  it("accepts uppercase keys and rejects junk", () => {
    expect(parseSectionSlug("READING")).toBe("READING");
    expect(parseSectionSlug("science")).toBe("SCIENCE");
    expect(parseSectionSlug("history")).toBeNull();
    expect(parseSectionSlug("")).toBeNull();
  });
});
```

Also add `sectionSlug, parseSectionSlug` to the import list at the top of the test file.

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/lib/teas-blueprint.test.ts`
Expected: FAIL — `sectionSlug` is not exported.

- [ ] **Step 3: Implement** — add to `src/lib/teas-blueprint.ts` after `sectionLabel`:

```ts
/** Questions per per-section diagnostic (NurseHub-style baseline). */
export const SECTION_DIAGNOSTIC_TOTAL = 35;

/** URL slug for a section ("READING" -> "reading"). */
export function sectionSlug(s: Section): string {
  return s.toLowerCase();
}

/** Inverse of `sectionSlug`, case-insensitive. Null for unknown slugs. */
export function parseSectionSlug(slug: string): Section | null {
  const key = slug.toUpperCase() as Section;
  return SECTION_ORDER.includes(key) ? key : null;
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npx vitest run src/lib/teas-blueprint.test.ts`
Expected: PASS (all tests, including pre-existing ones).

- [ ] **Step 5: Commit**

```bash
git add src/lib/teas-blueprint.ts src/lib/teas-blueprint.test.ts
git commit -m "feat: section slug helpers and section-diagnostic size"
```

---

### Task 2: Blueprint-weighted section selector

**Files:**
- Modify: `src/lib/quiz/select.ts`
- Test: `src/lib/quiz/select.test.ts` (new file)

**Interfaces:**
- Consumes: `topicCountsFor(section, total)` from `@/lib/teas-blueprint` (already imported in `select.ts`).
- Produces: `selectSectionBalanced(pool: {id: string; section: Section; topic: string}[], section: Section, total: number): string[]` — shuffled ids, topic-weighted, tops up from leftovers, ignores pool items from other sections, returns fewer than `total` only when the section pool is smaller.

- [ ] **Step 1: Write the failing tests** — create `src/lib/quiz/select.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { selectSectionBalanced } from "./select";
import { topicCountsFor, BLUEPRINT } from "@/lib/teas-blueprint";

/** Build a pool with `n` questions per given topic of a section. */
function pool(section: "MATH" | "SCIENCE", perTopic: Record<string, number>) {
  return Object.entries(perTopic).flatMap(([topic, n]) =>
    Array.from({ length: n }, (_, i) => ({
      id: `${section}-${topic}-${i}`,
      section,
      topic,
    })),
  );
}

describe("selectSectionBalanced", () => {
  it("matches the blueprint topic mix when the pool is ample", () => {
    const p = pool("MATH", { "numbers-algebra": 50, "measurement-data": 50 });
    const ids = selectSectionBalanced(p, "MATH", 35);
    expect(ids).toHaveLength(35);
    const want = topicCountsFor("MATH", 35);
    for (const t of BLUEPRINT.MATH.topics) {
      const got = ids.filter((id) => id.includes(t.key)).length;
      expect(got).toBe(want[t.key]);
    }
  });

  it("tops up from other topics when one runs thin", () => {
    const p = pool("MATH", { "numbers-algebra": 3, "measurement-data": 50 });
    const ids = selectSectionBalanced(p, "MATH", 35);
    expect(ids).toHaveLength(35);
    expect(ids.filter((id) => id.includes("numbers-algebra"))).toHaveLength(3);
  });

  it("returns the whole pool when it is smaller than total", () => {
    const p = pool("MATH", { "numbers-algebra": 4, "measurement-data": 5 });
    expect(selectSectionBalanced(p, "MATH", 35)).toHaveLength(9);
  });

  it("ignores questions from other sections and never duplicates", () => {
    const p = [
      ...pool("MATH", { "numbers-algebra": 40, "measurement-data": 40 }),
      ...pool("SCIENCE", { biology: 40 }),
    ];
    const ids = selectSectionBalanced(p, "MATH", 35);
    expect(ids.some((id) => id.startsWith("SCIENCE"))).toBe(false);
    expect(new Set(ids).size).toBe(35);
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/lib/quiz/select.test.ts`
Expected: FAIL — `selectSectionBalanced` is not exported.

- [ ] **Step 3: Implement** — add to `src/lib/quiz/select.ts` after `selectBalanced`:

```ts
/**
 * Pick a blueprint-weighted subset of `total` ids from one section of `pool`,
 * topics weighted by their scored share (`topicCountsFor`), topped up from
 * leftovers when a topic runs thin. Returns fewer than `total` only when the
 * section's pool is smaller.
 */
export function selectSectionBalanced(
  pool: Selectable[],
  section: Section,
  total: number,
): string[] {
  const items = pool.filter((q) => q.section === section);
  const want = Math.min(total, items.length);
  const byTopic = groupBy(items, (q) => q.topic);
  const topicTargets = topicCountsFor(section, want);

  const chosen: string[] = [];
  const leftovers: Selectable[] = [];
  for (const topic of Object.keys(byTopic)) {
    const bucket = shuffle(byTopic[topic]);
    const take = Math.min(topicTargets[topic] ?? 0, bucket.length);
    chosen.push(...bucket.slice(0, take).map((q) => q.id));
    leftovers.push(...bucket.slice(take));
  }
  if (chosen.length < want) {
    const pad = shuffle(leftovers).slice(0, want - chosen.length);
    chosen.push(...pad.map((q) => q.id));
  }
  return shuffle(chosen).slice(0, want);
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npx vitest run src/lib/quiz/select.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/quiz/select.ts src/lib/quiz/select.test.ts
git commit -m "feat: blueprint-weighted single-section question selection"
```

---

### Task 3: `startSectionDiagnostic` service; retire `startNurseHubDiagnostic`

**Files:**
- Modify: `src/lib/quiz/attempt.ts`
- Test: `src/lib/quiz/attempt.guards.test.ts`

**Interfaces:**
- Consumes: `selectSectionBalanced` (Task 2), `SECTION_DIAGNOSTIC_TOTAL` (Task 1), existing `toQuiz`/`toClient`/`StartedAttempt`.
- Produces: `startSectionDiagnostic(userId: string, section: Section): Promise<StartedAttempt>` — returns `{ attemptId: "", questions: [] }` on an empty section pool *without creating an attempt*. Attempt config: `{ variant: "section", section, questionIds, total }`.
- Removes: `startNurseHubDiagnostic` (its only callers are reworked/deleted in Task 5).

- [ ] **Step 1: Write the failing test** — in `src/lib/quiz/attempt.guards.test.ts`, extend the existing `vi.mock("@/lib/db", ...)` factory with `question.findMany`, `attempt.create`, and `attemptItem.createMany` mocks, then add a describe block. Change the top of the file's mock setup to:

```ts
const attemptFindFirst = vi.fn();
const attemptUpdate = vi.fn();
const attemptItemFindFirst = vi.fn();
const questionFindMany = vi.fn();
const attemptCreate = vi.fn();
const attemptItemCreateMany = vi.fn();

vi.mock("@/lib/db", () => ({
  db: {
    attempt: {
      findFirst: (...a: unknown[]) => attemptFindFirst(...a),
      update: (...a: unknown[]) => attemptUpdate(...a),
      create: (...a: unknown[]) => attemptCreate(...a),
    },
    attemptItem: {
      findFirst: (...a: unknown[]) => attemptItemFindFirst(...a),
      createMany: (...a: unknown[]) => attemptItemCreateMany(...a),
    },
    question: {
      findMany: (...a: unknown[]) => questionFindMany(...a),
    },
  },
}));
```

Add the new mocks to the `beforeEach` resets, import `startSectionDiagnostic` alongside the existing imports, and add:

```ts
describe("startSectionDiagnostic", () => {
  it("returns empty without creating an attempt when the section pool is empty", async () => {
    questionFindMany.mockResolvedValue([]);
    const started = await startSectionDiagnostic("u1", "MATH");
    expect(started).toEqual({ attemptId: "", questions: [] });
    expect(attemptCreate).not.toHaveBeenCalled();
  });

  it("creates a section-variant attempt from the section pool", async () => {
    const pool = Array.from({ length: 40 }, (_, i) => ({
      id: `q${i}`,
      section: "MATH",
      topic: i % 2 ? "numbers-algebra" : "measurement-data",
    }));
    // First findMany returns the id/section/topic pool; second returns full rows.
    questionFindMany
      .mockResolvedValueOnce(pool)
      .mockImplementationOnce(({ where }: { where: { id: { in: string[] } } }) =>
        Promise.resolve(
          where.id.in.map((id: string) => ({
            id,
            section: "MATH",
            topic: "numbers-algebra",
            subtopic: null,
            difficulty: 2,
            type: "single",
            stem: "s",
            options: ["a", "b"],
            correct: [0],
            explanation: null,
            rationale: null,
            images: null,
            hotspots: null,
            attribution: null,
          })),
        ),
      );
    attemptCreate.mockResolvedValue({ id: "a-new" });
    attemptItemCreateMany.mockResolvedValue({ count: 35 });

    const started = await startSectionDiagnostic("u1", "MATH");
    expect(started.attemptId).toBe("a-new");
    expect(started.questions).toHaveLength(35);
    expect(attemptCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: "u1",
          mode: "DIAGNOSTIC",
          config: expect.objectContaining({ variant: "section", section: "MATH", total: 35 }),
        }),
      }),
    );
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/lib/quiz/attempt.guards.test.ts`
Expected: FAIL — `startSectionDiagnostic` is not exported. (Pre-existing guard tests must still pass once implemented.)

- [ ] **Step 3: Implement** — in `src/lib/quiz/attempt.ts`: delete the whole `startNurseHubDiagnostic` function and add in its place:

```ts
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
```

Update imports at the top of the file: add `selectSectionBalanced` to the `@/lib/quiz/select` import, and change the blueprint type-import to also pull the constant:

```ts
import { SECTION_DIAGNOSTIC_TOTAL, type Section } from "@/lib/teas-blueprint";
```

- [ ] **Step 4: Run to verify pass**

Run: `npx vitest run src/lib/quiz/attempt.guards.test.ts`
Expected: PASS. Note: `npm run typecheck` will FAIL at this point — `diagnostic/start/route.ts` and `nursehub/start/route.ts` still import `startNurseHubDiagnostic`. That is expected and fixed in Task 5; do not commit broken routes without noting it.

- [ ] **Step 5: Commit** (routes are fixed two tasks later; keep the commit honest)

```bash
git add src/lib/quiz/attempt.ts src/lib/quiz/attempt.guards.test.ts
git commit -m "feat: startSectionDiagnostic service (replaces NurseHub-import diagnostic)"
```

---

### Task 4: Section diagnostic status lib

**Files:**
- Create: `src/lib/quiz/diagnostic-status.ts`
- Test: `src/lib/quiz/diagnostic-status.test.ts`

**Interfaces:**
- Produces (used by hub page, results CTA, and Today):

```ts
export interface SectionDiagnosticStatus {
  section: Section;
  label: string;          // sectionLabel(section)
  attemptId: string | null; // latest finished section attempt, null = untaken
  scorePct: number | null;
  finishedAt: Date | null;
}
export function sectionStatusFrom(attempts: AttemptRow[]): SectionDiagnosticStatus[]; // pure
export async function getSectionDiagnosticStatus(userId: string): Promise<SectionDiagnosticStatus[]>;
export function nextUndiagnosedSection(status: SectionDiagnosticStatus[]): SectionDiagnosticStatus | null;
```

- [ ] **Step 1: Write the failing tests** — create `src/lib/quiz/diagnostic-status.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import {
  nextUndiagnosedSection,
  sectionStatusFrom,
} from "./diagnostic-status";

const at = (id: string, section: string, scorePct: number, when: string) => ({
  id,
  scorePct,
  finishedAt: new Date(when),
  config: { variant: "section", section, total: 35 },
});

describe("sectionStatusFrom", () => {
  it("returns all four sections in blueprint order with untaken ones null", () => {
    const status = sectionStatusFrom([at("a1", "MATH", 70, "2026-07-01")]);
    expect(status.map((s) => s.section)).toEqual([
      "READING",
      "MATH",
      "SCIENCE",
      "ENGLISH",
    ]);
    expect(status[1]).toMatchObject({ attemptId: "a1", scorePct: 70 });
    expect(status[0].attemptId).toBeNull();
  });

  it("keeps only the newest attempt per section (input is newest-first)", () => {
    const status = sectionStatusFrom([
      at("new", "MATH", 80, "2026-07-10"),
      at("old", "MATH", 60, "2026-07-01"),
    ]);
    expect(status[1].attemptId).toBe("new");
    expect(status[1].scorePct).toBe(80);
  });

  it("ignores legacy combined-diagnostic attempts", () => {
    const status = sectionStatusFrom([
      { id: "legacy", scorePct: 55, finishedAt: new Date(), config: { total: 24 } },
    ]);
    expect(status.every((s) => s.attemptId === null)).toBe(true);
  });
});

describe("nextUndiagnosedSection", () => {
  it("returns the first untaken section in blueprint order", () => {
    const status = sectionStatusFrom([at("a1", "READING", 70, "2026-07-01")]);
    expect(nextUndiagnosedSection(status)?.section).toBe("MATH");
  });

  it("returns null when all four are done", () => {
    const status = sectionStatusFrom([
      at("a", "READING", 1, "2026-07-01"),
      at("b", "MATH", 1, "2026-07-01"),
      at("c", "SCIENCE", 1, "2026-07-01"),
      at("d", "ENGLISH", 1, "2026-07-01"),
    ]);
    expect(nextUndiagnosedSection(status)).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npx vitest run src/lib/quiz/diagnostic-status.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement** — create `src/lib/quiz/diagnostic-status.ts`:

```ts
import { db } from "@/lib/db";
import {
  SECTION_ORDER,
  sectionLabel,
  type Section,
} from "@/lib/teas-blueprint";

export interface SectionDiagnosticStatus {
  section: Section;
  label: string;
  /** latest finished section-diagnostic attempt; null = untaken */
  attemptId: string | null;
  scorePct: number | null;
  finishedAt: Date | null;
}

interface AttemptRow {
  id: string;
  scorePct: number | null;
  finishedAt: Date | null;
  config: unknown;
}

/** Reduce finished DIAGNOSTIC attempts (newest first) to per-section status. */
export function sectionStatusFrom(attempts: AttemptRow[]): SectionDiagnosticStatus[] {
  const latest = new Map<Section, AttemptRow>();
  for (const a of attempts) {
    const cfg = a.config as { variant?: string; section?: Section } | null;
    if (cfg?.variant !== "section" || !cfg.section) continue;
    if (!latest.has(cfg.section)) latest.set(cfg.section, a);
  }
  return SECTION_ORDER.map((section) => {
    const a = latest.get(section);
    return {
      section,
      label: sectionLabel(section),
      attemptId: a?.id ?? null,
      scorePct: a?.scorePct ?? null,
      finishedAt: a?.finishedAt ?? null,
    };
  });
}

/** Per-section diagnostic status for the hub, results CTA, and Today. */
export async function getSectionDiagnosticStatus(
  userId: string,
): Promise<SectionDiagnosticStatus[]> {
  const attempts = await db.attempt.findMany({
    where: { userId, mode: "DIAGNOSTIC", finishedAt: { not: null } },
    orderBy: { finishedAt: "desc" },
    select: { id: true, scorePct: true, finishedAt: true, config: true },
  });
  return sectionStatusFrom(attempts);
}

/** First untaken section in blueprint order, or null when all are done. */
export function nextUndiagnosedSection(
  status: SectionDiagnosticStatus[],
): SectionDiagnosticStatus | null {
  return status.find((s) => s.attemptId == null) ?? null;
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npx vitest run src/lib/quiz/diagnostic-status.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/quiz/diagnostic-status.ts src/lib/quiz/diagnostic-status.test.ts
git commit -m "feat: per-section diagnostic status lib"
```

---

### Task 5: Rework the start API; delete the NurseHub start path

**Files:**
- Modify: `src/app/api/diagnostic/start/route.ts` (full rewrite below)
- Delete: `src/app/api/nursehub/start/route.ts`
- Delete: `src/components/quiz/nursehub-flow.tsx` (already referenced by nothing)

**Interfaces:**
- Consumes: `startSectionDiagnostic` (Task 3), `parseSectionSlug` (Task 1), existing `requireUserApi`, `track`.
- Produces: `POST /api/diagnostic/start` with JSON body `{ section: string }` (slug or key, case-insensitive) → `200 {attemptId, questions}` | `400 {error}` bad section | `401` | `422 {error}` empty pool. The client flow in Task 6 calls exactly this.

- [ ] **Step 1: Rewrite `src/app/api/diagnostic/start/route.ts`** to:

```ts
import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { track } from "@/lib/analytics";
import { parseSectionSlug } from "@/lib/teas-blueprint";
import { startSectionDiagnostic } from "@/lib/quiz/attempt";

export async function POST(req: Request) {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { section?: string } | null;
  const section = parseSectionSlug(String(body?.section ?? ""));
  if (!section) {
    return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  }

  const started = await startSectionDiagnostic(user.id, section);
  if (started.questions.length === 0) {
    return NextResponse.json(
      { error: "No questions available for this section yet." },
      { status: 422 },
    );
  }
  await track("diagnostic_started", { variant: "section", section }, { userId: user.id });
  return NextResponse.json(started);
}
```

- [ ] **Step 2: Delete the dead NurseHub surfaces**

```bash
git rm src/app/api/nursehub/start/route.ts src/components/quiz/nursehub-flow.tsx
```

- [ ] **Step 3: Verify nothing still references the removed code**

Run: `rg -n "startNurseHubDiagnostic|nursehub-flow|nursehub/start" src/`
Expected: no matches. (`/nursehub/results` and the import feature are untouched; `src/app/(app)/nursehub/page.tsx` already redirects to `/diagnostic`.)

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck`
Expected: PASS — but note `src/app/(app)/diagnostic/page.tsx` still passes `hasNurseHub` into `DiagnosticFlow`, and `DiagnosticFlow` still posts an empty body; both still compile and are reworked in Tasks 6–7. If typecheck fails only in those two files, proceed to Task 6 and fix there.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: diagnostic start API takes a section; retire NurseHub start path"
```

---

### Task 6: Section runner — reworked `DiagnosticFlow` + `/diagnostic/[section]`

**Files:**
- Modify: `src/components/quiz/diagnostic-flow.tsx` (full rewrite below)
- Create: `src/app/(app)/diagnostic/[section]/page.tsx`

**Interfaces:**
- Consumes: `POST /api/diagnostic/start` `{ section: slug }` (Task 5), `parseSectionSlug`/`sectionSlug`/`sectionLabel`/`SECTION_DIAGNOSTIC_TOTAL` (Task 1), existing `QuizRunner`, `PageContainer`.
- Produces: `DiagnosticFlow({ slug, label }: { slug: string; label: string })` client component; route `/diagnostic/[section]` (404 on bad slug). Submits via existing `/api/attempts/[id]/submit`, then routes to `/diagnostic/results/[attemptId]`.

- [ ] **Step 1: Rewrite `src/components/quiz/diagnostic-flow.tsx`**:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";
import { PageContainer } from "@/components/ui/page";

type Phase = "intro" | "loading" | "running" | "submitting";

export function DiagnosticFlow({
  slug,
  label,
}: {
  /** section url slug, e.g. "reading" — sent to the start API */
  slug: string;
  /** human section label, e.g. "Reading" */
  label: string;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ClientQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function begin() {
    setPhase("loading");
    setError(null);
    try {
      const res = await fetch("/api/diagnostic/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: slug }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAttemptId(data.attemptId);
      setQuestions(data.questions);
      setPhase("running");
    } catch {
      setError("Could not start the diagnostic. Please try again.");
      setPhase("intro");
    }
  }

  async function submit(
    answers: Record<string, Answer>,
    flagged: string[],
    confidence: Record<string, number>,
  ) {
    if (!attemptId) return;
    setPhase("submitting");
    try {
      const res = await fetch(`/api/attempts/${attemptId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, flagged, confidence }),
      });
      if (!res.ok) throw new Error();
      router.push(`/diagnostic/results/${attemptId}`);
    } catch {
      setError("Could not submit. Please try again.");
      setPhase("running");
    }
  }

  if (phase === "running") {
    return (
      <QuizRunner
        questions={questions}
        title={`${label} diagnostic`}
        submitLabel="See my results"
        onSubmit={submit}
      />
    );
  }

  if (phase === "submitting") {
    return (
      <Centered>
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Scoring your {label} diagnostic…</p>
      </Centered>
    );
  }

  const points = [
    `${label} only, weighted like the real exam's topic mix`,
    "Rate how sure you are, so a lucky guess won't hide a weak spot",
    "Your results update your mastery map and study plan right away",
  ];

  return (
    <PageContainer width="narrow">
      <ClipboardCheck className="size-7 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        {label} diagnostic
      </h1>
      <p className="mt-3 text-muted-foreground">
        35 questions covering every {label} topic on the TEAS. There&apos;s no
        timer — answer as many as you can, mark how sure you are on each one,
        and flag anything you want to revisit.
      </p>
      <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
        {points.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <Button
        className="mt-8"
        size="lg"
        onClick={begin}
        disabled={phase === "loading"}
      >
        {phase === "loading" ? (
          <>
            <Loader2 className="animate-spin" />
            Preparing…
          </>
        ) : (
          `Begin ${label} diagnostic`
        )}
      </Button>
    </PageContainer>
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

Note: the intro stem says "35 questions" via copy; keep copy generic if `SECTION_DIAGNOSTIC_TOTAL` changes later is not a concern (constant is the source of truth server-side; the client copy states the product promise).

- [ ] **Step 2: Create `src/app/(app)/diagnostic/[section]/page.tsx`**:

```tsx
import { notFound } from "next/navigation";

import { DiagnosticFlow } from "@/components/quiz/diagnostic-flow";
import { requireUser } from "@/lib/session";
import { parseSectionSlug, sectionLabel, sectionSlug } from "@/lib/teas-blueprint";

export default async function SectionDiagnosticPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  await requireUser();
  const { section: raw } = await params;
  const section = parseSectionSlug(raw);
  if (!section) notFound();
  return <DiagnosticFlow slug={sectionSlug(section)} label={sectionLabel(section)} />;
}
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: FAIL only in `src/app/(app)/diagnostic/page.tsx` (still passes `hasNurseHub`). That page is rewritten next task — if it's the sole error, continue; otherwise fix here.

- [ ] **Step 4: Commit**

```bash
git add src/components/quiz/diagnostic-flow.tsx "src/app/(app)/diagnostic/[section]/page.tsx"
git commit -m "feat: per-section diagnostic runner at /diagnostic/[section]"
```

---

### Task 7: Diagnostic hub at `/diagnostic`

**Files:**
- Modify: `src/app/(app)/diagnostic/page.tsx` (full rewrite below)

**Interfaces:**
- Consumes: `getSectionDiagnosticStatus` (Task 4), `bandFor`/`BAND_LABELS` from `@/lib/quiz/diagnostic-insights`, `sectionSlug` + `SECTION_DIAGNOSTIC_TOTAL` (Task 1), `PageContainer`.
- Produces: the hub page. Card grid links to `/diagnostic/[slug]`; done cards deep-link their latest results.

- [ ] **Step 1: Rewrite `src/app/(app)/diagnostic/page.tsx`**:

```tsx
import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";

import { requireUser } from "@/lib/session";
import { getSectionDiagnosticStatus } from "@/lib/quiz/diagnostic-status";
import { BAND_LABELS, bandFor } from "@/lib/quiz/diagnostic-insights";
import { SECTION_DIAGNOSTIC_TOTAL, sectionSlug } from "@/lib/teas-blueprint";
import { PageContainer } from "@/components/ui/page";

export default async function DiagnosticPage() {
  const user = await requireUser();
  const status = await getSectionDiagnosticStatus(user.id);
  const done = status.filter((s) => s.attemptId != null).length;

  return (
    <PageContainer width="narrow">
      <ClipboardCheck className="size-7 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        Your diagnostics
      </h1>
      <p className="mt-3 text-muted-foreground">
        Each TEAS section gets its own {SECTION_DIAGNOSTIC_TOTAL}-question
        diagnostic, weighted like the real exam. Finish one and your mastery
        map and study plan update right away — no need to do all four in one
        sitting.
      </p>
      <p className="mt-4 text-sm font-medium text-muted-foreground">
        {done} of {status.length} sections diagnosed
      </p>

      <ul className="mt-4 space-y-3">
        {status.map((s) => {
          const band = s.scorePct != null ? bandFor(s.scorePct) : null;
          const startHref = `/diagnostic/${sectionSlug(s.section)}`;
          return (
            <li key={s.section}>
              <div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4">
                <div className="min-w-0">
                  <p className="font-medium">{s.label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {s.attemptId == null
                      ? `${SECTION_DIAGNOSTIC_TOTAL} questions · untimed`
                      : band
                        ? `${s.scorePct}% · ${BAND_LABELS[band]}`
                        : `${s.scorePct}%`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-sm">
                  {s.attemptId != null && (
                    <Link
                      className="text-muted-foreground underline-offset-4 hover:underline"
                      href={`/diagnostic/results/${s.attemptId}`}
                    >
                      Results
                    </Link>
                  )}
                  <Link
                    className="inline-flex items-center gap-1 font-medium text-primary"
                    href={startHref}
                  >
                    {s.attemptId == null ? "Start" : "Retake"}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </PageContainer>
  );
}
```

- [ ] **Step 2: Typecheck + full test suite**

Run: `npm run typecheck && npm test`
Expected: both PASS — the last `hasNurseHub` reference is gone with this rewrite.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(app)/diagnostic/page.tsx"
git commit -m "feat: diagnostic hub with per-section status"
```

---

### Task 8: Results page CTA → next un-diagnosed section

**Files:**
- Modify: `src/app/(app)/diagnostic/results/[attemptId]/page.tsx`
- Modify: `src/components/quiz/diagnostic-result-view.tsx`

**Interfaces:**
- Consumes: `getSectionDiagnosticStatus` + `nextUndiagnosedSection` (Task 4), `sectionSlug` (Task 1).
- Produces: `DiagnosticResultView` gains an optional prop `next?: { label: string; href: string } | null` rendered inside the fixed bottom CTA card under `BuildPlanButton`.

- [ ] **Step 1: Compute `next` in the results page** — in `src/app/(app)/diagnostic/results/[attemptId]/page.tsx`, add imports:

```ts
import {
  getSectionDiagnosticStatus,
  nextUndiagnosedSection,
} from "@/lib/quiz/diagnostic-status";
import { sectionSlug } from "@/lib/teas-blueprint";
```

Extend the existing parallel fetch:

```ts
const [result, profile, status] = await Promise.all([
  getAttemptResult(user.id, attemptId),
  db.user.findUnique({ where: { id: user.id }, select: { testDate: true } }),
  getSectionDiagnosticStatus(user.id),
]);
```

After `planPreview` is computed, add:

```ts
const nextSection = nextUndiagnosedSection(status);
const next = nextSection
  ? {
      label: `${nextSection.label} diagnostic`,
      href: `/diagnostic/${sectionSlug(nextSection.section)}`,
    }
  : null;
```

and pass `next={next}` to `<DiagnosticResultView …>`.

- [ ] **Step 2: Render it in `src/components/quiz/diagnostic-result-view.tsx`** — add `next` to the component's props:

```ts
next?: { label: string; href: string } | null;
```

(destructure it alongside `insights`, `planPreview`, etc.) and inside the fixed bottom CTA card, directly after `<BuildPlanButton className="mt-3" />`, add:

```tsx
{next && (
  <Link
    href={next.href}
    className="mt-2 block text-center text-sm font-medium text-primary underline-offset-4 hover:underline"
  >
    Next up: {next.label} →
  </Link>
)}
```

`Link` is already imported at the top of the file.

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(app)/diagnostic/results/[attemptId]/page.tsx" src/components/quiz/diagnostic-result-view.tsx
git commit -m "feat: results page points at the next un-diagnosed section"
```

---

### Task 9: Section-aware Today action

**Files:**
- Modify: `src/lib/study/today.ts`

**Interfaces:**
- Consumes: `getSectionDiagnosticStatus` + `nextUndiagnosedSection` (Task 4).
- Produces: the `diagnostic` Today action stays present (primary before any data; ranked right after the session once data exists) until all four sections are diagnosed, labeled for the next untaken section.

- [ ] **Step 1: Implement** — in `src/lib/study/today.ts`:

Add import:

```ts
import {
  getSectionDiagnosticStatus,
  nextUndiagnosedSection,
} from "@/lib/quiz/diagnostic-status";
```

Extend the parallel fetch in `getTodaySummary`:

```ts
const [mastery, dueQuestions, cards, diagStatus] = await Promise.all([
  getMasteryData(userId),
  getDueQuestionCount(userId),
  getDueCards(userId, 20),
  getSectionDiagnosticStatus(userId),
]);
```

Replace the `diagnosticAction` constant with:

```ts
const nextDiag = nextUndiagnosedSection(diagStatus);
const diagnosedCount = diagStatus.filter((s) => s.attemptId != null).length;
const diagnosticAction: TodayAction | null = nextDiag
  ? {
      kind: "diagnostic",
      label: `Take your ${nextDiag.label} diagnostic`,
      detail:
        diagnosedCount === 0
          ? "35 questions, untimed. Sets the baseline that builds your study plan."
          : `${diagnosedCount} of 4 sections diagnosed. 35 questions, untimed.`,
      href: "/diagnostic",
    }
  : null;
```

Update the ranking block (session still leads once there's data; the diagnostic follows until all four sections are done):

```ts
const ranked: TodayAction[] = [];
if (!hasData && diagnosticAction) ranked.push(diagnosticAction);
if (hasData) ranked.push(sessionAction);
if (hasData && diagnosticAction) ranked.push(diagnosticAction);
if (dueQuestions > 0) ranked.push(reviewAction);
if (dueCards > 0) ranked.push(cardsAction);
if (weakest) ranked.push(drillAction(weakest), studyAction(weakest));
if (hasData) ranked.push(mockAction);

const primary = ranked[0] ?? sessionAction;
```

(The old fallback `?? diagnosticAction` must change — `diagnosticAction` can now be null. With all four sections diagnosed, `hasData` is necessarily true, so `sessionAction` is a safe fallback.)

- [ ] **Step 2: Typecheck + tests**

Run: `npm run typecheck && npm test`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/lib/study/today.ts
git commit -m "feat: Today's diagnostic action tracks un-diagnosed sections"
```

---

### Task 10: End-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Static checks**

Run: `npm run typecheck && npm run lint && npm test`
Expected: all PASS.

- [ ] **Step 2: Stale-reference sweep**

Run: `rg -n "hasNurseHub|startNurseHubDiagnostic|nursehub/start|variant === \"nursehub\"" src/`
Expected: no matches.

- [ ] **Step 3: Drive the real flow** (use the `verify` skill / dev server; `.env` holds `DATABASE_URL`)

1. `npm run dev`, sign in, visit `/diagnostic` → hub shows four cards, "0 of 4 sections diagnosed", each "35 questions · untimed".
2. Start the Reading diagnostic → intro → begin → 35 Reading-only questions in the runner (spot-check the section chip on a few questions).
3. Answer a handful, submit → lands on `/diagnostic/results/[attemptId]`; results show Reading topic breakdown; bottom card shows "Next up: Math diagnostic →".
4. Back to `/diagnostic` → Reading card shows score % + band + Results link + Retake; progress line reads "1 of 4".
5. `/today` → shows "Take your Math diagnostic" among actions.
6. Confirm `/nursehub` redirects to `/diagnostic`, and that `/nursehub/results/[attemptId]` still renders for a historical attempt (find an old attempt id in the DB if one exists; if none exists, confirming the page compiles is enough).
7. `/diagnostic/bogus` → 404.

- [ ] **Step 4: Final commit if verification produced fixes**

```bash
git status   # commit any fixes with a descriptive message
```
