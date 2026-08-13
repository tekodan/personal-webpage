import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, github, skills, email, linkedin, telegram } = content

  return (
    <div className="brand-section-bg relative right-1/2 left-1/2 -mx-[50vw] w-screen text-white">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 xl:px-10">
        <header className="py-10">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">About</h1>
        </header>

        <hr className="border-0 border-t border-white/10" />

        <main className="py-14">
          <div className="grid gap-12 md:grid-cols-[320px_1fr]">
            <aside className="flex flex-col items-center space-y-6 text-center">
              {avatar && (
                <Image
                  src={avatar}
                  alt={`${name} profile photo`}
                  width={192}
                  height={192}
                  className="h-32 w-32 rounded-full object-cover ring-1 ring-white/10 md:h-36 md:w-36"
                />
              )}
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">{name}</h2>
                <p className="mt-2 text-sm leading-relaxed font-semibold text-white/80">
                  {occupation}
                </p>
                {company && <p className="mt-1 text-sm leading-relaxed text-white/70">{company}</p>}
              </div>
              <div className="flex items-center gap-3 opacity-70 transition-opacity hover:opacity-100">
                <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />
                <SocialIcon kind="github" href={github} size={5} />
                <SocialIcon kind="linkedin" href={linkedin} size={5} />
                <SocialIcon kind="telegram" href={telegram} size={5} />
              </div>

              {skills && skills.length > 0 && (
                <div className="mt-4 w-full max-w-xs">
                  <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase">Skills</h3>
                  <div className="mt-4 space-y-4">
                    {skills.map((cat) => (
                      <div key={cat.category}>
                        <p className="text-brand-gold-400/70 mb-1.5 text-[10px] tracking-[0.15em] uppercase">
                          {cat.category}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {cat.items.map((skill) => (
                            <span
                              key={skill}
                              className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-white/60"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            <section className="text-justify md:border-l md:border-white/10 md:pl-10">
              <div className="prose prose-invert max-w-[65ch] leading-[1.85] [&_h2]:mt-0 [&_h2]:mb-0 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-white [&_li]:text-justify [&_p]:mt-6 [&_p]:max-w-[65ch] [&_p]:text-justify [&_p]:leading-[1.85] [&_p]:text-white/70">
                {children}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/api/cv/pdf"
                  className="hover:border-accent hover:text-accent inline-flex items-center rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition"
                >
                  Download CV (PDF)
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
