import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLogginIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/")

      if (isOnDashboard) {
        if (isLogginIn) return true
        else return false
      } else if (isLogginIn) {
        return Response.redirect(new URL("/", nextUrl))
      }
      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
