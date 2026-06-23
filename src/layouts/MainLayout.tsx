import { Outlet } from "react-router"

export function MainLayout() {
  return (
    <main className="flex min-h-svh w-full p-6">
      <Outlet />
    </main>
  )
}

export default MainLayout
