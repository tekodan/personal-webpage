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
  { name: 'Gollo', src: '/static/logos/gollo.png', invert: true },
  { name: 'RadioShack', src: '/static/logos/radioshack.png', wide: true, invert: true },
  { name: 'Gobernación de Nariño', src: '/static/logos/gobernacion-de-narino.png', invert: true },
  { name: 'Compuconta', src: '/static/logos/compuconta.svg', invert: true },
  { name: 'ClinicalApp', src: '/static/logos/clinical-app.png', wide: true, invert: true },
]

export const metadata = genPageMetadata({
  title: 'AI Full-Stack Developer · RAG & Agentic Systems',
  description:
    'Dani Alva — AI Full-Stack Developer with 14+ years building AI-native products end to end: RAG pipelines, agentic systems, and production-grade full-stack platforms. Available for remote freelance work.',
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
        <div className="absolute top-0 left-1/2 h-[26rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(212,165,116,0.10)_0%,_rgba(212,165,116,0)_72%)] blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 xl:px-10">
          <section className="relative isolate overflow-hidden py-16 md:py-20">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_500px_at_50%_-10%,_rgba(212,165,116,0.10),_transparent)]" />
            <p className="text-accent text-center text-[11px] font-medium tracking-[0.3em] uppercase">
              {name} · AI Full-Stack Developer
            </p>
            <h1 className="mx-auto mt-4 max-w-4xl text-center text-4xl leading-[1.05] font-semibold tracking-[-0.025em] text-white md:text-5xl xl:text-6xl">
              I build production AI systems — not just demos.
            </h1>
            <p className="mx-auto mt-6 max-w-[50ch] text-center text-base leading-relaxed text-white/70 md:text-lg">
              RAG, agents and full-stack products, backed by 14+ years shipping production software
              across retail, SaaS, and civic tech.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {appConfig.features.projects && (
                <Link
                  href="/projects"
                  className="bg-accent-dim text-on-accent focus-visible:outline-accent px-5 py-3 text-sm font-medium transition duration-200 ease-out hover:brightness-110"
                >
                  View selected work
                </Link>
              )}
              <a
                href="https://enola.ronin.com.co"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 px-5 py-3 text-sm font-medium text-white transition duration-200 ease-out hover:border-white/40"
              >
                See Enola in action
              </a>
            </div>
            <div className="mt-12">
              <CoverflowCarousel slides={coverflowSlides} />
            </div>
            <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-sm text-white/60">
              <span className="bg-accent h-2 w-2 rounded-full" aria-hidden="true" />
              <span role="status">Available for remote projects</span>
            </p>
          </section>

          <hr className="border-0 border-t border-white/10" />

          <Stats
            items={[
              { value: 14, suffix: '+', label: 'Years of experience' },
              { value: projectsData.length, suffix: '+', label: 'Projects delivered' },
              { value: 7, label: 'Countries deployed' },
              { value: 3, label: 'Awards & recognition' },
            ]}
          />

          <hr className="border-0 border-t border-white/10" />

          <section className="py-10 md:py-12">
            <p className="text-accent mb-8 text-center text-[11px] font-medium tracking-[0.3em] uppercase">
              Brands I have worked with
            </p>
            <LogoMarquee logos={brandLogos} />
          </section>

          <hr className="border-0 border-t border-white/10" />

          <section className="py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              {avatar && (
                <Image
                  src={avatar}
                  alt={`${name} profile photo`}
                  width={144}
                  height={144}
                  className="mx-auto h-36 w-36 rounded-full border border-white/15 object-cover"
                />
              )}
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {name} — {occupation}
              </h2>
              <p className="mx-auto mt-4 max-w-[60ch] text-base leading-relaxed text-white/70">
                {aboutSummary}
              </p>
              <div className="mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-3">
                {[
                  ['AI-Native Development', 'RAG, agents, generative UI'],
                  ['Production-Grade Full-Stack', 'APIs, microservices, headless'],
                  ['AI Workflow Automation', 'LangChain, n8n, local models via Ollama'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <h3 className="flex items-start gap-2 text-sm leading-relaxed font-semibold text-white">
                      <span className="bg-accent mt-[0.55rem] h-px w-3 shrink-0" />
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
                  </div>
                ))}
              </div>
              {appConfig.features.about && (
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="text-accent inline-flex text-sm font-medium underline-offset-4 transition duration-200 ease-out hover:underline"
                  >
                    Read full About page
                  </Link>
                </div>
              )}
            </div>
          </section>

          <hr className="border-0 border-t border-white/10" />

          <section className="py-16 md:py-20">
            <h2 className="text-accent text-center text-xs font-medium tracking-[0.3em] uppercase md:text-sm">
              Full-Stack + AI
            </h2>
            <p className="mx-auto mt-4 max-w-[60ch] text-center text-base leading-relaxed text-white/70">
              A complete stack — from agentic AI to production interfaces — so intelligence ships
              end to end.
            </p>
            <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-3">
              {[
                {
                  layer: 'Agentic AI',
                  items: ['RAG', 'LangChain', 'AI Agents', 'Function Calling', 'Gemma 4', 'Ollama'],
                },
                {
                  layer: 'Data & Retrieval',
                  items: ['ChromaDB', 'Vector DBs', 'Prompt Engineering', 'Model Routing', 'Evals'],
                },
                {
                  layer: 'Delivery & Full-Stack',
                  items: [
                    'Python',
                    'Next.js',
                    'TypeScript',
                    'React',
                    'Node.js',
                    'n8n',
                    'AI Security (OWASP)',
                  ],
                },
              ].map((group) => (
                <div key={group.layer} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-accent text-[11px] font-medium tracking-[0.25em] uppercase">
                    {group.layer}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((tech) => (
                      <li
                        key={tech}
                        className="flex items-start gap-2 text-sm leading-relaxed text-white/75"
                      >
                        <span className="mt-[0.55rem] h-px w-3 shrink-0 bg-white/30" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {appConfig.features.projects && (
              <div className="mt-10 text-center">
                <Link
                  href="/projects"
                  className="text-accent inline-flex text-sm font-medium underline-offset-4 transition duration-200 ease-out hover:underline"
                >
                  See AI work in production
                </Link>
              </div>
            )}
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
                  className="bg-accent-dim text-on-accent focus-visible:outline-accent w-full px-5 py-3 text-sm font-medium transition duration-200 ease-out hover:brightness-110 sm:w-auto"
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
    </>
  )
}
