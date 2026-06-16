"use client"

import { Code2, Users, Award, Coffee } from "lucide-react"
import { AnimateInView } from "@/components/animate-in-view"
import { CountUp } from "@/components/count-up"

const stats = [
  { icon: Code2, value: 25, label: "Projects Completed" },
  { icon: Users, value: 35, label: "Happy Clients" },
  { icon: Award, value: 5, label: "Years Experience" },
  { icon: Coffee, value: 1000, label: "Cups of Coffee" },
]

export function StatsSection() {
  return (
    <section className="py-16 border-y border-border/50 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 animate-shimmer opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimateInView key={stat.label} variant="scale-up" delay={index * 100}>
                <div className="text-center group">
                  <div className="inline-flex p-3 mb-3 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                    <stat.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors tabular-nums">
                    <CountUp end={stat.value} duration={2000 + index * 200} />
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
