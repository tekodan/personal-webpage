import Link from '@/components/Link'
import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import appConfig from '@/data/appConfig'
import { genPageMetadata } from 'app/seo'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'

export const metadata = genPageMetadata({
  title: 'Home',
  description: 'Professional profile landing page',
})

export default function HomeLandingPage() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    github,
    linkedin,
    telegram,
    heroTitlePrefix,
    heroSubtitle,
    aboutTitle,
    aboutSummary,
    contactTitle,
    contactSummary,
  } = coreContent(author)

  return (
    <div className="relative right-1/2 left-1/2 -mx-[50vw] w-screen overflow-hidden bg-[#070B12] text-white">
      <div className="absolute top-0 left-1/2 h-[26rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(157,255,0,0.09)_0%,_rgba(157,255,0,0)_72%)] blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 xl:px-10">
        <section className="relative isolate overflow-hidden py-24 md:py-28">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
            style={{
              backgroundImage: "url('/static/images/back5.jpg')",
              WebkitMaskImage:
                'radial-gradient(ellipse at center, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 86%)',
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 86%)',
            }}
          />
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="text-4xl leading-[1.04] font-semibold tracking-[-0.025em] text-white md:text-7xl">
              {heroTitlePrefix} {name}
            </h1>
            <p className="mx-auto mt-6 max-w-[65ch] text-base leading-relaxed text-white/70 md:text-lg">
              {heroSubtitle}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              {appConfig.features.projects && (
                <Link
                  href="/projects"
                  className="w-full bg-[#8fdc10] px-5 py-3 text-sm font-medium text-[#081106] transition duration-200 ease-out hover:brightness-110 focus-visible:outline-[#9DFF00] sm:w-auto"
                >
                  Explore work
                </Link>
              )}
              <Link
                href="/about"
                className="w-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition duration-200 ease-out hover:border-white/40 sm:w-auto"
              >
                About me
              </Link>
            </div>
          </div>
        </section>

        <hr className="border-0 border-t border-white/10" />

        <section className="py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            <div className="flex flex-col items-center justify-center space-y-5 text-center md:col-span-1">
              {avatar && (
                <Image
                  src={avatar}
                  alt={`${name} profile photo`}
                  width={220}
                  height={220}
                  className="h-30 w-30 rounded-full border border-white/15 object-cover md:h-34 md:w-34"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-white">{name}</h3>
                <p className="mt-1 text-sm leading-relaxed font-semibold text-white/80">
                  {occupation}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/65">{company}</p>
              </div>
              <div className="flex items-center gap-3 opacity-85">
                <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />
                <SocialIcon kind="github" href={github} size={5} />
                <SocialIcon kind="linkedin" href={linkedin} size={5} />
                <SocialIcon kind="telegram" href={telegram} size={5} />
              </div>
            </div>
            <div className="max-w-[65ch] md:col-span-2 md:border-l md:border-white/10 md:pl-12">
              <h2 className="text-3xl font-semibold tracking-tight text-white">{aboutTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">{aboutSummary}</p>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-white/70">
                <li className="flex items-start gap-3">
                  <span className="mt-[0.6rem] h-px w-3 bg-white/35" />
                  <span>Scalable backend services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.6rem] h-px w-3 bg-white/35" />
                  <span>High-performance APIs & microservices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[0.6rem] h-px w-3 bg-white/35" />
                  <span>Architecture + product mindset</span>
                </li>
              </ul>
              {appConfig.features.about && (
                <Link
                  href="/about"
                  className="mt-8 inline-flex text-sm font-medium text-[#9DFF00] underline-offset-4 transition duration-200 ease-out hover:underline"
                >
                  Read full About page
                </Link>
              )}
            </div>
          </div>
        </section>

        <hr className="border-0 border-t border-white/10" />

        {appConfig.features.contact && (
          <section className="py-16 md:py-20">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {contactTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-[65ch] text-center text-base leading-relaxed text-white/70">
              {contactSummary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Link
                href={`mailto:${email}`}
                className="w-full bg-[#8fdc10] px-5 py-3 text-sm font-medium text-[#081106] transition duration-200 ease-out hover:brightness-110 focus-visible:outline-[#9DFF00] sm:w-auto"
              >
                Contact by email
              </Link>
              {linkedin && (
                <Link
                  href={linkedin}
                  className="w-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition duration-200 ease-out hover:border-white/40 sm:w-auto"
                >
                  View LinkedIn
                </Link>
              )}
              {telegram && (
                <Link
                  href={telegram}
                  className="w-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition duration-200 ease-out hover:border-white/40 sm:w-auto"
                >
                  Message Telegram
                </Link>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
