"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { AnimateInView } from "@/components/animate-in-view"
import { ExternalLink } from "lucide-react"
import { SmartImage } from "@/components/smart-image"
import { getApiUrl } from "@/lib/api"

interface Project {
  id: number
  title: string
  description: string
  category: string
  image_url: string
  live_url: string | null
  github_url: string | null
  tags: string[]
  sort_order?: number
}

const categoryOrder: Record<string, number> = { web: 0, design: 1, video: 2 }

function sortProjects(list: Project[]) {
  return [...list].sort((a, b) => {
    const catA = categoryOrder[a.category] ?? 9
    const catB = categoryOrder[b.category] ?? 9
    if (catA !== catB) return catA - catB
    return (a.sort_order ?? 0) - (b.sort_order ?? 0)
  })
}

const fallbackProjects: Project[] = [
  { id: 1, title: "Bidhaan Electronics", category: "web", description: "Modern e-commerce platform", image_url: "/bidhaan-electronics.png", live_url: "https://bidhaan.dhulgaar.com/", github_url: null, tags: ["E-Commerce", "Next.js"] },
  { id: 2, title: "Synapse Agency", category: "web", description: "Digital agency website", image_url: "/synapse-agency.png", live_url: "https://synapsecraft-digital-edge.vercel.app", github_url: null, tags: ["Agency", "React"] },
  { id: 3, title: "Bidhaan Task Manager", category: "web", description: "Task management app", image_url: "/bidhaan-task-manager.png", live_url: "https://bidhaan55.vercel.app", github_url: null, tags: ["Next.js", "TypeScript"] },
  { id: 4, title: "Brand Identity Design", category: "design", description: "Complete brand identity package including logo, colors, and guidelines", image_url: "/brand-identity-design-mockup.jpg", live_url: "#", github_url: null, tags: ["Branding", "Logo", "Identity"] },
  { id: 5, title: "Social Media Graphics", category: "design", description: "Eye-catching social media graphics for various platforms", image_url: "/social-media-graphics-design.jpg", live_url: "#", github_url: null, tags: ["Photoshop", "Illustrator"] },
  { id: 6, title: "Product Showcase Video", category: "video", description: "Professional product video with motion graphics and sound design", image_url: "/video-editing-timeline.jpg", live_url: "#", github_url: null, tags: ["Premiere Pro", "After Effects"] },
]

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)

  useEffect(() => {
    fetch(getApiUrl("/api/projects"))
      .then((r) => r.json())
      .then((data) => { if (data.projects?.length) setProjects(sortProjects(data.projects)) })
      .catch(() => {})
  }, [])

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "design", label: "Graphic Design" },
    { id: "video", label: "Video Editing" },
  ]

  const filteredProjects = sortProjects(
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter),
  )

  return (
    <section id="portfolio" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-float pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Portfolio" title="My Works" description="A showcase of my recent projects and creative work" />

          <AnimateInView variant="fade-up" delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`filter-btn rounded-full px-6 ${activeFilter === filter.id ? "active shadow-lg shadow-primary/25" : ""}`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </AnimateInView>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <AnimateInView key={project.id} variant="flip-up" delay={index * 120}>
                <Card className="portfolio-card overflow-hidden group border-border/50 h-full">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <SmartImage
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="card-image object-cover"
                    />
                    <div className="card-overlay absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent flex items-end justify-center pb-4">
                      <span className="text-white text-sm font-medium px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                        View Project
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium capitalize animate-bounce-in">
                      {project.category}
                    </div>
                  </div>
                  <div className="card-content p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span
                          key={tag}
                          className="tag-animate text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                          style={{ animationDelay: `${i * 80}ms` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.live_url && project.live_url !== "#" && project.category === "web" && (
                        <Button size="sm" variant="outline" className="w-full bg-transparent hover:scale-105 transition-transform" asChild>
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />View Website
                          </a>
                        </Button>
                      )}
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
