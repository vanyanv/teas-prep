# DESIGN.md — TEAS 7 Prep

Living design system. Tokens live in `src/app/globals.css` (OKLCH). This file
records the decisions and rationale. Refined during `$impeccable shape`.

## Theme decision (usage-scene driven)

Scene: "Chris, tired after work, studying TEAS questions on a phone in a dimly
lit room at 9pm, then sometimes reviewing on a laptop on a bright weekend
morning." That scene doesn't force pure-dark or pure-light, so: **light by
default with a genuine, first-class dark mode** (not an afterthought). Reading
passages and long question stems are most comfortable on a calm light surface in
daylight; dark mode protects the eyes at night. Honor `prefers-color-scheme` and
allow a manual toggle.

## Color strategy ("Calm Precision", 2026-07)

**Restrained.** Warm paper neutrals (OKLCH hue ~85, chroma ≤0.01) carry the app
background; primary learning surfaces sit near-white on top so lessons and
questions read as the elevated page. Text keeps a navy-charcoal cast (hue ~255)
for a quiet warm/cool tension instead of flat gray. Never `#000`/`#fff`.

The single accent is a **deep teal** (`oklch(0.48 0.09 200)` light / lighter in
dark). An earlier revision avoided teal as a healthcare category reflex; the
owner chose it deliberately for the commercial Calm Precision direction.
Distinctiveness now comes from execution, not hue avoidance: warm paper
grounding, navy-charcoal type, mono instruments, and teal held to interactive
elements only (≤10% of any surface). Semantic tones (success / warning /
destructive) appear only on results and validation, never decoratively.

Roles (see globals.css for exact OKLCH):
- `background` — warm paper; `card` — near-white learning surface; `foreground`
  — navy-charcoal, high legibility.
- `primary` — deep teal: primary actions, focus, the "next action."
- `success` / `warning` / `destructive` — score bands and validation only.
- Mastery bands reuse ScoreRing tones: <60 muted, 60–79 success-leaning, 80+ strong.

## Typography

- **Sans:** Inter (`--font-sans`) for everything UI and prose.
- **Mono:** JetBrains Mono (`--font-mono`) for numbers that should feel precise —
  timers, scores, counts, folios, section labels (uppercase, tracked).
- Scale uses ≥1.25 step contrast. Hierarchy via size + weight, not color.
- Body/reading passages capped at 65–75ch for comfortable reading.

## Layout & rhythm

- Mobile-first. Primary action reachable by thumb (bottom-anchored on quiz/mock).
- Vary spacing for rhythm; avoid uniform padding everywhere.
- Cards only where they're the right affordance. No nested cards. Most content
  doesn't need a container.
- A quiet top bar + content; no heavy persistent sidebar on mobile.

## Motion

- Ease-out only (ease-out-quart/quint). No bounce, no elastic.
- Don't animate layout properties; animate transform/opacity. Respect
  `prefers-reduced-motion`.
- Purposeful micro-motion: answer selection, score count-up (CountUp), ring
  fill, card flip. Nothing gratuitous.

## System grammar (phase-1 redesign, "quiet coach, precise instruments")

The signature: every key screen opens in the coach's voice (mono tracked
kicker + a written one-sentence interpretation), and every number is a
precise mono instrument (tabular JetBrains Mono). Surfaces stay quiet; at
most one hero surface per page.

### Type roles (fixed)

- Kicker: `font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground`
  (use the `Kicker` component; 0.18em is the single tracking value; never
  re-implement the classes inline). Two sanctioned sizes: default `text-xs`
  for page-level labels, `text-[11px]` via className for labels inside cards
  and panels. `asChild` keeps the voice on a semantic element (`h3`, `span`).
- Status chip (distinct from Kicker): `rounded-full px-1.5 py-0.5 font-mono
  text-[10px] uppercase tracking-wide` — for dense inline badges (GUESSED,
  plan task kinds). Chips are always `rounded-full`; tracking-wide because
  0.18em doesn't fit at 10px in dense rows.
- Page title: `text-2xl sm:text-3xl font-semibold tracking-tight`.
- Section heading: `text-base font-semibold`.
- Card title: `text-sm font-medium`.
- Question stem: `text-lg sm:text-xl font-medium leading-relaxed`.
- Choice / rationale body: `text-[15px] leading-relaxed`.
- Metadata: `text-xs text-muted-foreground`; numbers mono + `tabular-nums`.

### Radius grammar

- Controls: `rounded-md`. Cards/panels: `rounded-xl`.
- Full-width interactive rows (ActionRow, answer choices, ordered-response
  rows) are `rounded-xl` — they read as row-panels, not buttons.
- `rounded-2xl` is reserved for the single hero surface on Today.
- No ad-hoc `rounded-lg` anywhere; chips are `rounded-full`.

### Containers

Use `PageContainer` (`src/components/ui/page.tsx`): `narrow` (max-w-2xl:
session, questions, results, lessons, and every flow opener/empty screen),
`default` (max-w-3xl: most pages, including Today), `wide` (max-w-4xl:
reserved for genuinely multi-column pages). Shell chrome aligns to max-w-4xl.
No ad-hoc `mx-auto max-w-*` page wrappers; the only exceptions are focus-mode
runners (quiz/mock/session/flashcards) whose full-height flex layout and
sticky action bars need their own shell — those align to the narrow (2xl)
measure.

### Loading, error, not-found

- `src/app/(app)/loading.tsx` — route-level skeleton mirroring the shared
  page shape (kicker, title, one hero surface). Skeletons, not spinners, for
  server pages; client flows keep their own explicit loading states.
- `src/app/(app)/error.tsx` — calm, recoverable, coach-voiced; retry via
  `unstable_retry()` (Next 16.2 convention).
- `src/app/not-found.tsx` — brand 404, one way back.
- Null placeholder for missing numbers is an en dash `–`, never an em dash.

### Shared affordances

- Interactive bordered rows: `ActionRow` (`src/components/ui/action-row.tsx`).
- Meters: `ui/progress.tsx` with `size` sm/md/lg — never hand-rolled bars.
- Focus ring everywhere: `focus-visible:ring-[3px] focus-visible:ring-ring/40`.

### Clerk surfaces

Clerk components inherit the system through `clerkAppearance` in
`src/app/layout.tsx`: appearance variables reference the globals.css tokens
via `var()` (supported in Clerk v7), so sign-in, sign-up, billing, and the
account profile follow the light/dark swap automatically (next-themes sets
`color-scheme` on `<html>`, which Clerk reads). Card header copy is pinned via
the `localization` prop so it never shows the Clerk dashboard's instance name.

### Subject accents

`--section-reading` (blue) / `--section-math` (indigo) / `--section-science`
(green-teal, hue 168 — deliberately apart from the teal primary at 200) /
`--section-english` (amber), light+dark variants in globals.css.
Small indicators, chips, and bars only — never page backgrounds or buttons.

## Absolute bans (enforced)

No side-stripe accent borders. No gradient text. No default glassmorphism. No
hero-metric template. No identical card grids. No modal-first flows. No em dashes
in UI copy.

**"UI copy" is the boundary, and it matters.** These are rules about the app's
voice, not about what a lesson may teach. Academic content wins where the two
meet: the hyphen lesson has to print a real em dash, because a lesson that
teaches the difference between a hyphen and a dash cannot depict the dash as a
spaced hyphen. `scripts/validate-guided-lessons.mts` enforces the ban across all
85 lessons and carries that one allowlisted exception, so the rule stays
automatic and the exception stays deliberate.
