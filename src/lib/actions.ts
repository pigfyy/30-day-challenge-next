"use server";

import { uploadImage } from "./db/dailyProgress";

export async function handleDailyProgressImageUpload(file: File) {
  const url = await uploadImage(file, "progress-image.png");

  return url;
}
