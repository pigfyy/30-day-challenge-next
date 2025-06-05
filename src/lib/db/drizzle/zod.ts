import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import {
  clerkUser,
  challenge,
  dailyProgress,
  challengeIdea,
  dailyTask,
  user,
  session,
  account,
  verification,
} from "@/lib/db/drizzle/schema";

export const insertClerkUserSchema = createInsertSchema(clerkUser);
export const selectClerkUserSchema = createSelectSchema(clerkUser);
export const updateClerkUserSchema = createUpdateSchema(clerkUser);

export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);
export const updateUserSchema = createUpdateSchema(user);

export const insertAccountSchema = createInsertSchema(account);
export const selectAccountSchema = createSelectSchema(account);
export const updateAccountSchema = createUpdateSchema(account);

export const insertSessionSchema = createInsertSchema(session);
export const selectSessionSchema = createSelectSchema(session);
export const updateSessionSchema = createUpdateSchema(session);

export const insertVerificationSchema = createInsertSchema(verification);
export const selectVerificationSchema = createSelectSchema(verification);
export const updateVerificationSchema = createUpdateSchema(verification);

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

export type ClerkUser = typeof clerkUser.$inferSelect;
export type NewClerkUser = typeof clerkUser.$inferInsert;

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

export type DailyTask = typeof dailyTask.$inferSelect;
export type NewDailyTask = typeof dailyTask.$inferInsert;
export type DailyTaskOptional = {
  id: string;
  title: string;
  completed: boolean;
  order: number;
  dailyProgressId?: string;
  createdAt?: Date;
};
