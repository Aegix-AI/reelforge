import { Upload, Cpu, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: <Upload className="w-12 h-12" />,
    title: "Upload Your Brand Assets",
    description: "Provide your brand guidelines, product details, and target audience information.",
    step: "01",
  },
  {
    icon: <Cpu className="w-12 h-12" />,
    title: "AI Agents Create & Test",
    description: "Our agentic AI system generates multiple ad variations and tests them across platforms.",
    step: "02",
  },
  {
    icon: <BarChart3 className="w-12 h-12" />,
    title: "Learn & Optimize",
    description: "The system continuously learns from performance data to improve ROAS and personalization.",
    step: "03",
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">How It Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI agents work autonomously to create, test, and optimize your video ads for maximum performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto bg-[#FF5C00] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
                  <span className="text-white dark:text-black font-bold text-sm">{step.step}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
