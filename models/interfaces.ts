export interface TimeSlot {
  period: string
}

export interface Booking {
  creator: string
  roomName: string
  purpose: string
  date: string
  timeSlots: TimeSlot[]
}
