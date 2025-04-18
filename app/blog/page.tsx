import { getAllContent, ContentType } from "@/lib/content/mdx"
import Link from "next/link"
import { format } from "date-fns"
import { Container } from "@/components/container"

export const metadata = {
  title: "Blog - Evan Schultz",
  description: "Articles, tutorials, and thoughts on development and design",
}

export default async function BlogPage() {
  const posts = await getAllContent(ContentType.BLOG)

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-zinc-200 dark:border-zinc-800 dark:border-[#FF00FF]/30 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.frontmatter.title}</h2>
                  <time className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 block">
                    {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
                  </time>
                  <p className="text-zinc-600 dark:text-zinc-300 line-clamp-3 mb-2">{post.frontmatter.description}</p>
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 dark:bg-[#FF00FF]/10 dark:text-[#FF00FF] rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              No blog posts found. Make sure your MDX files are in the content/blog directory with proper frontmatter.
            </p>
          </div>
        )}
      </div>
    </Container>
  )
}
