import { FieldInput } from "@/components/form/FieldInput.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { createTransferSchema } from "@/schemas/transfer/create-transfer.schema.ts"

function CreateTransferForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTransferSchema),
    defaultValues: {
      transferDate: new Date().toISOString().split("T")[0]
    }
  })

  const submit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <form id="create-transfer-form" className="flex flex-col gap-4" onSubmit={submit}>
      <FieldInput
        label="Value"
        placeholder="1000"
        type="number"
        errorMessage={errors.value?.message}
        {...register("value")}
      />

      <FieldInput
        label="Currency"
        placeholder="USD"
        errorMessage={errors.currency?.message}
        {...register("currency")}
      />

      <FieldInput
        label="Payeer Document"
        placeholder="1234567890"
        errorMessage={errors.payeerDocument?.message}
        {...register("payeerDocument")}
      />

      <FieldInput
        label="Transfer Date"
        type="date"
        placeholder="2025-06-22"
        errorMessage={errors.transferDate?.message}
        {...register("transferDate")}
      />
    </form>
  )
}

export default CreateTransferForm
