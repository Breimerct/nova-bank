import BalanceCard from "@/components/balance-card/BalanceCard.tsx"
import Button from "@/components/ui/button/button.tsx"
import { PlusCircle } from "lucide-react"
import TransferList from "@/components/transfer-list/TransferList.tsx"
import TransferFilter from "@/components/trasnfer-filter/TransferFilter.tsx"

function Home() {
  return (
    <section className="mx-auto w-full max-w-lg">
      <BalanceCard
        titular="Breimer E. Correa T."
        balance={50700}
        currency="USD"
      />

      <article className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-lg">Transfers</h4>

          <Button variant="outline" size="sm">
            <PlusCircle className="mr-1" />
            New Transfer
          </Button>
        </div>

        <TransferFilter />

        <TransferList transfersList={{}} />
      </article>
    </section>
  )
}

export default Home
