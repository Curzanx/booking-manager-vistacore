"use client"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
} from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { VscArrowRight } from "react-icons/vsc"
import { VscArrowLeft } from "react-icons/vsc"
import { GetRooms } from "@/server/BookingActions"
import { TimeslotsForm } from "@/components/Forms/TimeslotsForm"

export default function BookingCalendar() {
  const today = startOfDay(new Date())
  const [currentMonth, setCurrentMonth] = useState(today)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [rooms, setRooms] = useState<
    {
      id: string
      name: string
      location: string
      capacity: number
      features: string | null
    }[]
  >([])
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 })

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  async function HandleDateClick(date: Date) {
    setSelectedDate(date)

    const rooms = await GetRooms()
    setRooms(rooms)
  }

  function GenerateCalendar() {
    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dateCopy = day
        const isCurrent = isSameMonth(dateCopy, monthStart)
        const isSelected = selectedDate && isSameDay(dateCopy, selectedDate)
        const isToday = isSameDay(startOfDay(dateCopy), today)
        const isPast = isBefore(startOfDay(dateCopy), today) || isToday

        days.push(
          <button
            key={dateCopy.toISOString()}
            onClick={() => !isPast && HandleDateClick(dateCopy)}
            disabled={isPast}
            className={`border h-20 text-center p-2 transition-all duration-150 ${
              isSelected
                ? "bg-blue-500 text-white font-bold"
                : isCurrent
                ? "bg-white"
                : "bg-gray-100 text-gray-400"
            } ${isToday && !isSelected ? "border-blue-500 border-2" : ""} ${
              isPast
                ? "cursor-not-allowed text-gray-300 bg-gray-50"
                : "hover:bg-blue-100"
            }`}
          >
            {format(dateCopy, "d")}
          </button>
        )
        day = addDays(day, 1)
      }

      rows.push(
        <div key={day.toISOString()} className="grid grid-cols-7">
          {days}
        </div>
      )
      days = []
    }

    return rows
  }

  return (
    <>
      <div className="border max-w-3xl mx-auto shadow-md rounded-t-lg overflow-hidde mt-8">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
          <Button onClick={prevMonth} variant="outline">
            <VscArrowLeft />
          </Button>
          <h3>{format(currentMonth, "MMMM yyyy")}</h3>
          <Button onClick={nextMonth} variant="outline">
            <VscArrowRight />
          </Button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 bg-gray-200 text-center font-bold text-sm">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 border">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        {GenerateCalendar()}
      </div>

      <Sheet
        key="room-sheet"
        open={selectedDate != null && selectedRoom == null}
        onOpenChange={(open) => {
          if (open == false) {
            setSelectedDate(null)
          }
        }}
        modal={false}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedDate?.toDateString()}</SheetTitle>
            <SheetDescription>
              <span>Please select an available room.</span>
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 p-4">
            {rooms.map((room, index) => {
              return (
                <Button
                  key={room.id}
                  variant="outline"
                  className="flex flex-col h-fit"
                  onClick={() => {
                    setSelectedRoom(index)
                  }}
                >
                  <p>{room.name}</p>
                  <p className="text-sm opacity-75">{room.location}</p>
                </Button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet
        key="timeslots-sheet"
        open={selectedDate != null && selectedRoom != null}
        onOpenChange={(open) => {
          if (open == false) {
            setSelectedRoom(null)
          }
        }}
        modal={false}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {selectedDate?.toDateString()} |{" "}
              {rooms[selectedRoom ?? 0]?.name || ""}
            </SheetTitle>
            <SheetDescription>
              <span>Please select an timeslot.</span>
            </SheetDescription>
          </SheetHeader>
          {selectedDate != null && selectedRoom != null && (
            <TimeslotsForm
              selectedDate={selectedDate}
              selectedRoom={rooms[selectedRoom].id}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
