import { db } from "@/lib/db";
import { generatePlan, weeksUntil, SESSION_MINUTES } from "@/lib/plan/generate";

/** Create (replacing any prior) a study plan scheduling the session engine's units. */
export async function createPlan(
  userId: string,
  testDate: Date,
  daysPerWeek: number,
) {
  const weeks = weeksUntil(testDate, new Date());
  const draft = generatePlan({ weeks, daysPerWeek });

  // Rough weekly load, kept for the legacy non-null column.
  const hoursPerWeek = Math.max(
    1,
    Math.round((daysPerWeek * (SESSION_MINUTES + 15) + 45) / 60),
  );

  const plan = await db.$transaction(async (tx) => {
    // Replace any existing plan (single active plan per user).
    await tx.studyPlan.deleteMany({ where: { userId } });

    // The plan's inputs become the profile's (single source for the countdown
    // and the weekly study-days goal).
    await tx.user.update({
      where: { id: userId },
      data: { testDate, studyDaysPerWeek: daysPerWeek },
    });

    return tx.studyPlan.create({
      data: {
        userId,
        testDate,
        hoursPerWeek,
        daysPerWeek,
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
