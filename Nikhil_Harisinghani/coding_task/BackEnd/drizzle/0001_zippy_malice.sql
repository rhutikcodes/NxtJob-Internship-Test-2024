ALTER TABLE "userAvailability" ALTER COLUMN "startTime" SET DEFAULT '9:00:00';--> statement-breakpoint
ALTER TABLE "userAvailability" ALTER COLUMN "startTime" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "userAvailability" ALTER COLUMN "endTime" SET DEFAULT '5:00:00';--> statement-breakpoint
ALTER TABLE "userAvailability" ALTER COLUMN "endTime" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "userAvailability" ADD COLUMN "isAvail" boolean NOT NULL;