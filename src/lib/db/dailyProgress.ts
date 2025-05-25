import { db, dailyProgress, user } from "@/lib/db/drizzle";
import { NewDailyProgress } from "@/lib/db/drizzle/zod";
import { base64ToBlob } from "../util";
import { put, del } from "@vercel/blob";
import { eq, and, sql } from "drizzle-orm";

export const editDailyProgressCompletion = async (
  progressInformation: NewDailyProgress,
) => {
  const recordId = progressInformation.id!;

  const existingRecord = await db
    .select({ id: dailyProgress.id })
    .from(dailyProgress)
    .where(eq(dailyProgress.id, recordId))
    .limit(1);

  if (existingRecord.length > 0) {
    return await db.transaction(async (tx) => {
      const data = await tx
        .update(dailyProgress)
        .set({
          completed: progressInformation.completed,
          imageUrl: progressInformation.imageUrl,
          note: progressInformation.note,
        })
        .where(eq(dailyProgress.id, recordId))
        .returning();

      await tx
        .update(user)
        .set({
          completedDays: sql`${user.completedDays} ${progressInformation.completed ? sql`+ 1` : sql`- 1`}`,
        })
        .where(eq(user.id, progressInformation.userId));

      return data[0];
    });
  } else {
    return await db.transaction(async (tx) => {
      const data = await tx
        .insert(dailyProgress)
        .values({
          ...progressInformation,
          id: recordId,
          completed: progressInformation.completed ?? true,
        })
        .returning();

      await tx
        .update(user)
        .set({
          completedDays: sql`${user.completedDays} + 1`,
        })
        .where(eq(user.id, progressInformation.userId));

      return data[0];
    });
  }
};

export const viewDailyProgressCompletion = async (
  userId: string,
  challengeId: string | undefined,
) => {
  const query = challengeId
    ? and(
        eq(dailyProgress.userId, userId),
        eq(dailyProgress.challengeId, challengeId),
      )
    : eq(dailyProgress.userId, userId);

  return await db
    .select()
    .from(dailyProgress)
    .where(query)
    .orderBy(dailyProgress.date);
};

export async function uploadImage(
  base64: string,
  filename: string,
): Promise<string>;
export async function uploadImage(
  file: File,
  filename: string,
): Promise<string>;

export async function uploadImage(
  input: string | File,
  filename: string,
): Promise<string> {
  const fileBlob =
    typeof input === "string"
      ? (() => {
          const mimeType = input.split(";")[0].split(":")[1];
          return base64ToBlob(input, mimeType);
        })()
      : input;

  const blob = await put(filename, fileBlob, {
    access: "public",
  });

  return blob.url;
}

export async function deleteImage(url: string) {
  await del(url);
}
