import { router, procedure } from "@/server/init";
import { z } from "zod";
import { prisma } from "@/lib/db/(root)/prisma";
import {
  createChallenge,
  deleteChallenge,
  getChallenges,
} from "@/lib/db/challenge";
import { ChallengeOptionalDefaultsSchema } from "@/lib/db/prisma-zod-types";

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
        icon: z.string(),
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
    .input(ChallengeOptionalDefaultsSchema)
    .mutation(async ({ input }) => {
      const challenge = await prisma.challenge.update({
        where: { id: input.id },
        data: input,
      });
      return challenge;
    }),
  deleteChallenge: procedure.input(z.string()).mutation(async ({ input }) => {
    const challenge = await deleteChallenge(input);
    return challenge;
  }),
});
