import { z } from "zod";
import type { Prisma } from "../client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "email",
  "username",
  "imageUrl",
  "clerkId",
  "createdAt",
  "updatedAt",
]);

export const ChallengeScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "wish",
  "dailyAction",
  "icon",
  "note",
  "startDate",
  "endDate",
  "createdAt",
  "updatedAt",
  "userId",
]);

export const DailyProgressScalarFieldEnumSchema = z.enum([
  "id",
  "date",
  "completed",
  "imageUrl",
  "note",
  "challengeId",
  "userId",
  "createdAt",
  "updatedAt",
]);

export const ChallengeIdeaScalarFieldEnumSchema = z.enum([
  "id",
  "index",
  "title",
  "wish",
  "dailyAction",
  "description",
  "sourceName",
  "sourceLink",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  imageUrl: z.string(),
  clerkId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(
  z.object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>;

/////////////////////////////////////////
// CHALLENGE SCHEMA
/////////////////////////////////////////

export const ChallengeSchema = z.object({
  id: z.string(),
  title: z.string(),
  wish: z.string(),
  dailyAction: z.string(),
  icon: z.string(),
  note: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
});

export type Challenge = z.infer<typeof ChallengeSchema>;

// CHALLENGE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ChallengeOptionalDefaultsSchema = ChallengeSchema.merge(
  z.object({
    id: z.string().optional(),
    icon: z.string().optional(),
    note: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type ChallengeOptionalDefaults = z.infer<
  typeof ChallengeOptionalDefaultsSchema
>;

/////////////////////////////////////////
// DAILY PROGRESS SCHEMA
/////////////////////////////////////////

export const DailyProgressSchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  completed: z.boolean(),
  imageUrl: z.string(),
  note: z.string(),
  challengeId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type DailyProgress = z.infer<typeof DailyProgressSchema>;

// DAILY PROGRESS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const DailyProgressOptionalDefaultsSchema = DailyProgressSchema.merge(
  z.object({
    id: z.string().optional(),
    imageUrl: z.string().optional(),
    note: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
);

export type DailyProgressOptionalDefaults = z.infer<
  typeof DailyProgressOptionalDefaultsSchema
>;

/////////////////////////////////////////
// CHALLENGE IDEA SCHEMA
/////////////////////////////////////////

export const ChallengeIdeaSchema = z.object({
  id: z.number(),
  index: z.number(),
  title: z.string(),
  wish: z.string(),
  dailyAction: z.string(),
  description: z.string(),
  sourceName: z.string(),
  sourceLink: z.string(),
});

export type ChallengeIdea = z.infer<typeof ChallengeIdeaSchema>;

// CHALLENGE IDEA OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ChallengeIdeaOptionalDefaultsSchema = ChallengeIdeaSchema.merge(
  z.object({
    id: z.number().optional(),
  }),
);

export type ChallengeIdeaOptionalDefaults = z.infer<
  typeof ChallengeIdeaOptionalDefaultsSchema
>;
