import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"
import Credentials from "next-auth/providers/credentials"
import { SignInFormSchema } from "@/models/zodSchema"
import { GetUser } from "@/server/UserActions"
import bcrypt from "bcrypt"

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const safeCredentials = SignInFormSchema.safeParse(credentials)

        if (safeCredentials.success) {
          const { email, password } = safeCredentials.data
          const user = await GetUser(email)
          if (!user) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }

        console.log("Invalid Credentials")
        return null
      },
    }),
  ],
})
