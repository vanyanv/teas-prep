import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

import { SECTIONS } from "@/lib/teas-blueprint";
import { getSkills } from "@/content/skills";

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <header>
        <BookOpen className="size-7 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Learn the material
        </h1>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Study each TEAS section by topic and skill, with the key formulas and
          facts up front. Read a skill, then quiz it.
        </p>
      </header>

      <ul className="mt-10 space-y-3">
        {SECTIONS.map((section) => {
          const skillCount = section.topics.reduce(
            (n, t) => n + getSkills(section.key, t.key).length,
            0,
          );
          return (
            <li key={section.key}>
              <Link
                href={`/learn/${section.key}`}
                className="flex items-center gap-4 rounded-xl border bg-card p-5 outline-none transition-colors hover:bg-secondary/40 focus-visible:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-semibold tracking-tight">
                    {section.label}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {section.topics.length} topics · {skillCount} skills ·{" "}
                    {section.total} questions on the real exam
                  </span>
                </span>
                <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
