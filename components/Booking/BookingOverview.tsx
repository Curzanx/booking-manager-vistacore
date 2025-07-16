import { Booking } from "@/models/interfaces"
import { CiClock1 } from "react-icons/ci"

export default function BookingOverview({ booking }: { booking: Booking }) {
  return (
    <div className="grid grid-cols-2 border w-full max-w-3xl rounded-xl p-4">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">{booking.roomName}</p>
        <p>{booking.creator}</p>
        <p>{booking.date}</p>
        <div className="flex flex-col">
          <p>{booking.purpose}</p>
        </div>
      </div>

      <div className="flex flex-col border py-2 px-4 rounded-2xl">
        <p className="text-lg font-semibold text-center border-b mb-2">
          Time Slots
        </p>
        <div className="grid grid-cols-4 justify-items-center">
          {booking.timeSlots.map((timeSlot) => (
            <p
              key={`${booking.roomName}: + ${timeSlot}`}
              className="flex items-center gap-2"
            >
              <CiClock1 /> {timeSlot}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
