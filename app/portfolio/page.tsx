import { getAllContent, ContentType } from "@/lib/content/mdx"
import ProjectCard from "@/components/projects/project-card"

export const metadata = {
  title: "Portfolio - Evan Schultz",
  description: "A showcase of my featured works and projects",
}

export default async function PortfolioPage() {
  const portfolioItems = await getAllContent(ContentType.PORTFOLIO)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 float:text-zinc-300 max-w-3xl mx-auto">
          A collection of my professional work, showcasing projects I've designed and developed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
          <ProjectCard
            key={item.slug}
            title={item.frontmatter.title}
            description={item.frontmatter.description}
            slug={item.slug}
            coverImage={item.frontmatter.cover || "/swirling-colors.png"}
            tags={item.frontmatter.tags || []}
            github={item.frontmatter.github}
            demo={item.frontmatter.demo}
            deployed={item.frontmatter.deployed}
            type="portfolio"
          />
        ))}

        {/* Fallback if no content */}
        {portfolioItems.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 float:text-zinc-300">
              Portfolio items will appear here. Add MDX files to the content/portfolio directory to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
