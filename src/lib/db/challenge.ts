import { Challenge } from "@/lib/db/prisma-zod-types";
import { prisma } from "./(root)/prisma";
import { addDays } from "date-fns";
import { cache } from "react";
import { deleteImage } from "./dailyProgress";

export type CreateChallengeInput = Omit<
  Challenge,
  "id" | "createdAt" | "updatedAt" | "note"
>;
export const createChallenge = async (
  challengeInformation: CreateChallengeInput,
) => {
  const data = await prisma.challenge.create({
    data: challengeInformation,
  });

  return data;
};

export type UpdateChallengeInput = Omit<
  Challenge,
  "userId" | "createdAt" | "updatedAt" | "startDate" | "endDate"
>;
export const updateChallenge = async (
  challengeInformation: UpdateChallengeInput,
) => {
  const data = await prisma.challenge.update({
    where: { id: challengeInformation.id },
    data: challengeInformation,
  });

  return data;
};

export const deleteChallenge = async (challengeId: string) => {
  try {
    const imageUrls = await prisma.dailyProgress.findMany({
      where: { challengeId: challengeId },
      select: { imageUrl: true },
    });

    await Promise.all(
      imageUrls
        .map((imageUrl) => imageUrl.imageUrl)
        .filter((url) => url)
        .map((validUrl) => deleteImage(validUrl)),
    );

    await prisma.dailyProgress.deleteMany({
      where: { challengeId: challengeId },
    });

    await prisma.challenge.deleteMany({
      where: { id: challengeId },
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
  const data = await prisma.challenge.findMany({
    where: { userId: userId },
    orderBy: { startDate: "desc" },
    include: {
      dailyProgress: includeDailyProgressData
        ? {
            orderBy: { date: "asc" },
          }
        : false,
    },
  });

  return data;
};

export const getChallenge = async (challengeId: string) => {
  const data = await prisma.challenge.findUnique({
    where: { id: challengeId },
    include: {
      dailyProgress: true,
    },
  });

  return data;
};
