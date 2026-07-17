import { describe, expect, it } from "vitest";

import { onboardingSchema } from "./validators";

describe("onboardingSchema", () => {
  it("accepts an entirely skipped form", () => {
    const parsed = onboardingSchema.safeParse({});
    expect(parsed.success).toBe(true);
  });

  it("accepts an exam date and coerces the numeric fields", () => {
    const parsed = onboardingSchema.safeParse({
      testDate: "2026-09-01",
      studyDaysPerWeek: "5",
      sessionMinutes: "20",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.testDate).toBe("2026-09-01");
      expect(parsed.data.studyDaysPerWeek).toBe(5);
      expect(parsed.data.sessionMinutes).toBe(20);
    }
  });

  it("accepts an empty test date (not scheduled yet)", () => {
    const parsed = onboardingSchema.safeParse({ testDate: "" });
    expect(parsed.success).toBe(true);
  });

  it("rejects out-of-range days per week", () => {
    expect(onboardingSchema.safeParse({ studyDaysPerWeek: 0 }).success).toBe(false);
    expect(onboardingSchema.safeParse({ studyDaysPerWeek: 8 }).success).toBe(false);
  });

  it("rejects out-of-range session minutes", () => {
    expect(onboardingSchema.safeParse({ sessionMinutes: 5 }).success).toBe(false);
    expect(onboardingSchema.safeParse({ sessionMinutes: 240 }).success).toBe(false);
  });
});
