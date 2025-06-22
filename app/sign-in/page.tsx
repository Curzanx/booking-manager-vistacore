import SignInForm from "@/components/Forms/SignInForm"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SignIn() {
  return (
    <>
      <main className="flex justify-center items-center h-svh">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Please sign in to access the booking manager
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </main>
    </>
  )
}
