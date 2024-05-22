import { getChallenges } from "@/lib/prisma/challenge";
import { findUserByClerkId } from "@/lib/prisma/user";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateRequest, handleError } from "@/lib/util/routeUtils";

const schema = z.object({
  clerkId: z.string(),
});

type Schema = z.infer<typeof schema>;

const handleValidatedData = async ({ clerkId }: Schema) => {
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
