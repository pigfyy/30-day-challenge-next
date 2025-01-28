import { ChallengeIdea } from "@prisma/client";
import { prisma } from "./(root)/prisma";
import { ChallengeIdeaOptionalDefaults } from "@30-day-challenge/prisma-zod";
import { getChallenges } from "@/lib/db/challenge";
import { findUserByClerkId } from "@/lib/db/user";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateRequest, handleError } from "@/lib/util/routeUtils";
import { openai } from "@/lib/util";
import { pc } from "@/lib/db/(root)/pinecone";

export async function generateChallengeIdeas(
  challenges: ChallengeIdeaOptionalDefaults[]
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
