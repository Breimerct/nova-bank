import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { configureAuthHeader } from "./src/lib/utils.ts"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/default/login": {
        target: "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com",
        changeOrigin: true,
      },

      "/default/balance": {
        target: "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com",
        changeOrigin: true,
        configure: configureAuthHeader,
      },

      "/default/transferList": {
        target: "https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com",
        changeOrigin: true,
        configure: configureAuthHeader,
      },

      "/default/transfer": {
        target: "https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com",
        changeOrigin: true,
        configure: configureAuthHeader,
      },
    },
  },
})
