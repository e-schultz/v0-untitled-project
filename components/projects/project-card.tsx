"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, Eye } from "lucide-react"
import { useTheme } from "@/lib/theme/theme-context"

interface ProjectCardProps {
  title: string
  description: string
  slug: string
  coverImage: string
  tags: string[]
  github?: string
  demo?: string
  deployed?: string
  type?: "portfolio" | "project"
}

export default function ProjectCard({
  title,
  description,
  slug,
  coverImage,
  tags,
  github,
  demo,
  deployed,
  type = "portfolio",
}: ProjectCardProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`group relative bg-white border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isDark
          ? "bg-black border-[#FF00FF]/30 hover:shadow-[#FF00FF]/20"
          : "dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`text-xs py-1 px-2 rounded-full ${
                isDark
                  ? "bg-black/80 text-[#FF00FF]"
                  : "bg-white/80 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100"
              }`}
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span
              className={`text-xs py-1 px-2 rounded-full ${
                isDark
                  ? "bg-black/80 text-zinc-400"
                  : "bg-white/80 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400"
              }`}
            >
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-zinc-900 dark:text-zinc-100"}`}>
          {title}
        </h3>
        <p className={`text-sm mb-4 line-clamp-2 ${isDark ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-400"}`}>
          {description}
        </p>

        {/* Links */}
        <div className="flex items-center justify-between">
          <Link
            href={`/${type}/${slug}`}
            className={`text-sm font-medium hover:underline ${
              isDark ? "text-[#FF00FF]" : "text-zinc-900 dark:text-zinc-100"
            }`}
          >
            View details
          </Link>

          <div className="flex space-x-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-zinc-900 ${
                  isDark ? "text-zinc-400 hover:text-[#FF00FF]" : "text-zinc-500 dark:hover:text-zinc-100"
                }`}
                aria-label="GitHub repository"
              >
                <Github size={18} />
              </a>
            )}

            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-zinc-900 ${
                  isDark ? "text-zinc-400 hover:text-[#00FFFF]" : "text-zinc-500 dark:hover:text-zinc-100"
                }`}
                aria-label="Live demo"
              >
                <Eye size={18} />
              </a>
            )}

            {deployed && (
              <a
                href={deployed}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-zinc-900 ${
                  isDark ? "text-zinc-400 hover:text-[#FFFF00]" : "text-zinc-500 dark:hover:text-zinc-100"
                }`}
                aria-label="Deployed site"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
