CREATE TABLE IF NOT EXISTS "userAvailability" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"startTime" time,
	"endTime" time,
	"status" text DEFAULT 'available',
	"userId" text,
	"updatedAt" date DEFAULT 'now()',
	"createdAt" date DEFAULT 'now()'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userWeeklyAvailability" (
	"id" serial PRIMARY KEY NOT NULL,
	"MONfrom" time,
	"MONtill" time,
	"TUEfrom" time,
	"TUEtill" time,
	"WEDfrom" time,
	"WEDtill" time,
	"THUfrom" time,
	"THUtill" time,
	"FRIfrom" time,
	"FRItill" time,
	"SATfrom" time,
	"SATtill" time,
	"SUNfrom" time,
	"SUNtill" time,
	"userId" text,
	"updatedAt" date DEFAULT 'now()',
	"createdAt" date DEFAULT 'now()'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"email" text PRIMARY KEY NOT NULL,
	"slug" text,
	"userId" text,
	"updatedAt" date DEFAULT 'now()',
	"createdAt" date DEFAULT 'now()',
	CONSTRAINT "users_slug_unique" UNIQUE("slug"),
	CONSTRAINT "users_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAvailability" ADD CONSTRAINT "userAvailability_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userWeeklyAvailability" ADD CONSTRAINT "userWeeklyAvailability_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
