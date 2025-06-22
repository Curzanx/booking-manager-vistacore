import { z } from "zod"

export const signInFormSchema = z.object({
  email: z.string().trim().min(2).max(50),
  password: z.string().trim().min(2).max(50),
})
