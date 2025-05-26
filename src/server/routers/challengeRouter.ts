import { router, procedure } from "@/server/init";
import { z } from "zod";
import { db, challenge } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import {
  createChallenge,
  deleteChallenge,
  getChallenges,
  getChallengesWithDailyProgress,
} from "@/lib/db/challenge";
import { updateChallengeSchema } from "@/lib/db/drizzle/zod";

export const challengeRouter = router({
  getChallenges: procedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }

    const challenges = await getChallenges(ctx.user.id);
    return challenges;
  }),
  getChallengesWithDailyProgress: procedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }

    const challenges = await getChallengesWithDailyProgress(ctx.user.id);
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
        challengeIdeaId: z.string().optional(),
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
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) {
        throw new Error("Not authenticated");
      }

      const [updatedChallenge] = await db
        .update(challenge)
        .set(input)
        .where(eq(challenge.id, input.id as string))
        .returning();
      return updatedChallenge;
    }),
  deleteChallenge: procedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) {
        throw new Error("Not authenticated");
      }

      const challenge = await deleteChallenge(input);
      return challenge;
    }),
});
