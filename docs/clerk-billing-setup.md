# Clerk + Billing launch checklist

The code is fully wired; these are the dashboard-side steps that cannot be
done from the repo.

## 1. Claim or create the Clerk application

- Local dev currently runs in **keyless mode**: with empty Clerk keys in
  `.env`, the app creates a temporary instance and prints a claim link in the
  dev terminal (also stored in `.clerk/.tmp/keyless.json`). Claim it, or
  create a fresh application at dashboard.clerk.com.
- Enable **Email + password**; enable **Google** if wanted (recommended).
- Copy the API keys into `.env` / Vercel env:
  `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`.
  Keep the four `NEXT_PUBLIC_CLERK_*_URL` values from `.env.example`.

## 2. Enable Billing and create the plan

- Dashboard → **Billing → Settings** → enable billing. Start in test mode
  (Clerk's Stripe test gateway); switch to live Stripe keys at launch.
- Dashboard → **Billing → Plans** (Plans for Users) → **Add Plan**:
  - Name: `TEAS Pro` · Slug: **`pro`** (the code checks `has({ plan: "pro" })`)
  - Price: **$4.99 / month**, no annual tier, no trial.
  - Description: "All 836 questions, the complete adaptive study plan, all 85
    lessons, spaced review, timed section tests, and full mock exams."
- The `/upgrade` page renders Clerk's `<PricingTable/>`; it shows this plan
  automatically once billing is enabled (until then it degrades to a calm
  "checkout is not available" notice).

## 3. Webhooks (analytics only; access control works without this)

- Dashboard → **Webhooks** → add endpoint
  `https://<domain>/api/webhooks/clerk`, subscribe to `subscriptionItem.*`.
- Put the signing secret in `CLERK_WEBHOOK_SIGNING_SECRET`.

## 4. Production instance

- Create the production instance, set the production domain, add live keys to
  Vercel (`vercel env`), and re-create the plan (slug `pro`) there.

## 5. Verify before announcing

1. Signed-out `/` shows the landing page; `/today` redirects to `/sign-in`.
2. Sign up → `/welcome` → diagnostic; local `User` row gets `clerkId`.
3. Free account: mock, flashcards, review show the upgrade panel;
   practice stops at 25 served questions; plan shows week 1 only.
4. Test-card checkout on `/upgrade` returns to the blocked page with the
   "TEAS Pro is active" notice, and every gate above opens.
5. Cancel in `/billing`: access persists until period end; history intact.
6. `AnalyticsEvent` rows appear for the funnel:
   `landing_viewed → cta_clicked → signup_started → signup_completed →
   diagnostic_started → diagnostic_completed → results_viewed →
   session_started → session_completed (nth=1 is activation) →
   paywall_viewed → checkout_started → checkout_completed`.
   `checkout_abandoned` is derived (started without completed in 24h);
   `subscription_reactivated` reads as an `active` event after a `canceled`
   one for the same user.

## Legacy accounts

Pre-Clerk users keep their data: on first Clerk sign-in with the same email,
the existing `User` row is linked (`clerkId` set) and all progress relations
stay attached. Old `/signin`/`/signup` URLs redirect permanently. The
`passwordHash` column is retired and can be dropped in a later migration.
