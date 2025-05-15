/*
  Warnings:

  - You are about to drop the column `note` on the `DailyProgress` table. All the data in the column will be lost.
  - Made the column `note` on table `Challenge` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Challenge" ALTER COLUMN "note" SET NOT NULL;

-- AlterTable
ALTER TABLE "DailyProgress" DROP COLUMN "note";
