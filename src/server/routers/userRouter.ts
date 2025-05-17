import { router, procedure } from "@/server/init";
import { z } from "zod";
import { db, user } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";

export const userRouter = router({
  getUser: procedure.query(async ({ ctx }) => {
    if (!ctx.clerkUserId) {
      throw new Error("Not authenticated");
    }
    const users = await db
      .select()
      .from(user)
      .where(eq(user.clerkId, ctx.clerkUserId));
    return users[0] || null;
  }),
});
