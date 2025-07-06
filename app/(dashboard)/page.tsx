import BookingOverview from "@/components/Booking/BookingOverview"
import BookingsSearchBar from "@/components/Forms/BookingsSearchBar"

import { Bookings } from "@/samples/Bookings"

export default function Home() {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-8">
      <BookingsSearchBar />
      <div className="w-full flex flex-col items-center gap-6">
        {Bookings.map((booking, index) => (
          <BookingOverview key={index} booking={booking} />
        ))}
      </div>
    </section>
  )
}
