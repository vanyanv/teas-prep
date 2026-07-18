import { describe, expect, it } from "vitest";

import { selectSectionBalanced, selectWithCooldown, type Exposure } from "./select";
import { topicCountsFor, BLUEPRINT } from "@/lib/teas-blueprint";

/** Build a pool with `n` questions per given topic of a section. */
function pool(section: "MATH" | "SCIENCE", perTopic: Record<string, number>) {
  return Object.entries(perTopic).flatMap(([topic, n]) =>
    Array.from({ length: n }, (_, i) => ({
      id: `${section}-${topic}-${i}`,
      section,
      topic,
    })),
  );
}

describe("selectSectionBalanced", () => {
  it("matches the blueprint topic mix when the pool is ample", () => {
    const p = pool("MATH", { "numbers-algebra": 50, "measurement-data": 50 });
    const ids = selectSectionBalanced(p, "MATH", 35);
    expect(ids).toHaveLength(35);
    const want = topicCountsFor("MATH", 35);
    for (const t of BLUEPRINT.MATH.topics) {
      const got = ids.filter((id) => id.includes(t.key)).length;
      expect(got).toBe(want[t.key]);
    }
  });

  it("tops up from other topics when one runs thin", () => {
    const p = pool("MATH", { "numbers-algebra": 3, "measurement-data": 50 });
    const ids = selectSectionBalanced(p, "MATH", 35);
    expect(ids).toHaveLength(35);
    expect(ids.filter((id) => id.includes("numbers-algebra"))).toHaveLength(3);
  });

  it("returns the whole pool when it is smaller than total", () => {
    const p = pool("MATH", { "numbers-algebra": 4, "measurement-data": 5 });
    expect(selectSectionBalanced(p, "MATH", 35)).toHaveLength(9);
  });

  it("ignores questions from other sections and never duplicates", () => {
    const p = [
      ...pool("MATH", { "numbers-algebra": 40, "measurement-data": 40 }),
      ...pool("SCIENCE", { biology: 40 }),
    ];
    const ids = selectSectionBalanced(p, "MATH", 35);
    expect(ids.some((id) => id.startsWith("SCIENCE"))).toBe(false);
    expect(new Set(ids).size).toBe(35);
  });
});

describe("selectWithCooldown", () => {
  const items = (ids: string[]) => ids.map((id) => ({ id }));

  it("serves unseen questions before any seen ones", () => {
    const exposure = new Map<string, Exposure>([
      ["a", { timesServed: 1, lastServedMs: 100 }],
      ["b", { timesServed: 1, lastServedMs: 100 }],
    ]);
    const picked = selectWithCooldown(items(["a", "b", "c", "d"]), 2, exposure);
    expect([...picked].sort()).toEqual(["c", "d"]);
  });

  it("among seen, prefers fewer times served then older", () => {
    const exposure = new Map<string, Exposure>([
      ["a", { timesServed: 3, lastServedMs: 100 }],
      ["b", { timesServed: 1, lastServedMs: 500 }],
      ["c", { timesServed: 1, lastServedMs: 200 }],
    ]);
    expect(selectWithCooldown(items(["a", "b", "c"]), 3, exposure)).toEqual(["c", "b", "a"]);
  });

  it("fills from seen when unseen are too few (no hard ban)", () => {
    const exposure = new Map<string, Exposure>([["a", { timesServed: 1, lastServedMs: 100 }]]);
    const picked = selectWithCooldown(items(["a", "b"]), 2, exposure);
    expect(picked).toHaveLength(2);
    expect(picked[0]).toBe("b");
    expect(picked).toContain("a");
  });

  it("never returns more than requested", () => {
    expect(selectWithCooldown(items(["a", "b", "c"]), 2, new Map())).toHaveLength(2);
  });
});
