"use server"

import { auth } from "@/auth"
import {
  BookingsTable,
  BookingTimeslotsTable,
  RoomsTable,
} from "@/database/schema"
import { db } from "@/lib/database"
import { eq, and } from "drizzle-orm"

export async function GetBookings(date: Date, roomId: string) {
  const bookings = await db
    .select({
      timeslot: BookingTimeslotsTable.timeslot,
    })
    .from(BookingTimeslotsTable)
    .where(
      and(
        eq(BookingTimeslotsTable.date, date.toDateString()),
        eq(BookingTimeslotsTable.room_id, roomId)
      )
    )

  return bookings
}

export async function GetRooms() {
  const response = await db.select().from(RoomsTable)

  return response
}

export async function CreateBooking(
  roomId: string,
  selectedDate: Date,
  timeslots: string[],
  purpose: string
) {
  const session = await auth()

  if (!session) return { success: false, error: "No user session found" }

  try {
    const [booking] = await db
      .insert(BookingsTable)
      .values({
        user_id: session.user.id,
        date: selectedDate.toDateString(),
        room_id: roomId,
        purpose: purpose,
      })
      .returning({
        id: BookingsTable.id,
      })

    await db.insert(BookingTimeslotsTable).values(
      timeslots.map((timeslot) => ({
        booking_id: booking.id,
        date: selectedDate.toDateString(),
        room_id: roomId,
        timeslot: timeslot,
      }))
    )

    return { success: true, booking: booking }
  } catch (error) {
    return { success: false, error: error }
  }
}
