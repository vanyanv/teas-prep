import { NextResponse } from "next/server";
import { z } from "zod";

import { requireUserApi } from "@/lib/session";
import { track } from "@/lib/analytics";
import { db } from "@/lib/db";
import { nodeBySkillId } from "@/content/taxonomy";
import { recomputeProgress } from "@/lib/progress/recompute";

const schema = z.object({ skillId: z.string().min(1) });

export async function POST(request: Request) {
  const user = await requireUserApi();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const node = nodeBySkillId(parsed.data.skillId);
  if (!node) return NextResponse.json({ error: "Unknown skill" }, { status: 404 });

  await db.lessonCompletion.upsert({
    where: { userId_lessonId: { userId: user.id, lessonId: node.lessonId } },
    create: {
      userId: user.id,
      lessonId: node.lessonId,
      skillId: node.skillId,
      section: node.sectionId,
    },
    update: {}, // completion is idempotent; keep the original completedAt
  });

  await recomputeProgress(user.id).catch((err) =>
    console.error("recomputeProgress failed after lesson completion", err),
  );

  await track("lesson_completed", { skillId: node.skillId, section: node.sectionId }, { userId: user.id });
  return NextResponse.json({ ok: true });
}
