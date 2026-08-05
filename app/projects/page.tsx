import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import appConfig from '@/data/appConfig'
import { notFound } from 'next/navigation'

export const metadata = genPageMetadata({
  title: 'Projects',
  description:
    'Selected projects and platforms built by Dani Alva across AI-native products, e-commerce, and SaaS — Python RAG, LangChain, Next.js, and more.',
})

export default function Projects() {
  if (!appConfig.features.projects) {
    notFound()
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            A selection of products and platforms I've built or contributed to across AI-native
            development, e-commerce, SaaS, and civic tech.
          </p>
        </div>
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
    </>
  )
}
