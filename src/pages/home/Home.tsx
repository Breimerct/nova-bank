import BalanceCard from "@/components/balance-card/BalanceCard.tsx"
import Button from "@/components/ui/button/button.tsx"
import { LoaderCircle, PlusCircle, SavePlus } from "lucide-react"
import TransferList from "@/components/transfer-list/TransferList.tsx"
import TransferFilter from "@/components/trasnfer-filter/TransferFilter.tsx"
import SidePanel from "@/components/side-panel/SidePanel.tsx"
import CreateTransferForm from "@/components/create-transfer/CreateTransferForm.tsx"
import { useTransferStore } from "@/stores/transfer/transfer.store.ts"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/auth/auth.store.ts"
import { useBalanceStore } from "@/stores/balance/balance.store.ts"
import type { CreateTransferType } from "@/types/transfer.type.ts"

function Home() {
  const {
    fetchTransfer,
    transfers,
    isLoadingTransfers,
    createTransfer,
    isLoadingCreateTransfer,
  } = useTransferStore()
  const { user } = useAuthStore()
  const { fetchBalance, balance, isLoadingBalance } = useBalanceStore()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchTransfer()
    fetchBalance()
  }, [fetchTransfer, fetchBalance])

  const handleCreateTransfer = async (payload: CreateTransferType) => {
    const result = await createTransfer(payload)

    if (result) {
      setOpen(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-lg">
      <BalanceCard
        titular={user?.name || "N/A"}
        balance={balance.accountBalance}
        currency={balance.currency}
        isLoading={isLoadingBalance}
      />

      <article className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold">Transfers</h4>

          <SidePanel
            open={open}
            onOpenChange={setOpen}
            buttonTrigger={
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-1" />
                New transfer
              </Button>
            }
            saveButton={
              <Button variant="outline" size="sm" form="create-transfer-form">
                {isLoadingCreateTransfer ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <SavePlus className="mr-1" />
                )}
                {isLoadingCreateTransfer ? "Loading..." : "Save transfer"}
              </Button>
            }
            content={
              <CreateTransferForm
                onCreateTransfer={handleCreateTransfer}
                isCreating={isLoadingCreateTransfer}
              />
            }
            title="Create Transfer"
            description="Fill in the details for the new transfer."
          />
        </div>

        <TransferFilter />

        <TransferList
          transfersList={transfers}
          isLoading={isLoadingTransfers}
        />
      </article>
    </section>
  )
}

export default Home
