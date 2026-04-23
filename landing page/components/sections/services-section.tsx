"use client"

import { useReveal } from "@/hooks/use-reveal"
import { Mail, Zap, Brain, Shield } from "lucide-react"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      id="services"
      className="flex min-h-screen items-center px-6 py-24 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Services
          </h2>
          <p className="font-mono text-sm text-muted-foreground md:text-base">/ Intelligent email automation features</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {[
            {
              icon: Brain,
              title: "Smart Triage",
              description: "AI categorizes and prioritizes emails instantly, surfacing what needs your attention",
              direction: "top",
            },
            {
              icon: Zap,
              title: "Auto-Responses",
              description: "Generate context-aware replies that match your tone and communication style",
              direction: "right",
            },
            {
              icon: Mail,
              title: "Follow-Up Reminders",
              description: "Never miss an important thread with intelligent follow-up suggestions",
              direction: "left",
            },
            {
              icon: Shield,
              title: "Privacy First",
              description: "End-to-end encryption ensures your emails stay private and secure",
              direction: "bottom",
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { icon: React.ElementType; title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const Icon = service.icon
  
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm transition-all duration-700 hover:border-primary/30 hover:bg-card/50 hover:shadow-lg hover:shadow-primary/5 md:p-8 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{service.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{service.description}</p>
    </div>
  )
}
