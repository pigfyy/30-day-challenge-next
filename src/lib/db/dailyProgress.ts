import { db, dailyProgress, user } from "@/lib/db/drizzle";
import {
  ChallengeWithDailyProgress,
  DailyProgress,
  NewDailyProgress,
} from "@/lib/db/drizzle/zod";
import { base64ToBlob } from "../util";
import { put, del } from "@vercel/blob";
import { eq, and, sql, notExists, exists, SQL } from "drizzle-orm";

export const editDailyProgressCompletion = async (
  progressInformation: NewDailyProgress,
  existingRecord: NewDailyProgress | undefined,
) => {
  const recordId = progressInformation.id!;

  return await db.transaction(async (tx) => {
    const updatedProgressEntries = existingRecord
      ? await tx
          .update(dailyProgress)
          .set({
            completed: progressInformation.completed,
            imageUrl: progressInformation.imageUrl,
            note: progressInformation.note,
          })
          .where(eq(dailyProgress.id, recordId))
          .returning()
      : await tx
          .insert(dailyProgress)
          .values({
            ...progressInformation,
            id: recordId,
            completed: progressInformation.completed ?? true,
          })
          .returning();

    if (!updatedProgressEntries || updatedProgressEntries.length === 0) {
      console.error(
        `Failed to update dailyProgress for recordId: ${recordId}. User stats not updated.`,
      );
      throw new Error(
        `DailyProgress record ${recordId} not found or update failed.`,
      );
    }
    const updatedEntry = updatedProgressEntries[0];

    const hasCompletionChanged =
      existingRecord?.completed !== progressInformation.completed;

    if (!hasCompletionChanged) {
      return updatedEntry;
    }

    const userIdForUpdate = updatedEntry.userId;
    const dateForCondition = updatedEntry.date;

    const count = await tx
      .select({ count: sql<number>`count(*)` })
      .from(dailyProgress)
      .where(
        and(
          eq(dailyProgress.userId, userIdForUpdate),
          eq(dailyProgress.completed, true),
          sql`DATE(${dailyProgress.date} AT TIME ZONE 'America/Los_Angeles') = DATE(${dateForCondition} AT TIME ZONE 'America/Los_Angeles')`,
        ),
      )
      .limit(1);

    if (progressInformation.completed && count[0].count < 2) {
      const setClauseUpdate: {
        completedDays: SQL;
        completedDaysInLast30Days?: SQL;
      } = {
        completedDays: sql`${user.completedDays} + 1`,
      };
      if (updatedEntry.date) {
        setClauseUpdate.completedDaysInLast30Days = sql`
          CASE
            WHEN ${updatedEntry.date} >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Los_Angeles') - INTERVAL '29 day')
            THEN ${user.completedDaysInLast30Days} + 1
            ELSE ${user.completedDaysInLast30Days}
          END
        `;
      }
      await tx
        .update(user)
        .set(setClauseUpdate)
        .where(and(eq(user.id, userIdForUpdate)));
    } else if (!progressInformation.completed && count[0].count < 1) {
      const setClauseUpdate: {
        completedDays: SQL;
        completedDaysInLast30Days?: SQL;
      } = {
        completedDays: sql`${user.completedDays} - 1`,
      };
      if (updatedEntry.date) {
        setClauseUpdate.completedDaysInLast30Days = sql`
          CASE
            WHEN ${updatedEntry.date} >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Los_Angeles') - INTERVAL '29 day')
            THEN ${user.completedDaysInLast30Days} - 1
            ELSE ${user.completedDaysInLast30Days}
          END
        `;
      }
      await tx
        .update(user)
        .set(setClauseUpdate)
        .where(and(eq(user.id, userIdForUpdate)));
    }

    return updatedEntry;
  });
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
