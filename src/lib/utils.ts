import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TransferType } from "@/types/transfer.type.ts"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupTransfersByDate(
  transfers: TransferType[]
): Record<string, TransferType[]> {
  return transfers.reduce<Record<string, TransferType[]>>((acc, transfer) => {
    const date =
      transfer.date instanceof Date
        ? transfer.date.toISOString().split("T")[0]
        : transfer.date

    ;(acc[date] ??= []).push(transfer)

    return acc
  }, {})
}

export function formatCurrency(
  value: number,
  locale = "es-CO"
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
