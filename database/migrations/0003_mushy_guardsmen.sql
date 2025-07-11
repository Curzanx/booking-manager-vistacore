ALTER TABLE "booking_timeslots" ADD COLUMN "room_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "booking_timeslots" ADD COLUMN "date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "booking_timeslots" ADD CONSTRAINT "booking_timeslots_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_timeslots" ADD CONSTRAINT "booking_timeslots_room_id_date_timeslot_unique" UNIQUE("room_id","date","timeslot");