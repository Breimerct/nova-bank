import { Outlet, useNavigate } from "react-router"
import { Toaster } from "sileo"
import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth/auth.store.ts"
import { useThemeStore } from "@/stores/theme/theme.store.ts"
import { createPortal } from "react-dom"

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

  const toast = createPortal(
    <Toaster
      position="top-center"
      theme={currentTheme}
      options={{ duration: 4000 }}
    />,
    document.body
  )

  return (
    <main className="w-full">
      {toast}
      <Outlet />
    </main>
  )
}

export default AppLayout
