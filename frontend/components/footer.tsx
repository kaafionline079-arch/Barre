"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { SmartImage } from "@/components/smart-image"
import { getApiUrl } from "@/lib/api"
import { AnimateInView } from "@/components/animate-in-view"
import { socialLinks } from "@/lib/social-links"
import { SocialIcon } from "@/components/social-icon"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [logoUrl, setLogoUrl] = useState("/logo.png")

  useEffect(() => {
    fetch(getApiUrl("/api/images?section=logo"))
      .then((r) => r.json())
      .then((data) => { if (data.images?.[0]?.url) setLogoUrl(data.images[0].url) })
      .catch(() => {})
  }, [])

  return (
    <footer className="footer-teal border-t border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-40" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <AnimateInView variant="fade-up" delay={0}>
              <div>
                <SmartImage src={logoUrl} alt="MOHA Creative" width={150} height={50} className="h-12 w-auto mb-4 hover:scale-105 transition-transform duration-300" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A passionate Somali student specializing in Web Development, Graphic Design, and Video Editing.
                </p>
              </div>
            </AnimateInView>

            <AnimateInView variant="fade-up" delay={100}>
              <div>
                <h4 className="font-semibold mb-4 text-primary">Quick Links</h4>
                <ul className="space-y-2">
                  {["Home", "About", "Services", "Portfolio", "Experience", "Contact"].map((link) => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>

            <AnimateInView variant="fade-up" delay={200}>
              <div>
                <h4 className="font-semibold mb-4 text-primary">Connect</h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="p-2.5 bg-background/80 border border-primary/15 rounded-xl text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-primary/25"
                      aria-label={s.label}
                      title={s.label}
                    >
                      <SocialIcon link={s} />
                    </a>
                  ))}
                </div>
              </div>
            </AnimateInView>
          </div>

          <AnimateInView variant="fade-up" delay={300}>
            <div className="pt-8 border-t border-primary/20 text-center">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                Made with <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" /> by Mohamed Barre © {currentYear}
              </p>
            </div>
          </AnimateInView>
        </div>
      </div>
    </footer>
  )
}
