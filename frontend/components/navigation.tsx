"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, Home, User, Briefcase, LayoutGrid, Award, Mail } from "lucide-react"
import { SmartImage } from "@/components/smart-image"
import { getApiUrl } from "@/lib/api"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [logoUrl, setLogoUrl] = useState("/logo.png")

  useEffect(() => {
    fetch(getApiUrl("/api/images?section=logo"))
      .then((r) => r.json())
      .then((data) => { if (data.images?.[0]?.url) setLogoUrl(data.images[0].url) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileMenuOpen])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem("darkMode", String(newDarkMode))
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  const navLinks = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: User },
    { href: "#services", label: "Services", icon: Briefcase },
    { href: "#portfolio", label: "Portfolio", icon: LayoutGrid },
    { href: "#experience", label: "Experience", icon: Award },
    { href: "#contact", label: "Contact", icon: Mail },
  ]

  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "/cv/mohamed-barre-cv.pdf"
    link.download = "Mohamed-Barre-CV.pdf"
    link.click()
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-xl border-b border-primary/15 shadow-sm shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem] lg:h-20 gap-3">
          {/* Logo */}
          <a href="#home" className="flex items-center flex-shrink-0 min-w-0">
            <SmartImage
              src={logoUrl}
              alt="MOHA Creative"
              width={160}
              height={60}
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-sm lg:text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 px-3 lg:px-4 py-2 rounded-lg transition-all whitespace-nowrap"
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl border border-primary/20 hover:bg-primary/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
            </button>
            <Button
              size="sm"
              className="hidden lg:inline-flex px-6 shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleDownloadCV}
            >
              Download CV
            </Button>
            <Button size="sm" variant="outline" className="lg:hidden border-primary/30" onClick={handleDownloadCV}>
              CV
            </Button>
          </div>

          {/* Mobile: theme toggle + menu */}
          <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl border border-primary/25 bg-primary/5 hover:bg-primary/15 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
            </button>
            <button
              className="p-2.5 rounded-xl border border-primary/25 bg-primary/5 hover:bg-primary/15 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/15 animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 text-base font-medium text-muted-foreground hover:text-primary px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5 text-primary" />
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-primary/10 px-2">
                <Button
                  size="lg"
                  className="w-full shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => { handleDownloadCV(); setIsMobileMenuOpen(false) }}
                >
                  Download CV
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
