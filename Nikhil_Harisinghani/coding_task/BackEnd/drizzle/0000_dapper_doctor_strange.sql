CREATE TABLE IF NOT EXISTS "firstlogin" (
	"email" text PRIMARY KEY NOT NULL,
	"slug" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userAvailability" (
	"avail" date NOT NULL,
	"startTime" time DEFAULT '9:00:00',
	"email" text,
	"endTime" time DEFAULT '5:00:00',
	"isAvail" boolean DEFAULT true NOT NULL,
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userBookedSlots" (
	"email" text,
	"bookedFrom" time NOT NULL,
	"bookedTill" time NOT NULL,
	"bookedDate" date NOT NULL,
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userAvailability" ADD CONSTRAINT "userAvailability_email_firstlogin_email_fk" FOREIGN KEY ("email") REFERENCES "firstlogin"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userBookedSlots" ADD CONSTRAINT "userBookedSlots_email_firstlogin_email_fk" FOREIGN KEY ("email") REFERENCES "firstlogin"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
