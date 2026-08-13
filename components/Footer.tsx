import SocialIcon from '@/components/social-icons'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'

export default function Footer() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const { email, github, linkedin, telegram } = coreContent(author)

  return (
    <footer
      className="relative mt-20 w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/static/images/footer-background.png)' }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-10 text-[#f5e6d3]">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
          <SocialIcon kind="mail" href={email ? `mailto:${email}` : undefined} size={6} />
          <SocialIcon kind="github" href={github} size={6} />
          <SocialIcon kind="linkedin" href={linkedin} size={6} />
          <SocialIcon kind="telegram" href={telegram} size={6} />
        </div>
        <p className="text-center text-sm font-medium tracking-wide text-[#f5e6d3] drop-shadow-[0_1px_1px_rgba(0,0,0,0.55)]">
          © {new Date().getFullYear()} Dani A. - Full Stack AI Developer. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
