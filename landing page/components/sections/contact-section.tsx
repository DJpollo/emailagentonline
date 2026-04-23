"use client"

import { Mail, Sparkles } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({ name: "", email: "", company: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", company: "" })

    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="flex min-h-screen items-center px-4 py-24 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                Get
                <br />
                Started
              </h2>
              <p className="font-mono text-xs text-muted-foreground md:text-base">/ Join the waitlist today</p>
            </div>

            <div className="space-y-4 md:space-y-8">
              <div
                className={`flex items-start gap-4 transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="mb-1 font-sans text-lg font-light text-foreground md:text-xl">14-day free trial</p>
                  <p className="text-sm text-muted-foreground">No credit card required</p>
                </div>
              </div>

              <div
                className={`flex items-start gap-4 transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="mb-1 font-sans text-lg font-light text-foreground md:text-xl">Works with any inbox</p>
                  <p className="text-sm text-muted-foreground">Gmail, Outlook, IMAP, and more</p>
                </div>
              </div>

              <div
                className={`flex gap-2 pt-2 transition-all duration-700 md:pt-4 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                {["Twitter", "LinkedIn", "Product Hunt"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="border-b border-transparent font-mono text-xs text-muted-foreground transition-all hover:border-primary hover:text-primary"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Sign up form */}
          <div className="flex flex-col justify-center">
            <div
              className={`rounded-2xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-all duration-700 md:p-8 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="mb-6 font-sans text-xl font-light text-foreground md:text-2xl">
                Start your free trial
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label className="mb-1 block font-mono text-xs text-muted-foreground md:mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 md:py-3 md:text-base"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-mono text-xs text-muted-foreground md:mb-2">Work Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 md:py-3 md:text-base"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-mono text-xs text-muted-foreground md:mb-2">Company (Optional)</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 md:py-3 md:text-base"
                    placeholder="Your company"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors duration-200 hover:bg-foreground hover:text-background hover:shadow-foreground/20 disabled:opacity-50"
                  >
                    {isSubmitting ? "Starting..." : "Start Free Trial"}
                  </button>
                  {submitSuccess && (
                    <p className="mt-3 text-center font-mono text-sm text-primary">
                      Welcome aboard! Check your email.
                    </p>
                  )}
                </div>

                <p className="text-center font-mono text-xs text-muted-foreground">
                  By signing up, you agree to our Terms & Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
