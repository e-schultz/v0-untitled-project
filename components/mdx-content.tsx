import { MDXRemote } from "next-mdx-remote"
import { CodeBlock } from "./code-block"
import Link from "next/link"

const components = {
  pre: (props: any) => <div {...props} />,
  code: CodeBlock,
  a: (props: any) => {
    if (props.href.startsWith("http")) {
      return <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" />
    }
    return <Link {...props} className="text-primary hover:underline" />
  },
}

export function MDXContent({ source }: { source: any }) {
  return <MDXRemote {...source} components={components} />
}
