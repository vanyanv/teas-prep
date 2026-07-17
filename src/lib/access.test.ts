import { afterEach, describe, expect, it, vi } from "vitest";

import {
  FREE_LIMITS,
  billingEnabled,
  isFreeLesson,
  isPro,
  proRequiredError,
} from "./access";
import { getGuidedLessonBySlug } from "@/content/guided-lessons";

describe("billing switch", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is off unless BILLING_ENABLED is exactly \"true\"", () => {
    vi.stubEnv("BILLING_ENABLED", "");
    expect(billingEnabled()).toBe(false);
    vi.stubEnv("BILLING_ENABLED", "1");
    expect(billingEnabled()).toBe(false);
    vi.stubEnv("BILLING_ENABLED", "true");
    expect(billingEnabled()).toBe(true);
  });

  it("unlocks everything for everyone while billing is off", async () => {
    vi.stubEnv("BILLING_ENABLED", "");
    // Resolves without any Clerk session: no paywall can ever render.
    await expect(isPro()).resolves.toBe(true);
  });
});

describe("free plan limits", () => {
  it("keeps one free plan, not several confusing tiers", () => {
    expect(FREE_LIMITS.sessions).toBe(1);
    expect(FREE_LIMITS.practiceQuestions).toBeGreaterThan(0);
  });

  it("offers one real sample lesson per section", () => {
    expect(FREE_LIMITS.lessonSlugs).toHaveLength(4);
    for (const slug of FREE_LIMITS.lessonSlugs) {
      expect(isFreeLesson(slug)).toBe(true);
    }
  });

  it("every free lesson slug points at a real guided lesson", () => {
    const sections = new Set<string>();
    for (const slug of FREE_LIMITS.lessonSlugs) {
      const lesson = getGuidedLessonBySlug(slug);
      expect(lesson, `missing lesson for slug ${slug}`).toBeTruthy();
      if (lesson) sections.add(lesson.section);
    }
    expect(sections).toEqual(new Set(["READING", "MATH", "SCIENCE", "ENGLISH"]));
  });

  it("rejects lessons outside the sample", () => {
    expect(isFreeLesson("cardiovascular-system-advanced")).toBe(false);
    expect(isFreeLesson("")).toBe(false);
  });

  it("names the price without fear-based copy", () => {
    const payload = proRequiredError("mock");
    expect(payload.error).toContain("$4.99");
    expect(payload.reason).toBe("pro-required");
    expect(payload.context).toBe("mock");
    expect(payload.error.toLowerCase()).not.toContain("fail");
  });
});
