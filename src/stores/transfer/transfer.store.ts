import type { CreateTransferType, TransferType } from "@/types/transfer.type.ts"
import { create } from "zustand"
import { TransferService } from "@/services/transfer/transfer.service.ts"
import { groupTransfersByDate } from "@/lib/utils.ts"
import { sileo as toast } from "sileo"

type TransferState = {
  transfers: Record<string, TransferType[]>
  isLoadingTransfers: boolean
  isLoadingCreateTransfer: boolean
}

type TransferActions = {
  setTransfers: (transfers: Record<string, TransferType[]>) => void
  setIsLoadingTransfer: (isLoading: boolean) => void
  setIsLoadingCreateTransfer: (isLoading: boolean) => void

  fetchTransfer: () => Promise<void>
  createTransfer: (createTransfer: CreateTransferType) => Promise<boolean>
}

const initialValues: TransferState = {
  transfers: {},
  isLoadingTransfers: false,
  isLoadingCreateTransfer: false,
}

const transferService = TransferService.getInstance()

export const useTransferStore = create<TransferState & TransferActions>()(
  (set, get) => ({
    ...initialValues,

    setTransfers: (transfers) => set({ transfers }),
    setIsLoadingTransfer: (isLoading) => set({ isLoadingTransfers: isLoading }),
    setIsLoadingCreateTransfer: (isLoading) =>
      set({ isLoadingCreateTransfer: isLoading }),

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

    createTransfer: async (createTransfer) => {
      const _this = get()
      const dateNow = Date.now()
      const createDate = new Date(createTransfer.transferDate).getTime()

      try {
        _this.setIsLoadingCreateTransfer(true)
        const response = await transferService.createTransfer(createTransfer)

        if (response.data) {
          if (dateNow < createDate) {
            toast.success({
              title: "Transfer programmed successfully",
              description: "Your transfer has been programmed successfully.",
            })
          } else {
            toast.success({
              title: "Transfer created successfully",
              description: "Your transfer has been created successfully.",
            })
          }

          await _this.fetchTransfer()
          return true
        }

        toast.error({
          title: "Error creating transfer",
          description:
            "There was an error creating your transfer. Please try again.",
        })
        return false
      } finally {
        _this.setIsLoadingCreateTransfer(false)
      }
    },
  })
)
