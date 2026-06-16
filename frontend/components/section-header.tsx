"use client"

import { AnimateInView } from "@/components/animate-in-view"

interface SectionHeaderProps {
  label: string
  title: string
  description: string
  centered?: boolean
}

export function SectionHeader({ label, title, description, centered = true }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""}`}>
      <AnimateInView variant="fade-down" delay={0}>
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full border border-primary/20 animate-pulse-glow">
          {label}
        </span>
      </AnimateInView>
      <AnimateInView variant="fade-up" delay={100}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          {title}
        </h2>
      </AnimateInView>
      <AnimateInView variant="fade-up" delay={200}>
        <p className={`text-lg text-muted-foreground max-w-2xl text-balance ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      </AnimateInView>
    </div>
  )
}
