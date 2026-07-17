# Marketing Site + Clerk Auth + TEAS Pro Billing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public landing page, migrate auth from next-auth (credentials) to Clerk, and ship a $4.99/mo "TEAS Pro" subscription via Clerk Billing, without touching the learning engine.

**Architecture:** Extend the existing `(marketing)` route group; replace next-auth with Clerk behind the single `requireUser()` chokepoint by keeping the local `User` table keyed to a new `clerkId`; enforce plan access server-side via `auth().has({ plan: 'pro' })` wrapped in one `lib/access.ts` module; contextual inline paywalls (never modals) that deep-link back to the blocked action after checkout.

**Tech Stack:** Next.js 16.2.9 (App Router, Turbopack, `proxy.ts` convention), React 19, Tailwind v4, Prisma 7 + Postgres, `@clerk/nextjs` ^7.5 with Clerk Billing (Stripe under the hood).

## Global Constraints

- Do not rebuild or remove existing learning functionality; do not redesign the authenticated app.
- Calm Precision rules apply everywhere: no em dashes in UI copy, no `#000`/`#fff`, teal accent on interactive elements only, `rounded-md` controls / `rounded-xl` panels, Kicker component for kickers, no modal-first flows, no side-stripe borders, no gradients/glassmorphism, no fake stats or testimonials.
- One primary CTA phrase everywhere: **"Start Free Diagnostic"**.
- Price: **$4.99 per month**, label "Founding member price", cancel anytime. One free plan, one paid plan.
- No credit card before the diagnostic. Paywall appears only after diagnostic → results → first session.
- Next 16: middleware lives in `src/proxy.ts` (Node runtime, exported function named `proxy`); `params`/`searchParams` are Promises; `cookies()`/`headers()` async.
- Server-side enforcement for every paid feature; client checks are cosmetic only.
- Preserve study history regardless of subscription state. Never delete on cancel.
- Real product previews via `src/components/marketing/preview.tsx` `Frame` pattern with fixtures from `marketing/fixtures.ts`.

---

# Part A: Strategy deliverable

## 1. Landing-page information architecture

Order (single scrolling page at `/`, anchors for nav):

1. **Header** (sticky): wordmark · How It Works (`#how`) · Features (`#features`) · Pricing (`#pricing`) · Sign in · **Start Free Diagnostic**
2. **Hero**: kicker, H1, support copy, primary CTA + "See how it works" secondary, "No credit card required." — then `TodayPreview` (real `SessionHero` + `WeekStrip`)
3. **Trust strip**: mono fact row (836 questions · 4 subject areas · 12 topics · 85 skills · full mock exams). Real facts only.
4. **How it works** (`#how`): 4 numbered steps, each paired with a real interface preview
5. **Diagnostic results preview**: new `ResultsPreview` (4 section results, 3 priority skills, confidence insight, "Build my study plan" button rendered inert)
6. **Daily session preview**: folded into step 3 of How It Works (the hero already shows `TodayPreview`; do not show the same surface three times)
7. **Guided learning preview** (`#features` starts here): new `LessonPreview` from the real rational-numbers lesson (concept block, worked example steps, mistake block, quick check)
8. **Question + rationale preview**: existing `QuestionPreview` + `RationalePreview`
9. **Why this product**: exactly 3 differentiators (know what to study / manageable sessions / review before you forget), prose + small real UI details, not a feature grid
10. **Pricing** (`#pricing`): single TEAS Pro card + free-plan sentence
11. **FAQ**: 9 questions, plain answers
12. **Final CTA**: "Stop guessing what to study next."
13. **Footer**: Product, Pricing, Sign in, Contact, Privacy, Terms, ATI disclaimer, educational disclaimer, copyright

`/pricing` is a standalone page: pricing card + free/paid comparison list + FAQ subset + final CTA.

## 2. Text wireframes

### Desktop (max-w-4xl column, same shell rhythm as the app)

```
┌──────────────────────────────────────────────────────────────┐
│ TEAS 7 Prep     How It Works  Features  Pricing   Sign in [Start Free Diagnostic] │
├──────────────────────────────────────────────────────────────┤
│ KICKER: TAKE ONE DIAGNOSTIC. KNOW WHAT TO STUDY.             │
│ H1 (max-w-2xl): Your TEAS study plan, built around what      │
│    you actually need to learn.                               │
│ Support paragraph (max-w-prose)                              │
│ [Start Free Diagnostic →]   [See how it works]               │
│ No credit card required.                                     │
│ mono: 836 questions · 4 sections · 12 topics · 85 skills     │
│ ┌────────────── TodayPreview (Frame) ─────────────────────┐  │
│ │ SessionHero: kicker, title, why-line, contents, CTA     │  │
│ │ WeekStrip: 7 day dots                                   │  │
│ └──────────────────────────────────────────────────────────┘ │
├─ border-t ───────────────────────────────────────────────────┤
│ HOW IT WORKS: 4 steps, numbered squares, step 2 shows       │
│ ResultsPreview frame, step 3 references hero preview        │
├─ border-t ───────────────────────────────────────────────────┤
│ THE LESSONS: LessonPreview frame (rational numbers)         │
├─ border-t ───────────────────────────────────────────────────┤
│ THE QUESTIONS: 2-col grid: QuestionPreview | RationalePreview│
├─ border-t ───────────────────────────────────────────────────┤
│ WHY THIS WORKS: 3 stacked differentiators (title + prose)   │
├─ border-t ───────────────────────────────────────────────────┤
│ PRICING: single Card (max-w-md): TEAS Pro · $4.99/month     │
│ badge: Founding member price · 7 included items ·           │
│ [Start Free Diagnostic] · support sentence                  │
├─ border-t ───────────────────────────────────────────────────┤
│ FAQ: 9 stacked question/answer pairs (no accordion)         │
├─ border-t ───────────────────────────────────────────────────┤
│ FINAL: H2 + sentence + [Start Free Diagnostic →]            │
├──────────────────────────────────────────────────────────────┤
│ FOOTER: link row · disclaimers · ©                          │
└──────────────────────────────────────────────────────────────┘
```

### Mobile (stacked, same order)

```
┌──────────────────────────┐
│ TEAS 7 Prep    Sign in [Start Free] │  (compact CTA label ok in nav only)
├──────────────────────────┤
│ Kicker / H1 / support    │
│ [Start Free Diagnostic]  │  full-width
│ [See how it works]       │
│ No credit card required. │
│ mono fact row (wraps)    │
│ TodayPreview (full width)│
│ …sections stack 1-col…   │
│ Question/Rationale stack │
│ Pricing card full width  │
│ FAQ stack                │
│ Footer stacks vertically │
└──────────────────────────┘
```

No hamburger menu needed: the public nav collapses to wordmark + Sign in + Start Free, and section links live in the footer. (Fewer moving parts than a compact menu, nothing hidden that matters.)

## 3. Landing-page copy (final proposal)

- **Hero kicker:** `Take one diagnostic. Know what to study.`
- **H1:** `Your TEAS study plan, built around what you actually need to learn.`
- **Hero support:** `Take a one-hour diagnostic across Reading, Math, Science, and English. It finds the skills costing you points and turns them into a short session you can finish today.`
- **Primary CTA:** `Start Free Diagnostic` · **Secondary:** `See how it works` · **Support:** `No credit card required.`
- **Fact row:** `836 questions · 4 sections · 12 topics · 85 skills`
- **How it works heading:** `One hour of questions decides the next several weeks.`
  1. `Take the diagnostic` / existing step copy (confidence marking, lucky guesses)
  2. `See your priority skills` / results become ranked priorities weighted by exam share and shakiness
  3. `Study today's session` / one thing to do each day: lesson, practice, due review
  4. `Watch the gaps close` / spaced review + mock exams; mastery moves only when correct and confident
- **Results section heading:** `A score tells you where you stand. This tells you what to do.`
  Insight line in preview: `You are strongest in Reading. Your largest gains are waiting in Ratios & Proportions and Chemical Reactions.` (final wording drawn from real fixture skills)
- **Lessons heading:** `Lessons built for the night before a shift, not a semester.`
- **Questions heading:** `The part you spend the most time in gets the most care.` (existing copy kept)
- **Why heading:** `Why this works` with three blocks:
  - `Know what to study` / `The diagnostic and confidence-weighted mastery point at the skills worth your next hour, ranked by how much of the exam they carry.`
  - `Study in sessions you can finish` / `Each day combines a short lesson, targeted questions, and the review that came due. About 20 minutes, one Start button.`
  - `Review before you forget` / `Missed and shaky questions come back on a spaced schedule, further apart as they stick.`
- **Pricing heading:** `Simple TEAS preparation.` Card: `TEAS Pro`, `$4.99/month`, badge `Founding member price`, items: all 836 questions; complete adaptive study plan; all lessons and quick checks; spaced review; timed section tests; full TEAS simulations; progress and mastery insights. CTA `Start Free Diagnostic`. Support: `No credit card required to begin. Upgrade after seeing your results. Cancel anytime.`
- **FAQ:** 9 Q&A (free diagnostic contents; no card needed; Pro contents; cancel anytime, access through period end; not affiliated with ATI; no score guarantee; works on phones; how personalization works; progress kept after cancel).
- **Final:** H2 `Stop guessing what to study next.` support `Take the diagnostic and start with the skills that can make the greatest difference.` CTA `Start Free Diagnostic`.
- **Footer disclaimer:** `TEAS 7 Prep is an independent study resource. It is not affiliated with or endorsed by ATI. ATI and TEAS are registered trademarks of Assessment Technologies Institute. No score or admission outcome is guaranteed.`

## 4. Free vs. paid boundaries

| Capability | Free | TEAS Pro |
|---|---|---|
| Account, onboarding | ✓ | ✓ |
| Full diagnostic + full results | ✓ (once) | ✓ |
| Priority skills | top 3 | all |
| Personalized daily session | 1 total | unlimited |
| Study plan | week 1 preview + top-3 skills, rest shown locked | complete |
| Guided lessons | 4 sample lessons (one per section) + any lesson inside the free session | all 85 |
| Practice questions | 25 answered questions cap | all 836 |
| Missed-question review / spaced repetition | queue visible, locked | ✓ |
| Flashcards | locked | ✓ |
| Timed section tests | locked | ✓ |
| Full mock exams | locked | ✓ |
| Progress page | section scores from diagnostic | full mastery, trends, readiness |

Free is real: a student finishes the diagnostic, sees everything about where they stand, studies one genuinely personalized session, and reads real lessons. The paywall gates volume and continuation, not understanding.

## 5. Authentication flow

- Visitor → `Start Free Diagnostic` → `/sign-up` (Clerk `<SignUp/>`, email+password, Google if enabled in dashboard) → forced redirect `/welcome` (onboarding) → `/diagnostic`.
- `/sign-in` (Clerk `<SignIn/>`) → back to originally requested page (Clerk `redirect_url` handling), else `/today`.
- Old `/signin`, `/signup` become permanent redirects.
- `src/proxy.ts`: `clerkMiddleware` + `createRouteMatcher` protecting everything except `/`, `/pricing`, `/privacy`, `/terms`, `/contact`, `/sign-in(.*)`, `/sign-up(.*)`, and static assets.
- `requireUser()` in `src/lib/session.ts` reimplemented on Clerk: `auth()` → if no userId redirect `/sign-in`; find local `User` by `clerkId`; else link by verified email; else create. Returns the local user row (same shape callers already use), so 14 pages keep working unchanged.
- 15 API routes swap `const session = await auth()` (next-auth) for a new `requireUserApi()` helper returning the local user or a 401.
- Legacy accounts: rows keep their data; on first Clerk sign-in with the same email the row is linked (`clerkId` set). `passwordHash` becomes unused and is dropped from the schema at the end of Phase 2. Existing users create a new password (or use Google) through Clerk once.
- next-auth, `bcryptjs`, `/api/auth/*` removed at the end of Phase 2.

## 6. Subscription flow

- Clerk Billing (B2C) with Stripe. One paid plan in Clerk Dashboard: name `TEAS Pro`, slug `pro`, $4.99/month. Free = absence of the plan (Clerk's implicit default free plan).
- Upgrade entry points → `/upgrade?after=<path>` (in-app, authed) rendering the plan card + Clerk checkout (`<PricingTable/>` with `newSubscriptionRedirectUrl` back to `after`, verified against an allowlist of internal paths).
- After successful checkout the student lands back on the exact blocked action with Pro active (Clerk session claims update; `has({plan:'pro'})` flips server-side) plus a quiet confirmation banner (`?upgraded=1`).
- Manage/cancel/payment method: `/billing` page rendering Clerk's user profile billing surface. Cancellation keeps access until period end (Clerk behavior), then `has()` returns false and the account is simply a free account again; nothing is deleted.
- Failed payment/past due: Clerk handles dunning; when the plan claim drops, the app degrades to free gracefully with an inline "your subscription ended" note on Today (no lockout of history).

## 7. Paywall locations (all inline, all explain + price + upgrade + way back)

1. **Plan page**: skills beyond top 3 render as locked rows + `UpgradePanel` ("Unlock the rest of your personalized plan").
2. **Today / session start** after the free session is used ("Continue your daily sessions").
3. **Practice start / mid-practice** at the 25-question cap ("Continue with all 836 questions").
4. **Mock exam and timed section start pages** ("Unlock full mock exams").
5. **Review queue / flashcards** ("Keep reviewing your weak skills before they fade").
6. **Lesson pages** outside the free sample ("Unlock all 85 lessons").
7. **Progress** trends section ("See your readiness trend").

Never on: diagnostic, diagnostic results, onboarding, settings, billing.

## 8. Route-protection strategy

- Layer 1: `src/proxy.ts` `clerkMiddleware` — unauthenticated users never reach `(app)` pages or non-public APIs.
- Layer 2: `requireUser()` / `requireUserApi()` in every page/route (already the codebase pattern; survives proxy matcher mistakes and covers server actions, per Next 16 docs warning).
- Layer 3 (plan gating): `lib/access.ts` — `getAccess(userId)` returns `{ isPro, limits }` from `auth().has({ plan: 'pro' })`; API routes that start paid work call it before creating attempts; page components use it to decide locked rendering. Client components never decide access; they only render what the server gave them.
- Existing app routes keep their names (`/today`, `/learn`, …). The brief's `/app/*` prefix is documented as rejected: ~30 call sites, zero user value, route groups already isolate the shells, and renames risk breaking nothing-but-URLs. New authed routes added: `/welcome`, `/upgrade`, `/billing`.

## 9. Required Clerk configuration (dashboard)

1. Create application (dev instance first). Enable Email+password; enable Google (optional, recommended).
2. Billing → enable Clerk Billing (test mode/Stripe test keys to start), create plan `TEAS Pro`, slug `pro`, $4.99 monthly, description and features listed.
3. Paths: sign-in `/sign-in`, sign-up `/sign-up` (component routing mode).
4. Sessions: default. No custom JWT template needed (`has()` reads plan claims natively).
5. Production instance later: production keys, custom domain, Stripe live keys.

## 10. Environment variables

Add to `.env` / `.env.example` (documented, never in client code except `NEXT_PUBLIC_*`):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/welcome
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/today
```

Remove after Phase 2: `AUTH_SECRET`, `NEXTAUTH_URL`. Keep: `DATABASE_URL`.

## 11. Database changes (Prisma)

```prisma
model User {
  id            String   @id @default(cuid())
  clerkId       String?  @unique          // link to Clerk; nullable during migration
  email         String   @unique
  name          String?
  // passwordHash removed at end of Phase 2
  testDate      DateTime?
  targetScore   Int      @default(70)
  studyDaysPerWeek Int?                    // onboarding: days per week
  sessionMinutes   Int?                    // onboarding: minutes per session
  onboardedAt   DateTime?
  ...existing relations unchanged
}

model AnalyticsEvent {
  id        String   @id @default(cuid())
  userId    String?
  anonId    String?                        // cookie for pre-signup funnel
  name      String
  props     Json?
  createdAt DateTime @default(now())
  @@index([name, createdAt])
}
```

No changes to any learning model. No billing tables: Clerk owns subscription state; we read it live via `has()`. (Store nothing but the Clerk user id.)

## 12. Analytics event plan

`src/lib/analytics.ts` (server `track()`) + `POST /api/events` (client beacon) writing `AnalyticsEvent` rows. Anonymous id cookie (`aid`) set in proxy for pre-signup events, joined to `userId` after signup.

Events: `landing_viewed`, `cta_clicked {location}`, `signup_started`, `signup_completed`, `onboarding_completed {skipped}`, `diagnostic_started`, `diagnostic_completed`, `results_viewed`, `session_started {nth}`, `session_completed {nth}` (**activation = first**), `paywall_viewed {context}`, `checkout_started {context}`, `checkout_completed`, `checkout_abandoned` (derived: started w/o completed in 24h), `subscription_canceled`, `subscription_reactivated`.

Funnel: landing → account → diagnostic done → first session done → paid.

## 13. Phased sequence

Phase 1 landing/public pages → Phase 2 Clerk auth migration → Phase 3 billing + server gating → Phase 4 conversion flow + paywalls + analytics. Each phase ends green (`typecheck`, `test`, `build`) and committed.

---

# Part B: Implementation tasks

### Task 1: Public nav, pricing/FAQ/final sections, unified CTA (Phase 1)

**Files:**
- Modify: `src/app/(marketing)/layout.tsx` (nav links, footer columns, disclaimers)
- Modify: `src/app/(marketing)/page.tsx` (CTA phrase, anchors, new sections, 4-step rework)
- Modify: `src/components/marketing/preview.tsx` + `fixtures.ts` (add `ResultsPreview`, `LessonPreview`)
- Create: `src/app/(marketing)/pricing/page.tsx`, `privacy/page.tsx`, `terms/page.tsx`, `contact/page.tsx`
- Create: `src/components/marketing/pricing-card.tsx`, `src/components/marketing/faq.tsx`, `src/lib/marketing.ts` (shared plan-feature list + FAQ data)

**Steps:** build sections per Part A copy; every CTA links `/signup` for now (Phase 2 flips to `/sign-up`); verify with `npm run typecheck && npm run build`; visual pass at mobile/desktop widths via dev server; commit.

### Task 2: Clerk install + proxy + providers (Phase 2)

**Files:**
- Create: `src/proxy.ts` (clerkMiddleware + public route matcher + `aid` cookie)
- Modify: `src/app/layout.tsx` (wrap in `<ClerkProvider>` with Calm Precision `appearance.variables`: colorPrimary/foreground/background/border/input/ring/muted from globals.css OKLCH values, fontFamily Inter)
- Modify: `.env`, `.env.example`, `package.json`

**Steps:** `npm i @clerk/nextjs`; write proxy with named `proxy` export per Next 16; keys required from user if not present (pause point); typecheck; commit.

### Task 3: Sign-in/up pages, requireUser on Clerk, API swap, onboarding (Phase 2)

**Files:**
- Create: `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`, `sign-up/[[...sign-up]]/page.tsx` (Clerk components inside existing `(auth)` shell)
- Modify: `src/lib/session.ts` (`requireUser` via Clerk `auth()` + JIT local-user provisioning + email linking; add `requireUserApi`)
- Modify: 15 API routes to `requireUserApi()`
- Create: `src/app/(app)/welcome/page.tsx` + settings-style form (testDate, days/week, minutes/session; skippable) + `POST /api/onboarding`
- Modify: `src/app/(marketing)/page.tsx` (Clerk auth check), `profile-menu`/`sign-out-button` (Clerk signOut)
- Delete: `src/auth.ts`, `/api/auth/[...nextauth]`, `/api/auth/signup`, `(auth)/signin`, `(auth)/signup`; redirects in `next.config.ts` for `/signin` → `/sign-in`, `/signup` → `/sign-up`
- Prisma: add `clerkId`, onboarding fields; drop `passwordHash`; `npm run db:push` + remove bcryptjs

**Steps:** migrate in the order above, keeping the app bootable at each commit; end-to-end manual test: sign up → welcome → diagnostic reachable; sign out → sign in → lands on requested page.

### Task 4: Access module + server gating + billing pages (Phase 3)

**Files:**
- Create: `src/lib/access.ts` (`FREE_LIMITS`, `getAccess()`, `requirePro()`; free lesson slugs list)
- Modify: `api/session/start` (free: 1 session), `api/practice/start` + answer flow (25-question cap), `api/mock/start`, `api/nursehub/start`, `api/flashcards/*` (Pro only), plan API (top-3 for free)
- Create: `src/app/(app)/upgrade/page.tsx` (`<PricingTable/>`, `after` param allowlist), `src/app/(app)/billing/page.tsx` (Clerk billing management)
- Create: `src/components/upgrade-panel.tsx` (inline contextual paywall per Part A §7)
- Modify: `profile-menu` placeholder → real Billing link

**Steps:** dashboard plan `pro` must exist (test mode); wire gates one route at a time with a unit test per limit in `src/lib/access.test.ts`; verify free/pro states by toggling a test subscription; commit per gate group.

### Task 5: Conversion flow + paywalls + analytics (Phase 4)

**Files:**
- Create: `prisma` `AnalyticsEvent` model, `src/lib/analytics.ts`, `src/app/api/events/route.ts`, `src/components/analytics.tsx` (client beacon helpers)
- Modify: results page (results_viewed + "Build my study plan" CTA), session completion (activation event + first upsell moment), paywall surfaces (paywall_viewed), upgrade page (checkout_started/completed)
- Modify: locked-state rendering on plan/progress/learn/mock pages with `UpgradePanel`

**Steps:** instrument events; verify rows land in `AnalyticsEvent`; walk the full funnel manually (new user → diagnostic → session → paywall → test checkout → return-to-action); `typecheck`/`test`/`build`; commit.

---

## Self-review notes

- Spec coverage: all 13 deliverable items in Part A; brief sections 1–12 of landing IA mapped (section 6 folded into hero/step-3 deliberately, documented).
- Route migration to `/app/*` rejected and documented (§8) per "preserve existing route names" instruction.
- CTA phrase unified; em-dash ban respected in all proposed copy.
- Types: `requireUser()` keeps its return shape so 14 pages don't churn; `requireUserApi()` new for routes.
