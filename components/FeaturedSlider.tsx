'use client'

import Link from './Link'
import Image from './Image'
import { useCallback, useEffect, useRef, useState } from 'react'

interface ProfileSlide {
  kind: 'profile'
  name: string
  avatar?: string
  occupation?: string
  aboutSummary?: string
  socials: { href?: string; label: string }[]
}

interface ProjectSlide {
  kind: 'project'
  eyebrow: string
  title: string
  tag: string
  href: string
  body: string
  tech: string[]
}

type Slide = ProfileSlide | ProjectSlide

interface FeaturedSliderProps {
  slides: Slide[]
  intervalMs?: number
}

const AUTOPLAY_MS = 8000

function SlideContent({ slide }: { slide: Slide }) {
  if (slide.kind === 'profile') {
    return (
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
        {slide.avatar && (
          <Image
            src={slide.avatar}
            alt={`${slide.name} profile photo`}
            width={112}
            height={112}
            className="h-28 w-28 shrink-0 rounded-full border border-white/15 object-cover"
          />
        )}
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-white">{slide.name}</h3>
          <p className="text-accent mt-1 text-sm font-medium">{slide.occupation}</p>
          <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-white/70">
            {slide.aboutSummary}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-1">
            {slide.socials
              .filter((s) => s.href)
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-xs font-medium tracking-[0.15em] uppercase underline-offset-4 hover:underline"
                >
                  {s.label}
                </a>
              ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase">
          {slide.eyebrow}
        </p>
        <span className="shrink-0 text-xs text-white/50">{slide.tag}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{slide.title}</h3>
      <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-white/70">{slide.body}</p>
      <div
        className="mt-4 flex flex-wrap gap-2"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
      >
        {slide.tech.map((tech) => (
          <span
            key={tech}
            className="rounded border border-white/10 px-2 py-1 text-[11px] font-medium text-white/60"
          >
            {tech}
          </span>
        ))}
      </div>
      <Link
        href={slide.href}
        target={slide.href.startsWith('http') ? '_blank' : undefined}
        rel={slide.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-accent mt-5 inline-flex text-sm font-medium underline-offset-4 transition duration-200 ease-out hover:underline"
      >
        View case &rarr;
      </Link>
    </div>
  )
}

export default function FeaturedSlider({ slides, intervalMs = AUTOPLAY_MS }: FeaturedSliderProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  }, [])

  const goTo = useCallback(
    (i: number) => {
      setIndex((i + slides.length) % slides.length)
    },
    [slides.length]
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (paused || reduceMotion.current || slides.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [paused, intervalMs, slides.length, index])

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <div
          key={index}
          className="transition-opacity duration-300 ease-out"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}`}
        >
          <SlideContent slide={slides[index]} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'bg-accent w-6' : 'w-2 bg-white/25 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40"
          >
            <svg
              width="16"
              height="16"
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
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
