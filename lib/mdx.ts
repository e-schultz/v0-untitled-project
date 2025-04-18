import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import rehypePrism from "rehype-prism-plus"

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  content: string
  tags?: string[]
  image?: string
  url?: string
}

const postsDirectory = path.join(process.cwd(), "content/blog")

export async function getAllPosts(): Promise<Post[]> {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => {
      return fileName.endsWith(".mdx")
    })
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        content,
        tags: data.tags || [],
        image: data.image || null,
        url: data.url || null,
      }
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const mdxSource = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [rehypePrism],
      },
    })

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      content: mdxSource,
      tags: data.tags || [],
      image: data.image || null,
      url: data.url || null,
    }
  } catch (error) {
    console.error(`Error getting post by slug: ${slug}`, error)
    return null
  }
}
