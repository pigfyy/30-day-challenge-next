import { router, procedure } from "@/server/init";
import { z } from "zod";
import { prisma } from "@/lib/db/(root)/prisma";
import {
  deleteImage,
  editDailyProgressCompletion,
} from "@/lib/db/dailyProgress";
import { DailyProgressOptionalDefaultsSchema } from "@30-day-challenge/prisma-zod";

export const dailyProgressRouter = router({
  getDailyProgress: procedure
    .input(
      z.object({
        challengeId: z.string().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("Not authenticated");
      }

      if (!input.challengeId) return undefined;

      const dailyProgress = await prisma.dailyProgress.findMany({
        where: {
          userId: ctx.user.id,
          challengeId: input.challengeId,
        },
        orderBy: {
          date: "asc",
        },
      });
      return dailyProgress;
    }),
  upsertDailyProgress: procedure
    .input(
      DailyProgressOptionalDefaultsSchema.extend({
        userId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("Not authenticated");
      }

      const dailyProgress = await editDailyProgressCompletion({
        ...input,
        userId: ctx.user.id,
      });
      return dailyProgress;
    }),
  deleteDailyProgressImage: procedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await deleteImage(input);
    }),
});
