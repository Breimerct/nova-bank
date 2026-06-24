import {
  createBrowserRouter,
  type MiddlewareFunction,
  Navigate,
  redirect,
} from "react-router"

import Home from "@/pages/home/Home.tsx"
import AppLayout from "@/layouts/AppLayout.tsx"
import Login from "@/pages/auth/Login.tsx"
import { useAuthStore } from "@/stores/auth/auth.store.ts"
import MainLayout from "@/layouts/MainLayout.tsx"

const publicRoutes = new Set(["/auth/login"])

const authMiddleware: MiddlewareFunction = ({ request }) => {
  const { token } = useAuthStore.getState()

  const pathname = new URL(request.url).pathname
  const isPublicRoute = publicRoutes.has(pathname)

  if (!token && !isPublicRoute) {
    throw redirect("/auth/login")
  }

  if (token && isPublicRoute) {
    throw redirect("/")
  }
}

export const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    middleware: [authMiddleware],
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace />,
  },
])
