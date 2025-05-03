"use client"

import { useState } from "react"
import { Check, X, Sparkles, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

type PricingPlan = {
  name: string
  price: string
  description: string
  shortsPerMonth: number
  features: Array<{
    text: string
    included: boolean
  }>
  popular?: boolean
  buttonText: string
  buttonLink: string
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const pricingPlans: PricingPlan[] = [
    {
      name: "Free",
      price: "Free",
      description: "Perfect for trying out ReelForge AI",
      shortsPerMonth: 1,
      features: [
        { text: "Access to AI Shorts generator", included: true },
        { text: "Basic music library access", included: true },
        { text: "Basic voice selection", included: true },
        { text: "Standard video quality", included: true },
        { text: "Analytics feedback loop", included: false },
        { text: "Direct posting to platforms", included: false },
      ],
      buttonText: "Get Started Free",
      buttonLink: "/generate",
    },
    {
      name: "Starter",
      price: isAnnual ? "$12" : "$15",
      description: "For creators ready to grow their audience",
      shortsPerMonth: 20,
      features: [
        { text: "AI Shorts generator access", included: true },
        { text: "Premium music library", included: true },
        { text: "Multiple voice selections", included: true },
        { text: "HD Video Quality", included: true },
        { text: "Analytics feedback loop (20 pulls/month)", included: true },
        { text: "Direct posting to YT, IG, TikTok drafts", included: true },
      ],
      popular: true,
      buttonText: "Choose Starter",
      buttonLink: "/generate?plan=starter",
    },
    {
      name: "Pro",
      price: isAnnual ? "$29" : "$35",
      description: "For professional content creators",
      shortsPerMonth: 60,
      features: [
        { text: "All Starter features included", included: true },
        { text: "Extended analytics feedback loop (60 pulls/month)", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced customization (more voices, subtitles)", included: true },
        { text: "AI-powered audience insights", included: true },
        { text: "Custom branding options", included: true },
      ],
      buttonText: "Choose Pro",
      buttonLink: "/generate?plan=pro",
    },
    {
      name: "Growth",
      price: isAnnual ? "$49" : "$60",
      description: "For teams and agencies scaling content",
      shortsPerMonth: 150,
      features: [
        { text: "All Pro features included", included: true },
        { text: "Full analytics feedback loop (150 pulls/month)", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Early access to new AI features", included: true },
        { text: "Advanced AI orchestration", included: true },
        { text: "Multi-user access", included: true },
      ],
      buttonText: "Choose Growth",
      buttonLink: "/generate?plan=growth",
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
            <Sparkles className="mr-1 h-3 w-3" />
            AI-Powered Plans
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Start for free, upgrade when you're ready.
          </p>

          <div className="mt-6 inline-flex items-center rounded-full border p-1 bg-muted">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                !isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Annual <span className="text-xs text-primary ml-1">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative flex flex-col rounded-xl border bg-background p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-4px]",
                plan.popular && "border-primary/50 shadow-md",
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 -right-3 flex h-[60px] w-[60px] items-center justify-center">
                  <div className="absolute inset-0 rotate-45 transform overflow-hidden rounded-sm bg-primary">
                    <div className="absolute bottom-0 left-0 right-0 top-[30px] bg-primary"></div>
                  </div>
                  <Crown className="relative z-10 h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Free" && (
                    <span className="ml-1 text-muted-foreground">/{isAnnual ? "year" : "month"}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <div className="mb-4 rounded-lg bg-muted p-3">
                <div className="text-center">
                  <span className="text-2xl font-bold">{plan.shortsPerMonth}</span>
                  <span className="text-sm text-muted-foreground"> shorts/month</span>
                </div>
              </div>
              <ul className="mb-6 space-y-2 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    {feature.included ? (
                      <Check className="mr-2 h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <X className="mr-2 h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                    <span className={cn("text-sm", !feature.included && "text-muted-foreground")}>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.buttonLink} className="mt-auto">
                <Button
                  className={cn("w-full", plan.popular ? "button-glow" : "bg-muted hover:bg-muted/80 text-foreground")}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Need a custom plan for your enterprise?{" "}
            <Link href="#" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
