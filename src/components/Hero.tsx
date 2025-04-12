"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaHome, FaProjectDiagram } from "react-icons/fa";
import { GiSkills, GiAchievement } from "react-icons/gi";
import { FloatingDock } from "./floating-dock"; // Adjust path as needed
import Image from "next/image";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Define Floating Dock Items
  const dockItems = [
    { title: "Home", icon: <FaHome />, href: "#" },
    { title: "Skills", icon: <GiSkills />, href: "#skills" },
    { title: "Projects", icon: <FaProjectDiagram />, href: "#projects" },
    { title: "Achievements", icon: <GiAchievement />, href: "#achievements" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-800 to-gray-900 text-white overflow-hidden"
    >
      {/* Floating Dock Navbar */}
      <FloatingDock
        items={dockItems}
        desktopClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2"
        mobileClassName="fixed bottom-4 right-4"
      />

      {/* Background Ripple Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1) 0%, transparent 20%)`,
        }}
      />

      {/* Hero Content */}
      <motion.div
        className="flex items-center justify-between text-center mt-0 px-6 w-full max-w-screen-xl pt-0"
        style={{ opacity, scale }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Content (Text) */}
        <div className="w-full md:w-1/2 max-w-xl text-left mx-auto px-4 sm:px-8">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi! I&apos;m Mervin
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mt-4 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Bridging Creativity and Technology
          </motion.p>
          <motion.div
            className="flex space-x-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="#projects"
              className="px-6 py-3 bg-gray-800 text-gray-200 rounded-lg shadow-md hover:bg-gray-700"
              aria-label="Explore Projects"
            >
              Explore Projects
            </Link>
            <a
              href="https://drive.google.com/file/d/1KEdOfJ30iaKUK9_W-hmV7-Yn0hmGaI7e/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume"
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="bg-gray-800 text-gray-200 px-6 py-3 font-medium"
              >
                Resume
              </HoverBorderGradient>
            </a>
          </motion.div>
        </div>

        {/* Right Content (Image) */}
        <motion.div
          className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-transparent p-1 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            background:
              "linear-gradient(45deg, #ff007f, #00c6ff, #ff00ff, #ff0000)",
            backgroundSize: "400% 400%",
            animation: "gradient-shift 5s ease infinite",
          }}
        >
          <Image
            src="/images/Nemisys.png" // Replace with your actual image path
            alt="Mervin's picture"
            layout="intrinsic" // Use 'intrinsic' for a fixed size
            width={384} // Increased size for the image
            height={384} // Increased size for the image
            objectFit="cover" // Ensures the image covers the container area
            className="rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
