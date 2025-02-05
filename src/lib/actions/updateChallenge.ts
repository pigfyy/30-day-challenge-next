"use server";

import { Challenge } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { updateChallenge } from "../db/challenge";

export const handleChallengeUpdate = async (challenge: Challenge) => {
  await updateChallenge({
    ...challenge,
  });
  revalidatePath("/");
};
