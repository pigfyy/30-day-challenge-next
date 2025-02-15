import { router, procedure } from "@/server/init";
import { z } from "zod";
import { prisma } from "@/lib/db/(root)/prisma";

export const userRouter = router({
  getUser: procedure.query(async ({ ctx }) => {
    if (!ctx.clerkUserId) {
      throw new Error("Not authenticated");
    }
    const user = await prisma.user.findFirst({
      where: { clerkId: ctx.clerkUserId },
    });
    return user;
  }),
});
