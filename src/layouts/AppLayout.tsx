import { Outlet, useNavigate } from "react-router"
import { Toaster } from "sileo"
import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth/auth.store.ts"
import { useThemeStore } from "@/stores/theme/theme.store.ts"

export function AppLayout() {
  const { token } = useAuthStore()
  const { initTheme, currentTheme } = useThemeStore()
  const navigate = useNavigate()

  useEffect(() => {
    initTheme()

    if (!token) {
      navigate("/auth/login")
    }

    if (token) {
      navigate("/")
    }
  }, [token, navigate, initTheme, currentTheme])

  return (
    <main className="w-full">
      <Toaster
        position="top-center"
        theme={currentTheme}
        options={{ duration: 4000 }}
      />
      <Outlet />
    </main>
  )
}

export default AppLayout
