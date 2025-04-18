import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrism from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

// Define the frontmatter types
export interface Frontmatter {
  title: string
  description: string
  date: string
  updatedAt?: string
  tags?: string[]
  featured?: boolean
  cover?: string
}

// Base MDX content
export interface MDXContent {
  frontmatter: Frontmatter
  content: any
  slug: string
}

// Define the content types
export enum ContentType {
  BLOG = "blog",
  PORTFOLIO = "portfolio",
  GARDEN = "garden",
  PROJECT = "projects",
  FLOATSTACK = "floatstack",
}

// Get the content directory based on the type
function getContentDirectory(type: ContentType): string {
  return path.join(process.cwd(), "content", type)
}

// Get all content files for a specific type
export async function getAllFiles(type: ContentType): Promise<string[]> {
  const contentDir = getContentDirectory(type)

  if (!fs.existsSync(contentDir)) {
    return []
  }

  return fs.readdirSync(contentDir).filter((file) => {
    const filePath = path.join(contentDir, file)
    const stat = fs.statSync(filePath)
    return stat.isFile() && (file.endsWith(".mdx") || file.endsWith(".md"))
  })
}

// Parse frontmatter from a file
export async function parseFrontmatter(
  type: ContentType,
  filename: string,
): Promise<{ frontmatter: Frontmatter; slug: string }> {
  const filePath = path.join(getContentDirectory(type), filename)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data } = matter(fileContents)
  const slug = filename.replace(/\.(mdx?)$/, "")

  return {
    frontmatter: data as Frontmatter,
    slug,
  }
}

// Get all content items of a specific type
export async function getAllContent(type: ContentType): Promise<{ frontmatter: Frontmatter; slug: string }[]> {
  const files = await getAllFiles(type)
  const content = []

  for (const file of files) {
    const { frontmatter, slug } = await parseFrontmatter(type, file)
    content.push({ frontmatter, slug })
  }

  // Sort by date descending
  return content.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  })
}

// Get a specific content item by slug
export async function getContentBySlug(type: ContentType, slug: string): Promise<MDXContent | null> {
  const files = await getAllFiles(type)
  const file = files.find((file) => file.replace(/\.(mdx?$)/, "") === slug)

  if (!file) {
    return null
  }

  const filePath = path.join(getContentDirectory(type), file)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  const mdxContent = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypePrism],
      },
    },
  })

  return {
    frontmatter: data as Frontmatter,
    content: mdxContent.content,
    slug,
  }
}
