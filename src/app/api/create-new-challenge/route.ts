import { createChallenge } from "@/lib/prisma/challenge";
import { findUserByClerkId } from "@/lib/prisma/user";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  clerkId: z.string(),
});

type schema = z.infer<typeof schema>;

const handleValidData = async (data: schema) => {
  try {
    const { title, description, clerkId } = data;
    const { id } = await findUserByClerkId(clerkId);

    return await createChallenge({
      title: title,
      description: description,
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

    const data = await handleValidData(parsedData);

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
