import {
  ChallengeIdeaResult,
  getChallengeIdea,
  getChallengeIdeas,
} from "@/lib/db/challengeIdeas";
import { geminiFlashModel } from "@/lib/util";
import { z } from "zod";
import { procedure, router } from "../init";

export const challengeIdeaRouter = router({
  search: procedure.input(z.string()).mutation(async ({ input, ctx }) => {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }
    const challenges = await getChallengeIdeas(input);

    return challenges;
  }),
  getChallengeIdea: procedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      if (!ctx.user) {
        throw new Error("Not authenticated");
      }
      const challengeIdea = await getChallengeIdea(input);
      return challengeIdea;
    }),
});
