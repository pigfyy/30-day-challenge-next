import {
  ChallengeIdeaResult,
  getChallengeIdeas,
} from "@/lib/db/challengeIdeas";
import { geminiFlashModel } from "@/lib/util";
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
      // Use Gemini Flash to rank and filter challenge ideas
      const prompt = `
        Your job is to provide the most relevant challenge ideas compared to the prompt provided by the user. 
        If a challenge idea is not relevant, do not include it in the response. 
        Otherwise, rank the challenge ideas in order of relevance, with the most relevant challenge idea being ranked first.
        If fewer than 4 challenges are relevant, generate additional challenges to ensure there are at least 4 suggested challenges.
        For any generated challenges, use a random source from the provided CHALLENGE LIST. Just pick one and use it as the source.
        
        USER INPUT STRING: ${input}
        
        CHALLENGE LIST: ${JSON.stringify(challenges)}
        
        Respond with a JSON object in this exact format:
        {
          "result": [
            {
              "id": number,
              "index": number,
              "title": string,
              "wish": string,
              "dailyAction": string,
              "description": string,
              "sourceName": string,
              "sourceLink": string,
              "score": number (optional)
            }
          ]
        }
      `;

      const geminiResponse = await geminiFlashModel.generateContent(prompt);
      const responseText = geminiResponse.response.text();

      // Extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Failed to parse JSON from Gemini response");
      }

      const parsedResponse = JSON.parse(jsonMatch[0]);
      result = parsedResponse.result || [];

      // If we have fewer than 4 results, generate additional challenges
      if (result.length < 4) {
        const additionalCount = 4 - result.length;
        const additionalPrompt = `
          Generate ${additionalCount} additional challenge ideas that are relevant to the following user input:
          USER INPUT STRING: ${input}
          
          For the source, use a random source from the provided CHALLENGE LIST:
          ${JSON.stringify(challenges.map((c) => ({ sourceName: c.sourceName, sourceLink: c.sourceLink })))}
          
          Respond with a JSON object in this exact format:
          {
            "result": [
              {
                "id": number,
                "index": number,
                "title": string,
                "wish": string,
                "dailyAction": string,
                "description": string,
                "sourceName": string,
                "sourceLink": string
              }
            ]
          }
        `;

        const additionalResponse =
          await geminiFlashModel.generateContent(additionalPrompt);
        const additionalText = additionalResponse.response.text();

        // Extract JSON from the response
        const additionalJsonMatch = additionalText.match(/\{[\s\S]*\}/);
        if (additionalJsonMatch) {
          const additionalParsed = JSON.parse(additionalJsonMatch[0]);
          result = [...result, ...(additionalParsed.result || [])];
        }
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }

    return result.slice(0, 10);
  }),
});
