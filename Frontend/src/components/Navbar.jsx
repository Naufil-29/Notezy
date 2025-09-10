import React from "react"
import { PlusIcon, Sun, Moon } from "lucide-react"
import { Link } from "react-router"
import { Button } from "../components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/auth"
  }

  if (!mounted) return null // avoid hydration mismatch

  return (
    <header className="sticky top-0 bg-white/30 backdrop-blur-md h-30 rouded-lg shadow-lg">
      <div className="mx-auto max-w-6xl p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Notezy</h1>
          <div className="flex items-center gap-5">
            <Button asChild>
              <Link to="/create" className="flex items-center gap-2">
                <PlusIcon className="size-5" />
                <span>New Note</span>
              </Link>
            </Button>

            <Button
            className="bg-gray-200"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              variant="outline"
              size="icon"
            >
              {theme === "light" ? (
                <Sun className="w-5 h-5 bg-gray-200" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
