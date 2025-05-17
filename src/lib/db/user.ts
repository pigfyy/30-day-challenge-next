import { db, user, dailyProgress, challenge } from "@/lib/db/drizzle";
import { NewUser } from "@/lib/db/drizzle/zod";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const findUserByClerkId = async (clerkId: string) => {
  const data = await db
    .select()
    .from(user)
    .where(eq(user.clerkId, clerkId))
    .execute();

  if (!data || data.length === 0)
    throw Error(`User with clerkId ${clerkId} not found`);
  return data[0];
};

export const createUser = async (userInformation: NewUser) => {
  const [data] = await db.insert(user).values(userInformation).returning();
  return data;
};

export const deleteUser = async (clerkId: string) => {
  const userId = await findUserByClerkId(clerkId);
  await db.delete(dailyProgress).where(eq(dailyProgress.userId, userId.id));
  await db.delete(challenge).where(eq(challenge.userId, userId.id));
  await db.delete(user).where(eq(user.id, userId.id));
};
