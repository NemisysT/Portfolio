'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TypewriterEffect = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (!deleting && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay + Math.random() * 100)
    } else if (!deleting && currentIndex === text.length) {
      timeout = setTimeout(() => {
        setDeleting(true)
      }, 2000)
    } else if (deleting && currentIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1))
        setCurrentIndex(prev => prev - 1)
      }, delay / 2)
    } else if (deleting && currentIndex === 0) {
      timeout = setTimeout(() => {
        setDeleting(false)
      }, 1000)
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, deleting, text, delay])

  return (
    <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
      {displayText}
    </span>
  )
}

const BlinkingCursor = () => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
      style={{ color: "#00ff80" }}
    >
      _
    </motion.span>
  )
}

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('about')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setIsLoading(false), 1500);
      setTimeout(() => setShowContent(true), 2000);
    }
  }, [isVisible])

  return (
    <section id="about" className="py-20 bg-gray-900" style={{ backgroundAttachment: 'fixed', backgroundImage: "url('/background.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        <motion.div
          className="bg-black/80 p-6 rounded-2xl shadow-xl border border-green-500 font-mono text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-green-500">
            <span>$ cat about_mervin.txt</span>
          </div>
          <AnimatePresence>
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-300 mt-2"
              >
                Loading...
              </motion.div>
            )}
          </AnimatePresence>
          {showContent && (
            <>
              <motion.div
                className="mt-4 text-gray-300 hover:scale-105 transition-transform duration-300 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <TypewriterEffect 
                  text="A transient observer, weaving through the abstract and the tangible, collecting echoes of moments and reframing them into shifting narratives."
                  delay={30}
                />
              </motion.div>
              <motion.div
                className="mt-4 text-gray-300 hover:scale-105 transition-transform duration-300 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6 }}
              >
                <TypewriterEffect 
                  text="Beyond the screen, I'm a passionate sportsman and musician, always finding rhythm and energy in everything I do. I thrive on leadership and event management, where I get to bring ideas to life and inspire collaboration."
                  delay={30}
                />
              </motion.div>
              <motion.div
                className="mt-4 text-gray-300 hover:scale-105 transition-transform duration-300 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 8 }}
              >
                <TypewriterEffect 
                  text="For me, it's all about growing, creating, and making every experience count."
                  delay={30}
                />
              </motion.div>
              <motion.div
                className="mt-4 text-green-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 16 }}
              >
                $<BlinkingCursor />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}