import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/(root)/prisma";
import type { NextRequest } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createContext({ req }: { req: Request }) {
  const nextReq = req as NextRequest;
  const { userId } = getAuth(nextReq);

  let user = null;
  const maxRetries = 15;
  const retryDelay = 1000;

  if (userId) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        user = await prisma.user.findUnique({
          where: { clerkId: userId },
        });

        if (user) {
          break;
        }
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
      }

      if (attempt < maxRetries) {
        await delay(retryDelay);
      }
    }

    if (!user) {
      throw new Error(
        `User with clerkId ${userId} not found after ${maxRetries} attempts`,
      );
    }
  }

  return { clerkUserId: userId, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
