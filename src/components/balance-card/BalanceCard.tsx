import { Card, CardContent } from "@/components/ui/card.tsx"
import { formatCurrency } from "@/lib/utils.ts"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
  titular: string
  balance: number
  currency: string
  isLoading?: boolean
}

function BalanceCard({ titular, balance, currency, isLoading }: Props) {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent>
        <div className="relative h-7 w-9 rounded-sm bg-[linear-gradient(135deg,#c9a84c_0%,#e8d5a3_50%,#c9a84c_100%)] before:absolute before:top-0 before:bottom-0 before:left-1/2 before:w-px before:bg-black/20 before:content-[''] after:absolute after:top-1/2 after:right-0 after:left-0 after:h-px after:bg-black/20 after:content-['']"></div>
        {isLoading ? (
          <Skeleton className="mt-4 h-5 w-full max-w-44 rounded-md" />
        ) : (
          <div className="text-md mt-4 font-mono font-semibold tracking-widest">
            •••• •••• •••• 4821
          </div>
        )}

        <div className="mt-6 flex w-full items-center justify-between">
          <div className="text-md w-full">
            <p className="font-semibold opacity-75">Titular</p>
            {isLoading ? (
              <Skeleton className="h-5 w-full max-w-32 rounded-md" />
            ) : (
              <p className="font-semibold">{titular}</p>
            )}
          </div>

          <div className="justify-self-end">
            <p className="text-end font-semibold opacity-75">Balance:</p>
            {isLoading ? (
              <Skeleton className="h-6 w-32 rounded-md" />
            ) : (
              <p className="text-lg font-semibold">
                ${formatCurrency(balance, currency)}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm font-semibold opacity-75">
          {isLoading ? (
            <Skeleton className="h-5 w-full max-w-12 rounded-md" />
          ) : (
            <span>{currency}</span>
          )}
          NovaBank
        </div>
      </CardContent>
    </Card>
  )
}

export default BalanceCard
