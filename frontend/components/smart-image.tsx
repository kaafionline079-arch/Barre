"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface SmartImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function SmartImage({ src, alt, fill, width, height, className, priority }: SmartImageProps) {
  const url = src?.trim() || "/placeholder.svg"
  const isExternal = url.startsWith("http://") || url.startsWith("https://")

  if (isExternal) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={alt} className={cn("absolute inset-0 w-full h-full object-cover", className)} />
      )
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt={alt} width={width} height={height} className={className} />
    )
  }

  if (fill) {
    return <Image src={url} alt={alt} fill className={className} priority={priority} />
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width || 100}
      height={height || 100}
      className={className}
      priority={priority}
    />
  )
}
