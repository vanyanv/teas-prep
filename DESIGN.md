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
  (use the `Kicker` component; 0.18em is the single tracking value).
- Page title: `text-2xl sm:text-3xl font-semibold tracking-tight`.
- Section heading: `text-base font-semibold`.
- Card title: `text-sm font-medium`.
- Question stem: `text-lg sm:text-xl font-medium leading-relaxed`.
- Choice / rationale body: `text-[15px] leading-relaxed`.
- Metadata: `text-xs text-muted-foreground`; numbers mono + `tabular-nums`.

### Radius grammar

- Controls: `rounded-md`. Cards/panels: `rounded-xl`.
- `rounded-2xl` is reserved for the single hero surface on Today.
- No ad-hoc `rounded-lg` cards.

### Containers

Use `PageContainer` (`src/components/ui/page.tsx`): `narrow` (max-w-2xl:
session, questions, results, lessons), `default` (max-w-3xl: most pages,
including Today), `wide` (max-w-4xl: reserved for genuinely multi-column
pages). Shell chrome aligns to max-w-4xl.

### Shared affordances

- Interactive bordered rows: `ActionRow` (`src/components/ui/action-row.tsx`).
- Meters: `ui/progress.tsx` with `size` sm/md/lg — never hand-rolled bars.
- Focus ring everywhere: `focus-visible:ring-[3px] focus-visible:ring-ring/40`.

### Subject accents

`--section-reading` (blue) / `--section-math` (indigo) / `--section-science`
(green-teal, hue 168 — deliberately apart from the teal primary at 200) /
`--section-english` (amber), light+dark variants in globals.css.
Small indicators, chips, and bars only — never page backgrounds or buttons.

## Absolute bans (enforced)

No side-stripe accent borders. No gradient text. No default glassmorphism. No
hero-metric template. No identical card grids. No modal-first flows. No em dashes
in UI copy.
