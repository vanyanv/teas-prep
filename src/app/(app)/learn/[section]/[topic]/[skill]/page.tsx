import { notFound } from "next/navigation";

import { GuidedLessonView } from "@/components/learn/guided/guided-lesson-view";
import { UpgradePanel } from "@/components/upgrade-panel";
import { PageContainer, PageHeader } from "@/components/ui/page";
import { findSkillBySlug, getSkills, slugifySkill } from "@/content/skills";
import { getGuidedLesson } from "@/content/guided-lessons";
import { getSkillMastery } from "@/lib/mastery";
import { requireUser } from "@/lib/session";
import { isFreeLesson, isPro } from "@/lib/access";
import { db } from "@/lib/db";
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
  if (!skillName) notFound();

  const skills = getSkills(section, topic);
  const pos = skills.indexOf(skillName);
  const nextSkill = pos >= 0 && pos < skills.length - 1 ? skills[pos + 1] : null;

  // Every skill has a guided lesson (enforced by
  // scripts/validate-guided-lessons.mts), so there is no flat-lesson path.
  const guided = getGuidedLesson(section, topic, skill);
  if (!guided) notFound();

  const user = await requireUser();

  // Free plan carries one sample lesson per section; the rest are Pro.
  if (!isFreeLesson(skill) && !(await isPro())) {
    return (
      <PageContainer width="narrow">
        <PageHeader
          kicker={`${sectionLabel(section as Section)} · ${topicLabel(section as Section, topic)}`}
          title={guided.title}
          sub={guided.summary}
        />
        <UpgradePanel
          className="mt-8"
          heading="Unlock all 85 guided lessons"
          body={`Each lesson teaches one skill the short way: the concept, the rule, a worked example you step through, the common mistake, and a quick check. This one runs about ${guided.minutes[0]} to ${guided.minutes[1]} minutes.`}
          unlocks={[
            "Every guided lesson across all four sections",
            "Quick checks that feed your mastery picture",
            "Lessons woven into your daily sessions automatically",
          ]}
          after={`/learn/${section}/${topic}/${skill}`}
          context="lesson"
        />
      </PageContainer>
    );
  }

  const [mastery, bankCount] = await Promise.all([
    getSkillMastery(user.id, skillName),
    db.question.count({ where: { subtopic: skillName } }),
  ]);
  const quizCount = Math.min(10, bankCount) || 10;
  const quizHref = `/practice?section=${section}&topic=${topic}&subtopic=${encodeURIComponent(skillName)}&count=${quizCount}&start=1`;

  return (
    <GuidedLessonView
      lesson={guided}
      sectionName={sectionLabel(section as Section)}
      topicName={topicLabel(section as Section, topic)}
      topicHref={`/learn/${section}/${topic}`}
      quizHref={quizHref}
      quizCount={quizCount}
      masteryPct={mastery.pct}
      nextSkill={
        nextSkill
          ? {
              name: nextSkill,
              href: `/learn/${section}/${topic}/${slugifySkill(nextSkill)}`,
            }
          : null
      }
    />
  );
}
