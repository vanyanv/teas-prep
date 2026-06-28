import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

import { SECTIONS } from "@/lib/teas-blueprint";
import { LESSONS } from "@/content/lessons";
import { SKILLS } from "@/content/skills";

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <header>
        <BookOpen className="size-7 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Learn the material
        </h1>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Short, focused lessons for every TEAS topic. Read up on a topic, then
          drill it. Each lesson covers exactly the skills the exam tests.
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.key}>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {section.label}
            </h2>
            <ul className="mt-3 divide-y overflow-hidden rounded-xl border bg-card">
              {section.topics.map((topic) => {
                const lesson = LESSONS.find(
                  (l) => l.section === section.key && l.topic === topic.key,
                );
                if (!lesson) return null;
                const skillCount =
                  SKILLS.find((s) => s.section === section.key && s.topic === topic.key)
                    ?.skills.length ?? 0;
                return (
                  <li key={topic.key}>
                    <Link
                      href={`/learn/${section.key}/${topic.key}`}
                      className="flex items-center gap-4 p-4 outline-none transition-colors hover:bg-secondary/40 focus-visible:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/40"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{topic.label}</span>
                        <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">
                          {lesson.intro}
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
                        {skillCount} skills
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
