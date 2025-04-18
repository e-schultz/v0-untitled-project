"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Code, Terminal } from "lucide-react"
import ThemeToggle from "@/components/ui/theme-toggle"
import { useTheme } from "@/lib/theme/theme-context"

const navItems = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Digital Garden", href: "/garden" },
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/resume" },
  { name: "About", href: "/about" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <header className="border-b border-zinc-200 dark:border-[#FF00FF]/50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            {isDark ? <Terminal className="h-8 w-8 text-[#FF00FF]" /> : <Code className="h-8 w-8" />}
            <span className={`text-lg font-bold tracking-tight ${isDark ? "font-mono text-[#FF00FF]" : ""}`}>
              Evan Schultz
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700 dark:text-[#FF00FF]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 text-zinc-900 hover:text-zinc-500 ${
                isDark ? "font-mono text-white hover:text-[#FF00FF]" : "dark:text-zinc-100 dark:hover:text-zinc-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              {isDark ? <Terminal className="h-8 w-8 text-[#FF00FF]" /> : <Code className="h-8 w-8" />}
              <span className={`text-lg font-bold tracking-tight ${isDark ? "font-mono text-[#FF00FF]" : ""}`}>
                Evan Schultz
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-zinc-700 dark:text-[#FF00FF]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-zinc-200 dark:divide-[#FF00FF]/30">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-zinc-900 hover:bg-zinc-50 ${
                      isDark
                        ? "font-mono text-white hover:bg-[#FF00FF]/20 hover:text-[#FF00FF]"
                        : "dark:text-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="py-6 flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
