import { clerkSetup } from "@clerk/testing/playwright";
import dotenv from "dotenv";

dotenv.config();

/**
 * Exchanges CLERK_SECRET_KEY for a testing token, which suppresses bot
 * protection for the run. Without it the sign-in in auth.setup.ts is
 * challenged by the smart CAPTCHA the instance has enabled.
 */
export default async function globalSetup() {
  const missing = [
    "CLERK_SECRET_KEY",
    "E2E_CLERK_EMAIL",
    "E2E_CLERK_PASSWORD",
  ].filter((k) => !process.env[k]);

  if (missing.length) {
    throw new Error(
      `e2e needs ${missing.join(", ")} in the environment. The Clerk test user ` +
        `is documented in docs/e2e-setup.md.`,
    );
  }

  await clerkSetup();
}
