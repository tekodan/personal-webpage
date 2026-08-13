'use client'

import Image from './Image'
import { useEffect, useState } from 'react'

interface Logo {
  name: string
  src: string
  wide?: boolean
  invert?: boolean
}

interface LogoMarqueeProps {
  logos: Logo[]
}

export default function LogoMarquee({ logos }: LogoMarqueeProps) {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  if (logos.length === 0) return null

  // Duplicate the list so the CSS translateX(-50%) loop is seamless.
  const items = [...logos, ...logos]

  if (reduceMotion) {
    return (
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-2">
        {logos.map((logo) => (
          <li key={logo.name} className="flex h-20 items-center">
            <img
              src={logo.src}
              alt={`${logo.name} logo`}
              className={`${logo.wide ? 'h-12 w-auto max-w-[240px]' : 'h-20 w-auto max-w-[220px]'} object-contain ${logo.invert ? 'brightness-0 invert' : ''}`}
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] py-4"
      aria-label="Brands I have worked with"
      role="region"
    >
      <div className="animate-marquee flex w-max items-center gap-16 pr-16 hover:[animation-play-state:paused]">
        {items.map((logo, i) => (
          <div key={`${logo.name}-${i}`} className="flex shrink-0 items-center">
            <img
              src={logo.src}
              alt={`${logo.name} logo`}
              className={`${logo.wide ? 'h-12 w-auto max-w-[240px]' : 'h-20 w-auto max-w-[220px]'} object-contain ${logo.invert ? 'brightness-0 invert' : ''} transition hover:opacity-100`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
