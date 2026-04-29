import appConfig from './appConfig'

const headerNavLinks = [
  { href: '/home', title: 'Home', enabled: appConfig.features.home },
  { href: '/about', title: 'About', enabled: appConfig.features.about },
  {
    href: '/projects',
    title: 'Projects',
    enabled: appConfig.features.projects && appConfig.navigation.showProjectsInHeader,
  },
  {
    href: '/blog',
    title: 'Blog',
    enabled: appConfig.features.blog && appConfig.navigation.showBlogInHeader,
  },
  {
    href: '/tags',
    title: 'Tags',
    enabled: appConfig.features.tags && appConfig.navigation.showTagsInHeader,
  },
].filter((link) => link.enabled)

export default headerNavLinks
