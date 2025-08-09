"use client"

import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image" // Import Image from next/image
import { useState, useRef, useEffect } from "react"
import type { AnimationControls } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RotateCcw, Grid } from "lucide-react"

interface Project {
  title: string
  image: string
  description: string
  demo: string
  code: string
}

interface CardState {
  x: number
  y: number
  rotate: number
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: "HydroSave",
      image: "/images/hydrosave.jpg",
      description: "HydroSave is a platform dedicated to optimizing water use in agriculture...",
      demo: "",
      code: "https://github.com/NemisysT/hydrosave",
    },
    {
      title: "Norway Tours",
      image: "/images/norway-tours.jpg",
      description: "Tours-Norway is a web-based platform that invites users on a digital journey...",
      demo: "https://nemisyst.github.io/Tours-Norway/",
      code: "https://github.com/NemisysT/Tours-Norway",
    },
    {
      title: "Airline Ticket Management",
      image: "/images/airline-ticket.jpg",
      description: "The Airline Ticket Management System is a software application designed...",
      demo: "",
      code: "https://github.com/NemisysT/Airline",
    },
    {
      title: "DisBot",
      image: "/images/disbot.jpg",
      description: "DisBot is a modular and customizable Discord bot designed for automation...",
      demo: "",
      code: "https://github.com/NemisysT/DisBot",
    },
    {
      title: "Racket Roulette",
      image: "/images/badminton.jpg",
      description: "A personal Project to enhance React Skills.",
      demo: "",
      code: "https://github.com/NemisysT/Badminton",
    },
    {
      title: "Tesseract",
      image: "/images/tes.jpg",
      description: "A Discord bot with QOL features.",
      demo: "",
      code: "https://github.com/NemisysT/Tesseract",
    },
    {
      title: "InternGeanie",
      image: "/images/Intern.png",
      description: "This project simplifies the internship application process by leveraging AI...",
      demo: "",
      code: "https://github.com/NemisysT/Axios.git",
    },
    {
      title: "DigiGrub",
      image: "/images/DigiGrub.png",
      description: "Virtual College Canteen.",
      demo: "",
      code: "https://github.com/NemisysT/DigiGrub.git",
    },
    {
      title: "Alertic",
      image: "/images/climate.jpg",
      description: "Alertic is a real-time climate monitoring and disaster alert platform...",
      demo: "",
      code: "https://github.com/NemisysT/Alertic.git",
    },
    {
      title: "ByteXync",
      image: "/images/BX.jpg",
      description:
        "ByteXync is the official tech club of DSCE's Computer Science & Engineering department, fostering innovation, learning, and collaboration among students.",
      demo: "https://bytexync.xyz",
      code: "https://github.com/NemisysT/ByteXync.git",
    },
    {
      title: "Met Air",
      image: "/images/MetAir.avif", // Replace with the actual image path for Met Air
      description:
        "Met Air is a professional company website for an air filter manufacturer, showcasing their products, solutions, and commitment to clean air technology.",
      demo: "https://met-air.lovable.app", // Replace with the real Met Air website URL if available
      code: "https://github.com/NemisysT/Met-Air.git", // Replace with the actual repo link if different
    },
  ]
  // Function to generate scattered positions dynamically
  const generateScatteredPositions = (numCards: number): CardState[] => {
    const basePositions: CardState[] = [
      { x: -300, y: -200, rotate: -5 },
      { x: 0, y: 100, rotate: -7 },
      { x: 300, y: -150, rotate: 8 },
      { x: -150, y: 250, rotate: 10 },
      { x: 200, y: 300, rotate: 2 },
      { x: -400, y: 50, rotate: -12 },
      { x: 400, y: 50, rotate: 6 },
      { x: -100, y: -300, rotate: -3 },
      { x: 150, y: -50, rotate: 9 },
    ]

    const generatedPositions: CardState[] = []
    for (let i = 0; i < numCards; i++) {
      if (i < basePositions.length) {
        generatedPositions.push(basePositions[i])
      } else {
        // Generate random-ish positions for additional cards
        generatedPositions.push({
          x: Math.random() * 800 - 400, // -400 to 400
          y: Math.random() * 600 - 300, // -300 to 300
          rotate: Math.random() * 20 - 10, // -10 to 10
        })
      }
    }
    return generatedPositions
  }

  const [currentLayout, setCurrentLayout] = useState<"scattered" | "grid">("scattered")
  const [initialCardDataState, setInitialCardDataState] = useState<CardState[]>([]) // State for initial scattered positions
  const [gridCardData, setGridCardData] = useState<CardState[]>([])
  const [gridDimensions, setGridDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const cardControlsRefs = useRef<AnimationControls[]>([])
  const [currentCardData, setCurrentCardData] = useState<CardState[]>([]) // Initialize as empty array

  const calculateGridPositions = (
    numCards: number,
  ): { cards: CardState[]; totalWidth: number; totalHeight: number } => {
    const cols = 3
    const cardW = 320 + 2 * 24 // w-80 (320px) + p-6 (24px padding on each side) = 368px
    const cardH = 384 + 2 * 24 // min-h-96 (384px) + p-6 (24px padding on each side) = 432px
    const gapX = 40
    const gapY = 40

    const gridPositions: CardState[] = []
    const numRows = Math.ceil(numCards / cols)

    const totalGridWidth = cols * cardW + (cols - 1) * gapX
    const totalGridHeight = numRows * cardH + (numRows - 1) * gapY

    // Calculate the top-left corner of the grid relative to the center of the container
    const gridOffsetX = -totalGridWidth / 2
    const gridOffsetY = -totalGridHeight / 2

    for (let i = 0; i < numCards; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      // Position of card's top-left relative to the top-left of the grid
      const cardRelativeX = col * (cardW + gapX)
      const cardRelativeY = row * (cardH + gapY)

      // Final x, y are offsets from the center of the container for the card's center
      const x = gridOffsetX + cardRelativeX + cardW / 2
      const y = gridOffsetY + cardRelativeY + cardH / 2

      gridPositions.push({ x, y, rotate: 0 })
    }
    return { cards: gridPositions, totalWidth: totalGridWidth, totalHeight: totalGridHeight }
  }

  // Initialize card data and update grid positions on mount and resize
  useEffect(() => {
    const newInitialCardData = generateScatteredPositions(projects.length)
    const { cards: newGridCardData, totalWidth, totalHeight } = calculateGridPositions(projects.length)

    setInitialCardDataState(newInitialCardData)
    setGridCardData(newGridCardData)
    setGridDimensions({ width: totalWidth, height: totalHeight })

    // Set initial layout on mount
    setCurrentCardData(newInitialCardData)
  }, [projects.length]) // Depend on projects.length to re-calculate if projects change

  const handleReset = () => {
    setCurrentLayout("scattered")
    setCurrentCardData(initialCardDataState) // Use the state variable
    cardControlsRefs.current.forEach((controls, index) => {
      const { x, y, rotate } = initialCardDataState[index] // Access from state variable
      controls.start({
        x,
        y,
        rotate,
        transition: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 },
      })
    })
  }

  const handleGridView = () => {
    setCurrentLayout("grid")
    setCurrentCardData(gridCardData)
    cardControlsRefs.current.forEach((controls, index) => {
      const { x, y, rotate } = gridCardData[index]
      controls.start({
        x,
        y,
        rotate,
        transition: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 },
      })
    })
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-10">
      <h2 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
        My GitHub Projects
      </h2>
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          minHeight: currentLayout === "grid" ? `${gridDimensions.height + 100}px` : "800px", // Add buffer for padding/shadows
          height: currentLayout === "grid" ? `${gridDimensions.height + 100}px` : "auto", // Set height explicitly for grid
        }}
      >
        {" "}
        {/* This div will contain the draggable cards */}
        <TooltipProvider>
          <div className="absolute right-4 top-4 z-20 flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleReset} variant="secondary" size="icon">
                  <RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Reset Layout</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset Layout</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleGridView} variant="secondary" size="icon">
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Grid View</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Grid View</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        <DraggableCardContainer
          className="relative" // No default sizing or overflow here
          style={{
            width: currentLayout === "grid" ? `${gridDimensions.width}px` : "100%", // Use 100% of parent width
            height: currentLayout === "grid" ? `${gridDimensions.height}px` : "100%", // Use 100% of parent height
            overflow: currentLayout === "grid" ? "visible" : "clip", // Changed to visible for grid to allow shadows/overflow
          }}
        >
          {projects.map((project, index) => (
            <DraggableCardBody
              key={project.title}
              initialX={currentCardData[index]?.x ?? 0}
              initialY={currentCardData[index]?.y ?? 0}
              initialRotate={currentCardData[index]?.rotate ?? 0}
              setControlsRef={(controls) => (cardControlsRefs.current[index] = controls)}
            >
              <div className="relative h-48 w-full">
                {" "}
                {/* Wrapper div for Image fill */}
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill // Use fill to make the image take up the parent's size
                  className="pointer-events-none object-cover rounded-md" // object-cover and rounded-md
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes prop
                />
              </div>
              <h3 className="mt-4 text-center text-xl font-bold text-neutral-700 dark:text-neutral-300">
                {project.title}
              </h3>
              <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
                {project.description}
              </p>
              <div className="mt-4 flex justify-center gap-2">
                {project.demo && (
                  <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      Demo
                    </Button>
                  </Link>
                )}
                {project.code && (
                  <Link href={project.code} target="_blank" rel="noopener noreferrer">
                    <Button size="sm">Code</Button>
                  </Link>
                )}
              </div>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
    </div>
  )
}
