import {
  ChallengeIdeaResult,
  getChallengeIdeas,
} from "@/lib/db/challengeIdeas";
import { openai } from "@/lib/util";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { procedure, router } from "../init";

const ChallengeIdeaResultSchema = z.object({
  result: z.array(
    z.object({
      id: z.number(),
      index: z.number(),
      title: z.string(),
      wish: z.string(),
      dailyAction: z.string(),
      description: z.string(),
      sourceName: z.string(),
      sourceLink: z.string(),
      score: z.number().optional(),
    }),
  ),
});

export const challengeIdeaRouter = router({
  search: procedure.input(z.string()).mutation(async ({ input, ctx }) => {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }
    const challenges = await getChallengeIdeas(input);

    let result: ChallengeIdeaResult[];

    try {
      const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
              Your job is to provide the most relevant challenge ideas compared to the prompt provided by the user. 
              If a challenge idea is not relevant, do not include it in the response. 
              Otherwise, rank the challenge ideas in order of relevance, with the most relevant challenge idea being ranked first.
              If fewer than 4 challenges are relevant, generate additional challenges to ensure there are at least 4 suggested challenges.
              For any generated challenges, use a random source from the provided CHALLENGE LIST. Just pick one and use it as the source.
            `,
          },
          {
            role: "user",
            content: `
              USER INPUT STRING: ${input}\n\n\n
              CHALLENGE LIST: ${JSON.stringify(challenges)}
            `,
          },
        ],
        response_format: zodResponseFormat(
          ChallengeIdeaResultSchema,
          "challenge_ideas",
        ),
      });

      result = completion.choices[0].message.parsed?.result || [];

      if (result.length < 4) {
        const additionalCount = 4 - result.length;
        const additionalCompletion = await openai.beta.chat.completions.parse({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
                Generate ${additionalCount} additional challenge ideas that are relevant to the following user input:
                USER INPUT STRING: ${input}
                For the source, use a random source from the provided CHALLENGE LIST. Just pick one and use it as the source.
              `,
            },
          ],
          response_format: zodResponseFormat(
            ChallengeIdeaResultSchema,
            "additional_challenge_ideas",
          ),
        });

        result = [
          ...result,
          ...(additionalCompletion.choices[0].message.parsed?.result || []),
        ];
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }

    return result.slice(0, 10);
  }),
});
