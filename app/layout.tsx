import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Mono, Inter, Rubik_Glitch } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme/theme-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const mono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const glitch = Rubik_Glitch({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-glitch",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Evan Schultz - Portfolio",
  description: "Portfolio, blog, digital garden, and project showcase",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} ${glitch.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider>
          {/* Scanlines effect - visible in dark mode */}
          <div className="scanlines" />

          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
