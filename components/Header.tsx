import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'

const Header = () => {
  const headerClass =
    'sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200/70 bg-white/88 py-6 backdrop-blur-sm supports-[backdrop-filter]:bg-white/75 dark:border-gray-800/70 dark:bg-gray-950/82 dark:supports-[backdrop-filter]:bg-gray-950/70'

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Image
              src={siteMetadata.siteLogo}
              alt={`${siteMetadata.headerTitle} logo`}
              width={99}
              height={34}
              className="h-11 w-auto"
              priority
            />
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-3 leading-5 sm:-mr-4 sm:space-x-5">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-800 dark:text-gray-200"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
