import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteChallenge } from "@/lib/db/challenge";
import { z } from "zod";

const deleteChallengeSchema = z.object({
  challengeId: z.string().min(1, "Challenge ID is required"),
});

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validationResult = deleteChallengeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 },
      );
    }

    const { challengeId } = validationResult.data;

    const deletedChallenge = await deleteChallenge(challengeId);

    return NextResponse.json(deletedChallenge);
  } catch (error) {
    console.error("Error deleting challenge:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
