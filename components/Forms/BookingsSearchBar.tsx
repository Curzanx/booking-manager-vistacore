import { Button } from "../ui/button"
import { Input } from "../ui/input"

import { IoIosSearch } from "react-icons/io"

export default function BookingsSearchBar() {
  return (
    <div className="rounded-3xl max-w-xl w-full flex justify-center items-center border py-2 px-4 gap-2">
      <Input className="border-none" />
      <Button variant="outline">
        <IoIosSearch className="size-6" />
      </Button>
    </div>
  )
}
