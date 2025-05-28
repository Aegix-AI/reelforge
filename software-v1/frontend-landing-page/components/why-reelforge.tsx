import { Brain, Zap, Target, TrendingUp, Users, Shield } from "lucide-react"

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Agentic AI System",
    description: "Autonomous AI agents that think, create, and optimize your ads continuously.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Real-Time Learning",
    description: "Our AI learns from every interaction, improving performance with each campaign.",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Precision Targeting",
    description: "Advanced algorithms identify and reach your ideal customers with surgical precision.",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Performance Optimization",
    description: "Continuous ROAS improvement through intelligent bid management and creative testing.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Built for Marketers",
    description: "Designed specifically for DTC brands, solopreneurs, and modern digital marketers.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "Bank-level security with SOC 2 compliance and data encryption at rest and in transit.",
  },
]

export default function WhyReelForge() {
  return (
    <section id="why" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">Why Choose ReelForge?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powered by cutting-edge AI agents that revolutionize how you create, test, and optimize video ads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
            >
              <div className="text-[#FF5C00] mb-4 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
