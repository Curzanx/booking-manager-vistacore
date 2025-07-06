"use server"

import { UsersTable } from "@/database/schema"
import { db } from "@/lib/database"
import { SignUpFormSchema, UserSchema } from "@/models/zodSchema"
import { eq } from "drizzle-orm"
import z from "zod"
import bcrypt from "bcrypt"

export async function AddUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<z.infer<typeof SignUpFormSchema> | undefined> {
  const hashedPassword = await bcrypt.hash(password, 11)

  const response = await db
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

  return response[0]
}

export async function GetUser(
  email: string
): Promise<z.infer<typeof UserSchema> | undefined> {
  const response = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.email, email))

  if (response.length > 0) {
    return {
      firstName: response[0].first_name,
      lastName: response[0].last_name,
      password: response[0].password,
      email: response[0].email,
      role: response[0].role,
    }
  } else {
    return undefined
  }
}
