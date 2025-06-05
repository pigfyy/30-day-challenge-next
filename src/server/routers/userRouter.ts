import { db } from "@/lib/db/drizzle";
import { user } from "@/lib/db/drizzle/auth-schema";
import { validateIsAdmin } from "@/lib/util";
import { procedure, router } from "@/server/init";
import { eq, sql } from "drizzle-orm";

export const userRouter = router({
  getUser: procedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }
    return ctx.user;
  }),
  getUserPercentiles: procedure.query(async ({ ctx }) => {
    if (!ctx.user?.id) {
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
          id: user.id,
          lifetimePercentile: lifetimePercentileExpr,
        })
        .from(user)
        .where(sql`${user.completedDays} > 0`)
        .as("lifetime_ranked_users");

      const last30DaysRankedUsersSubquery = db
        .select({
          id: user.id,
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
        .where(eq(lifetimeRankedUsersSubquery.id, ctx.user.id))
        .limit(1);

      // Get last 30 days percentile
      const last30DaysResults = await db
        .select({
          last30DaysPercentile:
            last30DaysRankedUsersSubquery.last30DaysPercentile,
        })
        .from(last30DaysRankedUsersSubquery)
        .where(eq(last30DaysRankedUsersSubquery.id, ctx.user.id))
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
  query: {
    isAdmin: procedure.query(async ({ ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("Not authenticated");
      }

      const isAdmin = await validateIsAdmin(ctx.user.id);

      return isAdmin;
    }),
  },
});
