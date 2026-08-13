'use client'

import Link from './Link'
import Image from './Image'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface CoverflowSlide {
  image: string
  eyebrow: string
  title: string
  description?: string
  tag?: string
  href: string
  tech?: string[]
}

interface CoverflowCarouselProps {
  slides: CoverflowSlide[]
  intervalMs?: number
}

const AUTOPLAY_MS = 1500
// Visible neighbors on each side of the active card.
const VISIBLE = 2

export default function CoverflowCarousel({
  slides,
  intervalMs = AUTOPLAY_MS,
}: CoverflowCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const goTo = useCallback(
    (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length),
    [slides.length]
  )
  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (paused || reduceMotion || slides.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion, intervalMs, slides.length])

  useEffect(() => {
    if (reduceMotion) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, reduceMotion])

  if (slides.length === 0) return null

  const offsets = Array.from({ length: slides.length }, (_, i) => {
    let d = i - index
    if (d > slides.length / 2) d -= slides.length
    if (d < -slides.length / 2) d += slides.length
    return d
  })

  const card = (slide: CoverflowSlide, central: boolean, abs: number) => (
    <Link
      href={slide.href}
      target={slide.href.startsWith('http') ? '_blank' : undefined}
      rel={slide.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={slide.title}
      className={`block w-72 overflow-hidden rounded-2xl border bg-white/5 shadow-2xl transition-colors duration-300 select-none sm:w-80 ${
        central ? 'border-accent/30 shadow-accent/10' : 'border-white/10'
      } hover:border-white/25`}
    >
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        <Image
          src={slide.image}
          alt={slide.title}
          width={640}
          height={400}
          sizes="(max-width: 768px) 80vw, 320px"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-accent truncate text-[10px] font-medium tracking-[0.25em] uppercase">
            {slide.eyebrow}
          </p>
          {slide.tag && <span className="shrink-0 text-[11px] text-white/50">{slide.tag}</span>}
        </div>
        <h3 className="mt-2 text-base leading-snug font-semibold tracking-tight text-white">
          {slide.title}
        </h3>
        {slide.description && abs === 0 && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/60">
            {slide.description}
          </p>
        )}
        {slide.tech && slide.tech.length > 0 && abs <= 1 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {slide.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )

  const stage = (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Project carousel"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={reduceMotion ? undefined : { perspective: '1600px' }}
    >
      <div
        className={`${reduceMotion ? 'no-scrollbar flex items-center gap-6 overflow-x-auto py-4' : 'relative flex h-[520px] items-center justify-center sm:h-[560px]'}`}
        style={reduceMotion ? undefined : { transformStyle: 'preserve-3d' }}
      >
        {slides.map((slide, i) => {
          if (reduceMotion)
            return (
              <div key={i} className="shrink-0">
                {card(slide, i === index, i === index ? 0 : 1)}
              </div>
            )
          const offset = offsets[i]
          const abs = Math.abs(offset)
          const hidden = abs > VISIBLE
          const central = offset === 0

          const style: React.CSSProperties = {
            transform: `translateX(${offset * 58}%) translateZ(${80 - abs * 170}px) rotateY(${
              offset * -38
            }deg) scale(${Math.max(0.6, 1 - abs * 0.16)})`,
            opacity: hidden ? 0 : central ? 1 : 1 - abs * 0.28,
            zIndex: 20 - abs,
            pointerEvents: hidden ? 'none' : 'auto',
            transformStyle: 'preserve-3d',
            transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease',
          }

          return (
            <div key={i} className="absolute" style={style} aria-hidden={hidden}>
              {card(slide, central, abs)}
            </div>
          )
        })}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous project"
            className="absolute top-1/2 left-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a0f16]/80 text-white backdrop-blur transition hover:border-white/40"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next project"
            className="absolute top-1/2 right-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a0f16]/80 text-white backdrop-blur transition hover:border-white/40"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  )

  const dots = (
    <div className="mt-8 flex items-center justify-center gap-1">
      {slides.map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          aria-label={`Go to project ${i + 1}`}
          aria-current={i === index}
          className={`focus-visible:outline-accent flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full ${
            i === index ? 'text-accent' : 'text-white/25 hover:text-white/40'
          }`}
        >
          <span
            className={`block h-2 rounded-full transition-all duration-300 ${
              i === index ? 'bg-accent w-6' : 'w-2 bg-white/30'
            }`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <div>
      {stage}
      {dots}
    </div>
  )
}
