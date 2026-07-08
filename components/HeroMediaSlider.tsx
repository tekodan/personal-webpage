'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Slide {
  kind: 'image' | 'video'
  src: string
  poster?: string
}

interface HeroMediaSliderProps {
  slides: Slide[]
  intervalMs?: number
}

export default function HeroMediaSlider({ slides, intervalMs = 7000 }: HeroMediaSliderProps) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [paused, slides.length, intervalMs])

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
          style={{
            opacity: active === i ? 1 : 0,
            WebkitMaskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 86%)',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 86%)',
          }}
          aria-hidden={active !== i}
          suppressHydrationWarning
        >
          {slide.kind === 'image' ? (
            <Image
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="bg-cover bg-center bg-no-repeat object-cover opacity-35"
            />
          ) : (
            <video
              src={slide.src}
              poster={slide.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover opacity-35"
            />
          )}
        </div>
      ))}
    </div>
  )
}
