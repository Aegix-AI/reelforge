"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
  threshold?: number
  once?: boolean
}

export default function StaggerChildren({
  children,
  className,
  staggerDelay = 100,
  initialDelay = 0,
  threshold = 0.1,
  once = true,
}: StaggerChildrenProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once, threshold])

  return (
    <div ref={ref} className={cn(className)}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child

        return React.cloneElement(child as React.ReactElement, {
          style: {
            ...((child as React.ReactElement).props.style || {}),
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
            transition: `opacity 500ms ease, transform 500ms ease`,
            transitionDelay: `${initialDelay + index * staggerDelay}ms`,
          },
        })
      })}
    </div>
  )
}
