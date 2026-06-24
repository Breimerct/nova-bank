import { persist } from "zustand/middleware"
import { create } from "zustand"
import type { AuthType } from "@/types/authType.ts"
import { AuthService } from "@/services/auth/auth.service.ts"
import type { UserType } from "@/types/user.type.ts"
import { sileo as toast } from "sileo"

type AuthState = {
  token: string
  user: UserType | null
  loadingLogin: boolean
}

type AuthActions = {
  setToken: (token: string) => void
  setUser: (user: UserType | null) => void
  setLoadingLogin: (loading: boolean) => void

  login: (loginRequest: AuthType) => Promise<boolean>
  logout: () => void
}

const initialValue: AuthState = {
  token: "",
  user: null,
  loadingLogin: false,
}

const authService = AuthService.getInstance()

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialValue,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setLoadingLogin: (loading) => set({ loadingLogin: loading }),

      login: async (authRequest: AuthType) => {
        const _this = get()
        try {
          _this.setLoadingLogin(true)
          const response = await authService.login(authRequest)

          if (response.data) {
            _this.setToken(response.data.token)
            _this.setUser(response.data.user)
            localStorage.setItem("token", response.data.token)

            toast.success({
              title: "Login successful",
              description: `Welcome back, ${response.data.user.name}!`,
            })
            return true
          }

          if (response.errorMessage && response.statusCode === 401) {
            toast.error({
              title: "Login failed",
              description:
                "Invalid credentials. Please check your email and password.",
            })
          }

          return false
        } finally {
          _this.setLoadingLogin(false)
        }
      },

      logout: () => {
        const _this = get()

        _this.setToken("")
        _this.setUser(null)
      },
    }),

    { name: "auth-store" }
  )
)
