const appConfig = {
  features: {
    home: true,
    about: true,
    projects: true,
    blog: true,
    tags: true,
    search: true,
    contact: true,
  },
  navigation: {
    showProjectsInHeader: true,
    showBlogInHeader: true,
    showTagsInHeader: false,
  },
} as const

export default appConfig
