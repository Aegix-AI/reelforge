import FadeIn from "./animations/fade-in"
import StaggerChildren from "./animations/stagger-children"

export default function TrustedBrands() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">Trusted By Brands</h2>
        </FadeIn>

        <StaggerChildren staggerDelay={100}>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4, 5].map((logo) => (
              <div
                key={logo}
                className="w-32 h-16 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
              >
                <span className="text-gray-500 dark:text-gray-400 font-medium">Logo {logo}</span>
              </div>
            ))}
          </div>
        </StaggerChildren>
      </div>
    </section>
  )
}
