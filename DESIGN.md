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

## Color strategy

**Restrained.** Tinted neutrals carry the surface; a single calm accent does the
work. Neutrals are tinted toward indigo (never `#000`/`#fff`). The accent is a
muted, trustworthy indigo-blue — not the category-reflex "healthcare teal" or
"medical green." Semantic tones (success / warning / destructive) appear only on
results and validation, never decoratively.

Roles (see globals.css for exact OKLCH):
- `background` / `foreground` — paper-calm, high legibility.
- `primary` — indigo-blue accent: primary actions, focus, the "next action."
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

## Absolute bans (enforced)

No side-stripe accent borders. No gradient text. No default glassmorphism. No
hero-metric template. No identical card grids. No modal-first flows. No em dashes
in UI copy.
