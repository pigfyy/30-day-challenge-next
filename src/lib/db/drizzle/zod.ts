import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import {
  user,
  challenge,
  dailyProgress,
  challengeIdea,
  prismaMigrations,
  dailyTask,
} from "./schema";

// Create Zod schemas for each table
export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);
export const updateUserSchema = createUpdateSchema(user);

export const insertChallengeSchema = createInsertSchema(challenge);
export const selectChallengeSchema = createSelectSchema(challenge);
export const updateChallengeSchema = createUpdateSchema(challenge);

export const insertDailyProgressSchema = createInsertSchema(dailyProgress);
export const selectDailyProgressSchema = createSelectSchema(dailyProgress);
export const updateDailyProgressSchema = createUpdateSchema(dailyProgress);

export const insertChallengeIdeaSchema = createInsertSchema(challengeIdea);
export const selectChallengeIdeaSchema = createSelectSchema(challengeIdea);
export const updateChallengeIdeaSchema = createUpdateSchema(challengeIdea);

export const insertDailyTaskSchema = createInsertSchema(dailyTask);
export const selectDailyTaskSchema = createSelectSchema(dailyTask);
export const updateDailyTaskSchema = createUpdateSchema(dailyTask);

export const insertPrismaMigrationsSchema =
  createInsertSchema(prismaMigrations);
export const selectPrismaMigrationsSchema =
  createSelectSchema(prismaMigrations);
export const updatePrismaMigrationsSchema =
  createUpdateSchema(prismaMigrations);

// Types
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Challenge = typeof challenge.$inferSelect;
export type NewChallenge = typeof challenge.$inferInsert;
export type ChallengeWithDailyProgress = Challenge & {
  dailyProgress: DailyProgress[];
};

export type DailyProgress = typeof dailyProgress.$inferSelect;
export type NewDailyProgress = typeof dailyProgress.$inferInsert;

export type ChallengeIdea = typeof challengeIdea.$inferSelect;
export type NewChallengeIdea = typeof challengeIdea.$inferInsert;

export type PrismaMigration = typeof prismaMigrations.$inferSelect;
export type NewPrismaMigration = typeof prismaMigrations.$inferInsert;

export type DailyTask = typeof dailyTask.$inferSelect;
export type NewDailyTask = typeof dailyTask.$inferInsert;
