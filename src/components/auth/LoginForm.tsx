import { Field } from "@/components/ui/field"
import Button from "@/components/ui/button/button.tsx"
import { Separator } from "@/components/ui/separator"
import { FieldInput } from "@/components/form/FieldInput.tsx"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "@/schemas/auth/login.schema.ts"
import { useAuthStore } from "@/stores/auth/auth.store.ts"
import { LoaderCircle, LogIn } from "lucide-react"

function LoginForm() {
  const { login, loadingLogin } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const submit = handleSubmit(async (data) => {
    await login(data)
  })

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={submit}>
        <FieldInput
          label={"Email"}
          id="email"
          type="email"
          placeholder="Email"
          errorMessage={errors.email?.message}
          disabled={loadingLogin}
          {...register("email")}
        />

        <FieldInput
          label={"Password"}
          id="password"
          type="password"
          placeholder="Password"
          errorMessage={errors.password?.message}
          disabled={loadingLogin}
          {...register("password")}
        />

        <Separator className="my-2" />

        <Field orientation="responsive">
          <Button type="submit">
            {loadingLogin ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="h-4 w-4" />
            )}
            {loadingLogin ? "Loading..." : "Login"}
          </Button>
        </Field>
      </form>
    </>
  )
}

export default LoginForm
