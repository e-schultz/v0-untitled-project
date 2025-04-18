import { getContentBySlug, ContentType } from "@/lib/content/mdx"
import { notFound } from "next/navigation"
import { MDXComponents } from "@/components/mdx/mdx-components"
import { Container } from "@/components/container"
import { format } from "date-fns"

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getContentBySlug(ContentType.BLOG, params.slug)

  if (!post) {
    notFound()
  }

  return (
    <Container>
      <article className="py-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.frontmatter.title}</h1>
          <time className="text-zinc-500 dark:text-zinc-400">
            {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
          </time>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 dark:bg-[#FF00FF]/10 dark:text-[#FF00FF] rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <MDXComponents code={post.content} />
        </div>
      </article>
    </Container>
  )
}
