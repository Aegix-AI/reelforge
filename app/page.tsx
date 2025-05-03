import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoveRight, Play, Sparkles, BarChart3, Share2, Bot, Brain, Cpu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { PricingSection } from "@/components/pricing-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden md:flex gap-6">
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="#benefits" className="text-sm font-medium transition-colors hover:text-primary">
              Benefits
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/generate">
              <Button>Get Started Free</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Auto-create <span className="gradient-text">Shorts.</span> Test instantly. Grow continuously.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  ReelForge uses advanced <span className="font-semibold text-foreground">AI agents</span> to
                  automatically generate engaging short-form videos for YouTube, Instagram, and TikTok in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/generate">
                    <Button size="lg" className="group button-glow">
                      Get Started Free
                      <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline" className="transition-all duration-200 hover:bg-muted">
                      <Play className="mr-2 h-4 w-4" />
                      See How It Works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="glass-card rounded-2xl p-1 shadow-xl float-animation">
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 z-10"></div>
                    <Image
                      src="/placeholder.svg?height=1080&width=1920"
                      alt="AI-generated short video preview"
                      width={1920}
                      height={1080}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="rounded-full bg-primary/90 p-4 pulse-animation">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 z-20">
                      <p className="text-white text-sm font-medium">
                        Batman explaining how AI is changing content creation
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 -z-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
                <Bot className="mr-1 h-3 w-3" />
                AI-Powered Process
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How ReelForge AI Works</h2>
              <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Our intelligent AI agents create engaging short-form videos in three simple steps
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="glass-card rounded-xl p-6 slide-up-delay-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold">Type your idea</h3>
                <p className="mt-2 text-muted-foreground">
                  Describe your short video concept in a single line. Our AI agents understand context and creative
                  direction.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6 slide-up-delay-2">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold">Customize</h3>
                <p className="mt-2 text-muted-foreground">
                  Select voice, music, captions, and branding elements. Our AI orchestration system optimizes for your
                  audience.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6 slide-up-delay-3">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold">Generate & Publish</h3>
                <p className="mt-2 text-muted-foreground">
                  Our AI agents create multiple variations instantly and publish directly to YouTube, Instagram, or
                  TikTok.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
                <Brain className="mr-1 h-3 w-3" />
                AI-Powered Benefits
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Creators Love ReelForge AI
              </h2>
              <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Powerful AI features designed to help you grow your audience
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-xl border bg-background p-6 hover:shadow-md transition-all duration-200">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Multiple AI Variations</h3>
                  <p className="mt-2 text-muted-foreground">
                    Our AI agents auto-generate multiple versions of your content to test what resonates with your
                    audience.
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl border bg-background p-6 hover:shadow-md transition-all duration-200">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">AI Learning</h3>
                  <p className="mt-2 text-muted-foreground">
                    Our intelligent AI system learns what your audience loves and optimizes future content for better
                    engagement.
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl border bg-background p-6 hover:shadow-md transition-all duration-200">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Share2 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">AI-Powered Publishing</h3>
                  <p className="mt-2 text-muted-foreground">
                    Post directly to YouTube, Instagram, and TikTok with our AI-orchestrated seamless integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* Early Access Section */}
        <section className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] glass-card rounded-2xl p-8 md:p-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                  <Cpu className="mr-1 h-3 w-3" />
                  AI-Powered Platform
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join the AI Revolution</h2>
                <p className="text-muted-foreground md:text-lg max-w-[600px]">
                  Be among the first to experience ReelForge's advanced AI agents and get exclusive benefits.
                </p>
                <div className="w-full max-w-md mt-4">
                  <div className="flex space-x-2">
                    <Input type="email" placeholder="Enter your email" className="rounded-l-lg" />
                    <Button>Get Early Access</Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6">
              <p className="text-sm text-muted-foreground">TRUSTED BY AI-FORWARD CONTENT CREATORS WORLDWIDE</p>
              <div className="flex flex-wrap justify-center gap-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex flex-col items-center justify-center">
                    <div className="h-12 w-32 bg-muted/50 dark:bg-muted/20 rounded flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Customer Logo {i}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-sm">
                <span>Powered by</span>
                <span className="font-semibold">Aegix</span>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} ReelForge AI. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
