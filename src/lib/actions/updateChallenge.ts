"use server";

import { Challenge } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getChallenges } from "../db/challenge";
import { findUserByClerkId } from "../db/user";
import { auth } from "@clerk/nextjs/server";
import { updateChallenge } from "../db/challenge";

export const handleChallengeUpdate = async (challenge: Challenge) => {
  await updateChallenge({
    ...challenge,
  });
  revalidatePath("/");
};

// export const updateChallengeTemp = async (
//   challenge: Challenge,
//   note: string
// ) => {
//   await updateChallenge({
//     ...challenge,
//     note,
//   });
// };
