import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import appConfig from '@/data/appConfig'
import { notFound } from 'next/navigation'

export const metadata = genPageMetadata({
  title: 'About',
  description:
    'Dani Alva — Senior Backend Engineer with 14+ years in scalable APIs, distributed microservices, and headless e-commerce. Independent contractor, remote-first.',
})

export default function Page() {
  if (!appConfig.features.about) {
    notFound()
  }

  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
