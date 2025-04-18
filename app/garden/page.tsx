import Link from "next/link"
import { getAllContent, ContentType } from "@/lib/content/mdx"
import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Digital Garden - Evan Schultz",
  description: "My interconnected notes and evolving thoughts",
}

// Helper function to determine growth stage icon
function GrowthStageIcon({ stage }: { stage: string }) {
  switch (stage) {
    case "seedling":
      return <span className="text-green-500">🌱</span>
    case "budding":
      return <span className="text-yellow-500">🌿</span>
    case "evergreen":
      return <span className="text-blue-500">🌲</span>
    default:
      return <span className="text-green-500">🌱</span>
  }
}

export default async function GardenPage() {
  const notes = await getAllContent(ContentType.GARDEN)

  // Group notes by category
  const notesByCategory: Record<string, typeof notes> = {}

  notes.forEach((note) => {
    const category = note.frontmatter.category || "Uncategorized"
    if (!notesByCategory[category]) {
      notesByCategory[category] = []
    }
    notesByCategory[category].push(note)
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Digital Garden</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 float:text-zinc-300 max-w-3xl mx-auto">
          This is my digital garden—a collection of notes, ideas, and thoughts that grow and evolve over time.
        </p>

        <div className="flex items-center justify-center mt-6 space-x-4 text-sm">
          <div className="flex items-center">
            <span className="mr-2">🌱</span>
            <span>Seedling (new idea)</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🌿</span>
            <span>Budding (growing)</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🌲</span>
            <span>Evergreen (mature)</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {Object.keys(notesByCategory).length > 0 ? (
          Object.entries(notesByCategory).map(([category, categoryNotes]) => (
            <div
              key={category}
              className="border-t border-zinc-200 dark:border-zinc-800 float:border-[#FF00FF]/30 pt-8"
            >
              <h2 className="text-2xl font-bold mb-6">{category}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryNotes.map((note) => (
                  <Link
                    key={note.slug}
                    href={`/garden/${note.slug}`}
                    className="block p-6 border border-zinc-200 dark:border-zinc-800 float:border-[#FF00FF]/20 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 float:hover:bg-[#FF00FF]/10 transition-colors"
                  >
                    <div className="flex items-center mb-2">
                      <GrowthStageIcon stage={note.frontmatter.growthStage || "seedling"} />
                      <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-400 float:text-zinc-400">
                        {formatDate(note.frontmatter.date)}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{note.frontmatter.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 float:text-zinc-300 line-clamp-2">
                      {note.frontmatter.description}
                    </p>

                    {note.frontmatter.tags && note.frontmatter.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {note.frontmatter.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs py-1 px-2 bg-zinc-100 dark:bg-zinc-800 float:bg-black float:text-[#FF00FF] rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 float:text-zinc-300">
              No notes found. Start your digital garden by adding MDX files to the content/garden directory.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
