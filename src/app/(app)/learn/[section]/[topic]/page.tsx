import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, Dumbbell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LessonContent } from "@/components/learn/lesson-content";
import { getLesson } from "@/content/lessons";
import { getSkills, slugifySkill } from "@/content/skills";
import { sectionLabel, type Section } from "@/lib/teas-blueprint";

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

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href={`/learn/${section}`}
        className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        <ArrowLeft className="size-4" />
        {sectionLabel(section as Section)}
      </Link>

      <header className="mt-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {sectionLabel(section as Section)}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {lesson.title}
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">{lesson.intro}</p>
      </header>

      <LessonContent sections={lesson.sections} />

      {skills.length > 0 && (
        <section className="mt-12">
          <h2 className="text-base font-semibold tracking-tight">
            Skills in this topic
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Study a skill in depth, or quiz it on its own.
          </p>
          <ul className="mt-3 divide-y overflow-hidden rounded-xl border bg-card">
            {skills.map((skill) => (
              <li key={skill} className="flex items-center gap-3 p-3.5 pl-4">
                <Link
                  href={`/learn/${section}/${topic}/${slugifySkill(skill)}`}
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-md text-sm outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  <span className="min-w-0 flex-1">{skill}</span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
                <Link
                  href={`/practice?section=${section}&topic=${topic}&subtopic=${encodeURIComponent(skill)}`}
                  className="shrink-0 rounded-md font-mono text-[11px] uppercase tracking-wide text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  Quiz
                </Link>
              </li>
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
    </div>
  );
}
