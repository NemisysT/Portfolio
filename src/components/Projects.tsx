'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CardBody, CardContainer, CardItem } from './CardContainer'
import { motion } from 'framer-motion'

// Define the Project interface to type the project object
interface Project {
  title: string;
  image: string;
  description: string;
  demo: string;
  code: string;
}

const projects: Project[] = [
  {
    title: 'HydroSave',
    image: '/images/hydrosave.jpg',
    description: 'Water usage optimization tool featuring calculators, forums, and case studies.',
    demo: '',
    code: 'https://github.com/NemisysT/hydrosave',
  },
  {
    title: 'Norway Tours',
    image: '/images/norway-tours.jpg',
    description: 'Interactive tourism site with maps and festival calendars.',
    demo: 'https://nemisyst.github.io/Tours-Norway/',
    code: 'https://github.com/NemisysT/Tours-Norway',
  },
  {
    title: 'Airline Ticket Management',
    image: '/images/airline-ticket.jpg',
    description: 'Desktop app with rescheduling and booking options.',
    demo: '',
    code: 'https://github.com/NemisysT/Airline',
  },
  {
    title: 'DisBot',
    image: '/images/disbot.jpg',
    description: 'Award-winning Discord bot.',
    demo: '',
    code: 'https://github.com/NemisysT/DisBot',
  },
  {
    title: 'Racket Roulette',
    image: '/images/badminton.jpg',
    description: 'A personal Project to enhance React Skills.',
    demo: '',
    code: 'https://github.com/NemisysT/Badminton',
  },
  {
    title: 'Tesseract',
    image: '/images/tes.jpg',
    description: 'A Discord bot with QOL features.',
    demo: '',
    code: 'https://github.com/NemisysT/Tesseract',
  },
]

interface ProjectCardProps {
  project: Project;  // Type the `project` prop with the Project interface
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gradient-to-r from-gray-800 to-gray-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-gray-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[22rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white dark:text-white"
        >
          {project.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {project.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={project.image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={project.title}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          {/* Conditionally render the Live Demo button */}
          {project.demo && (
            <CardItem
              translateZ={20}
              as={Link}
              href={project.demo}
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal text-gray-300 dark:text-white"
            >
              Live Demo →
            </CardItem>
          )}
          <CardItem
            translateZ={20}
            as={Link}
            href={project.code}
            target="__blank"
            className="px-4 py-2 rounded-xl bg-gray-700 dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Source Code
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}


export default function Projects() {
  return (
    <section id="projects" className="py-20 mt-0">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center text-white "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-0 "       // Adjust the row gap
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
