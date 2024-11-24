import { FaJava, FaHtml5, FaCss3Alt, FaJs, FaGitAlt } from 'react-icons/fa'
import { SiCplusplus, SiTailwindcss, SiBootstrap, SiReact, SiPython } from 'react-icons/si'

const skills = [
  { name: 'Java', icon: FaJava },
  { name: 'C/C++', icon: SiCplusplus },
  { name: 'HTML', icon: FaHtml5 },
  { name: 'CSS', icon: FaCss3Alt },
  { name: 'JavaScript', icon: FaJs },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Bootstrap', icon: SiBootstrap },
  { name: 'Python', icon: SiPython },
  { name: 'React', icon: SiReact },
  { name: 'Git', icon: FaGitAlt },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-8 text-center text-white">Skills</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-12">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center text-white hover:text-blue-400 transition-all duration-300">
              <skill.icon className="text-5xl mb-3 hover:text-blue-500 transition-all duration-300" />
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
