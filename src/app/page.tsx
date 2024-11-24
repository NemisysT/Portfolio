import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import { AnimatedTestimonialsDemo } from "@/components/Achievements";
import { SoftSkillsDemo } from "@/components/Events"; // Corrected named import
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <Skills />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <Projects />
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center mb-8">
              Achievements
            </h2>
            <AnimatedTestimonialsDemo />
          </div>
        </section>

        {/* Soft Skills Section */}
        <section id="events" className="py-20">
          <h2 className="text-4xl font-extrabold text-center mb-8">
            Soft Skills
          </h2>
          <div className="max-w-6xl mx-auto px-4">
            <SoftSkillsDemo /> {/* Events section */}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20">
          <Footer />
        </footer>
      </main>
    </>
  );
}
