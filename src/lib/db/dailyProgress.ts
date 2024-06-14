import { DailyProgressOptionalDefaults } from "@30-day-challenge/prisma-zod";
import { prisma } from "./(root)/prisma";

export const editDailyProgressCompletion = async (
  progressInformation: DailyProgressOptionalDefaults
) => {
  const data = await prisma.dailyProgress.upsert({
    where: {
      id: progressInformation.id ?? "", // Provide a fallback for `id` when it's undefined
    },
    update: {
      completed: progressInformation.completed,
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
