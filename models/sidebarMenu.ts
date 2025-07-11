import { Calendar, Home, LucideCircleUserRound } from "lucide-react"
import { IoAnalytics } from "react-icons/io5"

export const sidebarItems = [
  {
    title: "New Booking",
    url: "/booking/new",
    icon: Calendar,
  },
  {
    title: "Bookings",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "#",
    icon: LucideCircleUserRound,
  },
  {
    title: "Analytics",
    url: "#",
    icon: IoAnalytics,
  },
]
