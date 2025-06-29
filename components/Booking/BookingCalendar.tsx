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
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { VscArrowRight } from "react-icons/vsc"
import { VscArrowLeft } from "react-icons/vsc"

export default function BookingCalendar() {
  const today = startOfDay(new Date())
  const [currentMonth, setCurrentMonth] = useState(today)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 })

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  function HandleDateClick(date: Date) {
    setSelectedDate(date)
  }

  function generateCalendar() {
    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dateCopy = day
        const isCurrent = isSameMonth(dateCopy, monthStart)
        const isSelected = selectedDate && isSameDay(dateCopy, selectedDate)
        const isPast = isBefore(startOfDay(dateCopy), today)
        const isToday = isSameDay(startOfDay(dateCopy), today)

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
        {generateCalendar()}
      </div>

      <Sheet
        open={selectedDate != null}
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
        </SheetContent>
      </Sheet>
    </>
  )
}
