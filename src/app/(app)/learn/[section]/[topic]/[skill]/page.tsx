import { notFound } from "next/navigation";

import { GuidedLessonView } from "@/components/learn/guided/guided-lesson-view";
import { findSkillBySlug, getSkills, slugifySkill } from "@/content/skills";
import { getGuidedLesson } from "@/content/guided-lessons";
import { getSkillMastery } from "@/lib/mastery";
import { requireUser } from "@/lib/session";
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
