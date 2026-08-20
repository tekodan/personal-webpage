import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { Pinyon_Script, Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import appConfig from '@/data/appConfig'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-pinyon-script',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: appConfig.features.blog
      ? {
          'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
        }
      : {},
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} ${pinyon.variable} dark scroll-smooth`}
      style={{ scrollbarGutter: 'stable' }}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link rel="icon" type="image/png" href={`${basePath}/static/favicons/favicon.png`} />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#163030" />
      <meta name="theme-color" content="#163030" />
      {appConfig.features.blog && (
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      )}
      <body className="brand-section-bg text-brand-cream-100 leading-relaxed antialiased">
        <a
          href="#main-content"
          className="focus:bg-accent focus:text-on-accent sr-only z-[200] focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:rounded focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          {appConfig.features.search ? (
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <Header />
            </SearchProvider>
          ) : (
            <Header />
          )}
          <SectionContainer>
            <main id="main-content" className="mb-auto">
              {children}
            </main>
          </SectionContainer>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  )
}
