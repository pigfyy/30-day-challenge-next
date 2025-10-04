import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { editDailyProgressCompletion } from "@/lib/db/dailyProgress";
import { insertDailyProgressSchema } from "@/lib/db/drizzle/zod";
import { z } from "zod";

const upsertDailyProgressSchema = z.object({
  progressData: insertDailyProgressSchema,
  existingRecord: insertDailyProgressSchema.optional(),
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

    // Convert date strings to Date objects if they exist for progressData
    if (body.progressData?.date && typeof body.progressData.date === "string") {
      body.progressData.date = new Date(body.progressData.date);
    }
    if (
      body.progressData?.createdAt &&
      typeof body.progressData.createdAt === "string"
    ) {
      body.progressData.createdAt = new Date(body.progressData.createdAt);
    }

    // Convert date strings to Date objects if they exist for existingRecord
    if (
      body.existingRecord?.date &&
      typeof body.existingRecord.date === "string"
    ) {
      body.existingRecord.date = new Date(body.existingRecord.date);
    }
    if (
      body.existingRecord?.createdAt &&
      typeof body.existingRecord.createdAt === "string"
    ) {
      body.existingRecord.createdAt = new Date(body.existingRecord.createdAt);
    }

    const validationResult = upsertDailyProgressSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400 },
      );
    }

    const { progressData, existingRecord } = validationResult.data;

    const dailyProgress = await editDailyProgressCompletion(
      progressData,
      existingRecord,
    );

    return NextResponse.json(dailyProgress);
  } catch (error) {
    console.error("Error upserting daily progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
