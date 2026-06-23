import { FieldInput } from "@/components/form/FieldInput.tsx"

function TransferFilter() {
  return (
    <form className="flex flex-row gap-2">
      <FieldInput placeholder="Destination" />
      <FieldInput placeholder="Currency" />
      <FieldInput type={"date"} />
    </form>
  )
}

export default TransferFilter
