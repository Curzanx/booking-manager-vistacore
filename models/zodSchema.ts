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

export const TimeslotsFormSchema = z.object({
  purpose: z
    .string()
    .trim()
    .min(10, { message: "Please add a meaningful purpose." }),
  timeslots: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one timeslot.",
  }),
})
