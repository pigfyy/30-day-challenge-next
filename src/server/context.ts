import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/(root)/prisma";
import type { NextRequest } from "next/server";

export async function createContext({ req }: { req: Request }) {
  const nextReq = req as NextRequest;

  const { userId } = getAuth(nextReq);

  let user = null;

  if (userId) {
    user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
  }

  return { clerkUserId: userId, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
