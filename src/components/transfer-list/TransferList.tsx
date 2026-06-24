import TransferListItem from "@/components/transfer-list/TransferListItem.tsx"
import type { TransferType } from "@/types/transfer.type.ts"
import Empty from "@/components/transfer-list/Empty.tsx"
import TransferListLoading from "@/components/transfer-list/TransferListLoading.tsx"

interface TransferListProps {
  transfersList: Record<string, TransferType[]>
  isLoading?: boolean
}

function TransferList({ transfersList, isLoading }: TransferListProps) {
  return (
    <div className="mt-6">
      {isLoading && <TransferListLoading />}

      {!isLoading &&
        Object.keys(transfersList).map((transferDate) => (
          <div key={transferDate}>
            <time className="mt-4 mb-2 block text-lg text-muted-foreground">
              {transferDate}
            </time>

            <ul className="flex flex-col gap-2 border-l-2 pl-3">
              {transfersList[transferDate].map((transfer) => (
                <TransferListItem
                  key={transfer.payeer.document}
                  transfer={transfer}
                />
              ))}
            </ul>
          </div>
        ))}

      {!isLoading && !Object.keys(transfersList).length && <Empty />}
    </div>
  )
}

export default TransferList
