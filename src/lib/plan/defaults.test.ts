import { describe, expect, it } from "vitest";

import { resolvePlanInputs } from "./defaults";

const now = new Date("2026-07-15T12:00:00Z");
const day = 86_400_000;

describe("resolvePlanInputs", () => {
  it("prefers an explicit body test date over the profile date", () => {
    const r = resolvePlanInputs(
      { bodyTestDate: "2026-10-01", userTestDate: new Date("2026-09-01") },
      now,
    );
    expect([r.testDate.getFullYear(), r.testDate.getMonth(), r.testDate.getDate()]) //
      .toEqual([2026, 9, 1]);
  });

  it("keeps the entered calendar date in local time (no UTC off-by-one)", () => {
    // <input type="date"> submits "YYYY-MM-DD"; the date the user typed must be
    // the date they see back, regardless of timezone.
    const r = resolvePlanInputs({ bodyTestDate: "2026-08-29" }, now);
    expect(r.testDate.toLocaleDateString("en-CA")).toBe("2026-08-29");
  });

  it("falls back to a future profile test date", () => {
    const r = resolvePlanInputs({ userTestDate: new Date("2026-09-01") }, now);
    expect(r.testDate.toISOString().slice(0, 10)).toBe("2026-09-01");
  });

  it("ignores a past profile date and defaults to ~6 weeks out", () => {
    const r = resolvePlanInputs({ userTestDate: new Date("2026-01-01") }, now);
    expect(r.testDate.getTime()).toBe(now.getTime() + 42 * day);
  });

  it("ignores an invalid body date string", () => {
    const r = resolvePlanInputs({ bodyTestDate: "not-a-date" }, now);
    expect(r.testDate.getTime()).toBe(now.getTime() + 42 * day);
  });

  it("defaults hours to 8 and clamps invalid values", () => {
    expect(resolvePlanInputs({}, now).hoursPerWeek).toBe(8);
    expect(resolvePlanInputs({ bodyHours: 0 }, now).hoursPerWeek).toBe(8);
    expect(resolvePlanInputs({ bodyHours: 61 }, now).hoursPerWeek).toBe(8);
    expect(resolvePlanInputs({ bodyHours: 12 }, now).hoursPerWeek).toBe(12);
  });
});
