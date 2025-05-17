import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  userUpdatedAtTrigger,
  challengeUpdatedAtTrigger,
  dailyProgressUpdatedAtTrigger,
} from "./schema";

// This script will apply the triggers to your database
export async function applyTriggers() {
  const sql = neon(process.env.POSTGRES_URL!);
  const db = drizzle(sql);

  console.log("Applying updatedAt triggers...");

  // Apply triggers for each table
  await db.execute(userUpdatedAtTrigger);
  await db.execute(challengeUpdatedAtTrigger);
  await db.execute(dailyProgressUpdatedAtTrigger);

  console.log("Successfully applied updatedAt triggers!");
}

// Run the migration if this file is executed directly
if (require.main === module) {
  applyTriggers()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Error applying triggers:", err);
      process.exit(1);
    });
}
