ALTER TABLE "userBookedSlots" ADD COLUMN "bookedDate" date;--> statement-breakpoint
ALTER TABLE "userBookedSlots" DROP COLUMN IF EXISTS "bookedTime";