import { Play } from "lucide-react"

const videoSamples = [
  { title: "DTC Skincare Campaign", performance: "+340% ROAS" },
  { title: "Health & Wellness Brand", performance: "+280% CTR" },
  { title: "Tech Startup Launch", performance: "+450% Conversions" },
  { title: "Fitness App Promotion", performance: "+220% Engagement" },
  { title: "Food Delivery Service", performance: "+380% Orders" },
  { title: "Fashion Brand Campaign", performance: "+310% Sales" },
]

export default function VideoSamples() {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
            AI-Generated Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how our AI agents have transformed campaigns across different industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoSamples.map((video, index) => (
            <div key={index} className="group">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative mb-4 hover:shadow-xl transition-shadow duration-200">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#FF5C00] flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-black dark:text-white mb-2">{video.title}</h3>
              <p className="text-[#FF5C00] font-medium">{video.performance}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
