import Link from "next/link"
import { ArrowRight, BookOpen, Briefcase, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="relative">
      {/* Hero section */}
      <section className="py-20 sm:py-32 border-b border-zinc-200 dark:border-[#FF00FF]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              <span className="block">Hi, I'm Evan Schultz</span>
              <span className="block dark:font-glitch">Developer, Designer, Creator</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">
              Welcome to my digital space where I showcase my work, share my thoughts, and connect ideas. Explore my
              projects, browse my digital garden, or read my latest blog posts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="dark:bg-[#FF00FF] dark:text-black dark:hover:bg-[#FF00FF]/80">
                <Link href="/portfolio">View My Work</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="dark:border-[#FF00FF] dark:text-[#FF00FF] dark:hover:bg-[#FF00FF]/10"
              >
                <Link href="/about">About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured sections */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Explore My Digital Space</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Portfolio card */}
            <div className="group rounded-lg border border-zinc-200 dark:border-[#FF00FF]/50 overflow-hidden hover:shadow-md transition-all duration-300 dark:hover:shadow-[#FF00FF]/20">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-[#FF00FF]/20 mb-4">
                  <Briefcase className="w-6 h-6 text-zinc-900 dark:text-[#FF00FF]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Portfolio</h3>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  View my featured works and projects across various domains.
                </p>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-[#FF00FF]"
                >
                  Browse Portfolio
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Blog card */}
            <div className="group rounded-lg border border-zinc-200 dark:border-[#00FFFF]/50 overflow-hidden hover:shadow-md transition-all duration-300 dark:hover:shadow-[#00FFFF]/20">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-[#00FFFF]/20 mb-4">
                  <BookOpen className="w-6 h-6 text-zinc-900 dark:text-[#00FFFF]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Blog</h3>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  Read my thoughts, tutorials, and insights on various topics.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-[#00FFFF]"
                >
                  Read Articles
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Digital Garden card */}
            <div className="group rounded-lg border border-zinc-200 dark:border-[#FFFF00]/50 overflow-hidden hover:shadow-md transition-all duration-300 dark:hover:shadow-[#FFFF00]/20">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-[#FFFF00]/20 mb-4">
                  <BookOpen className="w-6 h-6 text-zinc-900 dark:text-[#FFFF00]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Digital Garden</h3>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  Explore my interconnected notes and evolving thoughts.
                </p>
                <Link
                  href="/garden"
                  className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-[#FFFF00]"
                >
                  Explore Garden
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Projects card */}
            <div className="group rounded-lg border border-zinc-200 dark:border-[#FF00FF]/50 overflow-hidden hover:shadow-md transition-all duration-300 dark:hover:shadow-[#FF00FF]/20">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-[#FF00FF]/20 mb-4">
                  <Terminal className="w-6 h-6 text-zinc-900 dark:text-[#FF00FF]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Projects</h3>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  Check out my creative coding, art, and music experiments.
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-[#FF00FF]"
                >
                  View Projects
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
