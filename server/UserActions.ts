"use server"

import { UsersTable } from "@/database/schema"
import { db } from "@/lib/database"
import { SignUpFormSchema } from "@/models/zodSchema"
import { eq } from "drizzle-orm"
import z from "zod"
import bcrypt from "bcrypt"
import { User } from "@/models/interfaces"

export async function AddUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<z.infer<typeof SignUpFormSchema> | undefined> {
  const hashedPassword = await bcrypt.hash(password, 11)

  const [user] = await db
    .insert(UsersTable)
    .values({
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: hashedPassword,
    })
    .returning({
      email: UsersTable.email,
      password: UsersTable.password,
      firstName: UsersTable.first_name,
      lastName: UsersTable.last_name,
    })

  return user
}

export async function GetUser(email: string): Promise<User | undefined> {
  const [user] = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.email, email))

  if (user) {
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      password: user.password,
      email: user.email,
      role: user.role,
    }
  } else {
    return undefined
  }
}
