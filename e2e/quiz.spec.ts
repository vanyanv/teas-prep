import { test, expect } from "@playwright/test";

import { answerCurrent, questionCount } from "./helpers";

test.describe("practice set", () => {
  // The runners install a beforeunload guard, which Playwright dismisses by
  // default (cancelling the navigation). Accept it so leaving works.
  test.beforeEach(async ({ page }) => {
    page.on("dialog", (d) => d.accept());
  });

  test("answers every question and reaches a scored result", async ({ page }) => {
    await page.goto("/practice?count=3&start=1");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText(/question 1 of \d+/i);

    // Walk the set to its end rather than assuming a length; the runner sizes
    // the set from the plan.
    const total = await questionCount(page);
    expect(total).toBeGreaterThan(0);

    for (let i = 0; i < total; i++) {
      await answerCurrent(page);
      // Anchored names on purpose: the header's "Exit without finishing"
      // button also matches a loose /finish/ pattern, and clicking it silently
      // abandons the set instead of scoring it.
      const label = i === total - 1 ? /^Finish & review$/ : /^Next$/;
      await page.getByRole("button", { name: label }).click();
    }

    await expect(page).toHaveURL(/\/results\//, { timeout: 30_000 });
    // A score, not just a page: the whole point is that answers survived.
    await expect(page.getByText(/%/).first()).toBeVisible();
  });

  test("choices expose radiogroup semantics and rove on Up/Down", async ({
    page,
  }) => {
    await page.goto("/practice?count=3&start=1");
    await expect(page.getByRole("radiogroup")).toBeVisible();

    const choices = page.getByRole("radio");
    await choices.first().focus();
    await page.keyboard.press("ArrowDown");

    // Down moves within the choices...
    await expect(choices.nth(1)).toBeChecked();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /question 1 of/i,
    );

    // ...while Left/Right stay bound to question navigation.
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /question 2 of/i,
    );
  });
});
