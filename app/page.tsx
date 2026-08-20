import Link from '@/components/Link'
import Image from '@/components/Image'
import KonamiEasterEgg from '@/components/KonamiEasterEgg'
import CoverflowCarousel from '@/components/CoverflowCarousel'
import LogoMarquee from '@/components/LogoMarquee'
import Stats from '@/components/Stats'
import appConfig from '@/data/appConfig'
import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import { genPageMetadata } from 'app/seo'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'

const coverflowSlides = [
  {
    image: '/static/images/enola-dashboard.webp',
    eyebrow: 'AI / Agentic',
    title: 'Enola — Investigadora Digital',
    tag: '2026',
    href: 'https://enola.ronin.com.co',
    description:
      'AI investigation assistant on a Python RAG pipeline — LangChain orchestration with ChromaDB and a conversational, streaming interface.',
    tech: ['Python', 'RAG', 'LangChain', 'ChromaDB'],
  },
  {
    image: '/static/images/proj-radioshack.webp',
    eyebrow: 'E-commerce / Retail',
    title: 'RadioShack (Unicomer)',
    tag: '2024',
    href: 'https://www.radioshackla.com',
    description:
      'Total redesign of the e-commerce platform for Central and South America — unified multi-country backend and marketplace integrations.',
    tech: ['Adobe Commerce', 'Elasticsearch'],
  },
  {
    image: '/static/images/proj-todomoda.webp',
    eyebrow: 'E-commerce / Retail',
    title: 'Todomoda (Blue Star Group)',
    tag: '2021',
    href: 'https://todomoda.com',
    description:
      'Phygital e-commerce for the leading accessory brand in LATAM — integrating 800+ physical stores with the digital channel.',
    tech: ['Adobe Commerce', 'Redis'],
  },
  {
    image: '/static/images/proj-isadora.webp',
    eyebrow: 'E-commerce / Retail',
    title: 'Isadora (Blue Star Group)',
    tag: '2021',
    href: 'https://www.shopisadora.com',
    description:
      'Personalized online stores with real-time inventory sync across 11 countries on a scalable Adobe Commerce architecture.',
    tech: ['Adobe Commerce', 'Varnish'],
  },
  {
    image: '/static/images/proj-sole.webp',
    eyebrow: 'E-commerce / Retail',
    title: 'Sole (Infracommerce)',
    tag: '2022',
    href: 'https://www.sole.com.pe',
    description:
      'Conversion-oriented platform for household appliances — installation scheduling from checkout and local payment gateways.',
    tech: ['Magento', 'MySQL', 'ERP'],
  },
  {
    image: '/static/images/proj-fya.webp',
    eyebrow: 'E-commerce / Retail',
    title: 'FYA Ferretería (Infracommerce)',
    tag: '2021',
    href: 'https://www.fya.pe',
    description:
      'Hybrid B2B/B2C e-commerce for construction materials with advanced faceted search and custom pricing rules.',
    tech: ['Magento 2', 'Elasticsearch'],
  },
  {
    image: '/static/images/proj-clinicalapp.webp',
    eyebrow: 'Healthcare SaaS',
    title: 'ClinicalApp',
    tag: '2020',
    href: 'https://clinicalapp.com.co',
    description:
      'SaaS digitizing medical and dental processes — electronic records, odontograms, and administration for clinics.',
    tech: ['PHP', 'Laravel', 'SQL Server'],
  },
  {
    image: '/static/images/proj-compuconta.webp',
    eyebrow: 'Enterprise ERP',
    title: 'Compuconta',
    tag: '2012',
    href: 'https://www.compuconta.com',
    description:
      'Modernization of a leading ERP in Colombia — electronic payroll, invoicing, and accounting modules.',
    tech: ['PHP', 'React', 'PostgreSQL'],
  },
  {
    image: '/static/images/proj-ganapae.webp',
    eyebrow: 'Civic Tech',
    title: 'GanaPAE',
    tag: '2017 · INDIGO Prize',
    href: 'https://ganapae.narino.gov.co/public/',
    description:
      'Open-government transparency platform awarded the national INDIGO 2017 and Ingenio 2018 prizes for social innovation.',
    tech: ['PHP', 'Open Data'],
  },
  {
    image: '/static/images/proj-dalelapata.webp',
    eyebrow: 'Civic Tech / Animal Welfare',
    title: 'Dale la Pata',
    tag: '2018 · UNDP',
    href: 'https://dalelapata.narino.gov.co',
    description:
      'Pioneering animal welfare platform for traceability of the adoption process — recognized as a world best practice by UNDP.',
    tech: ['Python', 'Django'],
  },
]

const brandLogos = [
  { name: 'Todo Moda', src: '/static/logos/todomoda.png', invert: true },
  { name: 'Isadora', src: '/static/logos/isadora.png', invert: true },
  { name: 'FYA', src: '/static/logos/fya.png', invert: true },
  { name: 'Sole', src: '/static/logos/sole.png', wide: true, invert: true },
  { name: 'Cuidado con el Perro', src: '/static/logos/cuidado-con-el-perro.png', invert: true },
  { name: 'Porsche Colombia', src: '/static/logos/porsche.png', invert: true },
  { name: 'Converse Chile', src: '/static/logos/converse.png', invert: true },
  { name: 'North Face', src: '/static/logos/north-face.png', invert: true },
  { name: 'RadioShack', src: '/static/logos/radioshack.png', wide: true, invert: true },
  { name: 'Gobernación de Nariño', src: '/static/logos/gobernacion-de-narino.png', invert: true },
  { name: 'Compuconta', src: '/static/logos/compuconta.svg', invert: true },
  { name: 'ClinicalApp', src: '/static/logos/clinical-app.png', wide: true, invert: true },
]

const services = [
  {
    title: 'RAG Pipelines',
    description:
      'Production-grade retrieval systems on LangChain + ChromaDB — chunking, embeddings, evals, and streaming.',
    icon: 'brain',
  },
  {
    title: 'Agentic Systems',
    description:
      'Function-calling agents that plan, use tools, and act. Local models via Ollama, model routing included.',
    icon: 'circuit',
  },
  {
    title: 'Full-Stack Delivery',
    description:
      'Next.js + TypeScript front-ends, headless APIs, and infra so intelligence ships end to end.',
    icon: 'layers',
  },
  {
    title: 'AI Workflow Automation',
    description:
      'n8n, webhooks, and bespoke glue — turning repetitive work into reliable, auditable flows.',
    icon: 'cog',
  },
]

const ServiceIcon = ({ name }: { name: string }) => {
  const common = 'h-6 w-6'
  switch (name) {
    case 'brain':
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M9 4a3 3 0 00-3 3v.5A3 3 0 004 10v2a3 3 0 001.5 2.6V16a3 3 0 003 3h1V4H9z" />
          <path d="M15 4a3 3 0 013 3v.5A3 3 0 0120 10v2a3 3 0 01-1.5 2.6V16a3 3 0 01-3 3h-1V4h1z" />
        </svg>
      )
    case 'circuit':
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
          <path d="M8 6h8M7.5 7.5L11 10.5M16.5 7.5L13 10.5M11 14l-3.5 3M13 14l3.5 3" />
        </svg>
      )
    case 'layers':
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 13l9 5 9-5" />
          <path d="M3 17l9 5 9-5" />
        </svg>
      )
    default:
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z" />
        </svg>
      )
  }
}

export const metadata = genPageMetadata({
  title: 'AI Full-Stack Developer · RAG & Agentic Systems',
  description:
    'Dani Alvarez — AI Full-Stack Developer with 14+ years building AI-native products end to end: RAG pipelines, agentic systems, and production-grade full-stack platforms. Available for remote freelance work.',
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
    aboutSummary,
    contactTitle,
    contactSummary,
  } = coreContent(author)

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: occupation,
    url: siteMetadata.siteUrl,
    sameAs: [github, linkedin, telegram, siteMetadata.bluesky].filter(Boolean),
    image: avatar ? `${siteMetadata.siteUrl}${avatar}` : undefined,
  }

  return (
    <>
      <KonamiEasterEgg />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="brand-section-bg text-brand-cream-100 relative right-1/2 left-1/2 -mx-[50vw] w-screen overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 xl:px-10">
          <section className="relative isolate overflow-hidden py-12 md:py-16">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
              <div className="flex justify-center md:justify-start">
                <Image
                  src={`${process.env.BASE_PATH || ''}/static/images/imgtype.png`}
                  alt={`${name} brain logo`}
                  width={1200}
                  height={900}
                  className="h-auto w-56 sm:w-72 md:w-80 lg:w-96"
                  priority
                />
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight md:text-5xl lg:text-6xl">
                  <span className="text-brand-bronze-400">Smart architecture,</span>{' '}
                  <span className="text-brand-cream-200">powerful AI solutions.</span>
                </h1>
                <p className="text-brand-cream-200 mt-5 max-w-[55ch] text-sm leading-relaxed md:text-base">
                  RAG, agents and full-stack products — backed by 14+ years shipping production
                  software across retail, SaaS, and civic tech. Available for remote projects.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
                  <Link
                    href="/about"
                    className="bg-brand-slate-500 hover:bg-brand-slate-400 border-brand-slate-400 border px-5 py-2.5 text-sm font-medium text-white transition duration-200 ease-out"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/projects"
                    className="border-brand-cream-200/40 hover:border-brand-cream-200 border px-5 py-2.5 text-sm font-medium text-white transition duration-200 ease-out"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <p className="text-brand-cream-200 mt-10 inline-flex w-full items-center justify-center gap-2 text-center text-sm">
              <span className="bg-brand-bronze-400 h-2 w-2 rounded-full" aria-hidden="true" />
              <span role="status">Available for remote projects</span>
            </p>
          </section>

          <hr className="border-brand-line border-0 border-t" />

          <section className="py-12 md:py-16">
            <h2 className="text-brand-bronze-400 mb-8 text-center text-2xl font-semibold tracking-tight md:text-3xl">
              Our Projects
            </h2>
            <CoverflowCarousel slides={coverflowSlides} />
          </section>

          <hr className="border-brand-line border-0 border-t" />

          <Stats
            items={[
              { value: 14, suffix: '+', label: 'Years of experience' },
              { value: projectsData.length, suffix: '+', label: 'Projects delivered' },
              { value: 7, label: 'Countries deployed' },
              { value: 3, label: 'Awards & recognition' },
            ]}
          />

          <hr className="border-brand-line border-0 border-t" />

          <section className="py-10 md:py-12">
            <p className="text-brand-bronze-400 mb-8 text-center text-[11px] font-medium tracking-[0.3em] uppercase">
              Brands I have worked with
            </p>
            <LogoMarquee logos={brandLogos} />
          </section>

          <hr className="border-brand-line border-0 border-t" />

          <section className="py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              {avatar && (
                <Image
                  src={avatar}
                  alt={`${name} profile photo`}
                  width={144}
                  height={144}
                  className="border-brand-line mx-auto h-36 w-36 rounded-full border object-cover"
                />
              )}
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {name} — {occupation}
              </h2>
              <p className="text-brand-cream-200 mx-auto mt-4 max-w-[60ch] text-base leading-relaxed">
                {aboutSummary}
              </p>
              <div className="mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-3">
                {[
                  ['AI-Native Development', 'RAG, agents, generative UI'],
                  ['Production-Grade Full-Stack', 'APIs, microservices, headless'],
                  ['AI Workflow Automation', 'LangChain, n8n, local models via Ollama'],
                ].map(([title, body]) => (
                  <div key={title} className="bg-brand-elev border-brand-line border p-4">
                    <h3 className="flex items-start gap-2 text-sm leading-relaxed font-semibold text-white">
                      <span className="bg-brand-bronze-400 mt-[0.55rem] h-px w-3 shrink-0" />
                      {title}
                    </h3>
                    <p className="text-brand-cream-200 mt-2 text-sm leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
              {appConfig.features.about && (
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="text-brand-bronze-400 inline-flex text-sm font-medium underline-offset-4 transition duration-200 ease-out hover:underline"
                  >
                    Read full About page
                  </Link>
                </div>
              )}
            </div>
          </section>

          <hr className="border-brand-line border-0 border-t" />

          {appConfig.features.contact && (
            <section className="py-16 md:py-20">
              <h2 className="text-center text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {contactTitle}
              </h2>
              <p className="text-brand-cream-200 mx-auto mt-4 max-w-[65ch] text-center text-base leading-relaxed">
                {contactSummary}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <Link
                  href={`mailto:${email}`}
                  className="bg-brand-slate-500 hover:bg-brand-slate-400 border-brand-slate-400 border px-5 py-2.5 text-sm font-medium text-white transition duration-200 ease-out sm:w-auto"
                >
                  Contact by email
                </Link>
                {linkedin && (
                  <Link
                    href={linkedin}
                    className="border-brand-cream-200/40 hover:border-brand-cream-200 border px-5 py-3 text-sm font-medium text-white transition duration-200 ease-out sm:w-auto"
                  >
                    View LinkedIn
                  </Link>
                )}
                {telegram && (
                  <Link
                    href={telegram}
                    className="border-brand-cream-200/40 hover:border-brand-cream-200 border px-5 py-3 text-sm font-medium text-white transition duration-200 ease-out sm:w-auto"
                  >
                    Message Telegram
                  </Link>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
