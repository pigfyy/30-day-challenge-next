import { db, challengeIdea } from "@/lib/db/drizzle";
import { NewChallengeIdea } from "@/lib/db/drizzle/zod";
import { pc } from "@/lib/db/(root)/pinecone";
import { openai } from "@/lib/util";
import { eq, inArray } from "drizzle-orm";

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
    .index("challenge-ideas")
    .namespace("challenges-ideas")
    .query({
      vector: vector.data[0].embedding,
      topK: 15,
      includeMetadata: true,
    });

  const indexes = results.matches.map((match) => {
    return match.metadata?.index as number;
  });

  const data = await db
    .select()
    .from(challengeIdea)
    .where(inArray(challengeIdea.index, indexes))
    .orderBy(challengeIdea.index)
    .execute();

  return data.map((challengeIdea, i) => {
    return {
      score: results.matches[i].score,
      ...challengeIdea,
    };
  });
}
