import { z } from "zod"

export const SignInFormSchema = z.object({
  email: z.string().trim().min(2).max(50),
  password: z.string().trim().min(2).max(50),
})

export const SignUpFormSchema = z.object({
  email: z.string().trim().min(2).max(50),
  password: z.string().trim().min(2).max(50),
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
})

export const UserSchema = z.object({
  email: z.string().trim().min(2).max(50),
  firstName: z.string().trim().min(2).max(50),
  password: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  role: z.enum(["admin", "user"]),
})
