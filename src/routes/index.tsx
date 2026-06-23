import {
  createBrowserRouter,
  type MiddlewareFunction,
  Navigate,
  redirect,
} from "react-router"

import Home from "@/pages/home/Home.tsx"
import MainLayout from "@/layouts/MainLayout.tsx"
import Login from "@/pages/auth/Login.tsx"

const publicRoutes = new Set(["/auth/login"])

const authMiddleware: MiddlewareFunction = ({ request }) => {
  const token = localStorage.token

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
    path: "/",
    element: <MainLayout />,
    middleware: [authMiddleware],
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth/login",
    middleware: [authMiddleware],
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace />,
  },
])
