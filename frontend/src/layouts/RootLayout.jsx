import { Outlet } from "react-router";


export default function RootLayout(){
  return (
    <div className="min-h-screen bg-gray-900">

      <main>
        <Outlet />
      </main>

    </div>
  )
}