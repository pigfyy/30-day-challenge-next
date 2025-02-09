import { router, procedure } from "@/server/init";
import { z } from "zod";
import { prisma } from "@/lib/db/(root)/prisma";
import { createChallenge } from "@/lib/db/challenge";

export const challengeRouter = router({
  getChallenges: procedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }

    const challenges = await prisma.challenge.findMany({
      where: { userId: ctx.user.id },
    });
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
    .input(
      z.object({
        id: z.string(), // challengeId
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      // const challenge = await prisma.challenge.update({
      //   where: { id: input.id },
      //   data: {
      //     title: input.title,
      //     description: input.description,
      //   },
      // });
      // return challenge;
    }),
});
