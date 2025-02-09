"use server";

import { challengeFormSchema } from "@/components/ChallengeForms";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createChallenge } from "../db/challenge";
import { CFindUserByClerkId } from "../db/user";

export const handleSubmit = async (
  values: z.infer<typeof challengeFormSchema>,
) => {
  const { userId: clerkId } = await auth();

  const userId = (await CFindUserByClerkId(clerkId!)).id;

  const newChallenge = await createChallenge({
    ...values,
    userId,
  });

  revalidatePath("/");

  return newChallenge;
};
