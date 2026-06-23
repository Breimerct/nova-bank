import { Card , CardHeader, CardContent} from '@/components/ui/card'
import LoginForm from "@/components/auth/LoginForm.tsx"

function Login() {
  return (
    <main className="h-screen w-full max-w-md mx-auto flex justify-center items-center">
      <Card className="w-full">
        <CardHeader className="text-center font-bold text-lg">
          NovaBank
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  )
}

export default Login
