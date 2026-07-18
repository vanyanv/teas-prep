import { db } from "@/lib/db";
import {
  SECTION_ORDER,
  sectionLabel,
  type Section,
} from "@/lib/teas-blueprint";

export interface SectionDiagnosticStatus {
  section: Section;
  label: string;
  /** latest finished section-diagnostic attempt; null = untaken */
  attemptId: string | null;
  scorePct: number | null;
  finishedAt: Date | null;
}

interface AttemptRow {
  id: string;
  scorePct: number | null;
  finishedAt: Date | null;
  config: unknown;
}

/** Reduce finished DIAGNOSTIC attempts (newest first) to per-section status. */
export function sectionStatusFrom(attempts: AttemptRow[]): SectionDiagnosticStatus[] {
  const latest = new Map<Section, AttemptRow>();
  for (const a of attempts) {
    const cfg = a.config as { variant?: string; section?: Section } | null;
    if (cfg?.variant !== "section" || !cfg.section) continue;
    if (!latest.has(cfg.section)) latest.set(cfg.section, a);
  }
  return SECTION_ORDER.map((section) => {
    const a = latest.get(section);
    return {
      section,
      label: sectionLabel(section),
      attemptId: a?.id ?? null,
      scorePct: a?.scorePct ?? null,
      finishedAt: a?.finishedAt ?? null,
    };
  });
}

/** Per-section diagnostic status for the hub, results CTA, and Today. */
export async function getSectionDiagnosticStatus(
  userId: string,
): Promise<SectionDiagnosticStatus[]> {
  const attempts = await db.attempt.findMany({
    where: { userId, mode: "DIAGNOSTIC", finishedAt: { not: null } },
    orderBy: { finishedAt: "desc" },
    select: { id: true, scorePct: true, finishedAt: true, config: true },
  });
  return sectionStatusFrom(attempts);
}

/** First untaken section in blueprint order, or null when all are done. */
export function nextUndiagnosedSection(
  status: SectionDiagnosticStatus[],
): SectionDiagnosticStatus | null {
  return status.find((s) => s.attemptId == null) ?? null;
}
