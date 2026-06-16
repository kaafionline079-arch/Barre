import type { LucideIcon } from "lucide-react"
import { Facebook, Instagram, Linkedin, Mail, Youtube } from "lucide-react"

export const WHATSAPP_URL = "https://wa.me/252614554731"

export type SocialLink = {
  label: string
  href: string
  icon?: LucideIcon
  customIcon?: "whatsapp" | "tiktok" | "x"
}

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/share/1BGV7u3msr/", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/engbarre", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-barre", icon: Linkedin },
  { label: "X (Twitter)", href: "https://x.com/engbarre", customIcon: "x" },
  { label: "YouTube", href: "https://youtube.com/@MOHACreative", icon: Youtube },
  { label: "TikTok", href: "https://tiktok.com/@engbarre", customIcon: "tiktok" },
  { label: "WhatsApp", href: WHATSAPP_URL, customIcon: "whatsapp" },
  { label: "Email", href: "mailto:Barre@gmail.com", icon: Mail },
]
