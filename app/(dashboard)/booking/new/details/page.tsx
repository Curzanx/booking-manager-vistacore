import { redirect } from "next/navigation"
import React from "react"

export default function NewBookingDetails({
  searchParams,
}: {
  searchParams: {
    roomId?: string
    timeslots?: string | string[]
  }
}) {
  const { roomId, timeslots } = searchParams

  if (!roomId || !timeslots) {
    redirect("/booking/new") // or show an error
  }

  const timeArray = Array.isArray(timeslots) ? timeslots : [timeslots]

  return (
    <section>
      <h1 className="text-xl font-semibold">Booking Summary</h1>
      <p>
        Room: <strong>{roomId}</strong>
      </p>
      <ul className="mt-4">
        {timeArray.map((time) => (
          <li key={time} className="text-sm text-gray-700">
            {time}
          </li>
        ))}
      </ul>
    </section>
  )
}
