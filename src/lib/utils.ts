import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TransferType } from "@/types/transfer.type.ts"
import { isAxiosError } from "axios"
import type { ClientRequest, IncomingMessage } from "http"
import type { HttpProxy } from "vite"

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

export function formatCurrency(value: number, locale = "es-CO"): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function extractMessageError(error: unknown): string {
  if (typeof error === "string") {
    return error
  }

  if (isAxiosError(error)) {
    return error.response?.data?.message || error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Unknown error"
}

export function extractInitials(fullName: string) {
  if (!fullName) return "N/A"

  const [name, lastname] = fullName.split(" ")
  return `${name[0]}${lastname[0]}`.toUpperCase()
}

export function configureAuthHeader(proxy: HttpProxy.ProxyServer) {
  proxy.on("proxyReq", (proxyReq: ClientRequest, req: IncomingMessage) => {
    const authHeader = req.headers["authorization"]

    if (authHeader) {
      proxyReq.setHeader("Authorization", authHeader)
    }
  })
}
