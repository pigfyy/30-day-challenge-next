import { db, dailyProgress } from "@/lib/db/drizzle";
import { NewDailyProgress } from "@/lib/db/drizzle/zod";
import { base64ToBlob } from "../util";
import { put, del } from "@vercel/blob";
import { eq, and } from "drizzle-orm";

export const editDailyProgressCompletion = async (
  progressInformation: NewDailyProgress,
) => {
  if (!progressInformation.id) {
    // Create new record
    const { id, ...insertData } = progressInformation;
    const data = await db
      .insert(dailyProgress)
      .values({
        ...insertData,
        id: crypto.randomUUID(),
        completed: progressInformation.completed ?? true,
      })
      .returning();
    return data[0];
  } else {
    // Update existing record
    const data = await db
      .update(dailyProgress)
      .set({
        completed: progressInformation.completed,
        imageUrl: progressInformation.imageUrl,
        note: progressInformation.note,
      })
      .where(eq(dailyProgress.id, progressInformation.id))
      .returning();
    return data[0];
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
