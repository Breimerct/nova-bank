import {
  createBrowserRouter,
  type MiddlewareFunction,
  Navigate,
  redirect,
} from "react-router"

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
    lazy: async () => ({
      Component: (await import("../layouts/MainLayout.tsx")).default,
    }),
    middleware: [authMiddleware],
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("../pages/home/Home.tsx")).default,
        }),
      },
    ],
  },
  {
    path: "/auth/login",
    middleware: [authMiddleware],
    lazy: async () => ({
      Component: (await import("../pages/auth/Login.tsx")).default,
    }),
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace />,
  },
])
