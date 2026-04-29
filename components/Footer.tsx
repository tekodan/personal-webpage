import SocialIcon from '@/components/social-icons'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'

export default function Footer() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const { email, github, linkedin } = coreContent(author)

  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />
          <SocialIcon kind="github" href={github} size={6} />
          <SocialIcon kind="linkedin" href={linkedin} size={6} />
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">next.js powered</div>
      </div>
    </footer>
  )
}
