import { Field } from "@/components/ui/field"
import Button from "@/components/ui/button/button.tsx"
import { Separator } from "@/components/ui/separator"
import { FieldInput } from "@/components/form/FieldInput.tsx"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "@/schemas/auth/login.schema.ts"

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const submit = handleSubmit((data) => {
    console.log(data)
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
          {...register("email")}
        />

        <FieldInput
          label={"Password"}
          id="password"
          type="password"
          placeholder="Password"
          errorMessage={errors.password?.message}
          {...register("password")}
        />

        <Separator className="my-2" />

        <Field orientation="responsive">
          <Button type="submit">Login</Button>
        </Field>
      </form>
    </>
  )
}

export default LoginForm
