import type { TransferType } from "@/types/transfer.type.ts"
import { create } from "zustand"
import { TransferService } from "@/services/transfer/transfer.service.ts"
import { groupTransfersByDate } from "@/lib/utils.ts"

type TransferState = {
  transfers: Record<string, TransferType[]>
  isLoadingTransfers: boolean
}

type TransferActions = {
  setTransfers: (transfers: Record<string, TransferType[]>) => void
  setIsLoadingTransfer: (isLoading: boolean) => void

  fetchTransfer: () => Promise<void>
}

const initialValues: TransferState = {
  transfers: {},
  isLoadingTransfers: false,
}

const transferService = TransferService.getInstance()

export const useTransferStore = create<TransferState & TransferActions>()(
  (set, get) => ({
    ...initialValues,

    setTransfers: (transfers) => set({ transfers }),
    setIsLoadingTransfer: (isLoading) => set({ isLoadingTransfers: isLoading }),

    fetchTransfer: async () => {
      const _this = get()
      try {
        _this.setIsLoadingTransfer(true)
        const response = await transferService.fetchTransfers()

        if (response.data) {
          const transfersByDate = groupTransfersByDate(response.data.transfers)
          _this.setTransfers(transfersByDate)
        }
      } finally {
        _this.setIsLoadingTransfer(false)
      }
    },
  })
)
