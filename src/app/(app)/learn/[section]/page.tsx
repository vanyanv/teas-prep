import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ListChecks } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuickReferenceCard } from "@/components/learn/quick-reference";
import { BLUEPRINT, type Section } from "@/lib/teas-blueprint";
import { getSkills, slugifySkill } from "@/content/skills";
import { getQuickReference } from "@/content/quick-reference";

const VALID = ["READING", "MATH", "SCIENCE", "ENGLISH"];

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!VALID.includes(section)) notFound();
  const spec = BLUEPRINT[section as Section];
  const quickRef = getQuickReference(section);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/learn"
        className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        <ArrowLeft className="size-4" />
        All sections
      </Link>

      <header className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {spec.label}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {spec.total} questions · {spec.minutes} minutes on the real TEAS.
            Study each skill below, then quiz it.
          </p>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link href={`/practice?section=${section}`}>
            <ListChecks />
            {spec.label} section quiz
          </Link>
        </Button>
      </header>

      {quickRef && (
        <div className="mt-8">
          <QuickReferenceCard data={quickRef} />
        </div>
      )}

      <div className="mt-8 space-y-6">
        {spec.topics.map((topic) => {
          const skills = getSkills(section, topic.key);
          return (
            <section key={topic.key}>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold tracking-tight">
                  {topic.label}
                </h2>
                <Link
                  href={`/learn/${section}/${topic.key}`}
                  className="shrink-0 rounded-md text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  Topic overview
                </Link>
              </div>
              <ul className="mt-3 divide-y overflow-hidden rounded-xl border bg-card">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center justify-between gap-3 p-3.5 pl-4"
                  >
                    <Link
                      href={`/learn/${section}/${topic.key}/${slugifySkill(skill)}`}
                      className="min-w-0 flex-1 rounded-md text-sm outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/40"
                    >
                      {skill}
                    </Link>
                    <Link
                      href={`/practice?section=${section}&topic=${topic.key}&subtopic=${encodeURIComponent(skill)}`}
                      className="shrink-0 rounded-md font-mono text-[11px] uppercase tracking-wide text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/40"
                    >
                      Quiz
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
