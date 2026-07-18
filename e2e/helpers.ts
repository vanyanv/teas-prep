import { expect, type Page } from "@playwright/test";

/**
 * Answers whatever the current question happens to be. The bank is
 * multi-format on purpose (single, select-all, ordered, fill-in, hot spot), so
 * a walk of a real set has to handle each one; correctness doesn't matter here,
 * only that an answer registers and survives to the result.
 */
export async function answerCurrent(page: Page) {
  const radio = page.getByRole("radio").first();
  const checkbox = page.getByRole("checkbox").first();
  const textbox = page.getByRole("textbox").first();

  if (await radio.isVisible().catch(() => false)) {
    await radio.click();
    return;
  }
  if (await checkbox.isVisible().catch(() => false)) {
    await checkbox.click();
    return;
  }
  if (await textbox.isVisible().catch(() => false)) {
    await textbox.fill("42");
    return;
  }
  // ORDERED presents its arrangement as the answer and persists it on mount,
  // so an untouched item is already answered.
  await expect(page.getByRole("list").first()).toBeVisible();
}

/**
 * Reads "…question 3 of 14" off the runner's heading. That heading is the
 * sr-only h1 the runners render, so these tests double as a check that it
 * stays present and accurate.
 */
export async function questionPosition(
  page: Page,
): Promise<{ index: number; total: number }> {
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toContainText(/question \d+ of \d+/i);
  const text = await heading.textContent();
  const match = text!.match(/question (\d+) of (\d+)/i)!;
  return { index: Number(match[1]), total: Number(match[2]) };
}

/** Total questions in the current runner. */
export async function questionCount(page: Page): Promise<number> {
  return (await questionPosition(page)).total;
}
