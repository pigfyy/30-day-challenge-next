import { findUserByClerkId } from "@/lib/prisma/user";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  clerkId: z.string(),
});

type schema = z.infer<typeof schema>;

const handleParseData = async ({ clerkId }: schema) => {
  const { id } = await findUserByClerkId(clerkId);
};

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const parsedData = schema.parse(body);

    const data = await handleParseData(parsedData);

    return NextResponse.json({}, { status: 200 });
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
