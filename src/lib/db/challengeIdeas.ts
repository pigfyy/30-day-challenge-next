import { db, challengeIdea } from "@/lib/db/drizzle";
import { NewChallengeIdea } from "@/lib/db/drizzle/zod";
import { pc } from "@/lib/db/(root)/pinecone";
import { openai } from "@/lib/util";
import { eq, inArray } from "drizzle-orm";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const prompt = (query: string, challengeList: string) =>
  `Your job is to validate the challenge ideas provided by the user. 
Remove only those challenge ideas that are ENTIRELY irrelevant or unhelpful in contributing to a user's wish. (DO NOT be overly strict. ONLY remove those that are obviously unhelpful). \n\n
USER INPUT STRING: ${query}\n\n
CHALLENGE LIST: ${challengeList}\n\n
Provide the response as an array of challenge idea ID's that should be removed.`;

export async function generateChallengeIdeas(challenges: NewChallengeIdea[]) {
  const data = await db.insert(challengeIdea).values(challenges).returning();

  return data;
}

export type ChallengeIdeaResult = typeof challengeIdea.$inferSelect & {
  score?: number;
};

export async function getChallengeIdeas(
  inputString: string,
): Promise<ChallengeIdeaResult[]> {
  const vector = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: inputString,
  });

  const results = await pc
    .index("30daygen", "30daygen-aj9a4oh.svc.aped-4627-b74a.pinecone.io")
    .namespace("challenge-ideas")
    .query({
      vector: vector.data[0].embedding,
      topK: 10,
      includeMetadata: true,
    });

  // convert results into type: {id, wish, dailyAction}[]
  const challengeList = JSON.stringify(
    results.matches.map((match) => {
      return {
        id: match.id,
        wish: match.metadata?.wish,
        dailyAction: match.metadata?.dailyAction,
      };
    }),
    null,
    2,
  );

  const { object } = await generateObject({
    model: google("gemini-2.0-flash-001"),
    schema: z.object({
      results: z.array(z.string()),
    }),
    prompt: prompt(inputString, challengeList),
  });

  return results.matches
    .filter((match) => !object.results.includes(match.id))
    .map((match) => {
      const url = String(match.metadata?.url || "");
      let sourceName = "";
      try {
        const urlObj = new URL(url);
        sourceName = urlObj.hostname.replace(/^www\./, "");
      } catch {
        sourceName = "Unknown Source";
      }

      return {
        id: parseInt(match.id),
        index: parseInt(match.id),
        title: String(match.metadata?.title || ""),
        wish: String(match.metadata?.wish || ""),
        dailyAction: String(match.metadata?.dailyAction || ""),
        description: String(match.metadata?.description || ""),
        sourceName,
        sourceLink: url,
        score: match.score,
      };
    });
}

export async function getChallengeIdea(challengeId: string) {
  const result = await db
    .select()
    .from(challengeIdea)
    .where(eq(challengeIdea.id, parseInt(challengeId)));

  return result.length > 0 ? result[0] : null;
}
