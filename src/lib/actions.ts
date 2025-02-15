"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db/(root)/prisma";
import { uploadImage } from "./db/dailyProgress";

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
