import { db, challenge, dailyProgress } from "@/lib/db/drizzle";
import { NewChallenge } from "@/lib/db/drizzle/zod";
import { addDays } from "date-fns";
import { cache } from "react";
import { deleteImage } from "./dailyProgress";
import { eq } from "drizzle-orm";

export type CreateChallengeInput = NewChallenge;

export const createChallenge = async (
  challengeInformation: CreateChallengeInput,
) => {
  const [data] = await db
    .insert(challenge)
    .values(challengeInformation)
    .returning();

  return data;
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
    const imageUrls = await db
      .select({ imageUrl: dailyProgress.imageUrl })
      .from(dailyProgress)
      .where(eq(dailyProgress.challengeId, challengeId));

    await Promise.all(
      imageUrls
        .map((imageUrl) => imageUrl.imageUrl)
        .filter((url): url is string => !!url)
        .map((validUrl) => deleteImage(validUrl)),
    );

    await db
      .delete(dailyProgress)
      .where(eq(dailyProgress.challengeId, challengeId));

    await db.delete(challenge).where(eq(challenge.id, challengeId));
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
      .orderBy(challenge.startDate);

    // Group the results by challenge and nest the daily progress
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
    .orderBy(challenge.startDate);
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

  // Transform the flat data into nested structure
  const challengeData = data[0].challenge;
  const dailyProgressArray = data
    .map((row) => row.dailyProgress)
    .filter((dp): dp is typeof dailyProgress.$inferSelect => dp !== null);

  return {
    ...challengeData,
    dailyProgress: dailyProgressArray,
  };
};
