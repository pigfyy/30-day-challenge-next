import { createChallenge } from "@/lib/prisma/challenge";
import { findUserByClerkId } from "@/lib/prisma/user";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  wish: z.string(),
  dailyAction: z.string(),
  clerkId: z.string(),
});

type schema = z.infer<typeof schema>;

const handleValidatedData = async (data: schema) => {
  try {
    const { title, wish, dailyAction, clerkId } = data;
    const { id } = await findUserByClerkId(clerkId);

    return await createChallenge({
      title: title,
      wish: wish,
      dailyAction: dailyAction,
      userId: id,
    });
  } catch (e) {
    throw new Error("Failed to create challenge");
  }
};

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsedData = schema.parse(body);

    const data = await handleValidatedData(parsedData);

    return NextResponse.json({
      message: "Challenge created successfully",
      data: data,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
