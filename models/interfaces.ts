export interface Booking {
  id: string
  creator: string
  roomName: string
  purpose: string
  date: string
  timeSlots: string[]
}

export interface User {
  id: string
  email: string
  firstName: string
  password: string
  lastName: string
  role: "admin" | "user"
}
