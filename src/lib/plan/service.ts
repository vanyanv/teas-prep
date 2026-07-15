import { db } from "@/lib/db";
import { getTopicMasteries } from "@/lib/mastery";
import { generatePlan, weeksUntil } from "@/lib/plan/generate";

/** Create (replacing any prior) a study plan from diagnostic-derived mastery. */
export async function createPlan(
  userId: string,
  testDate: Date,
  hoursPerWeek: number,
) {
  const masteries = await getTopicMasteries(userId);
  const weeks = weeksUntil(testDate, new Date());
  const draft = generatePlan({ weeks, hoursPerWeek, masteries });

  // Replace any existing plan (single active plan per user).
  await db.studyPlan.deleteMany({ where: { userId } });

  // The plan's exam date becomes the profile's exam date (single countdown source).
  await db.user.update({ where: { id: userId }, data: { testDate } });

  const plan = await db.studyPlan.create({
    data: {
      userId,
      testDate,
      hoursPerWeek,
      weeks: {
        create: draft.map((w) => ({
          weekIndex: w.weekIndex,
          focus: w.focus,
          tasks: {
            create: w.tasks.map((t) => ({
              dayOfWeek: t.dayOfWeek,
              kind: t.kind,
              section: t.section,
              topic: t.topic,
              label: t.label,
              targetCount: t.targetCount,
              durationMin: t.durationMin,
            })),
          },
        })),
      },
    },
  });
  return plan.id;
}

export async function getActivePlan(userId: string) {
  return db.studyPlan.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      weeks: {
        orderBy: { weekIndex: "asc" },
        include: { tasks: { orderBy: { dayOfWeek: "asc" } } },
      },
    },
  });
}

export async function setTaskDone(
  userId: string,
  taskId: string,
  done: boolean,
) {
  // Ownership check via the plan chain.
  const task = await db.planTask.findFirst({
    where: { id: taskId, week: { plan: { userId } } },
    select: { id: true },
  });
  if (!task) throw new Error("Task not found");
  await db.planTask.update({ where: { id: taskId }, data: { done } });
}
