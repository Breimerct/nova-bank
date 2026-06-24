import { LoaderCircle } from "lucide-react"

function TransferListLoading() {
  return (
    <div className="flex w-full flex-col items-center gap-4 mt-10">
      <LoaderCircle className="size-8 animate-spin" />

      <div className="text-center">
        <h4 className="text-lg font-medium">Loading transfers...</h4>
        <p className="text-muted-foreground text-sm">Please wait a moment</p>
      </div>
    </div>
  )
}

export default TransferListLoading
