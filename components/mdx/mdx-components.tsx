import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useMDXComponent } from "next-mdx-remote/rsc"
import { cn } from "@/lib/utils"

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("text-3xl font-bold tracking-tight mt-10 mb-4", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("text-2xl font-bold tracking-tight mt-8 mb-4", className)} {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-xl font-bold tracking-tight mt-6 mb-3", className)} {...props} />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={cn("text-lg font-bold tracking-tight mt-4 mb-2", className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("leading-7 mb-4", className)} {...props} />
  ),
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={cn("underline underline-offset-4 hover:text-primary", className)} {...props} />
      )
    }

    if (href?.startsWith("#")) {
      return <a href={href} className={cn("underline underline-offset-4 hover:text-primary", className)} {...props} />
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("underline underline-offset-4 hover:text-primary", className)}
        {...props}
      />
    )
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("list-disc list-outside ml-6 mb-4", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("list-decimal list-outside ml-6 mb-4", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-1", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "border-l-4 border-zinc-300 dark:border-zinc-700 float:border-[#FF00FF] pl-4 italic my-6",
        className,
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // Using a div wrapper to maintain responsive sizing
    <div className="relative w-full my-6 overflow-hidden rounded-lg">
      {/* @ts-ignore */}
      <Image
        className={cn("object-cover", className)}
        alt={alt || ""}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        {...props}
      />
    </div>
  ),
  hr: ({ ...props }) => (
    <hr className="my-8 border-zinc-200 dark:border-zinc-800 float:border-[#FF00FF]/30" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className={cn("w-full border-collapse", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("border-b border-zinc-200 dark:border-zinc-800 float:border-[#FF00FF]/20", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className={cn("px-4 py-2 text-left font-bold", className)} {...props} />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className={cn("px-4 py-2", className)} {...props} />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg p-4 my-6 bg-zinc-100 dark:bg-zinc-800 float:bg-black float:border float:border-[#FF00FF]",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn("rounded px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 float:bg-black float:text-[#FF00FF]", className)}
      {...props}
    />
  ),
}

interface MDXComponentsProps {
  code: string
}

export function MDXComponents({ code }: MDXComponentsProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx-content">
      <Component components={components} />
    </div>
  )
}

export default components
