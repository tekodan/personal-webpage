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
    showProjectsInHeader: false,
    showBlogInHeader: false,
    showTagsInHeader: false,
  },
} as const

export default appConfig
