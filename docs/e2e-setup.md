# End-to-end tests

Playwright drives a real browser against `next dev` and a real Clerk
development instance. The suite is small on purpose: it covers the paths where
a bug costs a learner their work, and leaves everything else to Vitest.

```bash
npm run e2e          # headless, reuses a running dev server
npm run e2e:ui       # interactive
npm run e2e:report   # last HTML report
```

## What it covers, and why

| Spec | Guards |
| --- | --- |
| `auth-boundary.spec.ts` | API routes refuse a signed-out request with **JSON 401**, never a redirect. A redirected `fetch` returns the sign-in page with status 200, which the runners read as success — that bug silently dropped every submitted answer. |
| `quiz.spec.ts` | A practice set can be answered end to end and produces a score, across all question formats. Also asserts the answer choices expose radiogroup semantics and that Up/Down roves choices while Left/Right changes question. |
| `session-resume.spec.ts` | Leaving a session mid-way and returning resumes at the first unanswered question. This is the promise "Save & exit" makes. |

Adding a spec is worth it when the failure mode is invisible to unit tests:
it lives in the browser, the route layer, or the middleware seam.

## One-time setup

### 1. Clerk test user

The suite signs in as a dedicated user in the **development** instance. The
`+clerk_test` subaddress marks it as a Clerk test account, so no real email is
ever sent and the fixed verification code `424242` is accepted.

```bash
clerk users create \
  --email "teas-e2e+clerk_test@example.com" \
  --password '<a strong password>' \
  --first-name E2E --last-name Runner --yes
```

Then put the credentials in `.env` (gitignored):

```
E2E_CLERK_EMAIL=teas-e2e+clerk_test@example.com
E2E_CLERK_PASSWORD=<the same password>
```

`CLERK_SECRET_KEY` must also be present — global setup exchanges it for a
testing token, which suppresses the instance's bot protection for the run.

### 2. Instance settings the suite depends on

Two Clerk settings will break sign-in if they drift back:

- **`organization_settings.force_organization_selection` must be `false`.**
  When true, every sign-in is diverted to a "choose organization" task before
  reaching the app. The product has no organization features at all, so this
  is a dead end for real users as well as for tests.
- **Device trust is enabled**, which is why the suite signs in with an email
  code rather than a password. A password sign-in from a fresh browser stops
  at `needs_client_trust` and never completes. If you ever disable device
  trust, the password strategy becomes available, but email code keeps
  working either way.

Check both with `clerk config pull`.

## Notes

- The suite is **not** hermetic: it runs against the local dev database and
  leaves attempts behind. Specs are written to tolerate leftover state (the
  resume test measures relative to wherever the session currently sits) rather
  than requiring a pristine database.
- Auth happens once in `auth.setup.ts` and is reused via storage state, so the
  other specs never pay for a sign-in.
- The runners install a `beforeunload` guard. Playwright dismisses dialogs by
  default, which cancels the navigation, so specs that leave a runner accept
  the dialog explicitly.
