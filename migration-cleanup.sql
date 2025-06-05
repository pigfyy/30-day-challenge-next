-- Migration cleanup script to resolve foreign key constraint violations
-- Run this before applying the schema migration

-- 1. First, let's see what data we have
SELECT 'user table count:' as info, COUNT(*) as count FROM "user"
UNION ALL
SELECT 'DailyProgress table count:' as info, COUNT(*) as count FROM "DailyProgress"
UNION ALL
SELECT 'Challenge table count:' as info, COUNT(*) as count FROM "Challenge";

-- 2. Find orphaned DailyProgress records
SELECT 'Orphaned DailyProgress records:' as info, COUNT(*) as count
FROM "DailyProgress" dp
LEFT JOIN "user" u ON dp."userId" = u.id
WHERE u.id IS NULL;

-- 3. Find orphaned Challenge records
SELECT 'Orphaned Challenge records:' as info, COUNT(*) as count
FROM "Challenge" c
LEFT JOIN "user" u ON c."userId" = u.id
WHERE u.id IS NULL;

-- 4. Clean up orphaned records (CAREFUL: This will delete data)
-- Uncomment these lines after reviewing the counts above

-- DELETE FROM "DailyProgress" 
-- WHERE "userId" NOT IN (SELECT id FROM "user");

-- DELETE FROM "Challenge" 
-- WHERE "userId" NOT IN (SELECT id FROM "user");

-- 5. Alternative: If you want to preserve data, you could create placeholder users
-- INSERT INTO "user" (id, name, email, "email_verified", "created_at", "updated_at")
-- SELECT DISTINCT 
--   dp."userId", 
--   'Migrated User',
--   'migrated-' || dp."userId" || '@placeholder.com',
--   false,
--   NOW(),
--   NOW()
-- FROM "DailyProgress" dp
-- LEFT JOIN "user" u ON dp."userId" = u.id
-- WHERE u.id IS NULL
-- ON CONFLICT (id) DO NOTHING; 