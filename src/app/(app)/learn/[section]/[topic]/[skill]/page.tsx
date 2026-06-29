import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Dumbbell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LessonContent } from "@/components/learn/lesson-content";
import { findSkillBySlug } from "@/content/skills";
import { getSkillLesson } from "@/content/skill-lessons";
import { sectionLabel, topicLabel, type Section } from "@/lib/teas-blueprint";

const VALID = ["READING", "MATH", "SCIENCE", "ENGLISH"];

export default async function SkillPage({
  params,
}: {
  params: Promise<{ section: string; topic: string; skill: string }>;
}) {
  const { section, topic, skill } = await params;
  if (!VALID.includes(section)) notFound();
  const skillName = findSkillBySlug(section, topic, skill);
  const card = getSkillLesson(section, topic, skill);
  if (!skillName || !card) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href={`/learn/${section}/${topic}`}
        className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        <ArrowLeft className="size-4" />
        {topicLabel(section as Section, topic)}
      </Link>

      <header className="mt-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {sectionLabel(section as Section)} · {topicLabel(section as Section, topic)}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {skillName}
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">{card.summary}</p>
      </header>

      <LessonContent sections={card.blocks} />

      <div className="mt-12 flex flex-col gap-3 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Test yourself on just this skill.
        </p>
        <Button asChild className="shrink-0">
          <Link
            href={`/practice?section=${section}&topic=${topic}&subtopic=${encodeURIComponent(skillName)}`}
          >
            <Dumbbell />
            Quiz this skill
          </Link>
        </Button>
      </div>
    </div>
  );
}
