import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { test as setup, expect } from "@playwright/test";

const STORAGE = "e2e/.auth/user.json";

/**
 * Signs in once and saves the session for every other spec. Runs as its own
 * project so a sign-in regression fails here, loudly, instead of surfacing as a
 * confusing timeout inside an unrelated test.
 *
 * Email code rather than password: the instance has device trust enabled, so a
 * password sign-in from a fresh browser stops at `needs_client_trust`. Clerk
 * test accounts (the `+clerk_test` subaddress) accept the fixed code 424242 and
 * never send real mail, so this exercises the same path a real learner takes.
 */
setup("authenticate", async ({ page }) => {
  await setupClerkTestingToken({ page });

  await page.goto("/sign-in");
  await page.waitForFunction(() => Boolean(window.Clerk?.loaded), {
    timeout: 30_000,
  });

  const status = await page.evaluate(async (identifier) => {
    const clerk = window.Clerk!;
    if (!clerk.client) throw new Error("Clerk client did not initialise");
    let attempt = await clerk.client.signIn.create({ identifier });
    const factor = attempt.supportedFirstFactors?.find(
      (f) => f.strategy === "email_code",
    );
    if (!factor) throw new Error("email_code is not an enabled sign-in factor");

    attempt = await attempt.prepareFirstFactor({
      strategy: "email_code",
      emailAddressId: factor.emailAddressId,
    });
    attempt = await attempt.attemptFirstFactor({
      strategy: "email_code",
      code: "424242",
    });
    if (attempt.status === "complete") {
      await clerk.setActive({ session: attempt.createdSessionId });
    }
    return attempt.status;
  }, process.env.E2E_CLERK_EMAIL!);

  expect(status, "Clerk sign-in did not complete").toBe("complete");

  // The first authenticated request provisions the local User row, so wait for
  // a real signed-in page rather than trusting Clerk client state alone. A new
  // account legitimately lands on onboarding instead of Today.
  await page.goto("/today");
  await expect(page).toHaveURL(/\/(today|welcome)(\?|$)/);

  await page.context().storageState({ path: STORAGE });
});
