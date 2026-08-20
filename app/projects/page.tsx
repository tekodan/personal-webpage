import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import appConfig from '@/data/appConfig'
import { notFound } from 'next/navigation'

export const metadata = genPageMetadata({
  title: 'Projects',
  description:
    'Selected projects and platforms built by Dani Alvarez across AI-native products, e-commerce, and SaaS — Python RAG, LangChain, Next.js, and more.',
})

export default function Projects() {
  if (!appConfig.features.projects) {
    notFound()
  }

  return (
    <div className="brand-section-bg text-brand-cream-100 relative right-1/2 left-1/2 -mx-[50vw] w-screen">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 xl:px-10">
        <header className="py-10">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Projects</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/65">
            A selection of products and platforms I've built or contributed to across AI-native
            development, e-commerce, SaaS, and civic tech.
          </p>
        </header>

        <hr className="border-brand-line border-0 border-t" />

        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                tech={d.tech}
                company={d.company}
                year={d.year}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
