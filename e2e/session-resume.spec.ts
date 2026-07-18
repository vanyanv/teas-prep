import { test, expect, type Page } from "@playwright/test";

import { answerCurrent, questionPosition } from "./helpers";

/**
 * Walks the session intro (and the optional lesson screen) through to the
 * question runner. Waits for whichever entry button the intro offers instead of
 * probing for one: the intro is server-rendered, so checking visibility before
 * it settles resolves to "not there" and then waits forever on the wrong one.
 */
async function enterSession(page: Page) {
  await page.goto("/session");

  const entry = page.getByRole("button", { name: /^(Start|Resume)$/ });
  await expect(entry).toBeVisible();
  await entry.click();

  // A session may open with a lesson before its questions.
  const toQuestions = page.getByRole("button", { name: /continue to questions/i });
  if (await toQuestions.isVisible().catch(() => false)) {
    await toQuestions.click();
  }
}

/**
 * The daily session checks each answer as it is given, so leaving mid-session
 * is meant to be safe: returning the same day resumes at the first unanswered
 * question rather than restarting or losing the work. That is the promise the
 * "Save & exit" affordance makes to the learner, so it gets a real walk.
 *
 * Deliberately relative to wherever the session currently sits: an earlier run
 * may have left one partly answered, and a test that demands a pristine session
 * would fail for a reason that has nothing to do with resuming.
 */
test("a session resumes where it was left", async ({ page }) => {
  page.on("dialog", (d) => d.accept());

  await enterSession(page);
  const { index, total } = await questionPosition(page);
  test.skip(index >= total, "session is on its last question; nothing to resume to");

  // Answer and check this question, so the server has recorded it.
  await answerCurrent(page);
  await page.getByRole("button", { name: /check answer/i }).click();
  await expect(
    page.getByRole("button", { name: /^(Continue|Finish session)$/ }),
  ).toBeVisible();

  // Leave the way the UI invites the learner to.
  await page.getByRole("link", { name: /save and exit/i }).click();
  await expect(page).toHaveURL(/\/today/);

  await enterSession(page);
  const after = await questionPosition(page);

  // Landing anywhere earlier would mean the checked answer was thrown away.
  expect(after.index, "should resume at the first unanswered question").toBe(
    index + 1,
  );
  expect(after.total).toBe(total);
});
