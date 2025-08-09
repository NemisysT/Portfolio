"use client"
import { cn } from "@/lib/utils"
import type React from "react"
import { useRef, useState, useEffect } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  // Removed useVelocity as it's not used
  useAnimationControls,
  type AnimationControls,
} from "framer-motion"

export const DraggableCardBody = ({
  initialX,
  initialY,
  initialRotate,
  setControlsRef,
  children,
}: {
  initialX: number
  initialY: number
  initialRotate: number
  setControlsRef: (controls: AnimationControls) => void
  children?: React.ReactNode
}) => {
  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)
  const rotate = useMotionValue(initialRotate) // Z-axis rotation

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls() // For animating x, y, rotate from parent

  // Pass controls back to parent
  useEffect(() => {
    setControlsRef(controls)
  }, [controls, setControlsRef])

  // Update motion values when initial props change (e.g., when layout changes)
  useEffect(() => {
    x.set(initialX)
    y.set(initialY)
    rotate.set(initialRotate)
  }, [initialX, initialY, initialRotate, x, y, rotate])

  // physics biatch
  // Removed velocityX and velocityY as they are not used
  // const velocityX = useVelocity(mouseX)
  // const velocityY = useVelocity(mouseY)

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  }

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [25, -25]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-25, 25]), springConfig)

  const opacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]), springConfig)

  const glareOpacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]), springConfig)

  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  })

  useEffect(() => {
    // Update constraints when component mounts or window resizes
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        setConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        })
      }
    }

    updateConstraints()

    // Add resize listener
    window.addEventListener("resize", updateConstraints)

    // Clean up
    return () => {
      window.removeEventListener("resize", updateConstraints)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { width, height, left, top } = cardRef.current?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    }
    const centerX = left + width / 2
    const centerY = top + height / 2
    const deltaX = clientX - centerX
    const deltaY = clientY - centerY
    mouseX.set(deltaX)
    mouseY.set(deltaY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      onDragStart={() => {
        document.body.style.cursor = "grabbing"
      }}
      onDragEnd={() => {
        document.body.style.cursor = "default"
        // The x and y motion values are already updated by the drag.
        // No need for additional animation here.
      }}
      style={{
        x, // Use the motion value for x
        y, // Use the motion value for y
        rotate, // Use the motion value for Z-axis rotation
        rotateX, // 3D rotation from mouse
        rotateY, // 3D rotation from mouse
        opacity,
        willChange: "transform",
        position: "absolute",
        top: "50%", // Start from the center of the parent
        left: "50%", // Start from the center of the parent
        translateX: "-50%", // Adjust for the card's own size
        translateY: "-50%", // Adjust for the card's own size
      }}
      animate={controls} // Controls for animating x, y, rotate from parent
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "min-h-96 w-80 overflow-hidden rounded-md p-6 shadow-2xl transform-3d z-0",
        "bg-white/10 backdrop-blur-lg border border-white/20", // Glassmorphism for light mode
        "dark:bg-black/10 dark:border-black/20", // Glassmorphism for dark mode
      )}
    >
      {children}
      <motion.div
        style={{
          opacity: glareOpacity,
        }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </motion.div>
  )
}

export const DraggableCardContainer = ({
  className,
  children,
  style, // Added style prop
}: {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties // Define type for style
}) => {
  // This component now only provides the perspective and relative context.
  // Sizing and centering are handled by the parent (Project.tsx) via style prop.
  return (
    <div
      className={cn("[perspective:3000px]", className)}
      style={style} // Apply the style prop here
    >
      {children}
    </div>
  )
}
