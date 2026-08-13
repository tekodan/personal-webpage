'use client'

import { useEffect, useState } from 'react'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
] as const

const DURATION_MS = 8000

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const buffer: string[] = []
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      buffer.push(key)
      if (buffer.length > KONAMI.length) buffer.shift()
      if (buffer.length === KONAMI.length && buffer.every((k, i) => k === KONAMI[i])) {
        setActive(true)
        buffer.length = 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!active) return
    document.body.classList.add('dev-unlocked')
    const timer = window.setTimeout(() => {
      document.body.classList.remove('dev-unlocked')
      setActive(false)
    }, DURATION_MS)
    return () => {
      window.clearTimeout(timer)
      document.body.classList.remove('dev-unlocked')
    }
  }, [active])

  return (
    <div
      aria-hidden={!active}
      suppressHydrationWarning
      className={`pointer-events-none fixed top-5 right-5 z-[100] transition-all duration-500 ease-out ${
        active ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
      }`}
    >
      <div className="border-accent/40 text-accent flex items-center gap-2 rounded-sm border bg-black/80 px-3 py-2 font-mono text-xs shadow-[0_0_24px_rgba(212,165,116,0.25)] backdrop-blur-sm">
        <span className="bg-accent inline-block h-2 w-2 animate-pulse rounded-full" />
        <span className="tracking-[0.2em] uppercase">dev_mode unlocked</span>
        <span className="text-white/40">·</span>
        <span className="text-white/60">built by dani</span>
      </div>
    </div>
  )
}
