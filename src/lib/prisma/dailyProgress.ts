import { DailyProgressOptionalDefaults } from "@30-day-challenge/prisma-zod";
import { prisma } from "./(root)/prisma";

export const editDailyProgressCompletion = async (
  progressInformation: DailyProgressOptionalDefaults
) => {
  const data = await prisma.dailyProgress.create({
    data: progressInformation,
  });

  return data;
};
