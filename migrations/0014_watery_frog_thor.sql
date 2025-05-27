CREATE TABLE "SurveyResponse" (
	"id" text PRIMARY KEY NOT NULL,
	"response_data" json NOT NULL,
	"submitted_at" timestamp (3) DEFAULT now() NOT NULL
);
