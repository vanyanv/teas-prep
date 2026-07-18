import { NextResponse } from "next/server";
import { z } from "zod";

import { requireUserApi } from "@/lib/session";
import { track } from "@/lib/analytics";
import { db } from "@/lib/db";
import { nodeBySkillId } from "@/content/taxonomy";
import { slugifySkill } from "@/content/skills";
import { quickCheckKeysForSlug } from "@/content/guided-lessons";

const schema = z.object({
  skillId: z.string().min(1),
  checkKey: z.string().min(1),
  isCorrect: z.boolean(),
});

/**
 * Record a single quick-check attempt. Quick checks never affect mastery; they
 * count toward *completion* only. We do not recompute progress here (quick
 * checks fire rapidly within a lesson) — the lesson-complete and grading paths
 * recompute, capturing these attempts then.
 */
export async function POST(request: Request) {
  const user = await requireUserApi();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { skillId, checkKey, isCorrect } = parsed.data;

  const node = nodeBySkillId(skillId);
  if (!node) return NextResponse.json({ error: "Unknown skill" }, { status: 404 });
  // checkKey must be a real quick-check of this skill's lesson.
  if (!quickCheckKeysForSlug(slugifySkill(node.name)).includes(checkKey)) {
    return NextResponse.json({ error: "Unknown quick check" }, { status: 400 });
  }

  await db.quickCheckAttempt.upsert({
    where: { userId_checkKey: { userId: user.id, checkKey } },
    create: {
      userId: user.id,
      skillId: node.skillId,
      lessonId: node.lessonId,
      checkKey,
      isCorrect,
    },
    update: { isCorrect, answeredAt: new Date() },
  });

  await track("quick_check_attempted", { skillId: node.skillId, isCorrect }, { userId: user.id });
  return NextResponse.json({ ok: true });
}
