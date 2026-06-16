"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { AnimateInView } from "@/components/animate-in-view"
import { Code2, Palette, Video, ArrowRight } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Building responsive, modern websites and web applications using the latest technologies and best practices.",
      features: ["Responsive Design", "Modern Frameworks", "SEO Optimization", "Performance Focused"],
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Creating visually stunning graphics, logos, and brand identities that capture attention and communicate effectively.",
      features: ["Logo Design", "Brand Identity", "Social Media Graphics", "Print Design"],
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: Video,
      title: "Video Editing",
      description: "Professional video editing services for content creators, businesses, and personal projects with creative storytelling.",
      features: ["Video Production", "Color Grading", "Motion Graphics", "Audio Mixing"],
      gradient: "from-orange-500/10 to-red-500/10",
    },
  ]

  return (
    <section id="services" className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Services" title="Services I Offer" description="Comprehensive digital solutions tailored to your needs" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimateInView key={service.title} variant="scale-up" delay={index * 150}>
                <Card className="group relative p-6 md:p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                  <div className="relative">
                    <div className="mb-6">
                      <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <service.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={feature} className="flex items-center gap-2 text-sm tag-animate" style={{ animationDelay: `${i * 60}ms` }}>
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full group/btn bg-transparent hover:scale-105 transition-transform">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
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
