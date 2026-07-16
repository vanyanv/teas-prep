# Question Content Rendering — Audit & Design

Date: 2026-07-15. Scope: how the 836-question bank is structured, formatted,
and rendered on the question screen (session, quiz/mock, review), per the
question-content formatting spec.

## 1. Audit findings (836 questions)

Distribution: READING 155, MATH 216, SCIENCE 298, ENGLISH 167.
Types: SINGLE 763, FILL_BLANK 25, MULTI 18, ORDERED 18, HOT_SPOT 12.
12 questions carry images (all HOT_SPOT).

Deterministic scan results (script: pattern checks over stem/options/explanation):

| Problem | Count | Root cause |
| --- | --- | --- |
| Mixed straight/curly quotes in one item | 326 | data (authoring inconsistency) |
| Multi-paragraph stems rendered as one `<h2>` block | 125 | renderer |
| Passage embedded in stem (`Passage: "…"` or `Read the passage…\n\n…`) | 79 | renderer (no passage layout) |
| Plain-text slash fractions (`−3/8 ÷ 3/4`, `4 5/12`) | 56 | renderer (no math formatting) |
| Long stems > 400 chars, no visual hierarchy | 49 | renderer |
| Data sets as prose lines (`Mon: 12, Tue: 8, …`) | 17 | renderer (no table treatment) |
| "Select all that apply" duplicated in stem + kicker | 18 | data + renderer |
| Chemical formulas without subscripts (`CH4 + O2 → CO2 + 2H2O`) | 12 | renderer |
| Blank markers as raw underscores (`____`) | 10 | renderer |
| `cm^2`-style caret exponents | 1 | data (most content already uses `cm²`) |
| "underlined word" described but shown in quotes | 1 | data limitation, flagged |

Worst-formatted questions are the long READING passage items (#42, #91, #340,
#352, #353…): lead-in line + multi-paragraph passage + question all collapse
into one heading-styled text block.

What the audit did **not** find: no HTML/entity remnants, no duplicate answer
labels, no `A.`-prefixed options, no scientific-notation breakage, virtually no
caret exponents (content already uses `²`, `×`, `÷`, `−`, `≈` unicode). The
data is clean plain text with consistent patterns; almost every visible problem
is a **renderer** problem, not a data problem.

## 2. Conflict flagged: single-answer conversion

Uncommitted work in the tree (`scripts/convert-to-single.mts`,
`src/content/questions.single.ts`, `prisma/seed.ts` switched to
`QUESTIONS_SINGLE`) converts every MULTI / ORDERED / FILL_BLANK / HOT_SPOT item
into standard single-answer MCQ. The formatting spec explicitly requires the
opposite: "Do not convert alternate-format questions into standard multiple
choice merely to simplify the frontend."

Decision: this redesign renders **native formats** and treats
`src/content/questions.ts` (all five types) as the source of truth. The
single-bank files are left untouched for the owner to decide; the new renderer
also improves them if they are ever seeded (they are plain SINGLE items whose
stems contain lettered lists, which the block renderer formats). The seed.ts
switch should be reverted if native formats are kept — **owner decision, not
made here.**

## 3. Design

### Approach chosen: render-time structure + zero data migration

Three options were considered:

1. **Structured-field migration** — split every stem into
   `passage/prompt/instructions/table` fields in content + Prisma.
   Best long-term authoring model, but a destructive rewrite of 836
   hand-authored items with real content-loss risk, for patterns that are
   already deterministic.
2. **Render-time parsing (chosen)** — pure functions derive structure
   (passage, prompt, data table, inline math/chem tokens) from the existing
   strings at render. Deterministic, unit-tested, fully reversible, zero
   content loss, works for DB-stored questions and both content banks.
3. **KaTeX pipeline** — add `katex` and convert plain text to TeX. Rejected:
   there is no LaTeX source; the corpus's real math needs are numeric
   fractions, mixed numbers, chem subscripts, and one caret exponent — all
   coverable with native HTML (`<sup>/<sub>`, stacked-fraction spans) at zero
   bundle cost and no text→TeX misparse risk. Revisit only if content gains
   roots/integrals/matrices.

If structured authoring is wanted later, option 1 can be generated *from* the
same parser once it has proven itself in production rendering.

### New units

- `src/lib/quiz/content.ts` — pure, tested:
  - `parseStem(stem)` → `{ lead?, passage?, prompt, dataRows? }`. Recognizes
    `Read the passage…` lead-ins, `Passage: "…"` quoted passages, trailing
    question paragraph, and label:number data lines. Falls back to whole stem
    as prompt; never throws.
  - `tokenize(text)` → inline tokens: plain text, `frac` (slash fractions and
    mixed numbers), `sup` (caret exponents), `sub` (chemical formulas,
    element-symbol-validated), `blank` (`___+` runs). Conservative by design:
    ratios, dates, and prose slashes stay text.
  - `typographize(text)` → curly quotes/apostrophes (presentation-only fix for
    the 326 mixed-quote items).
- `src/components/quiz/question-content.tsx` — `RichText` (inline tokens; a
  stacked `Frac` with `aria-label="n over d"`), `ContentBlocks` (paragraphs,
  data tables, lettered lists), `DataTable` (mono tabular numerals,
  right-aligned numeric columns, real `<th>` markup).
- `src/components/quiz/passage-panel.tsx` — passage layout:
  - Short passage (< ~360 chars): inset quiet block above the prompt
    (left border, `text-base leading-relaxed`, max-w-prose).
  - Long passage: desktop `lg:` split (passage left, sticky question right);
    mobile/narrow: question-first with an accessible "View passage"
    disclosure that keeps its open state per question.

### Question screen hierarchy (per spec)

1. Metadata row (existing runner header: title, n/N, timer, tools) — kept.
2. Instruction kicker, standardized by type: "Select one answer" (single,
   shown only when a passage/exhibit makes structure non-obvious — otherwise
   silence per DESIGN.md's quiet-coach voice), "Select all that apply"
   (stripped from stem to avoid duplication), "Arrange in the correct order",
   fill-blank format cue derived from the stem's "Enter …" phrase and shown at
   the input.
3. Passage / data table (PassagePanel / DataTable).
4. Prompt — `text-lg sm:text-xl leading-relaxed`, distinct from passage.
5. Answer options — existing ChoiceList (labels, eliminate, full states) now
   rendering RichText for math/chem in options.
6. Sticky action bar — existing.
7. RationalePanel — existing verdict → takeaway → rest hierarchy, now with
   paragraph-aware RichText for long rationales.

### Not changed (already meets spec)

Choice states (selected/eliminated/correct/incorrect with icon + text label,
never color alone), 44px targets, keyboard support, flag/calculator/navigator
tools, sticky submit, confidence meter, focus rings, HOT_SPOT overlay input,
ORDERED move controls.

### Typography

Per DESIGN.md (which this spec defers to for exact values): stem
`text-lg sm:text-xl` (18–20px), passage `text-base` (16px), choices 15px,
line-height `leading-relaxed`, reading width ≤ `max-w-prose` inside the
narrow (max-w-2xl) container; split-passage screens widen to `lg:max-w-5xl`.

## 4. Validation

- Vitest unit tests on parser/tokenizer against real bank items, including the
  spec's representative set (short/long passage, fraction, mixed number, data
  table, chem formula, multi-select, fill-blank numeric, ordered, long
  rationale, long options) plus don't-mangle cases (ratios `3:2`, equations,
  `x/4` variables).
- A full-bank smoke test: parse + tokenize all 836 items, assert no throw and
  no content loss (token text round-trips to the source string).
- `tsc`, `next build`, and in-browser visual verification of representative
  questions.

## 5. Rollback

All rendering changes are presentation-layer; no data or schema is modified.
Rollback = revert the component/lib commits. There is nothing to migrate back.
