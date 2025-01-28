import { getChallenges } from "@/lib/db/challenge";
import { findUserByClerkId } from "@/lib/db/user";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateRequest, handleError } from "@/lib/util/routeUtils";
import { getChallengeIdeas } from "@/lib/db/challengeIdeas";
import { openai } from "@/lib/util";
import { pc } from "@/lib/db/(root)/pinecone";

const schema = z.string();

type schema = z.infer<typeof schema>;

const handleValidatedData = async (data: schema) => {
  const challengeIdeas = await getChallengeIdeas(data);
  return challengeIdeas;
};

export async function POST(req: Request) {
  try {
    const parsedData = await validateRequest(schema, req);
    const data = await handleValidatedData(parsedData);

    return NextResponse.json({
      message: "Challenge data successfully fetched",
      data,
    });
  } catch (error) {
    return handleError(error);
  }
}
