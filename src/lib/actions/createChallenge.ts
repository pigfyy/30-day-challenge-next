"use server";

import { z } from "zod";
import { createChallenge } from "../db/challenge";
import { findUserByClerkId } from "../db/user";
import { auth } from "@clerk/nextjs/server";
import { challengeFormSchema } from "@/components/ChallengeForms";
import { revalidatePath } from "next/cache";

export const handleSubmit = async (
  values: z.infer<typeof challengeFormSchema>,
) => {
  const { userId: clerkId } = await auth();

  const userId = (await findUserByClerkId(clerkId!)).id;

  await createChallenge({
    ...values,
    userId,
  });

  revalidatePath("/");
};
