import { describe, expect, it } from "vitest";

import { signupSchema } from "./validators";

const base = { email: "test@example.com", password: "password123" };

describe("signupSchema onboarding fields", () => {
  it("still accepts a signup without onboarding fields", () => {
    const parsed = signupSchema.safeParse(base);
    expect(parsed.success).toBe(true);
  });

  it("accepts an exam date string and coerces target score", () => {
    const parsed = signupSchema.safeParse({
      ...base,
      testDate: "2026-09-01",
      targetScore: "75",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.testDate).toBe("2026-09-01");
      expect(parsed.data.targetScore).toBe(75);
    }
  });

  it("accepts an empty test date (field left blank)", () => {
    const parsed = signupSchema.safeParse({ ...base, testDate: "" });
    expect(parsed.success).toBe(true);
  });

  it("rejects an out-of-range target score", () => {
    const parsed = signupSchema.safeParse({ ...base, targetScore: 40 });
    expect(parsed.success).toBe(false);
  });
});
