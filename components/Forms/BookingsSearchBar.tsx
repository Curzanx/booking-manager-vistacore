import { Button } from "../ui/button"
import { Input } from "../ui/input"

import { IoIosSearch } from "react-icons/io"

export default function BookingsSearchBar() {
  return (
    <div className="sticky top-0 w-full bg-background flex-col justify-center items-center border py-4 px-4 gap-4">
      <h1 className="text-center">Bookings</h1>
      <div className="w-full flex justify-center items-center gap-2">
        <Input
          className="rounded-3xl max-w-3xl"
          placeholder="search bookings..."
        />
        <Button variant="outline" className="rounded-3xl">
          <IoIosSearch className="size-6" />
        </Button>
      </div>
    </div>
  )
}
