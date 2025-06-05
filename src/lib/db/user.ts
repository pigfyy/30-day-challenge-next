import { db, clerkUser, dailyProgress, challenge } from "@/lib/db/drizzle";
import { NewClerkUser } from "@/lib/db/drizzle/zod";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const findUserByClerkId = async (clerkId: string, noThrow?: boolean) => {
  const data = await db
    .select()
    .from(clerkUser)
    .where(eq(clerkUser.clerkId, clerkId))
    .execute();

  if (!noThrow && (!data || data.length === 0))
    throw Error(`User with clerkId ${clerkId} not found`);
  return data[0];
};

export const createUser = async (userInformation: NewClerkUser) => {
  const [data] = await db.insert(clerkUser).values(userInformation).returning();
  return data;
};

export const deleteUser = async (clerkId: string) => {
  const userId = await findUserByClerkId(clerkId);
  await db.delete(dailyProgress).where(eq(dailyProgress.userId, userId.id));
  await db.delete(challenge).where(eq(challenge.userId, userId.id));
  await db.delete(clerkUser).where(eq(clerkUser.id, userId.id));
};
