import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface CodeBlockProps {
  className?: string
  children: string
}

export function CodeBlock({ className, children }: CodeBlockProps) {
  const language = className ? className.replace(/language-/, "") : "javascript"

  return (
    <div className="relative my-6 rounded-lg overflow-hidden">
      <div className="absolute top-0 right-0 px-2 py-1 text-xs font-mono bg-gray-800 text-gray-300 rounded-bl">
        {language}
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.5rem 1rem",
          borderRadius: "0.5rem",
          fontSize: "0.9rem",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
