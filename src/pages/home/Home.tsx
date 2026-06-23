import BalanceCard from "@/components/balance-card/BalanceCard.tsx"
import Button from "@/components/ui/button/button.tsx"
import { PlusCircle, SavePlus } from "lucide-react"
import TransferList from "@/components/transfer-list/TransferList.tsx"
import TransferFilter from "@/components/trasnfer-filter/TransferFilter.tsx"
import SidePanel from "@/components/side-panel/SidePanel.tsx"
import CreateTransferForm from "@/components/create-transfer/CreateTransferForm.tsx"

function Home() {
  return (
    <section className="mx-auto w-full max-w-lg">
      <BalanceCard
        titular="Breimer E. Correa T."
        balance={50700}
        currency="USD"
      />

      <article className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold">Transfers</h4>

          <SidePanel
            buttonTrigger={
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-1" />
                New transfer
              </Button>
            }
            saveButton={
              <Button variant="outline" size="sm" form="create-transfer-form">
                <SavePlus className="mr-1" />
                Save transfer
              </Button>
            }
            content={<CreateTransferForm />}
            title="Create Transfer"
            description="Fill in the details for the new transfer."
          />
        </div>

        <TransferFilter />

        <TransferList transfersList={{}} />
      </article>
    </section>
  )
}

export default Home
