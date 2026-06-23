import { Card, CardContent } from "@/components/ui/card.tsx"

interface Props {
  titular: string
  balance: string
  currency: string
}

function BalanceCard({ titular, balance, currency }: Props) {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent>
        <div className="relative h-7 w-9 rounded-sm bg-[linear-gradient(135deg,#c9a84c_0%,#e8d5a3_50%,#c9a84c_100%)] before:absolute before:top-0 before:bottom-0 before:left-1/2 before:w-px before:bg-black/20 before:content-[''] after:absolute after:top-1/2 after:right-0 after:left-0 after:h-px after:bg-black/20 after:content-['']"></div>
        <div className="text-md mt-4 font-mono font-semibold tracking-widest">
          •••• •••• •••• 4821
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-md">
            <p className="font-semibold opacity-75">Titular</p>
            <p className="font-semibold">{titular}</p>
          </div>

          <div>
            <p className="font-semibold opacity-75">Balance:</p>
            <p className="text-lg font-semibold">{balance}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center text-sm font-semibold opacity-75">
          <span>
            {currency}
          </span>

          NovaBank
        </div>
      </CardContent>
    </Card>
  )
}

export default BalanceCard
