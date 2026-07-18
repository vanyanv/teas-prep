# Progress, Assessment & Gamification System — Specification

Status: **Design / pre-implementation.** This is the required first response before any
code. It audits what exists, then specifies the completion / mastery / quiz /
exam / consistency system on top of it. Grounded in the current codebase
(audited 2026-07-17), not a rebuild.

> **Progress so far (branch `feat/progress-phase-0`).**
> - **Phase 1 — shipped.** Tables `LessonCompletion`, `QuickCheckAttempt`,
>   `UserSkillProgress`, `UserSectionProgress` + `MasteryState`. Configurable
>   skill-mastery engine (`src/lib/progress/mastery.ts`, 5 states, difficulty +
>   evidence gate). `recomputeProgress` — the single cache writer — wired into the
>   grading paths. Completion APIs (`/api/lessons/complete`, `/api/quick-checks`)
>   with guided-lesson persistence + localStorage migration. Learn subject cards
>   and topic skill drill-down enriched; Progress rebuilt into the four tabs
>   (Overview / Subjects & Skills / Quiz History / Exam History). Quiz history
>   reader over the immutable attempt log.
> - **Phase 2 — in progress.** Baseline preservation shipped: `SectionBaseline`
>   (write-once first diagnostic per section), `getBaseline` aggregate, wired into
>   diagnostic submit, surfaced in Progress. Remaining: diagnostic-results
>   enrichment (top-5 *skills*, confidence patterns, timing), wrong-answer→lesson
>   focus wiring.
>
> **Phase 0 — shipped (branch `feat/progress-phase-0`).** Taxonomy identity layer
> (`src/content/taxonomy.ts`) + `Question.skillId/lessonId/secondarySkillIds` columns,
> backfilled (798/836 mapped, 38 topic-only by design, 0 unmapped), seed kept in sync,
> CI guard (`src/content/question-mapping.test.ts`), and a bank-capacity report
> (`npm run report:bank`). Confirmed: **3 fully-disjoint full simulations**, all 85 skills
> covered, every skill has ≥4 questions (mastery gate satisfiable). Note: this DB is managed
> with `prisma db push`, not migrations — the migration history is behind `schema.prisma`
> (pre-existing drift); Phase-0 columns were applied additively via `db push`. Reconciling the
> migration history is a separate, non-blocking cleanup.

Guiding constraints (from the brief), carried through every section:

- **Do not replace the existing adaptive logic without auditing it.** — Audited; we build on it.
- **Track five things separately, never merge into one percentage:** Completion,
  Mastery, Quiz performance, Practice-exam performance, Study consistency.
- **One reliable source of truth.** No duplicate progress sources that can disagree.
- **Mature gamification.** Points/streaks/badges stay visually secondary to mastery and scores.

---

## 1. Audit of the existing progress and exam systems

### What already exists and works (build on, do not replace)

| Capability | Where | State |
|---|---|---|
| Universal attempt log | `Attempt` + `AttemptItem` (Prisma) | **Solid.** Every question response records `selected, isCorrect, confidence (1–3), timeMs, flagged, orderIndex`. Modes: `DIAGNOSTIC, PRACTICE, MOCK, FLASHCARD`. This is the source of truth for all answering. |
| Mastery engine | `src/lib/mastery.ts` | **Good, extend.** Computed on the fly: confidence-weighted credit × recency decay (14-day half-life, floor 0.08). Aggregates overall/section/topic. No difficulty, no attempt-count gate, no stored states. |
| Confidence | `src/lib/quiz/confidence.ts`, `AttemptItem.confidence` | **Solid.** 1=guessed / 2=unsure / 3=confident. Feeds mastery credit and SRS grade. |
| Spaced repetition | `src/lib/flashcards/sm2.ts`, `QuestionReview`, `CardReview` | **Solid.** Custom SM-2 (4 grades). Question grade *derived* from outcome+confidence (`srs-grade.ts`). Due queue built in `startReviewSession`. |
| Question selection | `src/lib/quiz/select.ts`, `study/session.ts`, `study/today.ts` | **Good, extend.** Blueprint-weighted (largest-remainder), unseen-first (binary), weak-topic targeting. **Not** difficulty-adaptive; **no** exposure cooldown beyond seen/unseen + SRS due date. |
| Diagnostic | `startSectionDiagnostic`, `computeDiagnosticInsights`, `diagnostic-status.ts` | **Good, extend.** Per-section (35 Q), untimed. Insights: raw per-section/topic accuracy, band labels, priority ranking (weakness × exam weight), guessed tally. Per-section "what's next". **No autosave. No single aggregate baseline. No baseline preservation flag.** |
| Full mock | `startMock`, `mock-runner.tsx`, `exam-timer.tsx` | **Good, extend.** Section timers (wall-clock, survives throttling), post-Math 10-min break, Math-only 4-function calculator, per-question flag, all-or-nothing multi-select scoring, `scoreItems` (overall/section/topic/subtopic). Pro-gated. **No autosave/resume — answers live in React state, written only at submit.** |
| Progress page | `/progress`, `src/lib/progress.ts` | **Exists.** Readiness ring, weakest-topic row, Pro-gated score-trend (`ProgressChart`) + pace chart + mock history, section rings, topic mastery bars. **Not** organized into the four requested tabs. **No quiz history, no per-skill breakdown.** |
| Study plan | `StudyPlan/PlanWeek/PlanTask` | Exists. Week/day tasks with `done` flag. |
| Design system | `DESIGN.md`, `globals.css` (OKLCH), `src/components/ui/*` | **Mature.** "Calm Precision": warm paper, deep-teal accent ≤10%, mono numeric instruments, fixed type roles, radius grammar, no gamified clutter. Reuse strictly. |

### What is missing (the actual build)

- **No content-progress layer in the DB.** Lessons, skills, and quick checks are static
  TS content; lesson completion lives only in **browser localStorage**
  (`guided-lesson-view.tsx`). Quick-check answers are never persisted. There is no
  concept of "skill completed."
- **No stored/queryable mastery states.** Mastery is recomputed every call; there are no
  `Not started / Learning / Practicing / Proficient / Mastered` states anywhere.
- **No per-section exam result storage.** Section scores are recomputed from raw items each view.
- **No baseline preservation.** A diagnostic retake would not be distinguished from the original.
- **No quiz history surface.** Attempts are stored but never listed as a browsable history with per-attempt review.
- **No exam form identity / exposure tracking / cooldowns.** No `formId`; "seen" is binary and permanent.
- **No autosave/resume** for mock or diagnostic.
- **No gamification layer at all:** no goals, daily activity rollup, achievements, points, personal bests, or readiness journey.
- **Two divergent "how good is this topic" computations** coexist: recency+confidence-weighted
  mastery (`mastery.ts`) vs raw-accuracy bands (`diagnostic-insights.ts`). Must be reconciled deliberately.

### Verdict

The **hard parts are already built** (attempt log, mastery math, SRS, timed mock mechanics,
design system). This project is mostly a **persistence + surfacing + gamification** layer:
give the taxonomy real identity, persist content-completion and derived progress, store exam
results, and add a mature motivation layer — all computed from the existing single source of truth.

---

## 2. Taxonomy map (Section → Topic → Skill → Lesson)

Confirmed counts: **4 sections, 12 topics, 85 skills, 836 questions.** Source of truth is the
TS content registry (`teas-blueprint.ts` + `skills.ts`), **not** the DB.

```
READING (45 items / 39 scored / 55 min)
├─ key-ideas-details        (scored 15)  — 8 skills
├─ craft-structure                       — 8 skills
└─ integration-knowledge                 — 5 skills          READING = 21 skills

MATH (38 / 34 / 57)
├─ numbers-algebra          (scored 18)  — 8 skills
└─ measurement-data                      — 5 skills          MATH = 13 skills

SCIENCE (50 / 44 / 60)
├─ anatomy-physiology                    — 11 skills
├─ biology                               — 5 skills
├─ chemistry                             — 4 skills
└─ scientific-reasoning                  — 4 skills          SCIENCE = 24 skills

ENGLISH (37 / 33 / 37)
├─ conventions                           — 15 skills
├─ knowledge-language                    — 8 skills
└─ vocabulary                            — 4 skills           ENGLISH = 27 skills

Totals: 12 topics · 85 skills · 170 items · 150 scored · 209 min · break after MATH (10 min)
```

Each **skill** has three parallel lesson artifacts (all keyed by the exact skill-name string):
- `SKILL_LESSONS` (85, flat) — fallback renderer
- `GUIDED_LESSONS` (85 files, rich) — `objectives`, `minutes: [lo,hi]`, sections each with **one embedded `quickCheck`** (documented "never affects mastery")
- Plus 12 topic-level `LESSONS` and 4 section `QUICK_REFERENCE` sheets.

A **skill quiz** is not stored content — it is a `PRACTICE` attempt filtered by `subtopic == skill name`.

### Decision: give the taxonomy stable IDs (without a CMS)

The registry stays in TypeScript (authoritative, versioned, all-users-identical). We add a
**stable slug ID** to every node and expose a typed `taxonomy` module:

```
sectionId  = enum value           e.g. "SCIENCE"
topicId    = blueprint key        e.g. "anatomy-physiology"
skillId    = `${topicId}:${slugifySkill(name)}`   e.g. "anatomy-physiology:cardiovascular-system"
lessonId   = skillId              (1:1 skill↔guided-lesson today; distinct namespace reserved for future many-lessons-per-skill)
```

These IDs are **derived from existing content**, so no re-authoring. We optionally mirror the
registry into thin DB reference tables (`Section`/`Topic`/`Skill`/`Lesson`) for FK integrity and
joins; the TS registry remains the source and a `sync-taxonomy` script upserts it. Reference
tables are **read-only projections** — they never diverge because they are regenerated from code.

---

## 3. Question-to-skill mapping strategy

**Current reality:** mapping already exists as a **string join** — `Question.subtopic` == a skill
name in `skills.ts`. 798/836 questions are tagged; **38 legacy rows have no `subtopic`**; the 38
hand-authored `BASE_QUESTIONS` carry only section+topic. There is no primary/secondary distinction
and no lesson link. The NurseHub score-sheet mapping the brief references is exactly what `skills.ts`
was transcribed from — so the "recreate score sheets digitally" goal is ~90% done and fragile.

**Strategy: harden the string join into real identity, keep it as the fallback.**

1. Add nullable columns to `Question`: `skillId String?`, `lessonId String?`,
   `secondarySkillIds Json?` (string[] of skillIds), plus keep `subtopic` for provenance.
2. **Backfill** `skillId`/`lessonId` from `subtopic` via the registry resolver (exact match →
   normalized match → manual override table for the known NurseHub title mismatches, e.g.
   "Identify the Topic or Main Idea" → "Identify the Topic, Main Idea, and Supporting Details").
3. **Triage the 38 unmapped rows:** a one-time report lists them; each is either mapped to a skill
   or marked `skillId = null` (excluded from skill-level stats but still usable in section/topic pools).
4. **Enforce at authoring time:** extend `scripts/verify-gen*.mts` to fail CI if a seeded question's
   `subtopic` does not resolve to a `skillId`. This makes the mapping self-maintaining.
5. `secondarySkillIds` is opt-in metadata for cross-skill questions (e.g. a word problem that also
   tests unit conversion). Empty by default; populated later where it adds value. **A wrong answer
   updates mastery evidence for the primary skill only** (secondary skills get a reduced-weight
   signal, configurable) to avoid diluting mastery.

**Wrong-answer flow (the brief's 7 steps), implemented on the mapped `skillId`:**
1. Resolve `skillId` from the answered question.
2. Append evidence to that skill's mastery input (the AttemptItem already is the evidence; mastery
   recomputes — no separate write that could disagree).
3. Enqueue/advance the question in `QuestionReview` (already happens via `recordQuestionReviews`).
4. Recommend the mapped `lessonId` (deep-link already exists via `links.ts`).
5. Schedule targeted practice: the skill is surfaced as a weak skill on Today/Learn and added to the plan.
6. **Prefer a *different* question on the same skill at review time** — selection change (see §9): SRS
   due picks the specific question, but weak-skill *drills* prefer unseen questions on the same `skillId`.
7. Track improvement: mastery-state transitions are logged (see §5) so "improved a weak skill" is detectable.

---

## 4. Completion definitions

Completion is **content activity done**, never a score. Tracked independently from mastery.

A **skill is completed** when the user has:
- Viewed/finished its lesson → **`LessonCompletion`** row (replaces localStorage).
- Attempted **all required quick checks** for that skill → **`QuickCheckAttempt`** rows covering each
  `quickCheck` in the guided lesson (attempted, not necessarily correct — quick checks never gate on correctness).
- Completed its **skill quiz** → a `PRACTICE` attempt of `variant: "skill-quiz"` with `finishedAt` set,
  meeting a minimum item count (configurable, default = min(6, available)).

```
skillCompleted(skill, user) =
  lessonCompleted(skill) AND allQuickChecksAttempted(skill) AND skillQuizCompleted(skill)
```

Partial states are surfaced (`lesson ✓ · checks 2/3 · quiz —`) so completion feels legible, not binary-only.

**Section completion** = `completed required skills ÷ total required skills`. Display, per the brief:
> `8 of 17 skills completed · 47%`

- "Required skills" is configurable per section (default = all skills; allows later exclusion of optional/enrichment skills).
- **Completion % is never mixed with quiz score.** A user can be 100% complete with low mastery — the
  UI shows both numbers side by side, distinctly labeled.

Completion is computed from `LessonCompletion` + `QuickCheckAttempt` + skill-quiz attempts (all in the
attempt/completion log) and optionally cached in `UserSkillProgress` (a derived projection, §12).

---

## 5. Mastery definitions

**Keep the existing `mastery.ts` engine. Extend its inputs and add states.** Do not rebuild.

Current formula (retained): per skill, `mastery% = Σ(credit × recency) ÷ Σ(recency)`, where
`credit` is confidence-weighted (wrong 0; correct+guessed 0.25; +unsure 0.5; +confident 1.0) and
`recency = 0.5^(ageDays/14)` floored at 0.08.

**Extensions (all behind a single configurable weights/thresholds object, `masteryConfig`):**
- **Difficulty weight:** harder items (difficulty 3) contribute more evidence than easy (1). Multiplier
  `{1: 0.85, 2: 1.0, 3: 1.15}` (configurable). Currently `difficulty` is stored but unused — this activates it.
- **Attempt-count gate:** a skill cannot reach `Proficient`/`Mastered` below a minimum distinct-item
  evidence count (default 4 distinct questions) — prevents "mastered after one correct answer."
- **Spaced-review success:** clearing an SRS review on a skill's question adds positive evidence
  (already captured as an AttemptItem; the review context is a small bonus weight).
- Confidence, recency, difficulty, recency-decay half-life, and every threshold are fields on `masteryConfig`.

**Mastery states (5), thresholds configurable:**

| State | Rule (defaults) |
|---|---|
| Not started | no assessed items on the skill |
| Learning | assessed, `mastery% < 50` OR below evidence gate |
| Practicing | `50 ≤ mastery% < 70` with ≥ gate evidence |
| Proficient | `70 ≤ mastery% < 85`, evidence ≥ gate, ≥1 recent success |
| Mastered | `mastery% ≥ 85`, evidence ≥ gate, sustained (≥2 spaced successes, no recent lapse) |

**Reconciling the two computations:** the diagnostic keeps **raw accuracy bands** (it is a
point-in-time snapshot and must not be retro-weighted); ongoing **mastery uses the weighted engine**.
The UI labels them distinctly ("Baseline: raw diagnostic accuracy" vs "Mastery: weighted, decays with
time"). The band label helper is unified so both scales use the same color tones, but the *inputs* stay separate and documented.

**State transitions are recorded** (a `masteryState` field on the cached `UserSkillProgress` plus a
lightweight transition entry) so "First Skill Mastered" and "Improved a weak skill" are detectable and honest.

**Honesty guardrail:** copy never claims the internal mastery score guarantees a TEAS result. Language
is "your evidence suggests…", "readiness estimate," never "you will pass."

---

## 6. Quiz-attempt tracking specification

Quizzes reuse the existing immutable `Attempt`/`AttemptItem` log — **attempts are never overwritten**
(append-only already). We add typing and a history surface.

- **Quiz identity:** `Attempt.config.variant` gains `"skill-quiz" | "topic-quiz" | "section-quiz"`
  alongside the existing `session/review/saved/section`. A stored `scope` (`{ skillId?, topicId?, section? }`)
  makes history queryable without recomputation.
- **Per attempt, stored or derived-and-cached:** latest/best/average are computed over the attempt set
  for a given scope; per-attempt we already have correct/total (via `scoreItems`), time (`Σ timeMs` or
  attempt duration), date (`finishedAt`), and mastery change (mastery snapshot at submit minus prior snapshot).
- **Quiz History surface** (Progress tab 3): every attempt listed with score, best-badge, date,
  question count, time, mastery delta, and "skills needing review." Opening an attempt shows the full
  `ReviewList` (already built): the user's answer, correct answer, explanation, skill tested, related
  lesson deep-link, and review status (in SRS queue? due?).
- **Aggregates per skill/topic/section quiz:** latest score, best score, average score, attempt count,
  questions correct, total, time taken, mastery change, date, skills needing review. Computed via a
  single `getQuizHistory(scope)` reader over the attempt log; optionally cached per scope.

Nothing is destructive. Retaking a skill quiz creates a new `Attempt`; the prior remains fully reviewable.

---

## 7. Diagnostic-results specification

The diagnostic is the **permanent baseline.** Current results already lead with an interpretation
headline (good) but lack baseline preservation and a single aggregate.

**Baseline model:** the **first completed diagnostic per section is immutable and flagged**
(`Attempt.config.isBaseline = true`, set once, never re-set). A `Baseline` snapshot (materialized)
stores each section's baseline score + date so later retakes and trend charts always compare against
the original, even after retakes. Retaking a diagnostic creates a new attempt and never mutates the baseline.

**Aggregate baseline score** = blueprint-weighted mean of the four section baselines (weights = section
`scored` counts). Shown as the overall baseline once all four section diagnostics are complete; before
that, "baseline in progress (2 of 4 sections)."

**Results page (leads with interpretation, then the ring):**
- One-sentence interpretation first — e.g. *"You're currently strongest in Reading. Your largest
  potential gains are in Chemistry and Numbers and Algebra."* (Generated from section + top-priority ranking.)
- Overall baseline score, then Reading / Math / Science / English scores.
- Subtopic (topic-level) performance bars, collapsible to skill-level weaknesses.
- Strongest areas; **five highest-priority skills** (extend current top-3 priority ranking to top-5, now skill-level via `skillId`).
- Question timing (per-section avg vs exam pace, using `timeMs`).
- Confidence patterns: **correct-but-guessed** (lucky guesses = gaps), **incorrect-but-confident**
  (dangerous overconfidence), **left unanswered**.
- Recommended first week (from plan generator).
- **Build My Study Plan** CTA (already exists as `BuildPlanButton`).

**Honesty:** no unvalidated percentiles, no readiness guarantee from one attempt. Copy: "a starting
picture, not a prediction."

---

## 8. Exam Center information architecture

A dedicated **Exam Center** consolidates all timed/summative assessments (today they are scattered
across `/diagnostic`, `/mock`, `/practice`). Recommended route: **`/exams`** (added as a sub-destination
under Practice to preserve the 4-tab nav; Practice becomes "Practice & Exams" or Exam Center gets a
card entry on Practice — see wireframes §11).

```
Exam Center (/exams)
├─ Baseline
│   └─ Initial Diagnostic (per-section, 4 sections)      → permanent baseline
├─ Checkpoints
│   └─ Progress Checks (short, mixed, timed)             → track movement vs baseline
├─ Section Exams (timed)
│   ├─ Reading   ├─ Mathematics   ├─ Science   └─ English
├─ Full Simulations
│   └─ Realistic TEAS Simulation ×N (full 170, section order, break)
└─ Custom Retake
    └─ Build-your-own (pick sections, counts, focus on weak skills / missed / flagged)
```

Terminology is **"realistic TEAS simulation,"** never "real TEAS exam." Each entry shows: last score,
best, attempts, and Pro-gating where applicable. History for every type is preserved (Progress tab 4).

**Full simulation requirements** (extend existing mock): correct section order; section timers;
scheduled post-Math break; **autosave after every answer** (the key gap — persist `AttemptItem.selected`
incrementally); Math-only 4-function calculator (exists); preserve native alternate formats (exists);
track confidence, time, flagged (exists); **graceful interruption recovery** (resume from persisted
state); avoid recently seen questions where possible (exposure + cooldown, §9).

---

## 9. Practice-exam generation strategy

**Goal:** multiple distinct exam forms from 836 questions without excessive repetition.

**Capacity math (per full 170-item simulation, using blueprint totals):**

| Section | Bank (approx, tagged) | Form need | Independent forms before reuse |
|---|---|---|---|
| Reading | ~pool R | 45 | pool_R / 45 |
| Math | ~pool M | 38 | pool_M / 38 |
| Science | ~pool S | 50 | pool_S / 50 |
| English | ~pool E | 37 | pool_E / 37 |

With 836 total questions across 4 sections, the bank supports roughly **2–4 fully-disjoint full forms**,
and **many more** partially-overlapping forms once cooldowns (rather than hard exclusion) are used.
Section and progress-check exams stretch much further because they draw one section at a time. **A one-time
report will print exact per-section pool sizes** so we set realistic form counts and know where the bank
needs topping up (Reading is the tightest given passage grouping).

**Generation algorithm (extends `select.ts`, does not replace it):**
1. Match the TEAS blueprint (section + topic weights — already implemented via `sectionCountsFor`/`topicCountsFor`).
2. Realistic difficulty distribution per section (new: target a difficulty mix, e.g. 30/50/20 easy/med/hard, configurable) — activates the unused `difficulty` field.
3. **Prioritize unseen questions**, then apply a **cooldown** to recently-seen ones (new: `QuestionExposure`
   tracking `lastServedAt` + `timesServed` per user; a question in cooldown is deprioritized, not banned,
   so small pools still fill).
4. Assign a unique **`formId`** per generated exam; store the served question set on the attempt.
5. **Prevent duplicates within one form** (already implicit; make explicit — dedupe by `questionId`).
6. **Protected mock pool:** reserve a small, curated per-section set that never appears in practice/drills,
   used only for full simulations, so at least one form stays "unspoiled" for a realistic dry run.
7. Track exposure so history and analytics can report bank health.

Exposure/cooldown replaces the current **binary, permanent** seen/unseen with a decaying signal — the
single most impactful selection upgrade for realistic repeat exams.

---

## 10. Gamification specification (mature, adult)

Design rule enforced throughout: **points, streaks, badges, and animation are visually secondary to
mastery and scores; no confetti-per-question; no streak-shaming; no childish avatars.** Everything is
computed from the source-of-truth attempt/completion data — no independent counters that can drift.

### Weekly study goals — `StudyGoal`
Per-week targets and progress: sessions completed, reviews completed, study days, weekly target
(derived from onboarding `studyDaysPerWeek` / `sessionMinutes`). Shown as calm progress, e.g.
`Reviews 12/15 · Study days 4/5`. No penalty for missing.

### Meaningful study points (secondary)
Awarded for: completing a lesson, completing quick checks, completing a quiz, clearing scheduled
reviews, **improving a weak skill** (mastery-state advance), completing a progress check, completing a
full simulation. **Anti-farming:** points for a given skill's lesson/quiz are awarded **once per real
advance** — repeating already-mastered easy content yields no points; review points require the item to
have been genuinely due; diminishing returns on same-skill same-day repeats. Points render small, muted,
never a hero number.

### Milestones — `Achievement` / `UserAchievement`
Examples: Diagnostic Complete, First Skill Completed, First Skill Mastered, First Subject Quiz, First
Full Simulation, Improved Five Points (vs baseline), Completed Mathematics, New Personal Best, Cleared
Weekly Reviews. **Subtle** celebration (a quiet inline acknowledgment + a permanent record), never a full-screen confetti burst.

### Readiness journey (mature progression)
Six stages, derived from real state (not points): **Baseline Established → Foundations Building →
Skills Developing → Section Proficiency → Exam Simulation → Final Review.** Stage is a function of
diagnostic completion, skills completed/mastered, section completion, and simulations taken. Displayed as
a restrained horizontal progression, no cartoon levels.

### Consistency (gentle)
Phrasing: **"Studied on 4 of the last 7 days"** — from `DailyActivity`. Never "your streak will
disappear." Rest days are neutral (muted, never red — matches the existing `WeekStrip`).

### Personal bests
Highest quiz score, highest practice-exam score, largest subject improvement, fastest *accurate*
section, most reviews completed, first time above target score. Computed over the attempt log; shown as
quiet record entries, not a leaderboard. **No public leaderboards in v1.**

---

## 11. Desktop and mobile wireframes

ASCII, honoring DESIGN.md grammar (mono kicker + one-line interpretation, mono numeric instruments,
one hero surface per page, `rounded-xl` panels, subject accents as small indicators only).

### Today (mobile-first) — extend existing, do not redesign
```
┌─────────────────────────────┐
│ TODAY · JUL 17               │  ← mono kicker
│ You're closing the gap in    │  ← one-sentence interpretation (coach voice)
│ Science. Keep going.         │
│                    ⟨ 24 days⟩│  ← exam countdown chip
├─────────────────────────────┤
│ ▉ TODAY'S SESSION  (hero 2xl)│
│  3 reviews · 1 lesson · 8 Q  │
│  ~18 min                     │
│         [ Start session → ]  │
├─────────────────────────────┤
│ ● ● ● ○ ● ○ ○   this week    │  ← WeekStrip (calm dots), "4 of 7 days"
├─────────────────────────────┤
│ READINESS · Skills Developing│  ← journey stage (text, not a badge)
│ ▸ 6 reviews due              │  ← one ActionRow insight
├─────────────────────────────┤
│ One recent win               │
│ Chemistry: Learning→Practicing│  ← single improvement, muted
└─────────────────────────────┘
```
(Desktop = same content, max-w-3xl, hero + week strip on one row where space allows. Today stays a
focused launcher, NOT an analytics dashboard.)

### Learn — subject card (per brief)
```
┌─ SCIENCE ───────────────── ●│  ← section accent dot
│ 8 of 24 skills completed     │  ← COMPLETION (mono)
│ Completion 33%   Mastery 61% │  ← two distinct numbers, never merged
│ Latest quiz 74%              │
│              [ Continue → ]  │  ← recommended next action
└─────────────────────────────┘
Topic ▸ Anatomy & Physiology
  ┌ Cardiovascular System ─────┐
  │ ✓ lesson · checks 3/3 · quiz│  ← completion state
  │ Practicing · 68%            │  ← mastery state + %
  │ latest 71 · best 80 · due 2 │  ← quiz + reviews due
  │            [ Review → ]     │
  └────────────────────────────┘
```

### Progress — four tabs
```
[ Overview ] [ Subjects & Skills ] [ Quiz History ] [ Exam History ]

OVERVIEW
  Baseline 62  →  Current 71   (+9)      ← baseline preserved, delta honest
  Studied 4 of last 7 days
  Skills completed 21/85 · mastered 6
  ▸ Recommended next: Chemistry skill quiz

SUBJECTS & SKILLS   → per-section completion+mastery, weak skills, reviews due
QUIZ HISTORY        → every attempt (score/best/date/time/Δmastery), open → full review
EXAM HISTORY        → diagnostics + section exams + progress checks + simulations,
                      score-trend chart (Diagnostic · PE1 · PE2 · PE3 · latest)
```

### Diagnostic results (leads with interpretation)
```
┌ YOUR BASELINE ──────────────┐
│ Strongest in Reading. Largest│  ← interpretation FIRST
│ gains in Chemistry & Numbers │
│ and Algebra.                 │
│           ◗ 62  overall       │  ← ring second
│ R 78 · M 55 · S 48 · E 66    │
│ Top 5 skills to fix …        │
│ Timing · confidence patterns │  ← guessed / overconfident / unanswered
│        [ Build my study plan ]│
└─────────────────────────────┘
```

### Exam Center
```
EXAM CENTER
  Baseline        ▸ Diagnostic (4/4)         best 62
  Checkpoints     ▸ Progress Check           last 68
  Section Exams   ▸ R  M  S  E               (timed)
  Simulations     ▸ Realistic TEAS Sim ×3    best 71   [Pro]
  Custom          ▸ Build a retake
```

---

## 12. Data model

**Principle:** the attempt/completion log is the single writable source of truth. `UserSkillProgress`
and `UserSectionProgress` are **derived, rebuildable caches** (materialized projections) — never edited
independently, always reconstructable by a `recomputeProgress(user)` job, so they cannot disagree.

New Prisma models (FK to internal `User.id String`, consistent with all existing relations):

```prisma
model LessonCompletion {
  id          String   @id @default(cuid())
  userId      String
  lessonId    String            // taxonomy lessonId (== skillId today)
  skillId     String
  section     Section
  completedAt DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([userId, lessonId])
  @@index([userId, skillId])
}

model QuickCheckAttempt {
  id           String   @id @default(cuid())
  userId       String
  skillId      String
  lessonId     String
  checkKey     String            // stable id of the quickCheck within the guided lesson
  isCorrect    Boolean
  answeredAt   DateTime @default(now())
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([userId, skillId])
  @@unique([userId, checkKey])   // "attempted" = row exists; re-answers update in place (non-destructive to mastery: quick checks never feed mastery)
}

// UserSkillProgress — DERIVED CACHE (rebuildable). Completion + mastery per skill.
model UserSkillProgress {
  id             String   @id @default(cuid())
  userId         String
  skillId        String
  section        Section
  topicId        String
  // completion
  lessonDone     Boolean  @default(false)
  quickChecksDone Int     @default(0)
  quickChecksTotal Int    @default(0)
  skillQuizDone  Boolean  @default(false)
  completed      Boolean  @default(false)
  // mastery
  masteryPct     Float?
  masteryState   MasteryState @default(NOT_STARTED)
  evidenceCount  Int      @default(0)
  latestQuizPct  Float?
  bestQuizPct    Float?
  reviewsDue     Int      @default(0)
  updatedAt      DateTime @updatedAt
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([userId, skillId])
  @@index([userId, section])
}

// UserSectionProgress — DERIVED CACHE. Rollup for Learn/Progress.
model UserSectionProgress {
  id               String @id @default(cuid())
  userId           String
  section          Section
  skillsCompleted  Int    @default(0)
  skillsRequired   Int    @default(0)
  masteryPct       Float?
  latestQuizPct    Float?
  updatedAt        DateTime @updatedAt
  user             User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([userId, section])
}

// ExamSectionResult — materialized per-section result of an exam Attempt (so history never recomputes).
model ExamSectionResult {
  id           String   @id @default(cuid())
  attemptId    String
  section      Section
  correct      Int
  total        Int
  scorePct     Float
  timeMs       Int?
  flaggedCount Int      @default(0)
  attempt      Attempt  @relation(fields: [attemptId], references: [id], onDelete: Cascade)
  @@unique([attemptId, section])
  @@index([attemptId])
}

model StudyGoal {
  id               String   @id @default(cuid())
  userId           String
  weekStart        DateTime          // Monday, normalized
  targetSessions   Int
  targetReviews    Int
  targetStudyDays  Int
  sessionsDone     Int      @default(0)
  reviewsDone      Int      @default(0)
  studyDaysDone    Int      @default(0)
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([userId, weekStart])
}

model DailyActivity {
  id         String   @id @default(cuid())
  userId     String
  day        DateTime          // date-only, normalized to user tz
  sessions   Int      @default(0)
  questions  Int      @default(0)
  reviews    Int      @default(0)
  minutes    Int      @default(0)
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([userId, day])
  @@index([userId, day])
}

model Achievement {          // catalog (seeded, all-users)
  id          String @id             // stable slug e.g. "first-skill-mastered"
  title       String
  description String
  category    String                 // milestone | personal-best | journey
  userAchievements UserAchievement[]
}

model UserAchievement {
  id            String   @id @default(cuid())
  userId        String
  achievementId String
  earnedAt      DateTime @default(now())
  meta          Json?                 // e.g. { section: "MATH", delta: 9 }
  user          User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  achievement   Achievement @relation(fields: [achievementId], references: [id], onDelete: Cascade)
  @@unique([userId, achievementId])
  @@index([userId])
}

// Optional: exposure/cooldown for realistic multi-form exams
model QuestionExposure {
  id           String   @id @default(cuid())
  userId       String
  questionId   String
  timesServed  Int      @default(0)
  lastServedAt DateTime @default(now())
  @@unique([userId, questionId])
  @@index([userId, lastServedAt])
}

enum MasteryState { NOT_STARTED  LEARNING  PRACTICING  PROFICIENT  MASTERED }
```

Changes to existing models:
- `Question`: add `skillId String?`, `lessonId String?`, `secondarySkillIds Json?`; index `@@index([skillId])`.
- `Attempt`: add relation `sectionResults ExamSectionResult[]`; enrich `config` with `variant`
  additions (`skill-quiz|topic-quiz|section-quiz|section-exam|progress-check|simulation|custom`),
  `scope`, `formId`, `isBaseline`. (Kept in JSON to avoid churn; promote to columns only if query needs.)

**Points** intentionally have **no dedicated ledger table** in v1 — total is a **pure function** of
achievements + completion + review events, recomputed on read. This is the strongest guarantee against
a drifting counter. (If write-time performance later demands it, add a derived `PointsLedger` cache with
the same recompute-from-truth contract.)

Per-schema-change rationale (Why / Existing data affected / Migration / Backfill / Rollback / Indexing):

| Change | Why | Data affected | Migration | Backfill | Rollback | Index |
|---|---|---|---|---|---|---|
| `Question.skillId/lessonId/secondarySkillIds` | Turn fragile string join into real identity | 836 rows (nullable → no break) | additive `ALTER` | resolver from `subtopic` (+overrides), report 38 unmapped | drop columns; `subtopic` still works | `@@index([skillId])` |
| `LessonCompletion` | Persist lesson completion (currently localStorage) | none | new table | one-time import of localStorage on next login (client → API) | drop table; localStorage fallback | `[userId,skillId]` |
| `QuickCheckAttempt` | Persist quick-check attempts (for completion) | none | new table | none (forward-only) | drop table | `[userId,skillId]` |
| `UserSkillProgress` / `UserSectionProgress` | Fast, queryable completion+mastery cache | none | new tables | `recomputeProgress(user)` over attempt log | drop tables; compute on the fly | `[userId,section]` |
| `ExamSectionResult` | Store per-section exam results (no recompute) | none | new table | backfill from existing MOCK/DIAGNOSTIC attempts via `scoreItems` | drop table; recompute | `[attemptId]` |
| `StudyGoal` | Weekly goals | none | new table | current week from onboarding prefs | drop table | `[userId,weekStart]` |
| `DailyActivity` | Gentle consistency | none | new table | backfill from `Attempt.startedAt` history | drop table | `[userId,day]` |
| `Achievement`/`UserAchievement` | Milestones | none | new tables + seed catalog | award historically-earned milestones on first recompute | drop tables | `[userId]` |
| `QuestionExposure` | Cooldowns for multi-form exams | none | new table | backfill from AttemptItem history (timesServed, lastServedAt) | drop table; fall back to binary seen/unseen | `[userId,lastServedAt]` |

**Migration safety:** all changes are additive and nullable; no destructive edits to `Attempt`/
`AttemptItem`/`Question` content. Migrations verified clean today (`prisma migrate status` → up to date).
The seed is a **reconciliation** seed (never blanket-delete/reseed — noted in project memory).

---

## 13. API / server-action requirements

The app uses **route handlers under `src/app/api/*`** (no server actions today). New/changed endpoints,
following existing conventions (Clerk `requireUser`, Zod validation, `track()` analytics):

- `POST /api/lessons/:lessonId/complete` — record `LessonCompletion`; recompute skill progress.
- `POST /api/quick-checks/:checkKey` — record `QuickCheckAttempt`.
- `POST /api/attempts/:id/answer` — **extend to persist `selected` incrementally** (autosave; fixes mock/diagnostic resume gap).
- `GET  /api/attempts/:id/resume` — return persisted in-progress state for interruption recovery.
- `POST /api/exams/start` — unified exam generator (`{ type, sections?, counts?, focus? }`), assigns `formId`, applies exposure/cooldown, returns question set; supersedes ad-hoc mock/diagnostic starts (which remain as thin wrappers).
- `POST /api/attempts/:id/submit` — **extend** to also write `ExamSectionResult`, set `isBaseline` on first diagnostic, and trigger `recomputeProgress` + achievement checks.
- `GET  /api/progress/skills` · `/api/progress/sections` · `/api/quiz-history` · `/api/exam-history` — read caches for the four Progress tabs and Learn.
- `GET/POST /api/goals` — read/roll the weekly `StudyGoal`.
- Internal (not HTTP): `recomputeProgress(user)`, `awardAchievements(user, context)`, `rollDailyActivity(user)`, `computeBaseline(user)`, `computePoints(user)` — all pure, called from submit/finalize paths.

All progress-mutating endpoints funnel through **one** `recomputeProgress` so caches derive from the
same source and cannot diverge. Idempotent; safe to re-run.

---

## 14. Analytics events

Extend the existing `AnalyticsEvent` first-party log (`track()`), which stores only event names + small
props (never question content). New events:

- Completion: `lesson_completed`, `quick_check_attempted`, `skill_completed`, `section_completed {section, pct}`.
- Mastery: `mastery_state_changed {skillId, from, to}`, `skill_improved {skillId, delta}`.
- Quiz: `quiz_started {scope}`, `quiz_finished {scope, scorePct, masteryDelta}`, `quiz_attempt_reviewed`.
- Exam: `exam_started {type, formId}`, `exam_autosaved`, `exam_resumed`, `exam_finished {type, scorePct, deltaFromBaseline, deltaFromPrev, personalBest}`, `baseline_established`.
- Diagnostic: `diagnostic_started` (exists), `diagnostic_section_finished`, `baseline_complete`, `build_plan_clicked`.
- Gamification: `goal_week_started`, `goal_met {kind}`, `achievement_earned {id}`, `personal_best {kind}`, `journey_stage_changed {from,to}`, `points_awarded {reason, amount}`.
- Consistency: `daily_activity_rolled` (internal), `study_day_recorded`.

These power funnel analysis and, later, honest efficacy reporting (does mastery movement predict
simulation improvement?) — without ever storing answer content.

---

## 15. Migration risks

1. **Cache divergence** — the top risk. Mitigation: caches are strictly derived; a single
   `recomputeProgress` writer; a nightly/on-demand full-rebuild job; and a dev assertion that
   recompute is idempotent. No UI writes a progress cache directly.
2. **Two mastery computations confusing users** — mitigation: label baseline (raw) vs mastery (weighted)
   explicitly; unify only the color tones, not the inputs.
3. **The 38 unmapped questions + NurseHub title mismatches** — mitigation: one-time mapping report +
   override table + CI guard so new content can't ship unmapped.
4. **localStorage → DB lesson-completion migration** — users mid-study have local completion. Mitigation:
   one-time client-side sync on next authenticated load; localStorage remains a read fallback until synced.
5. **Autosave write volume** — persisting every answer adds writes. Mitigation: debounce + single-row
   upsert per `AttemptItem`; it is the same order of magnitude as existing submit-time writes, spread out.
6. **Points farming** — mitigation: award on genuine advances only; per-skill/day caps; points derived
   from truth, so exploits can't inflate a stored counter.
7. **Baseline immutability bugs** — mitigation: `isBaseline` set exactly once in a transaction guarded by
   "no prior baseline for this section"; covered by tests.
8. **Bank capacity for many forms** — mitigation: exposure/cooldown (not hard exclusion) + the pool-size
   report + a protected mock pool; document honest form counts rather than promising unlimited exams.
9. **Free/Pro gating** — new exam types and history must respect existing Pro gates; progress is never
   deleted when a subscription ends (existing product rule).
10. **Scope creep vs Today** — Today must stay a launcher; all analytics live on Progress. Enforced in review.

---

## 16. Phased implementation plan

Matches the brief's phase order; each phase ships independently and leaves the app fully working.

**Phase 0 — Foundations (mapping + identity)**
- Add `Question.skillId/lessonId/secondarySkillIds`; backfill from `subtopic`; override table; CI guard.
- Mapping report (798 tagged / 38 unmapped triaged) + per-section pool-size report.
- Taxonomy ID module + optional reference-table sync. No user-visible change.

**Phase 1 — Progress data model + completion + quiz history (brief Phase 1)**
- `LessonCompletion`, `QuickCheckAttempt`, `UserSkillProgress`, `UserSectionProgress`, `MasteryState`.
- `recomputeProgress` writer; localStorage → DB completion sync.
- Skill completion definitions; extend mastery engine (difficulty, evidence gate, 5 states) behind `masteryConfig`.
- Quiz-attempt history reader + Progress "Quiz History" tab; Learn subject/skill cards show completion + mastery + latest/best quiz + next action.

**Phase 2 — Diagnostic statistics + baseline (brief Phase 2)**
- Baseline preservation (`isBaseline`, `Baseline` snapshot, aggregate baseline score).
- Diagnostic results: top-5 skills, timing, confidence patterns, strongest areas, recommended first week.
- Wrong-answer → lesson recommendation and targeted-practice wiring on `skillId`.

**Phase 3 — Exam Center + tracked exams + comparison (brief Phase 3)**
- `/exams` IA; unified `POST /api/exams/start` with `formId`, exposure/cooldown, protected mock pool.
- `ExamSectionResult` (+ backfill); autosave/resume for mock & diagnostic.
- Exam History tab; score-trend chart (Diagnostic · PE1 · PE2 · PE3 · latest); progress checks, section exams, custom retake, multiple simulations.

**Phase 4 — Gamification (brief Phase 4)**
- `StudyGoal`, `DailyActivity`, `Achievement`/`UserAchievement`, derived points, readiness journey, personal bests.
- Today: journey stage + one recent improvement + weekly goal; gentle consistency copy.

**Phase 5 — Polish (brief Phase 5)**
- Responsive/empty/loading/error/interrupted states across new surfaces; accessibility pass; subtle
  milestone celebrations; performance (cache reads, autosave debounce); copy audit for honesty guardrails.

**End state:** *"I can see exactly what I've completed, how well I understand it, how my scores are
changing, and what to study next"* — one connected system reading from one source of truth, not a
collection of disconnected charts and badges.

---

## Open decisions for the owner (do not block the plan)

1. **Exam Center placement:** new top-level `/exams` vs a section inside Practice. Recommend a card entry
   on Practice + `/exams` route (keeps the 4-tab nav intact).
2. **"Required skills" per section:** default = all 85. Confirm whether any skills should be optional/enrichment.
3. **Reference tables vs pure-TS taxonomy:** recommend thin DB reference tables for FK integrity; acceptable
   to stay pure-TS if you prefer zero taxonomy migrations.
4. **Points visibility:** recommend showing points only on Progress (not Today) to keep them secondary. Confirm.
5. **NurseHub import:** the shipped bank already encodes the mapping; importing `source:nursehub` questions
   is optional (adds volume for exam forms but needs title normalization). Recommend deferring to post-Phase 3.
