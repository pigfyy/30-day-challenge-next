import { generateChallengeIdeas } from "@/lib/db/challengeIdeas";
import { handleError, validateRequest } from "@/lib/util/routeUtils";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.array(
  z.object({
    index: z.number(),
    title: z.string(),
    wish: z.string(),
    dailyAction: z.string(),
    description: z.string(),
    source_name: z.string(),
    source_link: z.string(),
  })
);

type schema = z.infer<typeof schema>;

const handleValidatedData = async (data: schema) => {
  try {
    const challenges = data;

    return await generateChallengeIdeas(challenges);
  } catch (e) {
    throw new Error("Failed to create challenge");
  }
};

export async function PUT(req: Request) {
  try {
    const parsedData = await validateRequest(schema, req);

    const data = await handleValidatedData(parsedData);

    return NextResponse.json({
      message: "Challenge created successfully",
      data: data,
    });
  } catch (error) {
    handleError(error);
  }
}
