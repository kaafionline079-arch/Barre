"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { SmartImage } from "@/components/smart-image"
import { getApiUrl } from "@/lib/api"
import { AnimateInView } from "@/components/animate-in-view"
import { socialLinks } from "@/lib/social-links"
import { SocialIcon } from "@/components/social-icon"

export function HeroSection() {
  const [heroImage, setHeroImage] = useState("/hero-image.png")

  useEffect(() => {
    fetch(getApiUrl("/api/images?section=hero"))
      .then((r) => r.json())
      .then((data) => { if (data.images?.[0]?.url) setHeroImage(data.images[0].url) })
      .catch(() => {})
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <AnimateInView variant="fade-right" delay={0} className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/12 border border-primary/25 text-primary text-sm font-semibold animate-pulse-glow">
                <Sparkles className="h-4 w-4" />Welcome to my portfolio
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
                Hi, I&apos;m <span className="bg-gradient-to-r from-primary via-primary to-primary/75 bg-clip-text text-transparent animate-gradient-text">Mohamed Barre</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-balance leading-relaxed">
                A passionate Somali student specializing in <span className="text-foreground font-medium">Web Development</span>, <span className="text-foreground font-medium">Graphic Design</span>, and <span className="text-foreground font-medium">Video Editing</span>
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
                <Button size="lg" className="w-full sm:w-auto group shadow-lg shadow-primary/35 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <a href="#portfolio">View My Work<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></a>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/30 hover:bg-primary/10 hover:border-primary/50 bg-background/70 backdrop-blur-sm" asChild>
                  <a href="#contact">Get In Touch</a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.slice(0, 6).map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    aria-label={s.label}
                  >
                    <SocialIcon link={s} />
                  </a>
                ))}
              </div>
            </AnimateInView>
            <AnimateInView variant="fade-left" delay={200} className="order-1 md:order-2">
              <div className="relative w-full aspect-square max-w-md mx-auto hero-image-float">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-primary/5 rounded-3xl rotate-6 scale-105 animate-float-slow shadow-xl shadow-primary/20" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-primary/25 shadow-2xl shadow-primary/25">
                  <SmartImage src={heroImage} alt="Mohamed Barre" fill className="object-cover" priority />
                </div>
                <div className="absolute -z-10 -inset-4 rounded-full bg-primary/10 blur-2xl animate-pulse-glow" />
              </div>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  )
}
