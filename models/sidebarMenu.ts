import { Calendar, Home, LucideCircleUserRound } from "lucide-react"
import { IoAnalytics } from "react-icons/io5"

export const sidebarItems = [
  {
    title: "New Booking",
    url: "/booking/new",
    isAdmin: false,
    icon: Calendar,
  },
  {
    title: "Bookings",
    url: "/",
    isAdmin: false,
    icon: Home,
  },
  {
    title: "Users",
    url: "#",
    isAdmin: true,
    icon: LucideCircleUserRound,
  },
  {
    title: "Analytics",
    url: "#",
    isAdmin: true,
    icon: IoAnalytics,
  },
]
