"use server";

import { DailyProgressOptionalDefaults } from "@30-day-challenge/prisma-zod";
import { Challenge, DailyProgress } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  deleteImage,
  editDailyProgressCompletion,
  uploadImage,
} from "../db/dailyProgress";
import { gridData } from "../util/dates";

export async function modifyDailyProgress(
  item: gridData[number],
  challenge: Challenge,
  overrideCompleted?: boolean,
) {
  const newCompleted =
    overrideCompleted !== undefined
      ? overrideCompleted
      : item.dailyProgress
        ? !item.dailyProgress.completed
        : true;

  const progressInformation: DailyProgressOptionalDefaults = {
    id: item.dailyProgress?.id,
    imageUrl: item.dailyProgress?.imageUrl,
    completed: newCompleted,
    challengeId: challenge.id,
    date: item.dateValue,
    userId: challenge.userId,
  };

  await editDailyProgressCompletion(progressInformation);
  revalidatePath("/");
}

export async function handleDailyProgressUpdateSubmit(
  file: File | string | null,
  challenge: Challenge,
  day: DailyProgress | undefined,
  date: Date,
) {
  if (typeof file === "string" || (file === null && (!day || !day.imageUrl))) {
    return;
  }

  if (file) {
    const url = await uploadImage(file, "progress-image.png");

    const priorProgressInformation: DailyProgressOptionalDefaults = day || {
      completed: false,
      date: date,
      challengeId: challenge.id,
      userId: challenge.userId,
    };

    if (!priorProgressInformation) {
      throw new Error("No prior progress information found");
    }

    await editDailyProgressCompletion({
      ...priorProgressInformation,
      imageUrl: url,
    });
  } else if (day) {
    await Promise.all([
      deleteImage(day.imageUrl),
      editDailyProgressCompletion({
        ...day,
        imageUrl: "",
      }),
    ]);
  }

  revalidatePath("/");
}

export async function handleDailyProgressImageUpload(file: File) {
  const url = await uploadImage(file, "progress-image.png");

  return url;
}
