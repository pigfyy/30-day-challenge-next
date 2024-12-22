import { DailyProgressOptionalDefaults } from "@30-day-challenge/prisma-zod";
import { prisma } from "./(root)/prisma";
import { base64ToBlob } from "../util";
import { put } from "@vercel/blob";

export const editDailyProgressCompletion = async (
  progressInformation: DailyProgressOptionalDefaults
) => {
  const data = await prisma.dailyProgress.upsert({
    where: {
      id: progressInformation.id ?? "", // Provide a fallback for `id` when it's undefined
    },
    update: {
      completed: progressInformation.completed,
      imageUrl: progressInformation.imageUrl,
    },
    create: {
      ...progressInformation,
      completed: progressInformation.completed ?? true, // Ensure `completed` is set for new records
    },
  });

  return data;
};

export const viewDailyProgressCompletion = async (
  userId: string,
  challengeId: string | undefined
) => {
  const whereClause = challengeId ? { userId, challengeId } : { userId };
  return await prisma.dailyProgress.findMany({
    where: whereClause,
    orderBy: { date: "desc" },
  });
};

export const uploadImage = async (base64: string, filename: string) => {
  const mimeType = base64.split(";")[0].split(":")[1];
  const inputBlob = base64ToBlob(base64, mimeType);

  const blob = await put(filename, inputBlob, {
    access: "public",
  });

  return blob.url;
};
