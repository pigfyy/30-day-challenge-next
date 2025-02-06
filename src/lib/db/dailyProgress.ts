import { DailyProgressOptionalDefaults } from "@30-day-challenge/prisma-zod";
import { prisma } from "./(root)/prisma";
import { base64ToBlob } from "../util";
import { put, del } from "@vercel/blob";

export const editDailyProgressCompletion = async (
  progressInformation: DailyProgressOptionalDefaults,
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
  challengeId: string | undefined,
) => {
  const whereClause = challengeId ? { userId, challengeId } : { userId };
  return await prisma.dailyProgress.findMany({
    where: whereClause,
    orderBy: { date: "asc" },
  });
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
