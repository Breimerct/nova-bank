import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx"
import Button from "@/components/ui/button/button.tsx"
import type { ReactNode } from "react"

interface CreateTransferContentProps {
  buttonTrigger: ReactNode
  saveButton: ReactNode
  content: ReactNode
  title: string
  description?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function SidePanel({
  buttonTrigger,
  saveButton,
  content,
  title,
  description,
  open,
  onOpenChange
}: CreateTransferContentProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{buttonTrigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {!!description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        <div className="flex-1 px-4">{content}</div>

        <SheetFooter>
          {saveButton}

          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SidePanel
