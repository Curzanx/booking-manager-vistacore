import BookingOverview from "@/components/Booking/BookingOverview"
import BookingsSearchBar from "@/components/Forms/BookingsSearchBar"

import { GetBookingOverviews } from "@/server/BookingActions"

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""

  const bookings = await GetBookingOverviews(query)

  return (
    <section className="w-full flex flex-col items-center justify-center gap-8 py-4">
      <BookingsSearchBar />
      <div className="w-full flex flex-col items-center gap-6">
        {bookings.map((booking) => (
          <BookingOverview key={booking.id} booking={booking} />
        ))}
      </div>
    </section>
  )
}
