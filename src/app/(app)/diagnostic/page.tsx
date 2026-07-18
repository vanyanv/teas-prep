import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";

import { requireUser } from "@/lib/session";
import { getSectionDiagnosticStatus } from "@/lib/quiz/diagnostic-status";
import { BAND_LABELS, bandFor } from "@/lib/quiz/diagnostic-insights";
import { SECTION_DIAGNOSTIC_TOTAL, sectionSlug } from "@/lib/teas-blueprint";
import { PageContainer } from "@/components/ui/page";

export default async function DiagnosticPage() {
  const user = await requireUser();
  const status = await getSectionDiagnosticStatus(user.id);
  const done = status.filter((s) => s.attemptId != null).length;

  return (
    <PageContainer width="narrow">
      <ClipboardCheck className="size-7 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        Your diagnostics
      </h1>
      <p className="mt-3 text-muted-foreground">
        Each TEAS section gets its own {SECTION_DIAGNOSTIC_TOTAL}-question
        diagnostic, weighted like the real exam. Finish one and your mastery
        map and study plan update right away — no need to do all four in one
        sitting.
      </p>
      <p className="mt-4 text-sm font-medium text-muted-foreground">
        {done} of {status.length} sections diagnosed
      </p>

      <ul className="mt-4 space-y-3">
        {status.map((s) => {
          const band = s.scorePct != null ? bandFor(s.scorePct) : null;
          const startHref = `/diagnostic/${sectionSlug(s.section)}`;
          return (
            <li key={s.section}>
              <div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4">
                <div className="min-w-0">
                  <p className="font-medium">{s.label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {s.attemptId == null
                      ? `${SECTION_DIAGNOSTIC_TOTAL} questions · untimed`
                      : band
                        ? `${s.scorePct}% · ${BAND_LABELS[band]}`
                        : `${s.scorePct}%`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-sm">
                  {s.attemptId != null && (
                    <Link
                      className="text-muted-foreground underline-offset-4 hover:underline"
                      href={`/diagnostic/results/${s.attemptId}`}
                    >
                      Results
                    </Link>
                  )}
                  <Link
                    className="inline-flex items-center gap-1 font-medium text-primary"
                    href={startHref}
                  >
                    {s.attemptId == null ? "Start" : "Retake"}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </PageContainer>
  );
}
