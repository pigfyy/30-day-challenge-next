"use server";

import { Challenge } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { deleteChallenge, updateChallenge } from "../db/challenge";

export const handleChallengeUpdate = async (challenge: Challenge) => {
  await updateChallenge({
    ...challenge,
  });
  revalidatePath("/");
};

export const handleChallengeDelete = async (challengeId: string) => {
  await deleteChallenge(challengeId);
  revalidatePath("/");
};
