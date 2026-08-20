import SocialIcon from '@/components/social-icons'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'

export default function Footer() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const { email, github, linkedin, telegram } = coreContent(author)

  return (
    <footer className="brand-mosaic-footer border-brand-line relative mt-16 w-full overflow-hidden border-t sm:mt-24">
      <div className="text-brand-cream-100 relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-10">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
          <SocialIcon kind="mail" href={email ? `mailto:${email}` : undefined} size={5} />
          <SocialIcon kind="github" href={github} size={5} />
          <SocialIcon kind="linkedin" href={linkedin} size={5} />
          <SocialIcon kind="telegram" href={telegram} size={5} />
        </div>
        <p className="text-brand-cream-200 text-center text-sm tracking-wide">
          © {new Date().getFullYear()} Dani A. — Full Stack AI Developer. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
