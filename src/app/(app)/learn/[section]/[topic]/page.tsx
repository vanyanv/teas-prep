import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Dumbbell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LessonContent } from "@/components/learn/lesson-content";
import { getLesson } from "@/content/lessons";
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

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/learn"
        className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        <ArrowLeft className="size-4" />
        All lessons
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

      <div className="mt-12 flex flex-col gap-3 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Feeling ready? Put it into practice with a quick drill.
        </p>
        <Button asChild className="shrink-0">
          <Link href={`/practice?section=${section}&topic=${topic}`}>
            <Dumbbell />
            Practice this topic
          </Link>
        </Button>
      </div>
    </div>
  );
}
