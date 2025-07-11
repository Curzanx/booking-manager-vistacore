import BookingOverview from "@/components/Booking/BookingOverview"
import BookingsSearchBar from "@/components/Forms/BookingsSearchBar"

import { GetBookingOverviews } from "@/server/BookingActions"

export default async function Home() {
  const bookings = await GetBookingOverviews()

  return (
    <section className="w-full flex flex-col items-center justify-center gap-8">
      <BookingsSearchBar />
      <div className="w-full flex flex-col items-center gap-6">
        {bookings.map((booking, index) => (
          <BookingOverview key={index} booking={booking} />
        ))}
      </div>
    </section>
  )
}
