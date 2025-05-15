import { pc } from "@/lib/db/(root)/pinecone";
import { openai } from "@/lib/util";
import { ChallengeIdeaOptionalDefaults } from "./prisma-zod-types";
import { prisma } from "./(root)/prisma";
import { ChallengeIdea } from "@/lib/db/prisma-zod-types";

export async function generateChallengeIdeas(
  challenges: ChallengeIdeaOptionalDefaults[],
) {
  const data = prisma.challengeIdea.createMany({
    data: challenges,
  });

  return data;
}

export type ChallengeIdeaResult = ChallengeIdea & {
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

  const data = await prisma.challengeIdea.findMany({
    where: {
      index: {
        in: indexes,
      },
    },
    orderBy: {
      index: "asc",
    },
  });

  return data.map((challengeIdea, i) => {
    return {
      score: results.matches[i].score,
      ...challengeIdea,
    };
  });
}
