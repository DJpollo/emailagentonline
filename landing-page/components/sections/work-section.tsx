"use client"

import { useReveal } from "@/hooks/use-reveal"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      id="work"
      className="flex min-h-screen items-center px-6 py-24 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            How It Works
          </h2>
          <p className="font-mono text-sm text-muted-foreground md:text-base">/ Three simple steps to inbox freedom</p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {[
            {
              number: "01",
              title: "Connect Your Inbox",
              category: "Seamless Integration",
              description: "Link Gmail, Outlook, or any IMAP email in seconds",
              direction: "left",
            },
            {
              number: "02",
              title: "AI Learns Your Style",
              category: "Smart Adaptation",
              description: "Our AI studies your patterns and preferences",
              direction: "right",
            },
            {
              number: "03",
              title: "Automate Everything",
              category: "Hands-Free Management",
              description: "Watch as routine emails handle themselves",
              direction: "left",
            },
          ].map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: { number: string; title: string; category: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center justify-between rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm transition-all duration-700 hover:border-primary/30 hover:bg-card/50 md:p-8 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-2xl font-light text-primary/60 transition-colors group-hover:text-primary md:text-3xl">
          {project.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="mb-1 font-mono text-xs text-primary/80 md:text-sm">{project.category}</p>
          <p className="text-sm text-muted-foreground md:text-base">{project.description}</p>
        </div>
      </div>
    </div>
  )
}
