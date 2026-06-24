import type { BalanceType } from "@/types/balance.type.ts"
import { create } from "zustand"
import { BalanceService } from "@/services/balance/balance.service.ts"

type BalanceState = {
  balance: BalanceType
  isLoadingBalance: boolean
}

type BalanceActions = {
  setBalance: (balance: BalanceType) => void
  setIsLoadingBalance: (isLoading: boolean) => void

  fetchBalance: () => Promise<void>
}

const initialValues: BalanceState = {
  balance: {
    currency: "",
    accountBalance: 0,
  },
  isLoadingBalance: false,
}

const balanceService = BalanceService.getInstance()

export const useBalanceStore = create<BalanceState & BalanceActions>()(
  (set, get) => ({
    ...initialValues,

    setBalance: (balance) => set({ balance }),
    setIsLoadingBalance: (isLoading) => set({ isLoadingBalance: isLoading }),

    fetchBalance: async () => {
      const _this = get()

      try {
        _this.setIsLoadingBalance(true)
        const response = await balanceService.fetchBalance()

        if (response.data) {
          _this.setBalance(response.data)
        }
      } finally {
        _this.setIsLoadingBalance(false)
      }
    },
  })
)
