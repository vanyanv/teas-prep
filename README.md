# TEAS 7 Prep

A private, single-user study app for the ATI TEAS 7 nursing entrance exam:
diagnostic → personalized weekly plan → practice, full timed mock exam, A&P
spaced-repetition flashcards, and a progress dashboard. Plus a **NurseHub
diagnostic** that maps every question to a specific skill (score sheet).

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind v4,
Prisma 7 + Postgres (Neon), and NextAuth (email + password).

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Fill in `.env` (already created with `AUTH_SECRET` generated):
   ```
   DATABASE_URL="postgresql://...neon.tech/neondb?sslmode=require"
   AUTH_SECRET="(generated for you)"
   NEXTAUTH_URL="http://localhost:3000"
   ```
   The app isolates its tables in a dedicated `teas_prep` Postgres schema, so it
   can safely share a database without touching anything in `public`.
3. Create the schema and seed the built-in question bank:
   ```bash
   npx prisma migrate dev
   npm run db:seed
   ```
4. Run it:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000, go to `/signup`, and create your account. Signup
   then locks itself (single-user app).

## Importing the NurseHub questions

After you've created your account, import the NurseHub practice questions
(Math, Science, English — tagged with each question's skill):

```bash
npm run import:nursehub -- --email=you@example.com
```

This reads the NurseHub "Free TEAS 7 Practice Test" PDF (path configurable via
`NURSEHUB_PDF`), parses questions + answer keys + per-question skills + a couple
of rendered figures, and loads them as your private bank. Then take the
**NurseHub diagnostic** for a per-skill score sheet.

> Reading is intentionally excluded from the auto-import: its passage-based
> layout (mixed frames, numbered-list passages, map/graph-dependent questions)
> does not parse reliably. Math, Science, and English import cleanly.

## Importing your own questions

Use **/import** in the app (JSON or CSV upload, or paste JSON) — download the
template there for the exact format. Imported questions join your private
practice and diagnostic pool.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest unit tests (scoring, blueprint, plan, SM-2) |
| `npm run db:migrate` / `db:seed` | Prisma migrate / seed built-in content |
| `npm run import:nursehub -- --email=…` | Import NurseHub PDF questions |

## Deploy (Vercel + Neon)

1. Push to GitHub, import the repo in Vercel.
2. Set env vars in Vercel: `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`
   (your production URL).
3. Run `npx prisma migrate deploy` against the production database, then seed.
4. Deploy. (The runtime uses Neon's direct connection for schema-qualified
   queries; the pooled URL is fine for `DATABASE_URL`.)

## Architecture notes

- `src/lib/teas-blueprint.ts` — the verified TEAS 7 blueprint (counts, timing,
  section order, break) drives the diagnostic, mock, and plan weighting.
- `src/lib/quiz/` — question selection, scoring (all-or-nothing multi-select,
  fill-in, ordered), and attempt lifecycle.
- `src/lib/plan/` — deterministic weekly plan generator (weakest, highest-weight
  topics first; mock in the final weeks; weekly review).
- `src/lib/flashcards/sm2.ts` — SM-2 spaced repetition.
- Design system: `PRODUCT.md` + `DESIGN.md` (light + dark, calm indigo accent).
