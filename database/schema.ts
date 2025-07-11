import {
  date,
  integer,
  pgEnum,
  pgTable,
  time,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export const UserRole = pgEnum("user_role", ["admin", "user"])

export const UsersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: UserRole("role").default("user").notNull(),
})

export const RoomsTable = pgTable("rooms", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  capacity: integer("capacity").notNull(),
  features: varchar("features", { length: 1024 }),
})

export const BookingsTable = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id),
  room_id: uuid("room_id")
    .notNull()
    .references(() => RoomsTable.id),
  date: date("time").notNull(),
  purpose: varchar("purpose", { length: 500 }).notNull(),
})

export const BookingTimeslotsTable = pgTable(
  "booking_timeslots",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    booking_id: uuid("booking_id")
      .notNull()
      .references(() => BookingsTable.id, { onDelete: "cascade" }),
    room_id: uuid("room_id")
      .notNull()
      .references(() => RoomsTable.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    timeslot: time("timeslot").notNull(),
  },
  (table) => [unique().on(table.room_id, table.date, table.timeslot)]
)
