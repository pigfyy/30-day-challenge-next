ALTER TABLE "Challenge" ADD COLUMN "challenge_idea_id" integer;--> statement-breakpoint
ALTER TABLE "ChallengeIdea" ADD COLUMN "organization" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengeIdeaId_fkey" FOREIGN KEY ("challenge_idea_id") REFERENCES "public"."ChallengeIdea"("id") ON DELETE set null ON UPDATE cascade;