"use client"

import { useEffect, useRef } from "react"
import { motion, type AnimationControls } from "framer-motion"
import SkillNode from "./SkillNode" // Corrected import path

interface SkillsDataType {
  [key: string]: string[]
}

interface SkillTreeProps {
  skillsData: SkillsDataType
  controls: AnimationControls
}

const SkillTree = ({ skillsData, controls }: SkillTreeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Get color based on category (updated for organic theme)
  const getCategoryColor = (cat: string) => {
    const colorMap: Record<string, string> = {
      Frontend: "#8BC34A", // Light Green
      Backend: "#4CAF50", // Green
      Database: "#795548", // Brown
      Tools: "#607D8B", // Blue Grey
      Learning: "#BA68C8", // Soft Purple
    }
    return colorMap[cat] || "#FFFFFF"
  }

  // Calculate positions for each category and its skills
  const getPositions = () => {
    const categories = Object.keys(skillsData)
    const positions: Record<
      string,
      {
        x: number
        y: number
        skills: Array<{ name: string; x: number; y: number; controlX: number; controlY: number }>
      }
    > = {}

    // Center position
    const centerX = 50
    const centerY = 50

    // Calculate positions for each category branch
    categories.forEach((category, index) => {
      const totalCategories = categories.length
      const sectionAngle = (2 * Math.PI) / totalCategories
      const angle = index * sectionAngle - Math.PI / 2 // Start from top

      const distance = 30 // Distance from center for categories
      const catX = centerX + distance * Math.cos(angle)
      const catY = centerY + distance * Math.sin(angle)

      const skills = skillsData[category].map((skill, skillIndex) => {
        const skillCount = skillsData[category].length

        let skillAngle
        let skillDistance

        if (skillCount === 1) {
          skillAngle = angle
          skillDistance = distance + 25
        } else {
          const spreadFactor = 0.8 // Controls how wide the fan spreads
          const baseAngle = angle - ((spreadFactor * (skillCount - 1)) / 2) * (Math.PI / 12)
          skillAngle = baseAngle + skillIndex * spreadFactor * (Math.PI / 12)
          skillDistance = distance + 20 + (skillIndex % 2) * 5
        }

        const finalX = centerX + skillDistance * Math.cos(skillAngle)
        const finalY = centerY + skillDistance * Math.sin(skillAngle)

        // Calculate control point for quadratic bezier curve
        // This point will pull the curve outwards, creating a branch-like arc
        const midX = (catX + finalX) / 2
        const midY = (catY + finalY) / 2
        const controlOffset = 15 // How far the curve bends outwards

        // Calculate perpendicular offset for control point
        const dx = finalX - catX
        const dy = finalY - catY
        const normalLength = Math.sqrt(dx * dx + dy * dy)
        const normalX = -dy / normalLength
        const normalY = dx / normalLength

        const controlX = midX + normalX * controlOffset
        const controlY = midY + normalY * controlOffset

        return {
          name: skill,
          x: finalX,
          y: finalY,
          controlX,
          controlY,
        }
      })

      positions[category] = { x: catX, y: catY, skills }
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

    const width = canvas.clientWidth
    const height = canvas.clientHeight

    canvas.width = width
    canvas.height = height

    ctx.clearRect(0, 0, width, height)

    // Define center pixel coordinates here, accessible to the whole function
    const centerPxX = (width * centerX) / 100
    const centerPxY = (height * centerY) / 100

    Object.entries(positions).forEach(([category, { x: catX, y: catY, skills }]) => {
      const categoryColor = getCategoryColor(category)

      const catPxX = (width * catX) / 100
      const catPxY = (height * catY) / 100

      // Draw main trunk from center to category with glow effect
      ctx.beginPath()
      ctx.moveTo(centerPxX, centerPxY)
      ctx.lineTo(catPxX, catPxY) // Simple line for main trunk

      const gradient = ctx.createLinearGradient(centerPxX, centerPxY, catPxX, catPxY)
      gradient.addColorStop(0, "#4CAF50") // Green at center
      gradient.addColorStop(1, categoryColor)
      ctx.shadowColor = categoryColor
      ctx.shadowBlur = 8
      ctx.strokeStyle = gradient
      ctx.lineWidth = 4
      ctx.stroke()
      ctx.shadowBlur = 0

      // Draw curved branches to each skill
      skills.forEach((skill) => {
        const skillPxX = (width * skill.x) / 100
        const skillPxY = (height * skill.y) / 100
        const controlPxX = (width * skill.controlX) / 100
        const controlPxY = (height * skill.controlY) / 100

        ctx.beginPath()
        ctx.moveTo(catPxX, catPxY)
        ctx.quadraticCurveTo(controlPxX, controlPxY, skillPxX, skillPxY)

        ctx.shadowColor = categoryColor
        ctx.shadowBlur = 5
        ctx.strokeStyle = categoryColor
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.shadowBlur = 0

        // Add small "leaf" dots at the end of branches
        ctx.beginPath()
        ctx.arc(skillPxX, skillPxY, 3, 0, Math.PI * 2)
        ctx.fillStyle = categoryColor
        ctx.shadowColor = categoryColor
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })
    })

    // Add a glowing circle at the center
    ctx.beginPath()
    ctx.arc(centerPxX, centerPxY, 40, 0, Math.PI * 2)
    ctx.strokeStyle = "#8BC34A" // Light Green
    ctx.lineWidth = 2
    ctx.shadowColor = "#8BC34A"
    ctx.shadowBlur = 15
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(centerPxX, centerPxY, 45, 0, Math.PI * 2)
    ctx.strokeStyle = "#4CAF50" // Green
    ctx.lineWidth = 1
    ctx.shadowColor = "#4CAF50"
    ctx.shadowBlur = 10
    ctx.stroke()
  }, [positions, centerX, centerY]) // Added centerX and centerY to dependency array

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
          className="relative flex items-center justify-center w-28 h-28 rounded-[50%_50%_50%_50%_/_60%_40%_60%_40%] bg-[#0F0B2A] border-2 border-[#4CAF50]"
          style={{
            boxShadow: "0 0 20px #4CAF50, inset 0 0 10px #4CAF50",
          }}
        >
          {/* Animated glow rings */}
          <div
            className="absolute w-full h-full rounded-[50%_50%_50%_50%_/_60%_40%_60%_40%] animate-pulse opacity-30"
            style={{
              background: "radial-gradient(circle, #8BC34A 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute w-full h-full rounded-[50%_50%_50%_50%_/_60%_40%_60%_40%] animate-pulse delay-300 opacity-20"
            style={{
              background: "radial-gradient(circle, #795548 0%, transparent 70%)",
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
            className="relative flex items-center justify-center w-20 h-20 bg-[#0F0B2A] border-2 rounded-3xl"
            style={{
              boxShadow: `0 0 10px ${getCategoryColor(category)}, inset 0 0 5px ${getCategoryColor(category)}`,
              borderColor: getCategoryColor(category),
            }}
          >
            {/* Animated glow effect */}
            <div
              className="absolute inset-0 opacity-20 rounded-3xl"
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
}

export default SkillTree
