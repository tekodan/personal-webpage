'use client'

import { useEffect, useState } from 'react'

type Phase = 'loading' | 'fading' | 'gone'

const MIN_DISPLAY_MS = 1600
const FADE_MS = 700
const FALLBACK_MS = 6500
const STORAGE_KEY = 'dani-loader-shown'

const RAY_COUNT = 16
const PARTICLE_COUNT = 24

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>('loading')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.sessionStorage.getItem(STORAGE_KEY)) {
      setPhase('gone')
      return
    }

    const start = Date.now()

    const dismiss = () => {
      const wait = Math.max(0, MIN_DISPLAY_MS - (Date.now() - start))
      window.setTimeout(() => {
        window.sessionStorage.setItem(STORAGE_KEY, '1')
        setPhase('fading')
        window.setTimeout(() => setPhase('gone'), FADE_MS)
      }, wait)
    }

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
    }

    const fallback = window.setTimeout(dismiss, FALLBACK_MS)

    return () => {
      window.removeEventListener('load', dismiss)
      window.clearTimeout(fallback)
    }
  }, [])

  if (phase === 'gone') return null

  const rays = Array.from({ length: RAY_COUNT }, (_, i) => i * (360 / RAY_COUNT))
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i * 360) / PARTICLE_COUNT
    const distance = 70 + (i % 3) * 35
    return {
      cx: Math.cos((angle * Math.PI) / 180) * distance,
      cy: Math.sin((angle * Math.PI) / 180) * distance,
      delay: (i % 4) * 0.06,
    }
  })

  return (
    <div
      aria-hidden={phase === 'fading'}
      className={`supernova-loader fixed inset-0 z-[200] bg-[#070B12] transition-opacity duration-700 ease-out ${
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="supernova-stage">
        <svg
          className="supernova-svg"
          viewBox="-200 -200 400 400"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="0" cy="0" r="20" className="supernova-ring supernova-ring-1" />
          <circle cx="0" cy="0" r="20" className="supernova-ring supernova-ring-2" />
          <circle cx="0" cy="0" r="20" className="supernova-ring supernova-ring-3" />

          {rays.map((angle, i) => (
            <line
              key={angle}
              x1="0"
              y1="0"
              x2="170"
              y2="0"
              transform={`rotate(${angle})`}
              className="supernova-ray"
              style={{
                transformOrigin: '0 0',
                animationDelay: `${(i / RAY_COUNT) * 0.4}s`,
              }}
            />
          ))}

          {particles.map((p, i) => (
            <circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r="1.6"
              className="supernova-particle"
              style={{ animationDelay: `${p.delay}s` }}
            />
          ))}
        </svg>

        <div className="supernova-core" aria-hidden="true" />

        <p className="supernova-brand">DANI ALVA</p>

        <p className="supernova-status">
          <span className="supernova-status-dot" aria-hidden="true" />
          <span>Initializing core</span>
        </p>
      </div>
    </div>
  )
}
