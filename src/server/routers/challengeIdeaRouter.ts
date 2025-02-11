import { prisma } from "@/lib/db/(root)/prisma";
import { procedure, router } from "../init";
import { z } from "zod";
import { getChallengeIdeas } from "@/lib/db/challengeIdeas";

export const challengeIdeaRouter = router({
  search: procedure.input(z.string()).mutation(async ({ input, ctx }) => {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }

    const challenges = await getChallengeIdeas(input);
    return challenges;
  }),
});
