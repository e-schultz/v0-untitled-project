const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

// Create the blog directory if it doesn't exist
const blogDir = path.join(process.cwd(), "content/blog")
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true })
}

// Create the images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), "public/images")
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

// Function to convert slug to title
function slugToTitle(slug) {
  // Split by hyphens and capitalize each word
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Process each MDX file
function processMdxFile(filePath) {
  console.log(`Processing ${filePath}...`)

  // Read the file
  const fileContent = fs.readFileSync(filePath, "utf8")

  // Parse frontmatter
  const { data, content } = matter(fileContent)

  // Ensure the slug is valid
  const slug = data.slug || path.basename(filePath, ".mdx")

  // Generate title from slug
  const generatedTitle = slugToTitle(slug)

  // Create a new frontmatter with standardized fields
  const newFrontmatter = {
    title: generatedTitle, // Use the generated title instead of data.title
    date: data.date || new Date().toISOString().split("T")[0],
    description: data.description || "",
    tags: data.tags || ["uncategorized"],
    image: data.image || null,
    url: data.url || null,
    slug: slug,
  }

  // Create the new MDX content
  const newContent = matter.stringify(content, newFrontmatter)

  // Write to the blog directory
  const outputPath = path.join(blogDir, `${slug}.mdx`)
  fs.writeFileSync(outputPath, newContent)

  console.log(`Saved to ${outputPath} with title: ${generatedTitle}`)
}

// Get all MDX files from the command line arguments
const mdxFiles = process.argv.slice(2)

if (mdxFiles.length === 0) {
  console.log("No MDX files provided. Usage: node process-blog-posts.js file1.mdx file2.mdx ...")
} else {
  mdxFiles.forEach(processMdxFile)
  console.log(`Processed ${mdxFiles.length} files.`)
}
