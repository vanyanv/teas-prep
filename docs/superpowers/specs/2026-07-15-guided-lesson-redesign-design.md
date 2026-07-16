# Guided Lesson Redesign — Learn skill pages

Date: 2026-07-15. Scope: transform the Learn skill lesson page from a long
document into a guided, sectioned learning session. Reference implementation:
Math / Numbers and Algebra / Perform Arithmetic Operations with Rational
Numbers. One reusable system renders every lesson from structured content.

## 1. Audit of the current page

`/learn/[section]/[topic]/[skill]` renders `LessonContent`, which maps
`SkillLesson.blocks` (heading + free-text body) into a flat column of
`h2 + paragraphs`. For the arithmetic skill that is 9 headings and ~60 lines
of prose shown at once.

Largest problems, in order of learning impact:

1. **No active recall.** The student reads for 10+ minutes with zero
   interaction until the single "Quiz this skill" card at the very bottom.
   Retention research and the product's own coach voice both want a check
   after every concept.
2. **Everything at once, everything equal.** Nine concepts render in one
   scroll with identical visual weight. There is no progress signal, no sense
   of position, no way to resume where you left off.
3. **Rules, examples, and mistakes are buried in paragraphs.** The PEMDAS
   walkthrough is a bullet list inside a text blob; "Tip:" and "Example:" are
   inline prefixes, not visual affordances. Nothing is scannable.
4. **Plain-text math in prose.** The quiz UI already renders stacked
   fractions and exponents via `RichText`, but lessons show `3/4`, `3²`,
   `2 3/5` as raw text, so mixed numbers read as unrelated digits.
5. **No skill-level mastery or expectations.** The header has no time
   estimate, section count, or mastery state; the student cannot judge the
   investment or their standing.
6. **Duplicate CTAs.** "Test yourself on just this skill." + "Quiz this
   skill." say the same thing twice in one card.
7. **Word problems don't teach reasoning.** The nurse/syringes example names
   the extra information in passing instead of training the student to
   identify it.

## 2. Redesigned information hierarchy

```
Lesson page
├── LessonHeader        breadcrumb, title, summary, meta row
│                       (time, section count, mastery), progress bar,
│                       Start/Continue
├── Overview state (before starting, and always above the fold)
│   ├── LearningObjectives   "By the end of this lesson…" 3-5 bullets
│   └── LessonOutline        numbered sections + quiz, states:
│                            done / current / not started
├── Active section (one at a time)
│   └── ConceptSection       Concept → Rule → Worked example →
│                            Common mistake → Quick check →
│                            Previous / Continue
├── LessonSummary (after last section)
│   ├── concepts reviewed, quick-check score, review-recommended list
│   └── primary: Start Skill Quiz; secondary: Review weak sections,
│       Back to topic
└── SkillQuizCard        question count, ~time, untimed, mastery effect
```

Desktop (lg+): slim sticky outline sidebar left, reading column right
(~672px). Mobile: single column; outline is a collapsible disclosure under
the header; Previous/Continue inline at the end of the section (not a sticky
footer, per DESIGN.md's thumb-reach rule the primary continue is the last
element the reader naturally reaches).

### Desktop wireframe

```
┌──────────────────────────────────────────────────────────────┐
│ ← Numbers and Algebra                                        │
│ MATH · NUMBERS AND ALGEBRA               [Practicing · 64%]  │
│ Arithmetic Operations with Rational Numbers                  │
│ Learn to work with whole numbers, decimals, fractions…       │
│ ~12 to 15 min · 8 sections · ▓▓▓▓░░░░░░ 3 of 8               │
├──────────────┬───────────────────────────────────────────────┤
│ OUTLINE      │  2 OF 8 · ORDER OF OPERATIONS                 │
│ ✓ 1 Order…   │  ## Order of operations                       │
│ ● 2 Even…    │  concept paragraph (17px, 68ch)               │
│ ○ 3 Word…    │  ┌ Rule ────────────────────────┐             │
│ ○ 4 Decimal  │  │ 1. Parentheses  2. Exponents │             │
│ ○ 5 Equiv…   │  │ 3. × ÷ left→right  4. + − …  │             │
│ ○ 6 Mixed…   │  └──────────────────────────────┘             │
│ ○ 7 Add/sub  │  Worked example   6 + 2 × (3² − 1) ÷ 4        │
│ ○ 8 Mult/div │  ┌ Step 1 exponent & parentheses… ┐           │
│ ○ ◆ Quiz     │  │ 3² = 9 → 9 − 1 = 8             │           │
│  (sticky)    │  └ [Next step]                     ┘          │
│              │  ⚠ Common mistake: don't add 6+2 first        │
│              │  ┌ Quick check ─────────────────┐             │
│              │  │ prompt + 4 tappable choices  │             │
│              │  └──────────────────────────────┘             │
│              │  [← Previous]            [Continue →]         │
└──────────────┴───────────────────────────────────────────────┘
```

### Mobile wireframe (~360px)

```
┌──────────────────────────┐
│ ← Numbers and Algebra    │
│ MATH                     │
│ Arithmetic Operations…   │
│ ~12–15 min · 8 sections  │
│ ▓▓▓░░░░░░░  3 of 8       │
│ [▾ Lesson outline]       │  ← collapsible, closed by default
│──────────────────────────│
│ 2 OF 8 · ORDER OF OPS    │
│ concept text…            │
│ ┌ Rule ───────────────┐  │
│ └─────────────────────┘  │
│ equation (scrolls →)     │
│ steps… [Next step]       │
│ ⚠ common mistake         │
│ ┌ Quick check ────────┐  │
│ │ choices ≥44px tall  │  │
│ └─────────────────────┘  │
│ [← Prev]    [Continue →] │
└──────────────────────────┘
```

## 3. The reusable lesson pattern

Every concept section renders the same sequence, each element optional except
title, concept, and quick check:

1. **Concept** — plain-language explanation, 17px body, 68ch max.
2. **Rule** — visually isolated bordered block, numbered when ordered.
3. **Worked example** — equation on its own line (proper math rendering),
   steps revealed one at a time; "Show all steps" escape hatch.
4. **Common mistake** — restrained warning-toned callout, one sentence or two.
5. **Quick check** — one question, immediate feedback, brief explanation,
   retry allowed, never affects formal mastery. First-try correctness feeds
   the lesson summary's "review recommended" list.
6. **Previous / Continue** — advancing marks the section complete and saves.

Extra block types cover the content that doesn't fit the base five:

- **tabs** — segmented control for grouped variants (decimal add/subtract vs
  multiply vs divide) so three small rules don't become three sections.
- **wordProblem** — structured reasoning scaffold: what's asked, relevant
  info, extra info, operation, calculation, answer.
- **why** — collapsed "Why does this work?" expander (e.g. why dividing by a
  fraction multiplies by the reciprocal), so mnemonics don't stand alone.
- **tip** — positive counterpart to mistake, used sparingly.

## 4. Content model (structured, not JSX)

New `GuidedLesson` type in `src/content/guided-lesson-types.ts`; lessons in
`src/content/guided-lessons/<slug>.ts`, registered in
`src/content/guided-lessons.ts`. Math stays plain text (`3/4`, `3^2`,
`2 3/5`) and is rendered by the existing `RichText` tokenizer, the same
system the quiz uses. No KaTeX dependency: the notation set needed by TEAS
lessons (fractions, mixed numbers, exponents, symbols) is already covered,
bundle stays light, and lesson math matches quiz math visually.

```ts
GuidedLesson {
  section, topic, skill, slug, summary, minutes: [lo, hi],
  objectives: string[],            // 3-5
  sections: GuidedSection[]        // 6-9
}
GuidedSection { id, title, blocks: GuidedBlock[], quickCheck: QuickCheck }
GuidedBlock =
  | concept { body }               // paragraphs; "- " bullets
  | rule { title?, intro?, items[], ordered? }
  | example { title?, expression?, steps: { note, work[], becomes? }[],
              answer }
  | mistake { body } | tip { body }
  | why { label, body }
  | tabs { tabs: { label, blocks }[] }
  | wordProblem { problem, asking, relevant[], extra[], operation,
                  calculation, answer }
QuickCheck { prompt, choices[], answer, explanation }
```

## 5. Components

`src/components/learn/guided/` (client where stateful):

- `GuidedLessonView` — shell/orchestrator: overview → sections → summary,
  progress state in `localStorage` (`guided-lesson:<slug>`: current index,
  completed ids, first-try check results). Per-device persistence now; a DB
  `LessonProgress` table is a later, additive step.
- `LessonHeader` (server-passed props), `LearningObjectives`,
  `LessonOutline` (sticky aside / mobile disclosure), `ConceptSection`,
  `RuleBlock`, `MathExpression` (block equation on RichText, mono,
  scrollable), `WorkedExample` + `SolutionStep`, `CommonMistake`, `Tip`,
  `WhyExpander`, `LessonTabs`, `WordProblem`, `QuickCheck`,
  `LessonNavigation`, `LessonSummary`, `SkillQuizCard`.

Design-system compliance: PageContainer widths, Kicker voice, mono
instruments with tabular-nums, `rounded-xl` panels / `rounded-md` controls,
focus ring `ring-[3px] ring-ring/40`, math subject accent (`--section-math`)
as a small indicator only, no side-stripe borders, no em dashes in copy,
ease-out motion, `prefers-reduced-motion` respected.

The skill page server component fetches per-skill mastery (attempt items
joined on `question.subtopic`, confidence + recency weighted like
`lib/mastery.ts`) and question count for the quiz preflight, then renders
`GuidedLessonView` when a guided lesson exists for the slug, else the legacy
`LessonContent` fallback.

## 6. Scaling to the remaining 85 skill lessons

- The renderer is content-agnostic: every lesson is data (`GuidedLesson`),
  no per-lesson JSX. Authoring a lesson = converting existing
  `SkillLesson.blocks` prose into typed blocks, which is mechanical: each
  current heading becomes a section; "Example:" lines become `example`
  blocks; "Tip:" lines become `tip`/`mistake`; one quick check is authored
  per section (the question bank already has per-skill items to adapt).
- Until a skill is converted, the page falls back to the current
  `LessonContent` renderer, so the migration is incremental and shippable
  per skill, starting with Math where structured math rendering pays off
  most.
- Conversion can be batch-assisted (script or model pass) because source and
  target are both structured text; quick checks are the only genuinely new
  authored content (~1 per section, 6-9 per lesson).
- Non-math sections reuse the same blocks: `example` steps hold passage
  reasoning; `wordProblem` generalizes to any "what is asked / what matters"
  scaffold; `tabs` group comma rules or unit conversions.

## Decisions and trade-offs

- **RichText over KaTeX**: consistency with quiz rendering, zero new
  dependency; trade-off is no complex layout (radicals, matrices), which
  TEAS content doesn't need. Revisit only if a lesson requires it.
- **localStorage progress**: automatic save/resume without schema changes;
  trade-off is no cross-device sync. Quick checks are explicitly informal so
  nothing authoritative is lost. DB sync is an additive follow-up.
- **Forward-gated outline**: completed and current sections are clickable;
  future sections wait for Continue. Keeps the guided feel; revisiting is
  always free.
