import path from 'path'
import { renderToBuffer } from '@react-pdf/renderer'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import { CVDocument } from '@/components/cv/CVDocument'
import projectsData from '@/data/projectsData'

export const runtime = 'nodejs'

export async function GET() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const content = coreContent(author)
  const filename = `${content.name.toLowerCase().replace(/\s+/g, '-')}-cv.pdf`

  const avatarSrc = content.avatar ? path.join(process.cwd(), 'public', content.avatar) : undefined
  const keyProjects = projectsData.filter((p) => p.key_project).sort((a, b) => b.year - a.year)

  const buffer = await renderToBuffer(
    <CVDocument author={{ ...content, avatarSrc, projects: keyProjects }} />
  )
  const arrayBuffer = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer

  return new Response(arrayBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
