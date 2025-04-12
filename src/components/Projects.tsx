"use client"
import Image from "next/image"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />)

  return (
    <div className="w-full h-full py-20">
      <h2 className="text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
        My Projects
      </h2>
      <Carousel items={cards} />
    </div>
  )
}

const ProjectContent = ({ project }: { project: Project }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">{project.title}</span> {project.description}
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
        {project.demo && (
          <Button className="flex items-center gap-2" variant="outline">
            <ExternalLink className="w-4 h-4" />
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          </Button>
        )}

        <Button className="flex items-center gap-2">
          <Github className="w-4 h-4" />
          <a href={project.code} target="_blank" rel="noopener noreferrer">
            View Code
          </a>
        </Button>
      </div>

      <Image
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-8"
      />
    </div>
  )
}

// Project type definition
type Project = {
  title: string
  image: string
  description: string
  demo: string
  code: string
}

// Projects data
const projects: Project[] = [
  {
    title: "HydroSave",
    image: "/images/hydrosave.jpg",
    description: "HydroSave is a platform dedicated to optimizing water use in agriculture through innovative techniques and sustainable technologies. Aimed at farmers, researchers, and policymakers, HydroSave provides educational resources that promote best practices in water-efficient farming. The platform addresses a critical gap in agricultural sustainability by offering access to knowledge, tools, and insights that help reduce water waste and improve efficiency. Users can explore a range of content including guides, tutorials, and case studies on effective water management strategies. HydroSave also delivers in-depth information on smart irrigation systems and other water-saving technologies, along with regular updates on relevant policies and advocacy for sustainable water use. Beyond information sharing, HydroSave fosters a vibrant community through discussion forums, expert interviews, and interactive webinars, empowering stakeholders to collaborate and drive meaningful change in agricultural water management.",
    demo: "",
    code: "https://github.com/NemisysT/hydrosave",
  },
  {
    title: "Norway Tours",
    image: "/images/norway-tours.jpg",
    description: "Tours-Norway is a web-based platform that invites users on a digital journey through Norway’s breathtaking landscapes, rich culture, and culinary heritage. Developed using HTML, CSS, and JavaScript in Visual Studio Code, the platform combines minimalist design with cool-toned aesthetics that reflect Norway’s natural beauty and modern elegance. Tours-Norway offers an immersive experience where users can interactively explore the country’s top destinations, cultural traditions, and seasonal festivals. The mission is to inspire exploration and provide an engaging learning environment that showcases the wonders of Norway while also demonstrating strong web development skills.The platform features a dynamic culinary section, where users can discover both traditional and modern Norwegian dishes through vivid imagery and descriptions. A “Discover” feature allows visitors to reveal recipes, cultural significance, and local variations, while seasonal content connects food with Norwegian customs. Cultural immersion is deepened through explorations of folk art, historical narratives, and traditional celebrations. An interactive map guides users through Norway’s regions, highlighting hidden gems, must-visit sites, and seasonal travel tips. To enhance the sensory experience, the platform includes a curated folk music player, interactive instrument showcases, and ambient nature sounds from across Norway. From a technical perspective, Tours-Norway employs semantic HTML5 for accessibility, responsive CSS3 designs using Flexbox and Grid, and JavaScript-driven interactivity for smooth user experiences. Looking ahead, future updates aim to incorporate augmented reality features and support user-generated content, further enriching this digital celebration of Norway’s charm.",
    demo: "https://nemisyst.github.io/Tours-Norway/",
    code: "https://github.com/NemisysT/Tours-Norway",
  },
  {
    title: "Airline Ticket Management",
    image: "/images/airline-ticket.jpg",
    description: "The Airline Ticket Management System is a software application designed to facilitate the efficient handling of airline ticket reservations, cancellations, and passenger data management. Built using Java, this system provides a user-friendly interface for customers to search for flights, book tickets, and view or manage bookings, while also offering airline staff a robust set of administrative tools to handle scheduling, ticket pricing, and availability updates. Utilizing MongoDB as the database for scalable data storage and management, this project integrates secure access with API keys to ensure data security and controlled access. By automating and centralizing various booking and ticket management processes, this system aims to enhance customer satisfaction and operational efficiency, benefiting both passengers and airline staff.",
    demo: "",
    code: "https://github.com/NemisysT/Airline",
  },
  {
    title: "DisBot",
    image: "/images/disbot.jpg",
    description: "is a modular and customizable Discord bot designed for automation, moderation, and utility tasks within Discord servers. Developed using Python and leveraging the discord.py library, DisBot provides a foundation for building scalable bot features through an extensible cog-based architecture. The bot supports event handling, command parsing, and various utility functions, allowing server administrators and developers to tailor functionalities to their specific needs. With a focus on readability and ease of development, DisBot serves as both a practical tool and a learning resource for Python developers interested in Discord bot creation.",
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
    description: "This project simplifies the internship application process by leveraging AI-powered tools to optimize resumes, automate applications, and centralize internship opportunities from multiple platforms. It includes a web application and a Chrome extension to provide seamless functionality for users.",
    demo: "",
    code: "https://github.com/NemisysT/Axios.git",
  },
  {
    title: "DigiGrub",
    image: "/images/canteen.jpg",
    description: "Virtual College Canteen.",
    demo: "",
    code: "https://github.com/NemisysT/DigiGrub.git",
  },
  {
    title: "Alertic",
    image: "/images/climate.jpg",
    description: "Alertic is a real-time climate monitoring and disaster alert platform built with Next.js. It provides live weather updates, natural disaster warnings, and emergency response resources to help individuals and communities stay informed and prepared.",
    demo: "",
    code: "https://github.com/NemisysT/Alertic.git",
  },

]

// Map projects to the format expected by the Card component
const data = projects.map((project) => {
  // Determine category based on project description or title
  let category = "Project"
  if (project.description.toLowerCase().includes("discord")) {
    category = "Discord Bot"
  } else if (project.description.toLowerCase().includes("react")) {
    category = "React"
  } else if (project.title === "Norway Tours") {
    category = "Web Development"
  } else if (project.title === "HydroSave") {
    category = "Sustainability"
  } else if (project.title === "Airline Ticket Management") {
    category = "Desktop Application"
  }

  return {
    category,
    title: project.title,
    src: project.image,
    content: <ProjectContent project={project} />,
  }
})
