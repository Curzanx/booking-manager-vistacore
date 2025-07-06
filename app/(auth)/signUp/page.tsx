import SignUpForm from "@/components/Forms/SignUpForm"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

export default function SignUp() {
  return (
    <>
      <section className="flex justify-center items-center h-svh">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Please sign up to access the booking manager
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </section>
    </>
  )
}
