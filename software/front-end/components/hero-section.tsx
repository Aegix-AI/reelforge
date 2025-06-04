"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C00]/10 to-transparent">
          <div className="absolute inset-0 bg-[length:20px_20px] bg-[radial-gradient(circle,_#FF5C00_1px,_transparent_1px)]"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-32 relative z-10 text-center">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-6 h-6 text-[#FF5C00] mr-2" />
          <span className="text-[#FF5C00] font-semibold">AI-Powered by Aegix</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black dark:text-white leading-tight">
          Your Personalized
          <br />
          <span className="text-[#FF5C00]">AI Ad Engine</span>
        </h1>

        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
          Create. Learn. Perform. Ads built by agentic intelligence, tailored for your business.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-[#FF5C00] hover:bg-[#E05000] text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("#contact")}
          >
            Start Free Trial
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("#how")}
          >
            See How It Works
          </Button>
        </div>

        <button
          onClick={() => scrollToSection("#why")}
          className="animate-bounce text-gray-400 dark:text-gray-600 hover:text-[#FF5C00] dark:hover:text-[#FF5C00] transition-colors duration-300"
        >
          <ArrowDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  )
}
