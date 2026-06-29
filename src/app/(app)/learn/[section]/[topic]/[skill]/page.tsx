import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Dumbbell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LessonContent } from "@/components/learn/lesson-content";
import { findSkillBySlug, getSkills, slugifySkill } from "@/content/skills";
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

  const skills = getSkills(section, topic);
  const pos = skills.indexOf(skillName);
  const prevSkill = pos > 0 ? skills[pos - 1] : null;
  const nextSkill = pos >= 0 && pos < skills.length - 1 ? skills[pos + 1] : null;

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

      {/* Prev / next skill pager */}
      <nav className="mt-6 flex items-stretch gap-3">
        {prevSkill ? (
          <Link
            href={`/learn/${section}/${topic}/${slugifySkill(prevSkill)}`}
            className="group flex flex-1 flex-col gap-1 rounded-xl border bg-card p-4 outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              <ArrowLeft className="size-3.5" />
              Previous
            </span>
            <span className="text-sm font-medium leading-snug">{prevSkill}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {nextSkill ? (
          <Link
            href={`/learn/${section}/${topic}/${slugifySkill(nextSkill)}`}
            className="group flex flex-1 flex-col items-end gap-1 rounded-xl border bg-card p-4 text-right outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Next skill
              <ArrowRight className="size-3.5" />
            </span>
            <span className="text-sm font-medium leading-snug">{nextSkill}</span>
          </Link>
        ) : (
          <Link
            href={`/learn/${section}/${topic}`}
            className="flex flex-1 flex-col items-end gap-1 rounded-xl border bg-card p-4 text-right outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Done
              <ArrowRight className="size-3.5" />
            </span>
            <span className="text-sm font-medium leading-snug">Back to topic</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
