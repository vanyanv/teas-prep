import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Dumbbell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LessonContent } from "@/components/learn/lesson-content";
import { PageContainer, PageHeader } from "@/components/ui/page";
import { getLesson } from "@/content/lessons";
import { getSkills } from "@/content/skills";
import { requireUser } from "@/lib/session";
import { getSkillProgress, type SkillProgressView } from "@/lib/progress/read";
import { sectionLabel, type Section } from "@/lib/teas-blueprint";

const num = (n: number | null) => (n == null ? "–" : `${n}%`);

const VALID_SECTIONS = ["READING", "MATH", "SCIENCE", "ENGLISH"];

export default async function LessonPage({
  params,
}: {
  params: Promise<{ section: string; topic: string }>;
}) {
  const { section, topic } = await params;
  if (!VALID_SECTIONS.includes(section)) notFound();
  const lesson = getLesson(section, topic);
  if (!lesson) notFound();
  const skills = getSkills(section, topic);

  const user = await requireUser();
  const progress = await getSkillProgress(user.id, section as Section);
  const rows = progress.filter((r) => r.topicId === topic);

  return (
    <PageContainer width="narrow">
      <Link
        href={`/learn/${section}`}
        className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        <ArrowLeft className="size-4" />
        {sectionLabel(section as Section)}
      </Link>

      <PageHeader
        className="mt-5"
        kicker={sectionLabel(section as Section)}
        title={lesson.title}
        sub={lesson.intro}
      />

      <LessonContent sections={lesson.sections} />

      {skills.length > 0 && (
        <section className="mt-12">
          <h2 className="text-base font-semibold tracking-tight">
            Skills in this topic
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Completion is the work you&apos;ve finished; mastery is how well you know it.
          </p>
          <ul className="mt-3 divide-y overflow-hidden rounded-xl border bg-card">
            {rows.map((row) => (
              <SkillRow key={row.skillId} row={row} />
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8 flex flex-col gap-3 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Ready for a mixed set across the whole topic?
        </p>
        <Button asChild className="shrink-0">
          <Link href={`/practice?section=${section}&topic=${topic}`}>
            <Dumbbell />
            Quiz this topic
          </Link>
        </Button>
      </div>
    </PageContainer>
  );
}

/** One skill: completion state (lesson/checks/quiz), mastery state, quiz, reviews. */
function SkillRow({ row }: { row: SkillProgressView }) {
  const action = row.reviewsDue > 0 || row.masteryPct != null ? "Review" : "Continue";
  return (
    <li className="p-3.5 pl-4">
      <div className="flex items-center gap-3">
        <Link
          href={row.learnHref}
          className="min-w-0 flex-1 rounded-md text-sm font-medium outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          <span className="inline-flex items-center gap-1.5">
            {row.completed && <Check className="size-3.5 shrink-0 text-success" aria-hidden />}
            {row.name}
          </span>
        </Link>
        <span className="shrink-0 rounded-full bg-secondary px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          {row.masteryLabel}
          {row.masteryPct != null && <span className="tabular-nums"> {row.masteryPct}%</span>}
        </span>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tabular-nums text-muted-foreground">
        <span>lesson {row.lessonDone ? "✓" : "–"}</span>
        <span>
          checks {row.quickChecksDone}/{row.quickChecksTotal}
        </span>
        <span>quiz {row.skillQuizDone ? "✓" : "–"}</span>
        <span>
          latest {num(row.latestQuizPct)} · best {num(row.bestQuizPct)}
        </span>
        {row.reviewsDue > 0 && <span className="text-primary">{row.reviewsDue} due</span>}
        <Link
          href={action === "Review" ? row.practiceHref : row.learnHref}
          className="ml-auto inline-flex items-center gap-1 rounded-md uppercase tracking-wide text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          {action}
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </li>
  );
}
