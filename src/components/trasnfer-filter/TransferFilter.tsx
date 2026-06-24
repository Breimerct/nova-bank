import { FieldInput } from "@/components/form/FieldInput.tsx"

interface TransferFilterProps {
  filters: {
    payeerName: string
    value: string
    transferDate: string
  }
  onChange: (
    key: "payeerName" | "value" | "transferDate",
    value: string
  ) => void
}

function TransferFilter({ filters, onChange }: TransferFilterProps) {
  return (
    <form className="flex flex-row gap-2">
      <FieldInput
        placeholder="Destination / Payeer Name"
        value={filters.payeerName}
        onChange={(e) => onChange("payeerName", e.target.value)}
      />

      <FieldInput
        placeholder="Amount"
        type="number"
        value={filters.value}
        onChange={(e) => onChange("value", e.target.value)}
      />

      <FieldInput
        type="date"
        value={filters.transferDate}
        onChange={(e) => onChange("transferDate", e.target.value)}
      />
    </form>
  )
}

export default TransferFilter
