import { describe, expect, it } from "vitest";

import { ASSETS, assetsForCredits } from "@/content/assets";
import { QUESTIONS } from "@/content/questions";

/**
 * Attribution guards.
 *
 * These exist because the same failure shipped to production twice: artwork
 * served to learners while the credit CC BY requires was unreachable. Once
 * because the credits route sat behind auth, once because the credits list was
 * gated on PUBLISHED while questions render from ADAPTED. Both passed every
 * other check, since neither is a type error or a broken link.
 *
 * The rule these encode: if a learner can see the artwork, the credit for it
 * has to be visible too.
 */
describe("attribution", () => {
  const credited = new Set(assetsForCredits().map((a) => a.id));

  it("credits every attribution-required asset a question can render", () => {
    const inUse = new Set(
      QUESTIONS.map((q) => (q as { assetId?: string }).assetId).filter(Boolean),
    );

    const uncredited = ASSETS.filter(
      (a) => inUse.has(a.id) && a.attributionRequired && !credited.has(a.id),
    ).map((a) => a.id);

    expect(uncredited).toEqual([]);
  });

  it("gives every credited asset the fields the licence notice needs", () => {
    for (const a of assetsForCredits()) {
      expect(a.attributionText.trim(), `${a.id} attributionText`).not.toBe("");
      expect(a.creator.trim(), `${a.id} creator`).not.toBe("");
      expect(a.licenseUrl, `${a.id} licenseUrl`).toMatch(/^https:\/\//);
      expect(a.originalSourceUrl, `${a.id} originalSourceUrl`).toMatch(/^https:\/\//);
    }
  });

  it("keeps /credits public in the proxy matcher", async () => {
    // The attribution page behind auth is the exact bug that shipped, and it
    // is invisible to every other test: the route builds and the page renders.
    const src = await import("node:fs").then((fs) =>
      fs.readFileSync("src/proxy.ts", "utf8"),
    );
    const publicList = src.slice(
      src.indexOf("createRouteMatcher(["),
      src.indexOf("]);"),
    );
    expect(publicList).toContain('"/credits"');
  });
});
