import type { TransferType } from "@/types/transfer.type.ts"
import { create } from "zustand"
import { TransferService } from "@/services/transfer/transfer.service.ts"
import { groupTransfersByDate } from "@/lib/utils.ts"

type TransferState = {
  transfers: Record<string, TransferType[]>
}

type TransferActions = {
  setTransfers: (transfers: Record<string, TransferType[]>) => void
  fetchTransfer: () => Promise<boolean>
}

const initialValues: TransferState = {
  transfers: {},
}

const transferService = TransferService.getInstance()

export const useTransferStore = create<TransferState & TransferActions>()(
  (set, get) => ({
    ...initialValues,

    setTransfers: (transfers) => set({ transfers }),

    fetchTransfer: async () => {
      const _this = get()
      const response = await transferService.fetchTransfers()

      if (response.data) {
        const transfersByDate = groupTransfersByDate(response.data.transfers)
        _this.setTransfers(transfersByDate)
        return true
      }

      return false
    },
  })
)
