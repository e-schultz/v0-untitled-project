import Link from "next/link"
import type { Post } from "@/lib/mdx"
import { format } from "date-fns"

export function BlogPostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-primary dark:hover:border-primary transition-colors duration-200">
        {post.image && (
          <div className="aspect-video relative overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" />
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
          <time className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
            {format(new Date(post.date), "MMMM d, yyyy")}
          </time>
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3 mb-2">{post.description}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded-md text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
