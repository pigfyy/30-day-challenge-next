ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_userId_fkey";
--> statement-breakpoint
ALTER TABLE "DailyProgress" DROP CONSTRAINT "DailyProgress_userId_fkey";
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "completed_days" integer;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "completed_days_in_last30_days" integer;--> statement-breakpoint
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "DailyProgress" ADD CONSTRAINT "DailyProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;