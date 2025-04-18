"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { useTheme } from "@/lib/theme/theme-context"

export default function Footer() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 dark:border-[#FF00FF]/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className={`text-sm ${isDark ? "text-[#FF00FF]/70 font-mono" : "text-zinc-500 dark:text-zinc-400"}`}>
              &copy; {year} Evan Schultz. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={
                isDark
                  ? "text-[#FF00FF]/70 hover:text-[#FF00FF]"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              }
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </Link>

            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={
                isDark
                  ? "text-[#00FFFF]/70 hover:text-[#00FFFF]"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              }
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={
                isDark
                  ? "text-[#FFFF00]/70 hover:text-[#FFFF00]"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              }
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
