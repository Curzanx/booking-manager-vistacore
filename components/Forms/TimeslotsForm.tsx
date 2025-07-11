"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { TimeslotsFormSchema } from "@/models/zodSchema"
import {
  addMinutes,
  format,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns"
import { Input } from "../ui/input"
import { CreateBooking, GetBookings } from "@/server/BookingActions"
import { useEffect, useState } from "react"

interface BookedSlot {
  timeslot: string
}
interface TimeSlot {
  time: string
  isBooked: boolean
}

export function TimeslotsForm({
  selectedDate,
  selectedRoom,
}: {
  selectedDate: Date
  selectedRoom: string
}) {
  const timeslotsForm = useForm<z.infer<typeof TimeslotsFormSchema>>({
    resolver: zodResolver(TimeslotsFormSchema),
    defaultValues: {
      purpose: "",
      timeslots: [],
    },
  })

  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([])
  const [isBooking, setIsBooking] = useState<boolean>(false)

  useEffect(() => {
    const getBookings = async () => {
      const result = await GetBookings(selectedDate, selectedRoom)
      setBookedSlots(result)
    }

    getBookings()
  }, [selectedDate, selectedRoom])

  function GetTimeSlotsForDate(date: Date): TimeSlot[] {
    const startTime = setSeconds(setMinutes(setHours(date, 8), 0), 0) // 08:00:00
    const endTime = setSeconds(setMinutes(setHours(date, 17), 0), 0) // 17:00:00

    const slotDuration = 30 // in minutes
    const slots: TimeSlot[] = []

    let current = startTime

    while (isBefore(current, endTime)) {
      const timeString = format(current, "HH:mm:ss")
      slots.push({
        time: timeString,
        isBooked: bookedSlots.some((slot) => slot.timeslot === timeString),
      })

      current = addMinutes(current, slotDuration)
    }

    console.log("Slots: ")
    console.log(slots)
    console.log("Booked Slots: ")
    console.log(bookedSlots)

    return slots
  }

  async function onSubmit(values: z.infer<typeof TimeslotsFormSchema>) {
    setIsBooking(true)

    const result = await CreateBooking(
      selectedRoom,
      selectedDate,
      values.timeslots,
      values.purpose
    )

    // Do something on booking success or failure

    if (result.success) {
    } else {
      setIsBooking(false)
    }
  }

  return (
    <Form {...timeslotsForm}>
      <form
        onSubmit={timeslotsForm.handleSubmit(onSubmit)}
        className="space-y-8 px-4"
      >
        <FormField
          control={timeslotsForm.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose of booking</FormLabel>
              <FormControl>
                <Input
                  placeholder="Accounts department general meeting..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={timeslotsForm.control}
          name="timeslots"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-4 gap-4">
                {GetTimeSlotsForDate(selectedDate).map((timeslot) => (
                  <FormField
                    key={timeslot.time}
                    control={timeslotsForm.control}
                    name="timeslots"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={timeslot.time}
                          className="flex flex-row items-center gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(timeslot.time)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      timeslot.time,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== timeslot.time
                                      )
                                    )
                              }}
                              disabled={timeslot.isBooked}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {timeslot.time}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isBooking}>
          Request Booking
        </Button>
      </form>
    </Form>
  )
}
