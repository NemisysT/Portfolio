"use client"

import { motion, type AnimationControls } from "framer-motion"
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiFlask,
  SiElectron,
  SiMongodb,
  SiSupabase,
  SiMysql,
  SiGit,
  SiGithub,
  SiSelenium,
  SiCplusplus,
  
  SiSpine,
  SiPostgresql,
  SiRedux,
  SiAngular,
} from "react-icons/si"
import type { JSX } from "react"
import { FaJava } from "react-icons/fa";
import { BiLogoVisualStudio } from "react-icons/bi";


interface SkillNodeProps {
  name: string
  x: number
  y: number
  category: string
  index: number
  controls: AnimationControls
}

const SkillNode = ({ name, x, y, category, index, controls }: SkillNodeProps) => {
  // Map skill names to their respective icons
  const getIcon = (skillName: string) => {
    const iconMap: Record<string, JSX.Element> = {
      HTML: <SiHtml5 className="text-orange-500" />,
      CSS: <SiCss3 className="text-blue-500" />,
      JavaScript: <SiJavascript className="text-yellow-400" />,
      TypeScript: <SiTypescript className="text-blue-600" />,
      Tailwind: <SiTailwindcss className="text-cyan-400" />,
      Bootstrap: <SiBootstrap className="text-purple-500" />,
      React: <SiReact className="text-cyan-400" />,
      "Next.js": <SiNextdotjs className="text-white" />,
      "Node.js": <SiNodedotjs className="text-green-500" />,
      Python: <SiPython className="text-yellow-300" />,
      Flask: <SiFlask className="text-white" />,
      "Electron.js": <SiElectron className="text-cyan-300" />,
      MongoDB: <SiMongodb className="text-green-500" />,
      Supabase: <SiSupabase className="text-emerald-500" />,
      MySQL: <SiMysql className="text-blue-500" />,
      Git: <SiGit className="text-orange-600" />,
      GitHub: <SiGithub className="text-white" />,
      Selenium: <SiSelenium className="text-green-400" />,
      Java: <FaJava className="text-red-500" />,
      "C/C++": <SiCplusplus className="text-blue-500" />,
      "VS Code": <BiLogoVisualStudio className="text-blue-500" />,
      Spline: <SiSpine className="text-purple-400" />,
      PostgreSQL: <SiPostgresql className="text-blue-400" />,
      Redux: <SiRedux className="text-purple-500" />,
      Angular: <SiAngular className="text-red-600" />,
    }

    return iconMap[skillName] || <span className="text-white">•</span>
  }

  // Get color based on category
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      Frontend: "rgba(56, 189, 248, 0.7)", // cyan
      Backend: "rgba(139, 92, 246, 0.7)", // purple
      Database: "rgba(52, 211, 153, 0.7)", // emerald
      Tools: "rgba(251, 146, 60, 0.7)", // orange
      Learning: "rgba(236, 72, 153, 0.7)", // pink
    }

    return colorMap[category] || "rgba(255, 255, 255, 0.7)"
  }

  return (
        <motion.div
      className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x.toFixed(2)}%`, // Round to 2 decimal places
        top: `${y.toFixed(2)}%`,  // Round to 2 decimal places
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={controls}
      variants={{
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 1 + index * 0.1,
            ease: "easeOut",
          },
        },
      }}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.2 },
      }}
    >
      <div
        className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-gray-900/80 border border-gray-700 backdrop-blur-sm"
        style={{ boxShadow: `0 0 15px ${getCategoryColor(category)}` }}
      >
        <div className="text-2xl mb-1">{getIcon(name)}</div>
        <span className="text-xs font-medium text-white text-center leading-none">{name}</span>
      </div>
    </motion.div>
  )
}

export default SkillNode
