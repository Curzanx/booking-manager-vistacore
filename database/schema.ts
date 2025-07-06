import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core"

export const UserRole = pgEnum("user_role", ["admin", "user"])

export const UsersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: UserRole("role").default("user").notNull(),
})
