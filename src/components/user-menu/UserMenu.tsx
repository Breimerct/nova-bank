import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx"
import { extractInitials } from "@/lib/utils.ts"
import type { UserType } from "@/types/user.type.ts"
import { LogOut } from "lucide-react"
import { useAuthStore } from "@/stores/auth/auth.store.ts"

interface UserMenuProps {
  user: UserType | null
}

function UserMenu({ user }: UserMenuProps) {
  const { logout } = useAuthStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-3 rounded-md px-4 py-1 transition-all hover:bg-primary-foreground">
          <span className="font-semibold">{user?.name ?? ""}</span>
          <Avatar>
            <AvatarFallback>{extractInitials(user?.name ?? "")}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Setting</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            Log out
            <DropdownMenuShortcut>
              <LogOut />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
