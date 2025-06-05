import { dailyProgress, db, user } from "@/lib/db/drizzle";
import { sql } from "drizzle-orm";

export async function POST(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const secret = searchParams.get("secret");

  const timeInDays = parseInt(searchParams.get("time-in-days") || "0");

  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const beforeUpdate = await db
      .select({
        id: user.id,
        completedDays: user.completedDays,
        completedDaysInLast30Days: user.completedDaysInLast30Days,
      })
      .from(user);

    if (timeInDays > 0) {
      await db.update(user).set({
        completedDaysInLast30Days: sql`COALESCE(
          (
            SELECT COUNT(DISTINCT DATE(${dailyProgress.date}))
            FROM ${dailyProgress}
            WHERE ${dailyProgress.userId} = ${user.id}
              AND ${dailyProgress.completed} = true
              AND DATE(${dailyProgress.date}) >= (CURRENT_DATE - INTERVAL '${sql.raw(timeInDays.toString())} days')
              AND DATE(${dailyProgress.date}) <= CURRENT_DATE
          ), 0
        )`,
      });
    } else {
      await db.update(user).set({
        completedDays: sql`(SELECT COUNT(DISTINCT ${dailyProgress.date}) FROM ${dailyProgress} WHERE ${dailyProgress.userId} = ${user.id} AND ${dailyProgress.completed} = true)`,
      });
    }

    // Get values after update
    const afterUpdate = await db
      .select({
        id: user.id,
        completedDays: user.completedDays,
        completedDaysInLast30Days: user.completedDaysInLast30Days,
      })
      .from(user);

    // Calculate discrepancies
    let completedDaysDiscrepancies = 0;
    let completedDaysInLast30DaysDiscrepancies = 0;
    let totalCompletedDaysDifference = 0;
    let totalCompletedDaysInLast30DaysDifference = 0;

    for (let i = 0; i < beforeUpdate.length; i++) {
      const before = beforeUpdate[i];
      const after = afterUpdate[i];

      // Check completedDays discrepancies (any difference)
      if (timeInDays === 0 && before.completedDays !== after.completedDays) {
        completedDaysDiscrepancies++;
        totalCompletedDaysDifference += Math.abs(
          (after.completedDays || 0) - (before.completedDays || 0),
        );
      }

      // Check completedDaysInLast30Days discrepancies
      // (decreases by more than 1 OR any increase)
      if (timeInDays > 0) {
        const beforeLast30 = before.completedDaysInLast30Days || 0;
        const afterLast30 = after.completedDaysInLast30Days || 0;
        const difference = afterLast30 - beforeLast30;

        if (difference < -1 || difference > 0) {
          completedDaysInLast30DaysDiscrepancies++;
          totalCompletedDaysInLast30DaysDifference += Math.abs(difference);
        }
      }
    }

    const avgCompletedDaysDifference =
      completedDaysDiscrepancies > 0
        ? totalCompletedDaysDifference / completedDaysDiscrepancies
        : 0;

    const avgCompletedDaysInLast30DaysDifference =
      completedDaysInLast30DaysDiscrepancies > 0
        ? totalCompletedDaysInLast30DaysDifference /
          completedDaysInLast30DaysDiscrepancies
        : 0;

    const responseData: any = { message: "Success" };

    if (timeInDays === 0) {
      responseData.completedDaysDiscrepancies = {
        usersWithDiscrepancies: completedDaysDiscrepancies,
        averageDaysDifference: avgCompletedDaysDifference,
      };
    } else {
      responseData.completedDaysInLast30DaysDiscrepancies = {
        usersWithDiscrepancies: completedDaysInLast30DaysDiscrepancies,
        averageDaysDifference: avgCompletedDaysInLast30DaysDifference,
      };
    }

    return Response.json(responseData);
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
