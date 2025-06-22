import BookingOverview from "@/components/Booking/BookingOverview"
import BookingsSearchBar from "@/components/Forms/BookingsSearchBar"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Bookings } from "@/samples/Bookings"

export default function Home() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-4 gap-8">
      <BookingsSearchBar />
      <ScrollArea className="h-[80svh] w-2xl rounded-md p-4">
        <div className="w-full flex flex-col items-center gap-6">
          {Bookings.map((booking, index) => (
            <BookingOverview key={index} booking={booking} />
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}
