import cuid from "cuid";
import { relations } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  index,
  integer,
  json,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const prismaMigrations = pgTable("_prisma_migrations", {
  id: varchar({ length: 36 }).primaryKey().notNull(),
  checksum: varchar({ length: 64 }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "date" }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text(),
  rolledBackAt: timestamp("rolled_back_at", {
    withTimezone: true,
    mode: "date",
  }),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const challengeIdea = pgTable("ChallengeIdea", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => cuid()),
  index: integer().notNull(),
  title: text().notNull(),
  wish: text().notNull(),
  dailyAction: text().notNull(),
  description: text().notNull(),
  sourceName: text("source_name").notNull(),
  sourceLink: text("source_link").notNull(),
  organization: text("organization").default("").notNull(),
});

export const user = pgTable(
  "User",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => cuid()),
    email: text().notNull(),
    username: text().notNull(),
    imageUrl: text().notNull(),
    clerkId: text().notNull(),
    completedDays: integer().default(0).notNull(),
    completedDaysInLast30Days: integer().default(0).notNull(),
    createdAt: timestamp({ precision: 3, mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("User_clerkId_key").using(
      "btree",
      table.clerkId.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("User_email_key").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("User_username_key").using(
      "btree",
      table.username.asc().nullsLast().op("text_ops"),
    ),
  ],
);

export const challenge = pgTable(
  "Challenge",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => cuid()),
    title: text().notNull(),
    wish: text().notNull(),
    dailyAction: text().notNull(),
    icon: text().default("✅").notNull(),
    note: text().default("").notNull(),
    startDate: timestamp({ precision: 3, mode: "date" }).notNull(),
    endDate: timestamp({ precision: 3, mode: "date" }).notNull(),
    createdAt: timestamp({ precision: 3, mode: "date" }).defaultNow().notNull(),
    userId: text().notNull(),
    challengeIdeaId: text("challenge_idea_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "Challenge_userId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.challengeIdeaId],
      foreignColumns: [challengeIdea.id],
      name: "Challenge_challengeIdeaId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    index("challenge_userId_idx").on(table.userId),
    index("challenge_challengeIdeaId_idx").on(table.challengeIdeaId),
  ],
);

export const dailyProgress = pgTable(
  "DailyProgress",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => cuid()),
    date: timestamp({ precision: 3, mode: "date" }).notNull(),
    completed: boolean().notNull(),
    imageUrl: text().default("").notNull(),
    challengeId: text().notNull(),
    userId: text().notNull(),
    createdAt: timestamp({ precision: 3, mode: "date" }).defaultNow().notNull(),
    note: text().default("").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.challengeId],
      foreignColumns: [challenge.id],
      name: "DailyProgress_challengeId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "DailyProgress_userId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    index("dailyProgress_challengeId_idx").on(table.challengeId),
    index("dailyProgress_userId_idx").on(table.userId),
  ],
);

export const dailyTask = pgTable(
  "DailyTask",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => cuid()),
    dailyProgressId: text("daily_progress_id").notNull(),
    title: text("title").notNull(),
    completed: boolean("completed").default(false).notNull(),
    order: integer("order").default(0).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.dailyProgressId],
      foreignColumns: [dailyProgress.id],
      name: "DailyTask_dailyProgressId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    index("dailyTask_dailyProgressId_idx").on(table.dailyProgressId),
  ],
);

// Relations
export const userRelations = relations(user, ({ many }) => ({
  challenges: many(challenge),
  dailyProgress: many(dailyProgress),
}));

export const challengeRelations = relations(challenge, ({ one, many }) => ({
  user: one(user, {
    fields: [challenge.userId],
    references: [user.id],
  }),
  challengeIdea: one(challengeIdea, {
    fields: [challenge.challengeIdeaId],
    references: [challengeIdea.id],
  }),
  dailyProgress: many(dailyProgress),
}));

export const dailyProgressRelations = relations(
  dailyProgress,
  ({ one, many }) => ({
    challenge: one(challenge, {
      fields: [dailyProgress.challengeId],
      references: [challenge.id],
    }),
    user: one(user, {
      fields: [dailyProgress.userId],
      references: [user.id],
    }),
    dailyTasks: many(dailyTask),
  }),
);

export const dailyTaskRelations = relations(dailyTask, ({ one }) => ({
  dailyProgress: one(dailyProgress, {
    fields: [dailyTask.dailyProgressId],
    references: [dailyProgress.id],
  }),
}));

export const challengeIdeaRelations = relations(challengeIdea, ({ many }) => ({
  challenges: many(challenge),
}));

export const surveyResponse = pgTable("SurveyResponse", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => cuid()),
  responseData: json("response_data").notNull(),
  submittedAt: timestamp("submitted_at", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  turkCode: text("turk_code"),
  isInvalid: boolean().default(false).notNull(),
});
