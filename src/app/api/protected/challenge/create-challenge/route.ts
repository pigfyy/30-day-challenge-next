import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createChallenge } from "@/lib/db/challenge";
import { insertChallengeSchema } from "@/lib/db/drizzle/zod";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Convert date strings to Date objects if they exist
    if (body.startDate && typeof body.startDate === "string") {
      body.startDate = new Date(body.startDate);
    }
    if (body.endDate && typeof body.endDate === "string") {
      body.endDate = new Date(body.endDate);
    }

    const validationResult = insertChallengeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 },
      );
    }

    const challengeData = validationResult.data;

    const challenge = await createChallenge(challengeData);

    return NextResponse.json(challenge);
  } catch (error) {
    console.error("Error creating challenge:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
