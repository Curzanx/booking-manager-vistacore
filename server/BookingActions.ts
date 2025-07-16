"use server"

import { auth } from "@/auth"
import {
  BookingsTable,
  BookingTimeslotsTable,
  RoomsTable,
  UsersTable,
} from "@/database/schema"
import { db } from "@/lib/database"
import { Booking } from "@/models/interfaces"
import { eq, and, desc, ilike, or } from "drizzle-orm"

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

export async function GetBookingOverviews(query: string): Promise<Booking[]> {
  const bookings = await db
    .select({
      booking_id: BookingsTable.id,
      purpose: BookingsTable.purpose,
      date: BookingsTable.date,
      last_name: UsersTable.last_name,
      first_name: UsersTable.first_name,
      room_name: RoomsTable.name,
      timeslot: BookingTimeslotsTable.timeslot,
    })
    .from(BookingsTable)
    .innerJoin(UsersTable, eq(BookingsTable.user_id, UsersTable.id))
    .innerJoin(RoomsTable, eq(BookingsTable.room_id, RoomsTable.id))
    .innerJoin(
      BookingTimeslotsTable,
      eq(BookingsTable.id, BookingTimeslotsTable.booking_id)
    )
    .orderBy(desc(BookingsTable.date))
    .where(
      or(
        ilike(RoomsTable.name, `%${query}%`),
        ilike(BookingsTable.purpose, `%${query}%`),
        ilike(UsersTable.last_name, `%${query}%`),
        ilike(UsersTable.first_name, `%${query}%`)
      )
    )

  // Group by bookingId
  const groupedBookings = new Map<string, Booking>()

  for (const booking of bookings) {
    const key = booking.booking_id

    if (!groupedBookings.has(key)) {
      groupedBookings.set(key, {
        id: booking.booking_id,
        creator: `${booking.first_name} ${booking.last_name}`,
        roomName: booking.room_name,
        purpose: booking.purpose,
        date: booking.date,
        timeSlots: [],
      })
    }

    groupedBookings.get(key)?.timeSlots.push(booking.timeslot.slice(0, 5)) // format as HH:mm
  }

  return Array.from(groupedBookings.values())
}
