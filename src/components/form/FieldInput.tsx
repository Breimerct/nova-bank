import { type ComponentProps, forwardRef, useState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils.ts"

interface Props extends ComponentProps<"input"> {
  label: string
  errorMessage?: string
}

export const FieldInput = forwardRef<HTMLInputElement, Props>(
  ({ type, className, errorMessage, ...props }, ref) => {
    const [showPass, setShowPass] = useState(false)
    const isPass = type === "password"

    return (
      <>
        <Field className="relative w-full gap-1!" data-invalid={!!errorMessage}>
          <FieldLabel htmlFor={props.id}>{props.label}</FieldLabel>
          <Input
            ref={ref}
            type={showPass ? "text" : type}
            className={cn({ "pr-11": isPass }, className)}
            aria-invalid={!!errorMessage}
            {...props}
          />

          {!!errorMessage && <FieldError>{errorMessage}</FieldError>}
          {isPass && (
            <div className="absolute top-7 right-1 w-8! text-muted-foreground hover:bg-transparent">
              <button
                className="text-muted-foreground hover:bg-transparent"
                type="button"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff /> : <Eye />}
              </button>
            </div>
          )}
        </Field>
      </>
    )
  }
)
