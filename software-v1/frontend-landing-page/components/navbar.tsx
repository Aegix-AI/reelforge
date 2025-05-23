"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "./theme-toggle"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Why ReelForge", href: "#why" },
  { name: "How It Works", href: "#how" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-gray-50/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800"
            : "py-6 bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF5C00] to-[#E05000] mr-3 shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-black dark:text-white">ReelForge</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-[#FF5C00] dark:hover:text-[#FF5C00] transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF5C00] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              className="hidden md:inline-flex bg-[#FF5C00] hover:bg-[#E05000] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
              onClick={() => scrollToSection("#contact")}
            >
              Get Started
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-[#FF5C00] dark:hover:text-[#FF5C00] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-50/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="container mx-auto px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-[#FF5C00] dark:hover:text-[#FF5C00] transition-colors duration-300 font-medium py-2"
                >
                  {item.name}
                </button>
              ))}
              <Button
                className="w-full bg-[#FF5C00] hover:bg-[#E05000] text-white py-2 rounded-lg transition-all duration-300"
                onClick={() => scrollToSection("#contact")}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
