import { Card , CardHeader, CardContent} from '@/components/ui/card'
import LoginForm from "@/components/auth/LoginForm.tsx"

function Login() {
  return (
    <section className="h-svh w-full max-w-md mx-auto flex justify-center items-center">
      <Card className="w-full">
        <CardHeader className="text-center font-bold text-lg">
          NovaBank
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  )
}

export default Login
