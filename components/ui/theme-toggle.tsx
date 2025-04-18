"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme/theme-context"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className={cn(
          "rounded-md p-2 transition-colors",
          theme === "light" ? "bg-zinc-200 text-zinc-900" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200",
        )}
        aria-label="Light mode"
      >
        <Sun size={18} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className={cn(
          "rounded-md p-2 transition-colors",
          theme === "dark" ? "bg-zinc-700 text-zinc-50" : "text-zinc-500 hover:text-zinc-50 hover:bg-zinc-700",
        )}
        aria-label="Dark mode"
      >
        <Moon size={18} />
      </Button>
    </div>
  )
}
