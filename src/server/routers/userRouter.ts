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

      const lifetimeRankedUsersSubquery = db
        .select({
          clerkId: user.clerkId,
          lifetimePercentile: lifetimePercentileExpr,
        })
        .from(user)
        .where(sql`${user.completedDays} > 0`)
        .as("lifetime_ranked_users");

      const last30DaysRankedUsersSubquery = db
        .select({
          clerkId: user.clerkId,
          last30DaysPercentile: last30DaysPercentileExpr,
        })
        .from(user)
        .where(sql`${user.completedDaysInLast30Days} > 0`)
        .as("last30days_ranked_users");

      // Get lifetime percentile
      const lifetimeResults = await db
        .select({
          lifetimePercentile: lifetimeRankedUsersSubquery.lifetimePercentile,
        })
        .from(lifetimeRankedUsersSubquery)
        .where(eq(lifetimeRankedUsersSubquery.clerkId, ctx.clerkUserId))
        .limit(1);

      // Get last 30 days percentile
      const last30DaysResults = await db
        .select({
          last30DaysPercentile:
            last30DaysRankedUsersSubquery.last30DaysPercentile,
        })
        .from(last30DaysRankedUsersSubquery)
        .where(eq(last30DaysRankedUsersSubquery.clerkId, ctx.clerkUserId))
        .limit(1);

      return {
        lifetimePercentile: lifetimeResults[0]?.lifetimePercentile || 0,
        last30DaysPercentile: last30DaysResults[0]?.last30DaysPercentile || 0,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error getting user percentiles");
    }
  }),
});
