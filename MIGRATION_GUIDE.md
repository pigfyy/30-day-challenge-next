# Migration Guide: Fixing Database Constraint Issues

## Problem

You're encountering foreign key constraint violations when migrating from Clerk authentication to Better Auth because there are orphaned records in your database.

## Solution Steps

### Step 1: Backup Your Database

Before making any changes, create a backup of your database:

```bash
# If using Neon or another cloud provider, create a backup through their interface
# Or use pg_dump if you have direct access
```

### Step 2: Analyze the Current State

Run the analysis script to understand what data you have:

```bash
# Connect to your database and run the queries from migration-cleanup.sql
# You can do this through:
# 1. Neon Console SQL Editor
# 2. Any PostgreSQL client
# 3. Drizzle Studio (if it connects successfully)
```

### Step 3: Choose Your Migration Strategy

#### Option A: Clean Slate (Delete Orphaned Data)

If you're okay with losing data that references non-existent users:

1. Run these SQL commands in your database:

```sql
-- Delete orphaned DailyProgress records
DELETE FROM "DailyProgress"
WHERE "userId" NOT IN (SELECT id FROM "user");

-- Delete orphaned Challenge records
DELETE FROM "Challenge"
WHERE "userId" NOT IN (SELECT id FROM "user");
```

#### Option B: Preserve Data (Create Placeholder Users)

If you want to keep the data and create placeholder users:

1. Run this SQL command:

```sql
-- Create placeholder users for orphaned records
INSERT INTO "user" (id, name, email, "email_verified", "created_at", "updated_at")
SELECT DISTINCT
  dp."userId",
  'Migrated User',
  'migrated-' || dp."userId" || '@placeholder.com',
  false,
  NOW(),
  NOW()
FROM "DailyProgress" dp
LEFT JOIN "user" u ON dp."userId" = u.id
WHERE u.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Also handle Challenge table
INSERT INTO "user" (id, name, email, "email_verified", "created_at", "updated_at")
SELECT DISTINCT
  c."userId",
  'Migrated User',
  'migrated-' || c."userId" || '@placeholder.com',
  false,
  NOW(),
  NOW()
FROM "Challenge" c
LEFT JOIN "user" u ON c."userId" = u.id
WHERE u.id IS NULL
ON CONFLICT (id) DO NOTHING;
```

### Step 4: Apply the Migration

After cleaning up the data:

```bash
# Generate and apply the migration
npm run db:generate
npm run db:push
```

### Step 5: Test Better Auth CLI

```bash
npx @better-auth/cli@latest generate
```

### Step 6: Verify Everything Works

1. Check that all foreign key constraints are satisfied
2. Test your application's authentication flow
3. Verify that existing data is accessible

## Alternative Approach: Fresh Start

If you're in development and don't mind losing data:

1. **Drop all tables:**

```sql
DROP TABLE IF EXISTS "DailyTask" CASCADE;
DROP TABLE IF EXISTS "DailyProgress" CASCADE;
DROP TABLE IF EXISTS "Challenge" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "ChallengeIdea" CASCADE;
DROP TABLE IF EXISTS "SurveyResponse" CASCADE;
DROP TABLE IF EXISTS "account" CASCADE;
DROP TABLE IF EXISTS "session" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "verification" CASCADE;
```

2. **Regenerate everything:**

```bash
npm run db:generate
npm run db:push
npx @better-auth/cli@latest generate
```

## Tips

- Always backup before making changes
- Test in a development environment first
- Consider the impact on your users if deleting data
- The placeholder user approach preserves data integrity while allowing you to identify which users need to re-authenticate
