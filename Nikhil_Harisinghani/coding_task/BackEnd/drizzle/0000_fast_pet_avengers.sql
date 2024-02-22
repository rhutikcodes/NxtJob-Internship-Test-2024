CREATE TABLE IF NOT EXISTS "firstlogin" (
	"email" text PRIMARY KEY NOT NULL,
	"slug" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userAvailability" (
	"avail" date NOT NULL,
	"startTime" time NOT NULL,
	"email" text PRIMARY KEY NOT NULL,
	"endTime" time NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userBookedSlots" (
	"email" text PRIMARY KEY NOT NULL,
	"bookedFrom" time,
	"bookedTill" time,
	"bookedTime" time
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAvailability" ADD CONSTRAINT "userAvailability_email_firstlogin_email_fk" FOREIGN KEY ("email") REFERENCES "firstlogin"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userBookedSlots" ADD CONSTRAINT "userBookedSlots_email_userAvailability_email_fk" FOREIGN KEY ("email") REFERENCES "userAvailability"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
