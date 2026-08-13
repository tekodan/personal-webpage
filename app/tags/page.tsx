import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import appConfig from '@/data/appConfig'
import { notFound } from 'next/navigation'

export const metadata = genPageMetadata({
  title: 'Tags',
  description:
    'Browse articles by topic — deep work, productivity, backend engineering, AI, software architecture, and more.',
})

export default async function Page() {
  if (!appConfig.features.blog || !appConfig.features.tags) {
    notFound()
  }

  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="brand-section-bg text-brand-cream-100 relative right-1/2 left-1/2 -mx-[50vw] w-screen">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Tags</h1>
          <p className="mt-3 text-sm text-white/55">
            Browse every post by topic. Larger counts surface trending areas.
          </p>
        </header>
        <hr className="border-0 border-t border-white/10" />
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-4">
          {tagKeys.length === 0 && <li className="text-white/55">No tags found.</li>}
          {sortedTags.map((t) => (
            <li key={t} className="flex items-baseline gap-1.5">
              <Tag text={t} />
              <Link
                href={`/tags/${slug(t)}`}
                className="hover:text-accent text-sm font-medium text-white/55 uppercase transition"
                aria-label={`View posts tagged ${t}`}
              >
                {`(${tagCounts[t]})`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
