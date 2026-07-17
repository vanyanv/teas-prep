# Section Diagnostics (NurseHub-style)

**Date:** 2026-07-17
**Status:** Approved

## Problem

The current diagnostic is a single 24-question set spread across all four TEAS
sections — roughly 2 questions per blueprint topic. That is too little signal
to tell a student where they are weak, which is the diagnostic's whole job.
NurseHub's model is better: each section gets its own initial diagnostic
(~35 questions), so the student immediately knows what to study in that
section.

The seed bank has ample depth per section (Reading 155, English 167, Math 216,
Science 298), so a 35-question per-section diagnostic is fully supportable.

## Decisions (confirmed with user)

- **Four separate section diagnostics**, surfaced from a hub at `/diagnostic`.
- **35 questions per section**, topic mix weighted by the official ATI TEAS 7
  blueprint (`topicCountsFor`).
- **Untimed** — the diagnostic measures knowledge, not pace. Timed practice
  stays the mock exam's job.
- **Mastery and the study plan update after each completed section** — a
  student can finish one section and start studying immediately.

## Design

### 1. Data model & scoring — no schema changes

A section diagnostic is a normal `DIAGNOSTIC` attempt with:

```ts
config: { variant: "section", section: "READING", questionIds, total: 35 }
```

Mastery (`src/lib/mastery.ts`), spaced review, the dashboard, and the plan all
read finished attempt items, so each completed section flows into them with no
changes. Legacy combined-diagnostic attempts keep working and still count
toward mastery.

### 2. Question selection

New `selectSectionBalanced(pool, section, total)` in `src/lib/quiz/select.ts`:

- Pool: global seed questions plus the user's own imports, filtered to the
  section.
- Picks `total` (35) ids weighted by the blueprint topic mix via the existing
  `topicCountsFor(section, total)`.
- Tops up from leftovers (largest remaining buckets first is not required —
  random top-up like `selectBalanced` is fine) when a topic's bucket runs
  thin; returns fewer than `total` only when the whole pool is smaller.
- Returned order is shuffled.

This replaces the random `selectFromPool` path for section-scoped diagnostics.

### 3. API

`POST /api/diagnostic/start` takes a JSON body `{ section: Section }`:

- Validates `section` against the four blueprint keys; 400 on anything else.
- Starts a 35-question section attempt (selection per §2), tracks
  `diagnostic_started` with `{ variant: "section", section }`.
- The NurseHub-import fallback branch is removed — the reconciled native bank
  made `source: "nursehub"` permanently empty, so it can never fire.

Retired surfaces:

- `/api/nursehub/start` route: deleted.
- `/nursehub` page (and `nursehub-flow.tsx`): the page becomes a redirect to
  `/diagnostic`.
- `/nursehub/results/[attemptId]` **stays** so historical score sheets remain
  viewable.

### 4. UI

**Hub — `/diagnostic`** (server component):

- Four section cards (Reading, Math, Science, English) showing: question
  count (35), a ~40 min estimate, and status — "Start" when untaken; score %
  + band (via `bandFor`) + "Retake" when the user has a finished section
  attempt for it (latest attempt wins).
- An "x of 4 sections diagnosed" progress line.
- Cards link to `/diagnostic/[section]`.

**Runner — `/diagnostic/[section]`**:

- The current intro-then-`QuizRunner` flow (`diagnostic-flow.tsx`) scoped to
  one section: untimed, confidence ratings, flags, batch submit to
  `/api/attempts/[id]/submit`.
- Invalid section slugs 404.

**Results — `/diagnostic/results/[attemptId]`** (reused):

- One addition: a CTA pointing at the next un-diagnosed section, or at the
  plan once all four are done.

### 5. Touchpoints

- **Today** (`src/lib/study/today.ts`): the diagnostic action becomes
  section-aware — "Take your Reading diagnostic" for the next untaken section,
  linking to the hub. It stays ranked as before until all four sections are
  diagnosed (today it disappears as soon as any attempt data exists).
- **Onboarding** (`welcome-form.tsx`): unchanged — already pushes to
  `/diagnostic`, which is now the hub.
- **App shell nav**: unchanged (`/diagnostic` link still correct).

### 6. Testing

- Unit tests for `selectSectionBalanced`: blueprint topic mix on an ample
  pool; top-up behavior on a thin topic; pool smaller than `total`.
- Route test: section validation (400 on bad/missing section).
- Existing diagnostic-insights tests are unaffected (insights already handle
  single-section item sets — untouched sections report `pct: null`).

## Error handling

- Section pool empty (should not happen with the seed bank): the start route
  returns 422 with a clear message rather than creating an empty attempt.
- Unauthorized: 401, as today.

## Out of scope

- Timed diagnostics (mock exam covers timing).
- Any change to the import feature itself.
- Free-tier gating (`BILLING_ENABLED` is currently off; access rules for
  section diagnostics can be decided when billing turns on).
