import { challenge, dailyProgress, db, user } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";

export const findUserById = async (userId: string, noThrow?: boolean) => {
  const data = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .execute();

  if (!noThrow && (!data || data.length === 0))
    throw Error(`User with id ${userId} not found`);
  return data[0];
};

export const findUserByEmail = async (email: string, noThrow?: boolean) => {
  const data = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .execute();

  if (!noThrow && (!data || data.length === 0))
    throw Error(`User with email ${email} not found`);
  return data[0];
};

export const deleteUser = async (userId: string) => {
  const userData = await findUserById(userId);
  await db.delete(dailyProgress).where(eq(dailyProgress.userId, userData.id));
  await db.delete(challenge).where(eq(challenge.userId, userData.id));
  await db.delete(user).where(eq(user.id, userData.id));
};
