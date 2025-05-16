import { relations } from "drizzle-orm/relations";
import { user, challenge, dailyProgress } from "./schema";

export const challengeRelations = relations(challenge, ({one, many}) => ({
	user: one(user, {
		fields: [challenge.userId],
		references: [user.id]
	}),
	dailyProgresses: many(dailyProgress),
}));

export const userRelations = relations(user, ({many}) => ({
	challenges: many(challenge),
	dailyProgresses: many(dailyProgress),
}));

export const dailyProgressRelations = relations(dailyProgress, ({one}) => ({
	challenge: one(challenge, {
		fields: [dailyProgress.challengeId],
		references: [challenge.id]
	}),
	user: one(user, {
		fields: [dailyProgress.userId],
		references: [user.id]
	}),
}));