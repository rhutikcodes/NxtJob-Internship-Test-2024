CREATE TABLE IF NOT EXISTS "userBookedSlots" (
	"email" text,
	"clientUserId" text NOT NULL,
	"bookedFrom" time NOT NULL,
	"bookedTill" time NOT NULL,
	"bookedDate" date NOT NULL,
	"eventId" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userBookedSlots" ADD CONSTRAINT "userBookedSlots_email_users_userId_fk" FOREIGN KEY ("email") REFERENCES "users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
