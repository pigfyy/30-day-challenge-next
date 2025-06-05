import { getAuth } from "@clerk/nextjs/server";
import { db, clerkUser } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createContext({ req }: { req: Request }) {
  const nextReq = req as NextRequest;
  const { userId } = getAuth(nextReq);

  let foundUser = null;
  const maxRetries = 15;
  const retryDelay = 1000;

  if (userId) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const users = await db
          .select()
          .from(clerkUser)
          .where(eq(clerkUser.clerkId, userId));

        if (users && users.length > 0) {
          foundUser = users[0];
          break;
        }
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
      }

      if (attempt < maxRetries) {
        await delay(retryDelay);
      }
    }

    if (!foundUser) {
      throw new Error(
        `User with clerkId ${userId} not found after ${maxRetries} attempts`,
      );
    }
  }

  return { clerkUserId: userId, user: foundUser };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
