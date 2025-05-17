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
import cuid from "cuid";

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
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => cuid()),
    email: text().notNull(),
    username: text().notNull(),
    imageUrl: text().notNull(),
    clerkId: text().notNull(),
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
  ],
);
