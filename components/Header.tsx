import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'
import Link from './Link'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <header className="brand-header-bg border-brand-line relative w-full overflow-hidden border-b text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="block shrink-0 transition duration-300 ease-out hover:brightness-110"
        >
          <Image
            src={siteMetadata.siteLogo}
            alt={`${siteMetadata.headerTitle} logo`}
            width={760}
            height={320}
            className="h-auto w-24 sm:w-28 md:w-32"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 justify-center sm:flex">
          <ul className="no-scrollbar flex items-center gap-x-6 lg:gap-x-8">
            {headerNavLinks.map((link, idx) => (
              <li key={link.title} className="flex items-center whitespace-nowrap">
                <Link href={link.href} className="brand-menu-link px-1">
                  {link.title}
                </Link>
                {idx < headerNavLinks.length - 1 && (
                  <span aria-hidden="true" className="text-brand-cream-200/40 pl-6 lg:pl-8">
                    |
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <Link
            href="/about"
            className="text-brand-cream-100 hover:text-brand-bronze-400 text-sm font-medium transition duration-200 ease-out"
          >
            Log in
          </Link>
          <Link
            href="/about"
            className="bg-brand-slate-500 hover:bg-brand-slate-400 border-brand-slate-400 border px-4 py-2 text-sm font-medium text-white transition duration-200 ease-out"
          >
            Get Started
          </Link>
        </div>
      </div>

      <MobileNav />
    </header>
  )
}

export default Header
