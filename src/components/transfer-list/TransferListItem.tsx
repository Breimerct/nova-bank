import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { TransferType } from "@/types/transfer.type.ts"
import { extractInitials, formatCurrency } from "@/lib/utils.ts"

interface TransferListItemProps {
  transfer: TransferType
}

function TransferListItem({ transfer }: TransferListItemProps) {
  return (
    <Card className="rounded-md px-4 py-3 shadow-sm" as-child="true">
      <li className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {extractInitials(transfer.payeer.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{transfer.payeer.name}</p>
            <span className="text-sm text-muted-foreground">
              DNI. {transfer.payeer.document}
            </span>{" "}
            -{" "}
            <time className="text-sm text-muted-foreground">
              {transfer.date.toString()}
            </time>
          </div>
        </div>

        <div className="font-medium text-red-500 dark:text-red-400">
          - {transfer.currency} $
          {formatCurrency(transfer.value, transfer.currency)}
        </div>
      </li>
    </Card>
  )
}

export default TransferListItem
