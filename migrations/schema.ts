import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  serial,
  uniqueIndex,
  foreignKey,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const prismaMigrations = pgTable("_prisma_migrations", {
  id: varchar({ length: 36 }).primaryKey().notNull(),
  checksum: varchar({ length: 64 }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text(),
  rolledBackAt: timestamp("rolled_back_at", {
    withTimezone: true,
    mode: "string",
  }),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const challengeIdea = pgTable("ChallengeIdea", {
  id: serial().primaryKey().notNull(),
  index: integer().notNull(),
  title: text().notNull(),
  wish: text().notNull(),
  dailyAction: text().notNull(),
  description: text().notNull(),
  sourceName: text("source_name").notNull(),
  sourceLink: text("source_link").notNull(),
});

export const user = pgTable(
  "User",
  {
    id: text().primaryKey().notNull(),
    email: text().notNull(),
    username: text().notNull(),
    imageUrl: text().notNull(),
    clerkId: text().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
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
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    wish: text().notNull(),
    dailyAction: text().notNull(),
    icon: text().default("✅").notNull(),
    note: text().default("").notNull(),
    startDate: timestamp({ precision: 3, mode: "string" }).notNull(),
    endDate: timestamp({ precision: 3, mode: "string" }).notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
    userId: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "Challenge_userId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ],
);

export const dailyProgress = pgTable(
  "DailyProgress",
  {
    id: text().primaryKey().notNull(),
    date: timestamp({ precision: 3, mode: "string" }).notNull(),
    completed: boolean().notNull(),
    imageUrl: text().default("").notNull(),
    challengeId: text().notNull(),
    userId: text().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
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
  ],
);
