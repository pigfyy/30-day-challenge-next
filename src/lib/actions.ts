"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db/(root)/prisma";
import { uploadImage } from "./db/dailyProgress";
import { Challenge } from "@prisma/client";

export async function handleDailyProgressImageUpload(file: File) {
  const url = await uploadImage(file, "progress-image.png");

  return url;
}

// FOR DEV DIALOG
export async function deleteDailyProgressAction(challengeId: string) {
  await prisma.dailyProgress.deleteMany({
    where: { challengeId },
  });

  revalidatePath("/");
}

export async function changeDates(
  challenge: Challenge,
  startDateObj: Date,
  endDateObj: Date,
) {
  await prisma.challenge.update({
    where: { id: challenge.id },
    data: {
      startDate: startDateObj,
      endDate: endDateObj,
    },
  });

  await prisma.dailyProgress.deleteMany({
    where: {
      challengeId: challenge.id,
      date: { lt: startDateObj, gt: endDateObj },
    },
  });
}
