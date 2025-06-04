import { Mail, Globe, Linkedin, Twitter, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-16 bg-black dark:bg-gray-950 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF5C00] to-[#E05000] mr-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold">ReelForge</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              ReelForge is a product by Aegix — a frontier tech company redefining AI-native software. We're building
              the future of autonomous advertising.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FF5C00] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/reelforge-ai"
                className="text-gray-400 hover:text-[#FF5C00] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF5C00] transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#why" className="text-gray-300 hover:text-[#FF5C00] transition-colors">
                  Why ReelForge
                </a>
              </li>
              <li>
                <a href="#how" className="text-gray-300 hover:text-[#FF5C00] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-300 hover:text-[#FF5C00] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF5C00] transition-colors">
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-300 hover:text-[#FF5C00] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="https://aegix.com" className="text-gray-300 hover:text-[#FF5C00] transition-colors">
                  Aegix
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF5C00] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-[#FF5C00] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <a
              href="mailto:team.reelforge@gmail.com"
              className="flex items-center text-gray-300 hover:text-[#FF5C00] transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              team.reelforge@gmail.com
            </a>
            <a
              href="https://contact.reelforge.ai"
              className="flex items-center text-gray-300 hover:text-[#FF5C00] transition-colors"
            >
              <Globe className="w-4 h-4 mr-2" />
              contact.reelforge.ai
            </a>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ReelForge by Aegix. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
