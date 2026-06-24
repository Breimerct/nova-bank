import { Theme } from "@/types/theme.type.ts"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type ThemeState = {
  currentTheme: Theme
}

type ThemeActions = {
  setTheme: (theme: Theme) => void

  initTheme: () => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set, get) => ({
      currentTheme: Theme.SYSTEM,

      setTheme: (theme) => set({ currentTheme: theme }),

      initTheme: () => {
        const _this = get()

        if (_this.currentTheme === Theme.SYSTEM) {
          const preferDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches

          _this.setTheme(preferDark ? Theme.DARK : Theme.LIGHT)
          document.documentElement.classList.toggle(Theme.DARK, preferDark)
          return
        }

        if (_this.currentTheme === Theme.DARK) {
          _this.setTheme(Theme.DARK)
          document.documentElement.classList.add(Theme.DARK)
          return
        }

        if (_this.currentTheme === Theme.LIGHT) {
          _this.setTheme(Theme.LIGHT)
          document.documentElement.classList.remove(Theme.DARK)
          return
        }
      },

      toggleTheme: () => {
        const _this = get()

        if (_this.currentTheme === Theme.DARK) {
          document.documentElement.classList.remove(Theme.DARK)
          _this.setTheme(Theme.LIGHT)
        } else {
          document.documentElement.classList.add(Theme.DARK)
          _this.setTheme(Theme.DARK)
        }
      },
    }),
    {
      name: "theme-store",
    }
  )
)
