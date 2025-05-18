import { router, procedure } from "@/server/init";
import { z } from "zod";
import { db, challenge } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import {
  createChallenge,
  deleteChallenge,
  getChallenges,
} from "@/lib/db/challenge";
import { updateChallengeSchema } from "@/lib/db/drizzle/zod";

export const challengeRouter = router({
  getChallenges: procedure
    .input(
      z
        .object({
          includeDailyProgressData: z.boolean().optional().default(false),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("Not authenticated");
      }

      const challenges = await getChallenges(
        ctx.user.id,
        input?.includeDailyProgressData,
      );
      return challenges;
    }),
  createChallenge: procedure
    .input(
      z.object({
        title: z.string(),
        wish: z.string(),
        dailyAction: z.string(),
        icon: z.string().optional(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new Error("Not authenticated");
      }

      const challenge = await createChallenge({
        ...input,
        userId: ctx.user.id,
      });
      return challenge;
    }),
  updateChallenge: procedure
    .input(updateChallengeSchema)
    .mutation(async ({ input }) => {
      const [updatedChallenge] = await db
        .update(challenge)
        .set(input)
        .where(eq(challenge.id, input.id as string))
        .returning();
      return updatedChallenge;
    }),
  deleteChallenge: procedure.input(z.string()).mutation(async ({ input }) => {
    const challenge = await deleteChallenge(input);
    return challenge;
  }),
});
