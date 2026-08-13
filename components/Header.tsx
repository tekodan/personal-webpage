import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'
import Link from './Link'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <header className="brand-header-bg relative w-full overflow-hidden text-white">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-6 pb-3 sm:px-6 sm:pt-8 sm:pb-4">
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="block transition duration-300 ease-out hover:brightness-110"
        >
          <Image
            src={siteMetadata.siteLogo}
            alt={`${siteMetadata.headerTitle} logo`}
            width={520}
            height={224}
            className="h-auto w-72 sm:w-96 md:w-[420px]"
            priority
          />
        </Link>
      </div>

      <div className="brand-copper-bar relative w-full border-y border-[#5a3920]/70">
        <nav
          aria-label="Primary"
          className="mx-auto hidden w-full max-w-5xl items-center justify-center px-4 py-3 sm:flex sm:py-3.5"
        >
          <ul className="no-scrollbar flex flex-nowrap items-center justify-center gap-x-3 overflow-x-auto sm:gap-x-6">
            {headerNavLinks.map((link, idx) => (
              <li key={link.title} className="brand-menu-link flex items-center whitespace-nowrap">
                <Link href={link.href} className="brand-menu-link px-1">
                  {link.title}
                </Link>
                {idx < headerNavLinks.length - 1 && (
                  <span aria-hidden="true" className="px-2 text-[#3a1f08]/60">
                    |
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <MobileNav />
    </header>
  )
}

export default Header
