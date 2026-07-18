import { test, expect } from "@playwright/test";

/**
 * Regression guard for a silent data-loss bug: API routes used to redirect an
 * unauthenticated request to the sign-in page. `fetch` follows redirects, so a
 * runner submitting answers on an expired session saw HTTP 200 with an HTML
 * body, treated it as success, and navigated to results having dropped every
 * answer. API routes must refuse with JSON 401 instead.
 */
test.describe("API auth boundary", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  const API_POSTS = [
    "/api/practice/start",
    "/api/session/start",
    "/api/attempts/00000000-0000-0000-0000-000000000000/finish",
  ];

  for (const path of API_POSTS) {
    test(`POST ${path} refuses signed-out with 401 JSON`, async ({ request }) => {
      const res = await request.post(path, {
        data: {},
        maxRedirects: 0,
        failOnStatusCode: false,
      });

      expect(res.status(), "must not redirect or succeed").toBe(401);
      expect(
        res.headers()["content-type"] ?? "",
        "an HTML body here is the bug: fetch would treat it as success",
      ).toContain("application/json");
    });
  }

  test("a protected page still redirects a human to sign-in", async ({ page }) => {
    await page.goto("/today");
    await expect(page).toHaveURL(/\/sign-in/);
  });
});
