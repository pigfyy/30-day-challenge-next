import { getChallenges } from "@/lib/prisma/challenge";
import { findUserByClerkId } from "@/lib/prisma/user";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  clerkId: z.string(),
});

type schema = z.infer<typeof schema>;

const handleValidatedData = async ({ clerkId }: schema) => {
  try {
    const { id } = await findUserByClerkId(clerkId);

    const data = await getChallenges(id);

    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch challenges");
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = schema.parse(body);

    const data = await handleValidatedData(parsedData);

    return NextResponse.json(
      { message: "Challenge data successfully fetched", data: data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }

    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
