import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  Mail,
  Shield,
  Sparkles,
  ScanSearch,
  WandSparkles,
} from 'lucide-react';
import { type ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { GrainOverlay } from '../components/landing/GrainOverlay';
import { useReveal } from '../hooks/useReveal';

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d69b3]">{eyebrow}</p>
      <h2 className="text-4xl font-bold tracking-[-0.05em] text-[#453857] md:text-5xl lg:text-6xl">{title}</h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[#6f6281] md:text-lg">{subtitle}</p>
    </div>
  );
}

function RevealSection({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: (isVisible: boolean) => ReactNode;
}) {
  const { ref, isVisible } = useReveal<HTMLElement>(0.16);

  return (
    <section id={id} ref={ref} className={className}>
      {children(isVisible)}
    </section>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const navItems = useMemo(
    () => [
      { label: 'Flow', id: 'how-it-works' },
      { label: 'Capabilities', id: 'capabilities' },
      { label: 'Why teams choose it', id: 'why-it-fits' },
      { label: 'Start', id: 'cta' },
    ],
    []
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const workflowSteps = [
    {
      number: '01',
      title: 'Capture requests without changing user behavior',
      description: 'Approval emails flow into the system naturally, so teams keep using inboxes while the product adds structure behind the scenes.',
      tint: 'from-[#ffc6e9]/70 to-white/30',
    },
    {
      number: '02',
      title: 'Layer AI judgment over the message',
      description: 'Summaries, urgency, risk score, and recommendation appear immediately so reviewers start with signal instead of raw email.',
      tint: 'from-[#d1f2ff]/75 to-white/35',
    },
    {
      number: '03',
      title: 'Keep the right work visible',
      description: 'Low-risk items move faster while escalations stay prominent, traceable, and easier to resolve.',
      tint: 'from-[#ebb1ff]/72 to-white/30',
    },
  ];

  const capabilityCards = [
    {
      icon: Brain,
      title: 'Readable summaries',
      description: 'A reviewer can understand the request in seconds, not after parsing a long thread.',
      tone: 'bg-[linear-gradient(180deg,rgba(255,198,233,0.7),rgba(255,255,255,0.34))]',
    },
    {
      icon: ScanSearch,
      title: 'Risk-aware triage',
      description: 'Urgency and risk are surfaced as part of the request itself, not bolted on later.',
      tone: 'bg-[linear-gradient(180deg,rgba(209,242,255,0.72),rgba(255,255,255,0.3))]',
    },
    {
      icon: Clock3,
      title: 'Smoother queue rhythm',
      description: 'Approvers spend less energy sorting requests and more energy on the decisions that need them.',
      tone: 'bg-[linear-gradient(180deg,rgba(255,224,224,0.72),rgba(255,255,255,0.32))]',
    },
    {
      icon: Shield,
      title: 'Traceable outcomes',
      description: 'Statuses, actions, and request history stay connected across the same review surface.',
      tone: 'bg-[linear-gradient(180deg,rgba(218,218,255,0.72),rgba(255,255,255,0.3))]',
    },
  ];

  const fitPoints = [
    {
      title: 'Fits the way teams already work',
      body: 'Teams can keep using email as the intake channel while the platform adds structure, prioritization, and visibility behind the scenes.',
    },
    {
      title: 'Less manual sorting, better decisions',
      body: 'Summaries, urgency, and recommendation signals give reviewers the context they need before opening a long thread.',
    },
    {
      title: 'Audit-ready from intake to resolution',
      body: 'Request status, reviewer actions, and escalation history stay connected so teams can move quickly without losing accountability.',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fcf7ff] text-[#453857]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fffbff_0%,#f8f5ff_34%,#f6fbff_68%,#fff8fb_100%)]" />
      <div className="candy-orb left-[-8rem] top-[5rem] h-[25rem] w-[25rem] bg-[#ffc6e9]/70 animate-candy-shimmer" />
      <div className="candy-orb right-[-6rem] top-[6rem] h-[22rem] w-[22rem] bg-[#d1f2ff]/80 animate-candy-float" />
      <div className="candy-orb bottom-[20rem] left-[34%] h-[14rem] w-[14rem] bg-[#ebb1ff]/55 animate-candy-shimmer" />
      <div className="candy-orb bottom-[8rem] right-[16%] h-[16rem] w-[16rem] bg-[#ffe0e0]/70 animate-candy-float" />
      <GrainOverlay />

      <div className="relative z-10">
        <header className="sticky top-0 z-30 px-3 pt-3 md:px-6 md:pt-5">
          <div className="candy-glass mx-auto flex max-w-7xl items-center justify-between rounded-[30px] px-4 py-3 md:px-6 md:py-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 text-left"
            >
              <div className="candy-glass-soft flex h-11 w-11 items-center justify-center rounded-[18px] text-[#8d69b3]">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8d69b3]">Team 9</p>
                <p className="text-base font-bold tracking-[-0.03em] text-[#453857] md:text-lg">Auto-Review Agent</p>
              </div>
            </button>

            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-[#5f5270]/80 transition-colors hover:text-[#453857]"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <Button
                variant="ghost"
                className="rounded-full border border-white/55 bg-white/30 px-4 py-2.5 text-sm text-[#5d4e70] backdrop-blur-xl hover:bg-white/55"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                className="rounded-full border border-white/60 bg-[linear-gradient(135deg,#ebb1ff_0%,#ffc6e9_52%,#d1f2ff_100%)] px-5 py-2.5 text-sm font-semibold text-[#4a3d5b] shadow-[0_12px_30px_rgba(171,131,208,0.22)] hover:brightness-[1.03]"
                onClick={() => navigate('/login')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </header>

        <main>
          <section className="relative min-h-[calc(100svh-88px)] px-4 pb-20 pt-10 md:px-6 md:pb-28 md:pt-14">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(430px,0.98fr)] lg:items-center lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="max-w-3xl"
              >
                <div className="candy-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8d69b3]">
                  <WandSparkles className="h-3.5 w-3.5" />
                  AI-assisted approval workflow
                </div>
                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-[#74648f]">Auto-Review Agent</p>
                <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[0.94] tracking-[-0.065em] text-[#453857] md:text-7xl lg:text-[5.7rem]">
                  Make approval email review
                  <span className="block bg-[linear-gradient(135deg,#ebb1ff_0%,#ffc6e9_42%,#8bcbff_100%)] bg-clip-text text-transparent">
                    faster, clearer, and more reliable.
                  </span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-[#685b7c] md:text-xl">
                  AI summaries, risk signals, and structured routing help teams move through approval work with less manual sorting and better judgment.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    size="lg"
                    className="group rounded-full border border-white/65 bg-[linear-gradient(135deg,#ebb1ff_0%,#ffc6e9_48%,#d1f2ff_100%)] px-8 py-3.5 text-base font-semibold text-[#4a3d5b] shadow-[0_20px_42px_rgba(171,131,208,0.22)] hover:brightness-[1.03]"
                    onClick={() => navigate('/login')}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="rounded-full border border-white/55 bg-white/34 px-8 py-3.5 text-base text-[#5d4e70] backdrop-blur-xl hover:bg-white/56"
                    onClick={() => scrollToSection('how-it-works')}
                  >
                    See the flow
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
                className="relative"
              >
                <div className="candy-glass animate-candy-float rounded-[38px] p-4 md:p-6">
                  <div className="absolute inset-0 candy-grid opacity-40" />
                  <div className="relative rounded-[30px] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.24))] p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8d69b3]">Review surface</p>
                        <h2 className="mt-3 max-w-sm text-[2rem] font-bold tracking-[-0.05em] text-[#453857] md:text-[2.35rem]">
                          One queue, softened into signal.
                        </h2>
                      </div>
                      <div className="rounded-full border border-white/50 bg-white/58 px-3 py-1 text-xs font-semibold text-[#6b5b84]">
                        Live
                      </div>
                    </div>

                    <div className="mt-8 space-y-3">
                      {[
                        { title: 'Production access request', tag: 'Escalated', tone: 'bg-[#ffe0e0] text-[#9a5b72]', meta: 'Risk 82 - security review required' },
                        { title: 'Expense approval follow-up', tag: 'Pending', tone: 'bg-[#fff0d9] text-[#9a7b3b]', meta: 'Risk 46 - missing receipt context' },
                        { title: 'Conference reimbursement', tag: 'Auto-approved', tone: 'bg-[#dff8eb] text-[#4f8b66]', meta: 'Risk 18 - policy aligned' },
                      ].map((item, index) => (
                        <div
                          key={item.title}
                          className="candy-glass-soft rounded-[24px] px-4 py-4"
                          style={{ transform: `translateY(${index * 0}px)` }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-semibold tracking-[-0.02em] text-[#453857]">{item.title}</p>
                              <p className="mt-1 text-sm text-[#6f6281]">{item.meta}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${item.tone}`}>
                              {item.tag}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        { value: '2.4x', label: 'faster routing', tint: 'from-[#ffc6e9]/70 to-white/25' },
                        { value: '91%', label: 'requests pre-scored', tint: 'from-[#d1f2ff]/72 to-white/26' },
                        { value: '1 view', label: 'queue plus history', tint: 'from-[#ebb1ff]/70 to-white/24' },
                      ].map((stat) => (
                        <div key={stat.label} className={`candy-glass-soft rounded-[22px] bg-[linear-gradient(180deg,var(--tw-gradient-stops))] px-4 py-4 ${stat.tint}`}>
                          <p className="text-2xl font-bold tracking-[-0.05em] text-[#453857]">{stat.value}</p>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#726583]">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <RevealSection id="how-it-works" className="px-4 py-20 md:px-6 md:py-24">
            {(isVisible) => (
              <div className={`mx-auto max-w-7xl transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <SectionHeading
                  eyebrow="Flow"
                  title="From incoming email to confident approval in three steps"
                  subtitle="The platform captures requests, adds AI context, and routes work to the right reviewer before time is lost in inbox triage."
                />
                <div className="mt-12 grid gap-5 lg:grid-cols-3">
                  {workflowSteps.map((step) => (
                    <div key={step.number} className={`candy-glass rounded-[30px] bg-[linear-gradient(180deg,var(--tw-gradient-stops))] px-6 py-7 md:px-7 md:py-8 ${step.tint}`}>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-4xl font-bold tracking-[-0.06em] text-[#8d69b3]">{step.number}</span>
                        <CheckCircle2 className="h-5 w-5 text-[#7d6b98]" />
                      </div>
                      <h3 className="mt-8 text-2xl font-bold tracking-[-0.04em] text-[#453857]">{step.title}</h3>
                      <p className="mt-4 text-base leading-8 text-[#675a7a]">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </RevealSection>

          <RevealSection id="capabilities" className="px-4 py-20 md:px-6 md:py-24">
            {(isVisible) => (
              <div className={`mx-auto max-w-7xl transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                  <SectionHeading
                    eyebrow="Capabilities"
                    title="Built to reduce review time without sacrificing control"
                    subtitle="Auto-Review Agent gives teams faster intake, stronger context, and clearer next steps across every request." 
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {capabilityCards.map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <div key={feature.title} className={`candy-glass rounded-[28px] px-5 py-6 md:px-6 md:py-7 ${feature.tone}`}>
                          <div className="candy-glass-soft flex h-12 w-12 items-center justify-center rounded-[18px] text-[#8d69b3]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="mt-6 text-xl font-bold tracking-[-0.04em] text-[#453857] md:text-2xl">{feature.title}</h3>
                          <p className="mt-3 text-base leading-7 text-[#665975]">{feature.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </RevealSection>

          <RevealSection id="why-it-fits" className="px-4 py-20 md:px-6 md:py-24">
            {(isVisible) => (
              <div className={`mx-auto max-w-7xl transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="candy-glass rounded-[38px] px-6 py-7 md:px-10 md:py-10">
                  <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                    <SectionHeading
                      eyebrow="Why teams choose it"
                      title="Designed for organizations that still run approvals through email"
                      subtitle="Auto-Review Agent keeps the inbox front door intact while giving teams a faster operational system behind it."
                    />
                    <div className="space-y-4">
                      {fitPoints.map((item, index) => (
                        <div
                          key={item.title}
                          className={`candy-glass-soft rounded-[24px] px-5 py-5 ${index === 0 ? 'bg-[linear-gradient(180deg,rgba(255,198,233,0.42),rgba(255,255,255,0.22))]' : index === 1 ? 'bg-[linear-gradient(180deg,rgba(209,242,255,0.42),rgba(255,255,255,0.22))]' : 'bg-[linear-gradient(180deg,rgba(218,218,255,0.4),rgba(255,255,255,0.22))]'}`}
                        >
                          <p className="text-lg font-bold tracking-[-0.03em] text-[#453857]">{item.title}</p>
                          <p className="mt-2 text-base leading-7 text-[#665975]">{item.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </RevealSection>

          <RevealSection id="cta" className="px-4 pb-20 pt-20 md:px-6 md:pb-24 md:pt-24">
            {(isVisible) => (
              <div className={`mx-auto max-w-7xl transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="candy-glass rounded-[42px] px-6 py-8 md:px-10 md:py-12">
                  <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div className="max-w-3xl">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d69b3]">Start</p>
                      <h2 className="mt-4 text-4xl font-bold tracking-[-0.055em] text-[#453857] md:text-5xl lg:text-6xl">
                        Start reviewing approval requests with more context and less friction.
                      </h2>
                      <p className="mt-5 text-base leading-8 text-[#665975] md:text-lg">
                        Sign in to route low-risk work faster, keep escalations visible, and give every reviewer the context they need to make a decision.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                      <Button
                        size="lg"
                        className="rounded-full border border-white/65 bg-[linear-gradient(135deg,#ebb1ff_0%,#ffc6e9_48%,#d1f2ff_100%)] px-8 py-3.5 text-base font-semibold text-[#4a3d5b] shadow-[0_18px_40px_rgba(171,131,208,0.22)] hover:brightness-[1.03]"
                        onClick={() => navigate('/login')}
                      >
                        Get Started
                      </Button>
                      <Button
                        size="lg"
                        variant="ghost"
                        className="rounded-full border border-white/55 bg-white/36 px-8 py-3.5 text-base text-[#5d4e70] backdrop-blur-xl hover:bg-white/58"
                        onClick={() => navigate('/register')}
                      >
                        Create account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </RevealSection>
        </main>
      </div>
    </div>
  );
}
