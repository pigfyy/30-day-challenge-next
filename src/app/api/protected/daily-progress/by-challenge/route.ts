import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { viewDailyProgressCompletion } from "@/lib/db/dailyProgress";
import { z } from "zod";

const getDailyProgressSchema = z.object({
  challengeId: z.string().min(1, "Challenge ID is required"),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validationResult = getDailyProgressSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 },
      );
    }

    const { challengeId } = validationResult.data;
    const userId = session.user.id;

    const dailyProgress = await viewDailyProgressCompletion(userId, challengeId);

    return NextResponse.json(dailyProgress);
  } catch (error) {
    console.error("Error fetching daily progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
