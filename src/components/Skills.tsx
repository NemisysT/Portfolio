"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import SkillTree from "./SkillTree"

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const skillsData = {
    Frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "Tailwind", "Bootstrap", "React", "Next.js"],
    Backend: ["Node.js", "Python", "Flask", "Electron.js"],
    Database: ["MongoDB", "Supabase", "MySQL"],
    Tools: ["Git", "GitHub", "Selenium", "Java", "C/C++", "VS Code", "Spline"],
    Learning: ["PostgreSQL", "Redux", "Angular"],
  }

  return (
    <section ref={ref} className="relative w-full py-20 overflow-shown">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8 } },
          }}
          className="flex flex-col items-center"
        >
          <motion.h2
            className="text-5xl font-bold mb-10 text-center text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Skills
          </motion.h2>

          <div className="w-full h-[700px] md:h-[800px] relative">
            <SkillTree skillsData={skillsData} controls={controls} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
