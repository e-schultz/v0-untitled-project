"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/lib/theme/theme-context"
import ForceGraph2D from "react-force-graph-2d"

interface Note {
  slug: string
  title: string
  category: string
  growthStage?: "seedling" | "budding" | "evergreen"
  connections: string[]
}

interface GraphNode {
  id: string
  name: string
  category: string
  growthStage?: "seedling" | "budding" | "evergreen"
  val: number // Node size
}

interface GraphLink {
  source: string
  target: string
}

interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

interface GraphVisualizationProps {
  notes: Note[]
  currentSlug?: string
  height?: number
}

export default function GraphVisualization({ notes, currentSlug, height = 400 }: GraphVisualizationProps) {
  const router = useRouter()
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] })
  const [dimensions, setDimensions] = useState({ width: 0, height })

  // Process notes data into graph format
  useEffect(() => {
    if (!notes.length) return

    const nodes: GraphNode[] = notes.map((note) => ({
      id: note.slug,
      name: note.title,
      category: note.category,
      growthStage: note.growthStage,
      val: note.slug === currentSlug ? 20 : 10,
    }))

    const links: GraphLink[] = []

    notes.forEach((note) => {
      if (note.connections && note.connections.length) {
        note.connections.forEach((target) => {
          // Check if target exists in nodes
          if (nodes.some((node) => node.id === target)) {
            links.push({
              source: note.slug,
              target,
            })
          }
        })
      }
    })

    setGraphData({ nodes, links })
  }, [notes, currentSlug])

  // Update dimensions based on container size
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [height])

  // Get color based on growth stage
  const getNodeColor = (node: GraphNode) => {
    const isCurrentNode = node.id === currentSlug

    if (theme === "float") {
      if (isCurrentNode) return "#FF00FF"

      switch (node.growthStage) {
        case "seedling":
          return "#00FFFF"
        case "budding":
          return "#FFFF00"
        case "evergreen":
          return "#00FF00"
        default:
          return "#FF00FF"
      }
    } else {
      if (isCurrentNode) return theme === "dark" ? "#FFFFFF" : "#000000"

      switch (node.growthStage) {
        case "seedling":
          return theme === "dark" ? "#4ADE80" : "#22C55E"
        case "budding":
          return theme === "dark" ? "#FACC15" : "#CA8A04"
        case "evergreen":
          return theme === "dark" ? "#60A5FA" : "#3B82F6"
        default:
          return theme === "dark" ? "#94A3B8" : "#64748B"
      }
    }
  }

  // Get link color
  const getLinkColor = () => {
    if (theme === "float") return "#FF00FF"
    return theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"
  }

  return (
    <div
      ref={containerRef}
      className="w-full rounded-lg bg-zinc-50 dark:bg-zinc-900 float:bg-black border border-zinc-200 dark:border-zinc-800 float:border-[#FF00FF]/30"
    >
      {dimensions.width > 0 && (
        <ForceGraph2D
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="name"
          nodeColor={getNodeColor}
          linkColor={getLinkColor}
          nodeRelSize={6}
          linkWidth={1}
          onNodeClick={(node) => {
            router.push(`/garden/${node.id}`)
          }}
          cooldownTicks={100}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const { x, y, name, id } = node as GraphNode & { x: number; y: number }
            const fontSize = id === currentSlug ? 14 : 10
            const label = String(name)
            const isHighlighted = id === currentSlug

            // Node circle
            ctx.beginPath()
            ctx.arc(x, y, (node.val as number) / 2, 0, 2 * Math.PI)
            ctx.fillStyle = getNodeColor(node as GraphNode)
            ctx.fill()

            // Add stroke for highlighted node
            if (isHighlighted) {
              ctx.strokeStyle = theme === "float" ? "#FFFFFF" : getNodeColor(node as GraphNode)
              ctx.lineWidth = 2
              ctx.stroke()
            }

            // Node label
            const textWidth = ctx.measureText(label).width
            const bgDimensions = [textWidth, fontSize].map((n) => n + 8)

            if (globalScale >= 1) {
              ctx.fillStyle =
                theme === "float"
                  ? "rgba(0, 0, 0, 0.8)"
                  : theme === "dark"
                    ? "rgba(0, 0, 0, 0.8)"
                    : "rgba(255, 255, 255, 0.8)"
              ctx.fillRect(
                x - bgDimensions[0] / 2,
                ((y + node.val) as number) / 2 + 2,
                bgDimensions[0],
                bgDimensions[1],
              )

              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              ctx.fillStyle =
                theme === "float" ? getNodeColor(node as GraphNode) : theme === "dark" ? "#FFFFFF" : "#000000"
              ctx.font = `${fontSize}px Sans-Serif`
              ctx.fillText(label, x, ((y + node.val) as number) / 2 + 2 + bgDimensions[1] / 2)
            }
          }}
        />
      )}
    </div>
  )
}
