import { db } from "@/lib/db";
import { BLUEPRINT, SECTION_ORDER, sectionLabel, type Section } from "@/lib/teas-blueprint";

/**
 * Baseline preservation. The first completed diagnostic per section is the
 * student's permanent baseline: captured once, never overwritten. The aggregate
 * baseline is the blueprint-weighted mean of the section baselines (by scored
 * share), and is only "complete" once all four sections have a baseline.
 */

/**
 * Idempotently record a section's baseline. No-op if one already exists — the
 * first diagnostic per section is permanent. `createMany({ skipDuplicates })`
 * relies on the unique (userId, section) constraint and, unlike a bare create
 * in a try/catch, does not emit a Prisma error log on the expected duplicate.
 */
export async function captureBaseline(
  userId: string,
  section: Section,
  attemptId: string,
  scorePct: number,
): Promise<boolean> {
  const { count } = await db.sectionBaseline.createMany({
    data: [{ userId, section, attemptId, scorePct }],
    skipDuplicates: true,
  });
  return count > 0;
}

export interface BaselineView {
  sections: { section: Section; label: string; scorePct: number | null; capturedAt: Date | null }[];
  /** blueprint-weighted mean of captured section baselines, rounded */
  aggregate: number | null;
  complete: boolean; // all four sections have a baseline
  capturedCount: number;
}

export async function getBaseline(userId: string): Promise<BaselineView> {
  const rows = await db.sectionBaseline.findMany({ where: { userId } });
  const bySection = new Map(rows.map((r) => [r.section, r]));

  const sections = SECTION_ORDER.map((section) => {
    const r = bySection.get(section);
    return {
      section,
      label: sectionLabel(section),
      scorePct: r?.scorePct ?? null,
      capturedAt: r?.capturedAt ?? null,
    };
  });

  const captured = sections.filter((s) => s.scorePct != null);
  let aggregate: number | null = null;
  if (captured.length > 0) {
    const totalScored = captured.reduce((n, s) => n + BLUEPRINT[s.section].scored, 0);
    const weighted = captured.reduce(
      (n, s) => n + (s.scorePct as number) * BLUEPRINT[s.section].scored,
      0,
    );
    aggregate = totalScored > 0 ? Math.round(weighted / totalScored) : null;
  }

  return {
    sections,
    aggregate,
    complete: captured.length === SECTION_ORDER.length,
    capturedCount: captured.length,
  };
}
