"use server";

import { Challenge } from "@prisma/client";
import { gridData } from "../util/dates";
import { editDailyProgressCompletion } from "../db/dailyProgress";
import { DailyProgressOptionalDefaults } from "@30-day-challenge/prisma-zod";
import { revalidatePath } from "next/cache";

export async function modifyDailyProgress(
  item: gridData[number],
  challenge: Challenge,
) {
  const progressInformation: DailyProgressOptionalDefaults = {
    id: item.dailyProgress?.id,
    imageUrl: item.dailyProgress?.imageUrl,
    completed: item.dailyProgress ? !item.dailyProgress?.completed : true,
    challengeId: challenge.id,
    date: item.dateValue,
    userId: challenge.userId,
  };

  await editDailyProgressCompletion(progressInformation);

  revalidatePath("/");
}
