import { challenge, dailyProgress, db, user } from "@/lib/db/drizzle";
import { NewChallenge } from "@/lib/db/drizzle/zod";
import { desc, eq, and, exists, sql } from "drizzle-orm";
import { deleteImage } from "./dailyProgress";

export type CreateChallengeInput = NewChallenge;

export const createChallenge = async (
  challengeInformation: CreateChallengeInput,
) => {
  try {
    const [data] = await db
      .insert(challenge)
      .values({ ...challengeInformation })
      .returning();

    return data;
  } catch (error) {
    console.error("Error creating challenge:", error);
    throw new Error("Error creating challenge");
  }
};

export type UpdateChallengeInput = Partial<typeof challenge.$inferSelect> & {
  id: string;
};

export const updateChallenge = async (
  challengeInformation: UpdateChallengeInput,
) => {
  const [data] = await db
    .update(challenge)
    .set(challengeInformation)
    .where(eq(challenge.id, challengeInformation.id))
    .returning();

  return data;
};

export const deleteChallenge = async (challengeId: string) => {
  try {
    await db.transaction(async (tx) => {
      const exclusiveDaysCount = await tx
        .select({ count: sql<number>`count(*)` })
        .from(dailyProgress)
        .where(
          and(
            eq(dailyProgress.challengeId, challengeId),
            eq(dailyProgress.completed, true),
            sql`NOT EXISTS (
            SELECT 1 FROM "DailyProgress" dp2 
            WHERE dp2."userId" = ${dailyProgress.userId}
            AND DATE_TRUNC('day', dp2."date" AT TIME ZONE 'America/Los_Angeles') = DATE_TRUNC('day', ${dailyProgress.date} AT TIME ZONE 'America/Los_Angeles')
            AND dp2."challengeId" != ${challengeId}
            AND dp2."completed" = true
          )`,
          ),
        );

      const exclusiveDaysCountLast30Days = await tx
        .select({ count: sql<number>`count(*)` })
        .from(dailyProgress)
        .where(
          and(
            eq(dailyProgress.challengeId, challengeId),
            eq(dailyProgress.completed, true),
            sql`DATE_TRUNC('day', ${dailyProgress.date} AT TIME ZONE 'America/Los_Angeles') >= DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Los_Angeles') - INTERVAL '29 day'`,
            sql`NOT EXISTS (
            SELECT 1 FROM "DailyProgress" dp2 
            WHERE dp2."userId" = ${dailyProgress.userId}
            AND DATE_TRUNC('day', dp2."date" AT TIME ZONE 'America/Los_Angeles') = DATE_TRUNC('day', ${dailyProgress.date} AT TIME ZONE 'America/Los_Angeles')
            AND dp2."challengeId" != ${challengeId}
            AND dp2."completed" = true
          )`,
          ),
        );

      const imageUrls = await tx
        .select({ imageUrl: dailyProgress.imageUrl })
        .from(dailyProgress)
        .where(eq(dailyProgress.challengeId, challengeId));
      await Promise.all(
        imageUrls
          .map((imageUrl) => imageUrl.imageUrl)
          .filter((url): url is string => !!url)
          .map((validUrl) => deleteImage(validUrl)),
      );

      await tx
        .delete(dailyProgress)
        .where(eq(dailyProgress.challengeId, challengeId));

      const [deletedChallenge] = await tx
        .delete(challenge)
        .where(eq(challenge.id, challengeId))
        .returning();

      if (!deletedChallenge) {
        throw new Error("Challenge not found");
      }

      await tx
        .update(user)
        .set({
          completedDays: sql`${user.completedDays} - ${exclusiveDaysCount[0]?.count || 0}`,
          completedDaysInLast30Days: sql`${user.completedDaysInLast30Days} - ${exclusiveDaysCountLast30Days[0]?.count || 0}`,
        })
        .where(eq(user.id, deletedChallenge.userId));

      return deletedChallenge;
    });
  } catch (error) {
    console.error("Error deleting challenge:", error);
    throw error;
  }
};

export const getChallenges = async (
  userId: string,
  includeDailyProgressData = false,
) => {
  if (includeDailyProgressData) {
    const data = await db
      .select({
        challenge: challenge,
        dailyProgress: dailyProgress,
      })
      .from(challenge)
      .leftJoin(dailyProgress, eq(challenge.id, dailyProgress.challengeId))
      .where(eq(challenge.userId, userId))
      .orderBy(desc(challenge.startDate));

    const challengeMap = new Map();

    data.forEach((row) => {
      if (!challengeMap.has(row.challenge.id)) {
        challengeMap.set(row.challenge.id, {
          ...row.challenge,
          dailyProgress: [],
        });
      }

      if (row.dailyProgress) {
        challengeMap
          .get(row.challenge.id)
          .dailyProgress.push(row.dailyProgress);
      }
    });

    return Array.from(challengeMap.values());
  }

  return await db
    .select()
    .from(challenge)
    .where(eq(challenge.userId, userId))
    .orderBy(desc(challenge.startDate));
};

export const getChallenge = async (challengeId: string) => {
  const data = await db
    .select({
      challenge: challenge,
      dailyProgress: dailyProgress,
    })
    .from(challenge)
    .leftJoin(dailyProgress, eq(challenge.id, dailyProgress.challengeId))
    .where(eq(challenge.id, challengeId));

  if (!data || data.length === 0) return null;

  const challengeData = data[0].challenge;
  const dailyProgressArray = data
    .map((row) => row.dailyProgress)
    .filter((dp): dp is typeof dailyProgress.$inferSelect => dp !== null);

  return {
    ...challengeData,
    dailyProgress: dailyProgressArray,
  };
};
