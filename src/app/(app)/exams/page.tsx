import Link from "next/link";
import { ArrowRight, ClipboardCheck, GraduationCap, Layers, SlidersHorizontal, Timer } from "lucide-react";

import { requireUser } from "@/lib/session";
import { isPro } from "@/lib/access";
import { db } from "@/lib/db";
import { getSectionDiagnosticStatus, nextUndiagnosedSection } from "@/lib/quiz/diagnostic-status";
import { getBaseline } from "@/lib/progress/baseline";
import { practiceHref } from "@/lib/quiz/links";
import { PageContainer, PageHeader, Kicker } from "@/components/ui/page";
import { ActionRow } from "@/components/ui/action-row";
import { SECTIONS } from "@/lib/teas-blueprint";

const num = (n: number | null) => (n == null ? "–" : `${n}%`);

export default async function ExamCenterPage() {
  const user = await requireUser();
  const [pro, status, baseline, mockAgg, mockCount] = await Promise.all([
    isPro(),
    getSectionDiagnosticStatus(user.id),
    getBaseline(user.id),
    db.attempt.aggregate({
      where: { userId: user.id, mode: "MOCK", finishedAt: { not: null } },
      _max: { scorePct: true },
    }),
    db.attempt.count({ where: { userId: user.id, mode: "MOCK", finishedAt: { not: null } } }),
  ]);

  const diagnosedCount = status.filter((s) => s.attemptId != null).length;
  const nextDiag = nextUndiagnosedSection(status);
  const bestMock = mockAgg._max.scorePct != null ? Math.round(mockAgg._max.scorePct) : null;

  return (
    <PageContainer>
      <PageHeader
        kicker="Exam Center"
        title="Practice under real conditions."
        sub="Realistic TEAS simulations, timed section exams, and progress checks — every attempt is tracked so you can see your scores move."
      />

      {/* Baseline diagnostic */}
      <section className="mt-8">
        <Kicker className="px-1 text-[11px]">Baseline</Kicker>
        <div className="mt-2">
          <ActionRow asChild className="group items-start">
            <Link href="/diagnostic">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                <GraduationCap className="size-[18px]" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">Initial diagnostic</span>
                <span className="block text-xs text-muted-foreground">
                  {diagnosedCount === 4
                    ? `Baseline set${baseline.aggregate != null ? ` at ${baseline.aggregate}%` : ""}. Your permanent starting point.`
                    : nextDiag
                      ? `${diagnosedCount}/4 sections done — ${nextDiag.label} is next.`
                      : "Start with a per-section diagnostic to build your baseline."}
                </span>
              </span>
              <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </ActionRow>
        </div>
      </section>

      {/* Full simulations + progress checks */}
      <section className="mt-8">
        <Kicker className="px-1 text-[11px]">Simulations &amp; checks</Kicker>
        <ul className="mt-2 space-y-2">
          <li>
            <ExamRow
              href="/mock"
              icon={<Timer className="size-[18px]" aria-hidden />}
              title="Realistic TEAS simulation"
              sub={
                bestMock != null
                  ? `${mockCount} taken · best ${bestMock}%. Full length, section order, timed, with the break.`
                  : "Full length, official section order, section timers, and the scheduled break."
              }
              badge={pro ? undefined : "Pro"}
            />
          </li>
          <li>
            <ExamRow
              href={practiceHref({ count: 30, timed: true, start: true })}
              icon={<ClipboardCheck className="size-[18px]" aria-hidden />}
              title="Progress check"
              sub="A shorter timed, mixed set to measure movement between full simulations."
            />
          </li>
        </ul>
      </section>

      {/* Timed section exams */}
      <section className="mt-8">
        <Kicker className="px-1 text-[11px]">Timed section exams</Kicker>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {SECTIONS.map((s) => {
            const st = status.find((x) => x.section === s.key);
            return (
              <li key={s.key}>
                <ExamRow
                  href={practiceHref({ section: s.key, timed: true, start: true })}
                  icon={<Layers className="size-[18px]" aria-hidden />}
                  title={`${s.label}`}
                  sub={`${s.total} items at exam pace${st?.scorePct != null ? ` · diagnostic ${num(st.scorePct)}` : ""}`}
                />
              </li>
            );
          })}
        </ul>
      </section>

      {/* Custom retake */}
      <section className="mt-8">
        <Kicker className="px-1 text-[11px]">Custom</Kicker>
        <div className="mt-2">
          <ExamRow
            href="/practice"
            icon={<SlidersHorizontal className="size-[18px]" aria-hidden />}
            title="Build a custom exam"
            sub="Choose sections, length, and focus — retake your weak skills or missed questions."
          />
        </div>
      </section>

      <p className="mt-10">
        <Link
          href="/progress"
          className="text-sm text-muted-foreground underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          See your exam history and score trend
        </Link>
      </p>
    </PageContainer>
  );
}

function ExamRow({
  href,
  icon,
  title,
  sub,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  badge?: string;
}) {
  return (
    <ActionRow asChild className="group h-full items-start">
      <Link href={href}>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium">{title}</span>
            {badge && (
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-primary">
                {badge}
              </span>
            )}
          </span>
          <span className="mt-0.5 block text-xs text-muted-foreground">{sub}</span>
        </span>
        <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </ActionRow>
  );
}
