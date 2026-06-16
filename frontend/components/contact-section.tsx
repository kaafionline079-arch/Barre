"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeader } from "@/components/section-header"
import { AnimateInView } from "@/components/animate-in-view"
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiFetch } from "@/lib/api"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSuccess(false)

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    }

    try {
      const response = await apiFetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      })

      const result = await response.json().catch(() => ({}))

      if (response.ok && result.success) {
        setIsSuccess(true)
        form.reset()
        toast({
          title: "Successfully sent!",
          description: "Your message was received. I will get back to you soon.",
        })
      } else {
        throw new Error(result.error || "Failed to send")
      }
    } catch {
      toast({
        title: "Error",
        description: "Could not send message. Make sure the backend server is running on port 3001.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Contact"
            title="Get In Touch"
            description="Have a project in mind? Let's work together to bring your ideas to life"
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <AnimateInView variant="fade-right" delay={0} className="lg:col-span-1 space-y-6">
              <Card className="p-6 hover:shadow-md transition-shadow border-border/50">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:Mhamedabdi3801@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Mhamedabdi3801@gmail.com
                    </a>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover:shadow-md transition-shadow border-border/50">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-sm text-muted-foreground">Somalia</p>
                  </div>
                </div>
              </Card>
            </AnimateInView>

            <AnimateInView variant="fade-left" delay={150} className="lg:col-span-2">
              <Card className="p-6 md:p-8 border-border/50 shadow-lg">
                {isSuccess && (
                  <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-sm opacity-90">Thank you for reaching out. I will reply to you soon.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" name="name" placeholder="Your name" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" name="email" type="email" placeholder="your@email.com" required className="bg-background" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input id="subject" name="subject" placeholder="What's this about?" required className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea id="message" name="message" placeholder="Tell me about your project..." rows={6} required className="bg-background" />
                  </div>
                  <Button type="submit" size="lg" className="w-full shadow-lg shadow-primary/25" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  )
}
