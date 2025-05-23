"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Calendar, MapPin } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">Get Started Today</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to transform your advertising with AI agents? Let's talk about your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">Start Your Free Trial</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Work Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Tell us about your advertising goals..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF5C00] hover:bg-[#E05000] text-white py-3 rounded-lg text-lg font-semibold"
              >
                Start Free Trial
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-[#FF5C00] mr-3" />
                <h4 className="text-lg font-semibold text-black dark:text-white">Email Us</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">team.reelforge@gmail.com</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">We respond within 24 hours</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-[#FF5C00] mr-3" />
                <h4 className="text-lg font-semibold text-black dark:text-white">Book a Demo</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">See ReelForge in action with a personalized demo</p>
              <Button variant="outline" className="border-[#FF5C00] text-[#FF5C00] hover:bg-[#FF5C00] hover:text-white">
                Schedule Demo
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <MessageSquare className="w-6 h-6 text-[#FF5C00] mr-3" />
                <h4 className="text-lg font-semibold text-black dark:text-white">Live Chat</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Chat with our AI specialists</p>
              <Button variant="outline" className="border-[#FF5C00] text-[#FF5C00] hover:bg-[#FF5C00] hover:text-white">
                Start Chat
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-[#FF5C00] mr-3" />
                <h4 className="text-lg font-semibold text-black dark:text-white">Visit Us</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Aegix Headquarters
                <br />
                San Francisco, CA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
