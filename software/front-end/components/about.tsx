"use client"

import { Button } from "@/components/ui/button"

import { Building2, Users, Award, Globe } from "lucide-react"

const stats = [
  { icon: <Building2 className="w-8 h-8" />, value: "500+", label: "Brands Powered" },
  { icon: <Users className="w-8 h-8" />, value: "50M+", label: "Ads Generated" },
  { icon: <Award className="w-8 h-8" />, value: "340%", label: "Avg ROAS Increase" },
  { icon: <Globe className="w-8 h-8" />, value: "25+", label: "Countries Served" },
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">About ReelForge</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              ReelForge is a product by <strong>Aegix</strong> — a frontier tech company redefining AI-native software.
              We're building the future of autonomous advertising with AI agents that think, learn, and optimize like
              the best marketing teams.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our mission is to democratize high-performance advertising by making advanced AI accessible to businesses
              of all sizes. From solopreneurs to enterprise brands, we're leveling the playing field with intelligent
              automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-[#FF5C00] hover:bg-[#E05000] text-white px-6 py-3 rounded-lg"
                onClick={() => window.open("https://aegix.com", "_blank")}
              >
                Learn About Aegix
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg"
              >
                Our Story
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-900">
                <div className="text-[#FF5C00] mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-black dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
