import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

/**
 * End-to-end coverage for the paths where a bug costs a learner their work:
 * answering and submitting a set, resuming a session, and the auth boundary
 * that once swallowed submitted answers. Unit tests can't reach these, because
 * the failures live in the browser/route/middleware seam.
 *
 * Auth runs against the Clerk development instance using a dedicated
 * +clerk_test user; global setup exchanges the secret key for a testing token
 * so bot protection doesn't challenge the run.
 */
export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  // Storage state is written once by the auth project and reused, so the
  // remaining specs never pay for a sign-in.
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
  webServer: {
    // `next dev` rather than a production build: the suite guards behaviour,
    // not bundle output, and reusing a running dev server keeps local runs fast.
    command: "npm run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
