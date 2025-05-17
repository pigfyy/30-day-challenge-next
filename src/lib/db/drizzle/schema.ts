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

// Helper function to create updatedAt trigger
const createUpdatedAtTrigger = (tableName: string) => sql`
  CREATE TRIGGER update_${sql.raw(tableName)}_updated_at 
  BEFORE UPDATE ON "${sql.raw(tableName)}"
  FOR EACH ROW 
  EXECUTE FUNCTION update_timestamp();
`;

// Create the timestamp update function
export const createTimestampUpdateFunction = sql`
  CREATE OR REPLACE FUNCTION update_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`;

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
    updatedAt: timestamp({ precision: 3, mode: "date" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
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

// Create updatedAt trigger for User table
export const userUpdatedAtTrigger = sql`${createTimestampUpdateFunction} ${createUpdatedAtTrigger("User")}`;

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
    updatedAt: timestamp({ precision: 3, mode: "date" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
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

// Create updatedAt trigger for Challenge table
export const challengeUpdatedAtTrigger = sql`${createUpdatedAtTrigger("Challenge")}`;

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
    updatedAt: timestamp({ precision: 3, mode: "date" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
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

// Create updatedAt trigger for DailyProgress table
export const dailyProgressUpdatedAtTrigger = sql`${createUpdatedAtTrigger("DailyProgress")}`;
