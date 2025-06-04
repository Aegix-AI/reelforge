"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Zap, Crown, Rocket } from "lucide-react"

const plans = [
  {
    name: "Starter",
    icon: <Zap className="w-6 h-6" />,
    description: "Perfect for solopreneurs and small businesses",
    monthlyPrice: 99,
    annualPrice: 79,
    features: [
      "5 AI-generated ad campaigns per month",
      "Basic performance analytics",
      "Email support",
      "Standard AI agents",
      "1 brand profile",
    ],
    popular: false,
  },
  {
    name: "Professional",
    icon: <Crown className="w-6 h-6" />,
    description: "Ideal for growing DTC brands",
    monthlyPrice: 299,
    annualPrice: 239,
    features: [
      "25 AI-generated ad campaigns per month",
      "Advanced performance analytics",
      "Priority support",
      "Advanced AI agents with learning",
      "5 brand profiles",
      "A/B testing automation",
      "Custom audience targeting",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    icon: <Rocket className="w-6 h-6" />,
    description: "For large brands and agencies",
    monthlyPrice: 999,
    annualPrice: 799,
    features: [
      "Unlimited AI-generated campaigns",
      "Real-time performance optimization",
      "Dedicated account manager",
      "Custom AI agent training",
      "Unlimited brand profiles",
      "White-label solutions",
      "API access",
      "Custom integrations",
    ],
    popular: false,
  },
]

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">Choose Your AI Agent Plan</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Start with a 14-day free trial. No credit card required. Scale as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`font-medium ${!isAnnual ? "text-black dark:text-white" : "text-gray-500"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? "bg-[#FF5C00]" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`font-medium ${isAnnual ? "text-black dark:text-white" : "text-gray-500"}`}>
              Annual
              <span className="ml-2 text-[#FF5C00] text-sm font-semibold">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-xl transition-all duration-200 ${
                plan.popular
                  ? "bg-white dark:bg-gray-800 shadow-xl border-2 border-[#FF5C00] scale-105"
                  : "bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#FF5C00] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-[#FF5C00] mr-2">{plan.icon}</div>
                  <h3 className="text-2xl font-bold text-black dark:text-white">{plan.name}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-black dark:text-white">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-[#FF5C00] font-medium">Billed annually (${plan.annualPrice * 12})</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-[#FF5C00] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-3 rounded-lg transition-all duration-200 ${
                  plan.popular
                    ? "bg-[#FF5C00] hover:bg-[#E05000] text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-black dark:text-white"
                }`}
              >
                Start 14-Day Free Trial
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            All plans include our core AI agent technology and 24/7 system monitoring.
          </p>
          <Button variant="link" className="text-[#FF5C00] hover:text-[#E05000]">
            Compare all features →
          </Button>
        </div>
      </div>
    </section>
  )
}
