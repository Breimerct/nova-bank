import type { PayeerType } from "@/types/payeer.type.ts"

export type TransferType = {
  value: number
  date: Date
  currency: string
  payeer: PayeerType
}
