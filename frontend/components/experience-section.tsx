"use client"

import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { AnimateInView } from "@/components/animate-in-view"
import { Briefcase, Calendar } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      id: 1,
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2023 - Present",
      description: "Building custom websites and web applications for clients, focusing on responsive design and modern technologies.",
      achievements: ["Completed 15+ client projects", "Maintained 5-star rating on freelance platforms", "Specialized in Next.js and React development"],
    },
    {
      id: 2,
      title: "Graphic Designer",
      company: "Various Clients",
      period: "2022 - Present",
      description: "Creating visual content including logos, brand identities, and marketing materials for businesses and individuals.",
      achievements: ["Designed 30+ logos and brand identities", "Created social media content for multiple brands", "Developed consistent brand guidelines"],
    },
    {
      id: 3,
      title: "Video Editor",
      company: "Content Creators & Businesses",
      period: "2022 - Present",
      description: "Editing and producing video content for YouTube creators, businesses, and personal projects with professional quality.",
      achievements: ["Edited 50+ videos for various clients", "Specialized in color grading and motion graphics", "Delivered projects on time with high client satisfaction"],
    },
  ]

  return (
    <section id="experience" className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 animate-float-slow" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <SectionHeader label="Experience" title="My Experience" description="Professional journey and accomplishments" />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <AnimateInView key={exp.id} variant="fade-left" delay={index * 150}>
                <Card className="p-6 md:p-8 relative hover:shadow-xl hover:-translate-x-1 transition-all duration-500 border-border/50 hover:border-primary/30 group">
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-8 top-full h-6 w-0.5 bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
                  )}
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-primary/10 rounded-xl inline-flex group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Briefcase className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.title}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/80 px-3 py-1 rounded-full w-fit">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm tag-animate" style={{ animationDelay: `${i * 50}ms` }}>
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
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
