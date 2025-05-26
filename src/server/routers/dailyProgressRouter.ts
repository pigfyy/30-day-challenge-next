import { router, procedure } from "@/server/init";
import { z } from "zod";
import { db, dailyProgress } from "@/lib/db/drizzle";
import { eq, and, asc } from "drizzle-orm";
import {
  deleteImage,
  editDailyProgressCompletion,
} from "@/lib/db/dailyProgress";
import { insertDailyProgressSchema } from "@/lib/db/drizzle/zod";

export const dailyProgressRouter = router({
  getDailyProgress: procedure
    .input(z.object({ challengeId: z.string().nullable() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("Not authenticated");
      }

      if (!input.challengeId) return undefined;

      const progress = await db
        .select()
        .from(dailyProgress)
        .where(
          and(
            eq(dailyProgress.userId, ctx.user.id),
            eq(dailyProgress.challengeId, input.challengeId),
          ),
        )
        .orderBy(asc(dailyProgress.date));
      return progress;
    }),
  upsertDailyProgress: procedure
    .input(
      z.object({
        newDailyProgress: insertDailyProgressSchema.extend({
          userId: z.string().optional(),
        }),
        existingRecord: insertDailyProgressSchema.optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("Not authenticated");
      }

      return await editDailyProgressCompletion(
        {
          ...input.newDailyProgress,
          userId: ctx.user.id,
        },
        input.existingRecord,
      );
    }),
  deleteDailyProgressImage: procedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await deleteImage(input);
    }),
});
