import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import WhyReelForge from "@/components/why-reelforge"
import HowItWorks from "@/components/how-it-works"
import VideoSamples from "@/components/video-samples"
import Pricing from "@/components/pricing"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <WhyReelForge />
      <HowItWorks />
      <VideoSamples />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
