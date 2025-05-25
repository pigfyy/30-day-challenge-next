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
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error" }, { status: 500 });
  }

  return Response.json({ message: "Success" });
}
