import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { user } from "@/lib/db/drizzle/auth-schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function createContext({ req }: { req?: NextRequest } = {}) {
  if (!req) {
    return { user: undefined };
  }

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user?.id) {
    return { user: undefined };
  }

  return {
    user: session.user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
