"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import Link from "next/link"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { useRef, useEffect, useState } from "react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#a67f8e"
            colorB="#c89fa3"
            speed={0.6}
            detail={0.7}
            blend={55}
            coarseX={35}
            coarseY={35}
            mediumX={35}
            mediumY={35}
            fineX={35}
            fineY={35}
          />
          <ChromaFlow
            baseColor="#6c534e"
            upColor="#a67f8e"
            downColor="#4a3538"
            leftColor="#c89fa3"
            rightColor="#dbb3b1"
            intensity={0.85}
            radius={1.6}
            momentum={20}
            maskType="alpha"
            opacity={0.92}
          />
        </Shader>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0708]/90 via-[#1a0f11]/70 to-[#0d0708]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0708]/60 via-transparent to-[#0d0708]/60" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-foreground/10 bg-background/60 px-6 py-4 backdrop-blur-xl transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-primary/30">
            <span className="font-sans text-xl font-bold text-primary">M</span>
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">Mailflow</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: "Home", id: "hero" },
            { label: "How It Works", id: "work" },
            { label: "Services", id: "services" },
            { label: "About", id: "about" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative font-sans text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full bg-transparent px-6 py-2.5 text-sm font-medium text-foreground/80 transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            Login
          </Link>
          <button
            onClick={() => scrollToSection("contact")}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors duration-200 hover:bg-foreground hover:text-background hover:shadow-foreground/20"
          >
            Get Started
          </button>
        </div>
      </nav>

      <div
        className={`relative z-10 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* Hero Section */}
        <section id="hero" className="flex min-h-screen flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-primary">AI-Powered Email Intelligence</p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                Automate your
                <br />
                email decisions
                <br />
                <span className="text-primary">effortlessly</span>
              </span>
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                Stop drowning in emails. Our AI instantly triages, drafts responses, and handles routine tasks so you
                can focus on what matters most.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="h-12 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors duration-200 hover:bg-foreground hover:text-background hover:shadow-foreground/20"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => scrollToSection("work")}
                className="h-12 rounded-full border border-foreground/20 bg-foreground/10 px-8 text-sm font-medium text-foreground/90 transition-colors duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                See How It Works
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Scroll to explore</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary/80" />
              </div>
            </div>
          </div>
        </section>

        <WorkSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </div>
    </main>
  )
}
