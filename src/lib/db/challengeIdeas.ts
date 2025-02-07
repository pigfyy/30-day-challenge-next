import { pc } from "@/lib/db/(root)/pinecone";
import { openai } from "@/lib/util";
import { ChallengeIdeaOptionalDefaults } from "@30-day-challenge/prisma-zod";
import { prisma } from "./(root)/prisma";

export async function generateChallengeIdeas(
  challenges: ChallengeIdeaOptionalDefaults[],
) {
  const data = prisma.challengeIdea.createMany({
    data: challenges,
  });

  return data;
}

export async function getChallengeIdeas(inputString: string) {
  const vector = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: inputString,
  });

  const results = await pc
    .index("challenge-ideas")
    .namespace("challenges-ideas")
    .query({
      vector: vector.data[0].embedding,
      topK: 10,
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
