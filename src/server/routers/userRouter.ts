import { router, procedure } from "@/server/init";
import { z } from "zod";
import { db, user } from "@/lib/db/drizzle";
import { eq, sql } from "drizzle-orm";

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
  getUserPercentiles: procedure.query(async ({ ctx }) => {
    if (!ctx.clerkUserId) {
      throw new Error("Not authenticated");
    }

    try {
      const lifetimePercentileExpr = sql<number>`
        ROUND(
          (PERCENT_RANK() OVER (ORDER BY ${user.completedDays}) * 100)::numeric,
          1
        )
      `.as("lifetimePercentile");

      const last30DaysPercentileExpr = sql<number>`
        ROUND(
          (PERCENT_RANK() OVER (ORDER BY ${user.completedDaysInLast30Days}) * 100)::numeric,
          1
        )
      `.as("last30DaysPercentile");

      const rankedUsersSubquery = db
        .select({
          clerkId: user.clerkId,
          lifetimePercentile: lifetimePercentileExpr,
          last30DaysPercentile: last30DaysPercentileExpr,
        })
        .from(user)
        .as("ranked_users");

      const results = await db
        .select({
          lifetimePercentile: rankedUsersSubquery.lifetimePercentile,
          last30DaysPercentile: rankedUsersSubquery.last30DaysPercentile,
        })
        .from(rankedUsersSubquery)
        .where(eq(rankedUsersSubquery.clerkId, ctx.clerkUserId))
        .limit(1);

      const percentileData = results[0];

      return {
        lifetimePercentile: percentileData?.lifetimePercentile || 0,
        last30DaysPercentile: percentileData?.last30DaysPercentile || 0,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error getting user percentiles");
    }
  }),
});
