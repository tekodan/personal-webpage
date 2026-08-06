'use client'

import { useEffect, useRef, useState } from 'react'

interface StatItem {
  value: number
  suffix?: string
  label: string
}

interface StatsProps {
  items: StatItem[]
}

function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(target)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setValue(target)
      return
    }
    setValue(0)
    const begin = performance.now()
    const tick = (now: number) => {
      const elapsed = now - begin
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [start, target, duration])

  return value
}

function StatNumber({ value, suffix, start }: { value: number; suffix?: string; start: boolean }) {
  const displayed = useCountUp(value, 1400, start)
  return (
    <span>
      {displayed}
      {suffix ?? ''}
    </span>
  )
}

export default function Stats({ items }: StatsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [visible])

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 xl:px-10">
        <h2 className="text-center text-xs font-medium tracking-[0.3em] text-white/50 uppercase md:text-sm">
          Key Highlights
        </h2>
        <div ref={ref} className="mt-10 grid grid-cols-2 gap-6 md:mt-12 md:grid-cols-4 md:gap-10">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center">
              <div className="text-accent text-4xl font-light tracking-tight md:text-5xl">
                <StatNumber value={item.value} suffix={item.suffix} start={visible} />
              </div>
              <p className="mt-2 text-[10px] tracking-[0.25em] text-white/55 uppercase md:text-xs">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
