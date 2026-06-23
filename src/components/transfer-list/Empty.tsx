import { SearchAlert } from 'lucide-react'

function Empty() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <SearchAlert className="size-14" />
      <span className="text-muted-foreground text-lg uppercase font-semibold">
        No transfers to display
      </span>
    </div>
  )
}

export default Empty
