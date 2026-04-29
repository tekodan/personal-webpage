import path from 'path'
import { renderToBuffer } from '@react-pdf/renderer'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import { CVDocument } from '@/components/cv/CVDocument'

export const runtime = 'nodejs'

export async function GET() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const content = coreContent(author)
  const filename = `${content.name.toLowerCase().replace(/\s+/g, '-')}-cv.pdf`

  const avatarSrc = content.avatar ? path.join(process.cwd(), 'public', content.avatar) : undefined

  const buffer = await renderToBuffer(<CVDocument author={{ ...content, avatarSrc }} />)

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
