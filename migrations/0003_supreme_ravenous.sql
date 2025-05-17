ALTER TABLE "Challenge" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Challenge" ALTER COLUMN "updatedAt" DROP NOT NULL;