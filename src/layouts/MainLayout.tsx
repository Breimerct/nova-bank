import { Outlet } from "react-router"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/stores/auth/auth.store.ts"
import UserMenu from "@/components/user-menu/UserMenu.tsx"
import Button from "@/components/ui/button/button.tsx"
import { Sun, MoonStar } from "lucide-react"
import { useThemeStore } from "@/stores/theme/theme.store.ts"
import { Theme } from "@/types/theme.type.ts"

function MainLayout() {
  const { user } = useAuthStore()
  const { toggleTheme, currentTheme } = useThemeStore()

  return (
    <>
      <header className="w-full flex-1">
        <nav className={"flex w-full items-center justify-between p-4"}>
          <div className={"text-lg font-bold"}>NovaBank</div>

          <div className="flex flex-row items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {currentTheme === Theme.DARK ? (
                <Sun className="size-5" />
              ) : (
                <MoonStar className="size-5" />
              )}
            </Button>

            <UserMenu user={user} />
          </div>
        </nav>
      </header>

      <Separator className="mb-10" />

      <Outlet />
    </>
  )
}

export default MainLayout
