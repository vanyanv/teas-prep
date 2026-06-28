import { describe, expect, it } from "vitest";

import { review, INITIAL_STATE } from "./sm2";

const now = new Date("2026-01-01T12:00:00Z");

describe("sm2 review", () => {
  it("graduates a new card through good: 1 then 6 days", () => {
    const first = review(INITIAL_STATE, "good", now);
    expect(first.intervalDays).toBe(1);
    expect(first.reps).toBe(1);

    const second = review(first, "good", now);
    expect(second.intervalDays).toBe(6);
    expect(second.reps).toBe(2);

    const third = review(second, "good", now);
    expect(third.intervalDays).toBe(Math.round(6 * second.ease));
    expect(third.reps).toBe(3);
  });

  it("again resets reps, lowers ease, due same day", () => {
    const graduated = review(review(INITIAL_STATE, "good", now), "good", now);
    const lapsed = review(graduated, "again", now);
    expect(lapsed.reps).toBe(0);
    expect(lapsed.lapses).toBe(1);
    expect(lapsed.intervalDays).toBe(0);
    expect(lapsed.ease).toBeLessThan(graduated.ease);
    expect(lapsed.dueDate.getTime()).toBe(now.getTime());
  });

  it("never drops ease below 1.3", () => {
    let s = INITIAL_STATE;
    for (let i = 0; i < 20; i++) s = review(s, "again", now);
    expect(s.ease).toBeGreaterThanOrEqual(1.3);
  });

  it("easy gives a longer interval than good", () => {
    const good = review(INITIAL_STATE, "good", now);
    const easy = review(INITIAL_STATE, "easy", now);
    expect(easy.intervalDays).toBeGreaterThan(good.intervalDays);
  });

  it("sets a future due date for passing grades", () => {
    const r = review(INITIAL_STATE, "good", now);
    expect(r.dueDate.getTime()).toBeGreaterThan(now.getTime());
  });
});
