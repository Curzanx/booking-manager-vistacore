CREATE TABLE "booking_timeslots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"timeslot" time NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" RENAME COLUMN "start_time" TO "time";--> statement-breakpoint
ALTER TABLE "booking_timeslots" ADD CONSTRAINT "booking_timeslots_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" DROP COLUMN "end_time";