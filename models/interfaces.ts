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

export interface User {
  id: string
  email: string
  firstName: string
  password: string
  lastName: string
  role: "admin" | "user"
}
