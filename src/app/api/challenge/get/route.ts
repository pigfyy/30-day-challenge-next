import { getChallenges } from "@/lib/db/challenge";
import { findUserByClerkId } from "@/lib/db/user";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateRequest, handleError } from "@/lib/util/routeUtils";

const schema = z.object({
  clerkId: z.string(),
});

type schema = z.infer<typeof schema>;

const handleValidatedData = async ({ clerkId }: schema) => {
  const { id } = await findUserByClerkId(clerkId);
  return getChallenges(id);
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
