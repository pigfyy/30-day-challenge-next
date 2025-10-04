import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateChallenge } from "@/lib/db/challenge";
import { updateChallengeSchema } from "@/lib/db/drizzle/zod";
import { z } from "zod";

const updateChallengeRequestSchema = updateChallengeSchema.extend({
  id: z.string().min(1, "Challenge ID is required"),
});

export async function PUT(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (body.startDate && typeof body.startDate === "string") {
      body.startDate = new Date(body.startDate);
    }
    if (body.endDate && typeof body.endDate === "string") {
      body.endDate = new Date(body.endDate);
    }

    const validationResult = updateChallengeRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 },
      );
    }

    const challengeData = validationResult.data;

    const updatedChallenge = await updateChallenge(challengeData);

    return NextResponse.json(updatedChallenge);
  } catch (error) {
    console.error("Error updating challenge:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}