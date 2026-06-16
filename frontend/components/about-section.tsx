"use client"

import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { AnimateInView } from "@/components/animate-in-view"
import { GraduationCap, Award, Code2, Palette, Video, Megaphone, TrendingUp, Users, BarChart3, Search } from "lucide-react"

export function AboutSection() {
  const skills = [
    { name: "Web Development", icon: Code2, level: 90 },
    { name: "Graphic Design", icon: Palette, level: 85 },
    { name: "Video Editing", icon: Video, level: 80 },
    { name: "Digital Marketing", icon: Megaphone, level: 75 },
    { name: "Social Media Marketing", icon: TrendingUp, level: 80 },
    { name: "Content Creation", icon: Users, level: 82 },
    { name: "SEO Optimization", icon: Search, level: 78 },
    { name: "Analytics & Strategy", icon: BarChart3, level: 76 },
  ]

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="About" title="About Me" description="A dedicated student with a passion for creating digital experiences" />

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <AnimateInView variant="fade-left" delay={0}>
              <Card className="p-6 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 group h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:rotate-6 transition-all duration-300">
                    <GraduationCap className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Education</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Currently pursuing my studies while building practical skills in web development, design, and multimedia production.
                    </p>
                  </div>
                </div>
              </Card>
            </AnimateInView>

            <AnimateInView variant="fade-right" delay={100}>
              <Card className="p-6 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 group h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-primary group-hover:-rotate-6 transition-all duration-300">
                    <Award className="h-6 w-6 text-accent group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Experience</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Hands-on experience in creating websites, designing graphics, and producing video content for various projects and clients.
                    </p>
                  </div>
                </div>
              </Card>
            </AnimateInView>
          </div>

          <AnimateInView variant="fade-up">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">My Skills</h3>
          </AnimateInView>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <AnimateInView key={skill.name} variant="zoom-in" delay={index * 80}>
                <Card className="p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-border/50 group h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                      <skill.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-sm">{skill.name}</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Proficiency</span>
                      <span className="font-medium text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                        style={{ ["--skill-width" as string]: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </Card>
              </AnimateInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
