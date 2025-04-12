"use client"

import { useEffect, useRef } from "react"
import { motion, type AnimationControls } from "framer-motion"
import SkillNode from "./SkillNode"

interface SkillsDataType {
  [key: string]: string[]
}

interface SkillTreeProps {
  skillsData: SkillsDataType
  controls: AnimationControls
}

const SkillTree = ({ skillsData, controls }: SkillTreeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Calculate positions for each category and its skills
  const getPositions = () => {
    const categories = Object.keys(skillsData)
    const positions: Record<
      string,
      {
        x: number
        y: number
        skills: Array<{ name: string; x: number; y: number; path: Array<{ x: number; y: number }> }>
      }
    > = {}

    // Center position
    const centerX = 50
    const centerY = 50

    // Calculate positions for each category branch
    categories.forEach((category, index) => {
      // Distribute categories evenly in a circle
      const totalCategories = categories.length
      const sectionAngle = (2 * Math.PI) / totalCategories
      const angle = index * sectionAngle - Math.PI / 2 // Start from top

       // Calculate category position
      const distance = 30 // Distance from center
      const x = centerX + distance * Math.cos(angle)
      const y = centerY + distance * Math.sin(angle)

      // Calculate positions for skills within each category
      const skills = skillsData[category].map((skill, skillIndex) => {
        const skillCount = skillsData[category].length

        // Create a circuit-board style path for this skill
        // This will create paths with right angles like in the reference image
        const path = []

        // Start point (from category node)
        path.push({ x, y })

        // Calculate the final position for the skill node
        let skillAngle
        let skillDistance

        // Adjust angle and distance based on number of skills and position
        if (skillCount === 1) {
          skillAngle = angle
          skillDistance = distance + 20
        } else {
          // Spread skills in a fan pattern
          const spreadFactor = 0.8 // Controls how wide the fan spreads
          const baseAngle = angle - ((spreadFactor * (skillCount - 1)) / 2) * (Math.PI / 12)
          skillAngle = baseAngle + skillIndex * spreadFactor * (Math.PI / 12)

          // Vary distance slightly for visual interest
          skillDistance = distance + 18 + (skillIndex % 2) * 5
        }

        // Final skill position
        const finalX = centerX + skillDistance * Math.cos(skillAngle)
        const finalY = centerY + skillDistance * Math.sin(skillAngle)

        // Create circuit-like path with right angles
        // First intermediate point - move outward
        const mid1X = centerX + (distance + 5) * Math.cos(angle)
        const mid1Y = centerY + (distance + 5) * Math.sin(angle)
        path.push({ x: mid1X, y: mid1Y })

        // Second intermediate point - move along circuit trace
        const mid2X =
          centerX +
          (distance + 5) * Math.cos(angle) +
          (skillIndex - skillCount / 2 + 0.5) * 3 * Math.cos(angle + Math.PI / 2)
        const mid2Y =
          centerY +
          (distance + 5) * Math.sin(angle) +
          (skillIndex - skillCount / 2 + 0.5) * 3 * Math.sin(angle + Math.PI / 2)
        path.push({ x: mid2X, y: mid2Y })

        // Third intermediate point - move toward final position
        const mid3X =
          centerX +
          (skillDistance - 5) * Math.cos(skillAngle) +
          (skillIndex - skillCount / 2 + 0.5) * 3 * Math.cos(angle + Math.PI / 2)
        const mid3Y =
          centerY +
          (skillDistance - 5) * Math.sin(skillAngle) +
          (skillIndex - skillCount / 2 + 0.5) * 3 * Math.sin(angle + Math.PI / 2)
        path.push({ x: mid3X, y: mid3Y })

        // Add final point
        path.push({ x: finalX, y: finalY })

        return {
          name: skill,
          x: finalX,
          y: finalY,
          path: path,
        }
      })

      positions[category] = { x, y, skills }
    })

    return { centerX, centerY, positions }
  }

  const { centerX, centerY, positions } = getPositions()

  // Draw connecting lines using canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawLines = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      // Set canvas dimensions to match display size
      canvas.width = width
      canvas.height = height

      ctx.clearRect(0, 0, width, height)

      // Draw circuit-board style connections
      Object.entries(positions).forEach(([category, { x, y, skills }]) => {
        // Get category color
        const getCategoryColor = (cat: string) => {
          const colorMap: Record<string, string> = {
            Frontend: "#36BFFA", // bright cyan
            Backend: "#8B5CF6", // purple
            Database: "#10B981", // emerald
            Tools: "#F97316", // orange
            Learning: "#EC4899", // pink
          }
          return colorMap[cat] || "#FFFFFF"
        }

        const categoryColor = getCategoryColor(category)

        // Convert percentage to actual pixels for category
        const catX = (width * x) / 100
        const catY = (height * y) / 100

        // Draw trunk from center to category with glow effect
        const centerPxX = (width * centerX) / 100
        const centerPxY = (height * centerY) / 100

        // Draw main trunk with glow
        ctx.beginPath()
        ctx.moveTo(centerPxX, centerPxY)
        ctx.lineTo(catX, catY)

        // Create gradient for the line
        const gradient = ctx.createLinearGradient(centerPxX, centerPxY, catX, catY)
        gradient.addColorStop(0, "#8B5CF6") // Purple at center
        gradient.addColorStop(1, categoryColor) // Category color at end

        // Add glow effect
        ctx.shadowColor = categoryColor
        ctx.shadowBlur = 10
        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.stroke()

        // Reset shadow for next lines
        ctx.shadowBlur = 0

        // Draw circuit paths to each skill
        skills.forEach((skill) => {
          // Draw the circuit path segments
          for (let i = 0; i < skill.path.length - 1; i++) {
            const startX = (width * skill.path[i].x) / 100
            const startY = (height * skill.path[i].y) / 100
            const endX = (width * skill.path[i + 1].x) / 100
            const endY = (height * skill.path[i + 1].y) / 100

            ctx.beginPath()
            ctx.moveTo(startX, startY)
            ctx.lineTo(endX, endY)

            // Create gradient for the line
            const pathGradient = ctx.createLinearGradient(startX, startY, endX, endY)
            pathGradient.addColorStop(0, categoryColor)
            pathGradient.addColorStop(1, categoryColor)

            // Add subtle glow effect
            ctx.shadowColor = categoryColor
            ctx.shadowBlur = 5
            ctx.strokeStyle = pathGradient
            ctx.lineWidth = 2
            ctx.stroke()

            // Reset shadow
            ctx.shadowBlur = 0

            // Add circuit junction dots at corners
            if (i > 0 && i < skill.path.length - 1) {
              ctx.beginPath()
              ctx.arc(startX, startY, 2, 0, Math.PI * 2)
              ctx.fillStyle = categoryColor
              ctx.shadowColor = categoryColor
              ctx.shadowBlur = 8
              ctx.fill()
              ctx.shadowBlur = 0
            }
          }
        })
      })

      // Add a glowing circle at the center
      const centerPxX = (width * centerX) / 100
      const centerPxY = (height * centerY) / 100
      ctx.beginPath()
      ctx.arc(centerPxX, centerPxY, 40, 0, Math.PI * 2)
      ctx.strokeStyle = "#36BFFA"
      ctx.lineWidth = 2
      ctx.shadowColor = "#36BFFA"
      ctx.shadowBlur = 15
      ctx.stroke()

      // Add a second glowing circle
      ctx.beginPath()
      ctx.arc(centerPxX, centerPxY, 45, 0, Math.PI * 2)
      ctx.strokeStyle = "#8B5CF6"
      ctx.lineWidth = 1
      ctx.shadowColor = "#8B5CF6"
      ctx.shadowBlur = 10
      ctx.stroke()
    }

    drawLines()

    // Redraw on window resize
    const handleResize = () => {
      drawLines()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [positions, centerX, centerY])

  return (
    <div
      className="relative w-full h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundColor: "",
        backgroundImage: "",
      }}
    >
      {/* Canvas for drawing lines */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Center node - "Skills" */}
      <motion.div
        className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${centerX}%`, top: `${centerY}%` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              duration: 1,
              ease: "easeOut",
            },
          },
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
      >
        <div
          className="relative flex items-center justify-center w-28 h-28 rounded-full bg-[#0F0B2A] border-2 border-[#36BFFA]"
          style={{
            boxShadow: "0 0 20px #36BFFA, inset 0 0 10px #36BFFA",
          }}
        >
          {/* Animated glow rings */}
          <div
            className="absolute w-full h-full rounded-full animate-pulse opacity-30"
            style={{
              background: "radial-gradient(circle, #36BFFA 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute w-full h-full rounded-full animate-pulse delay-300 opacity-20"
            style={{
              background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            }}
          />

          {/* Text */}
          <span className="text-2xl font-bold text-white">SKILLS</span>
        </div>
      </motion.div>

      {/* Category nodes */}
      {Object.entries(positions).map(([category, { x, y }], index) => (
        <motion.div
          key={category}
          className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${x}%`, top: `${y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.8,
                delay: 0.5 + index * 0.1,
                ease: "easeOut",
              },
            },
          }}
          whileHover={{
            scale: 1.1,
            zIndex: 50,
            transition: { duration: 0.2 },
          }}
        >
          <div
            className="relative flex items-center justify-center w-20 h-20 bg-[#0F0B2A] border-2 rounded-lg"
            style={{
              clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              boxShadow: `0 0 15px ${getCategoryColor(category)}, inset 0 0 8px ${getCategoryColor(category)}`,
              borderColor: getCategoryColor(category),
            }}
          >
            {/* Animated glow effect */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle, ${getCategoryColor(category)} 0%, transparent 70%)`,
              }}
            />

            {/* Text */}
            <span className="text-sm font-bold text-white z-10">{category}</span>
          </div>
        </motion.div>
      ))}

      {/* Skill nodes */}
      {Object.entries(positions).map(([category, { skills }]) =>
        skills.map((skill, skillIndex) => (
          <SkillNode
            key={`${category}-${skill.name}`}
            name={skill.name}
            x={skill.x}
            y={skill.y}
            category={category}
            index={skillIndex}
            controls={controls}
          />
        )),
      )}
    </div>
  )

  function getCategoryColor(category: string) {
    const colorMap: Record<string, string> = {
      Frontend: "#36BFFA", // bright cyan
      Backend: "#8B5CF6", // purple
      Database: "#10B981", // emerald
      Tools: "#F97316", // orange
      Learning: "#EC4899", // pink
    }

    return colorMap[category] || "#FFFFFF"
  }
}

export default SkillTree
