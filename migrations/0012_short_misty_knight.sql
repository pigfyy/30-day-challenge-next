CREATE TABLE "DailyTask" (
	"id" text PRIMARY KEY NOT NULL,
	"daily_progress_id" text NOT NULL,
	"description" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "DailyTask" ADD CONSTRAINT "DailyTask_dailyProgressId_fkey" FOREIGN KEY ("daily_progress_id") REFERENCES "public"."DailyProgress"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "dailyTask_dailyProgressId_idx" ON "DailyTask" USING btree ("daily_progress_id");--> statement-breakpoint
CREATE INDEX "challenge_userId_idx" ON "Challenge" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "challenge_challengeIdeaId_idx" ON "Challenge" USING btree ("challenge_idea_id");--> statement-breakpoint
CREATE INDEX "dailyProgress_challengeId_idx" ON "DailyProgress" USING btree ("challengeId");--> statement-breakpoint
CREATE INDEX "dailyProgress_userId_idx" ON "DailyProgress" USING btree ("userId");