import { z } from "zod";
import { router, procedure } from "@/server/init";
import { eq, and, inArray, notInArray } from "drizzle-orm";
import {
  db,
  dailyProgress,
  dailyTask,
  insertDailyTaskSchema,
} from "@/lib/db/drizzle";

export const dailyTaskRouter = router({
  getDailyTasks: procedure
    .input(
      z.object({
        challengeId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { challengeId } = input;
      const { user } = ctx;

      if (!user) {
        throw new Error("Not authenticated");
      }

      return await db.query.dailyProgress
        .findMany({
          where: eq(dailyProgress.challengeId, challengeId),
          with: {
            dailyTasks: true,
          },
        })
        .then((results) => results.flatMap((dp) => dp.dailyTasks));
    }),
  upsertDailyTasks: procedure
    .input(insertDailyTaskSchema.array())
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;

      if (!user) {
        throw new Error("Not authenticated");
      }

      return await db.transaction(async (tx) => {
        const tasksByProgressId = input.reduce(
          (acc, task) => {
            if (!acc[task.dailyProgressId]) {
              acc[task.dailyProgressId] = [];
            }
            acc[task.dailyProgressId].push(task);
            return acc;
          },
          {} as Record<string, typeof input>,
        );

        for (const [dailyProgressId, newTasks] of Object.entries(
          tasksByProgressId,
        )) {
          const newTaskIds = newTasks
            .map((task) => task.id)
            .filter((id): id is string => Boolean(id));

          if (newTaskIds.length > 0) {
            await tx
              .delete(dailyTask)
              .where(
                and(
                  eq(dailyTask.dailyProgressId, dailyProgressId),
                  notInArray(dailyTask.id, newTaskIds),
                ),
              );
          } else {
            await tx
              .delete(dailyTask)
              .where(eq(dailyTask.dailyProgressId, dailyProgressId));
          }
        }

        const upsertPromises = input.map(async (task) => {
          const [upsertedTask] = await tx
            .insert(dailyTask)
            .values(task)
            .onConflictDoUpdate({
              target: dailyTask.id,
              set: {
                title: task.title,
                completed: task.completed,
                order: task.order,
              },
            })
            .returning();

          return upsertedTask;
        });

        return await Promise.allSettled(upsertPromises);
      });
    }),
});
