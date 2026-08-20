# danialvarez.com

Personal website and blog of **Dani Alvarez** — AI Full-Stack Developer with 14+ years building AI-native products end to end: RAG pipelines, agentic systems, and production-grade full-stack platforms.

Built with **Next.js 15**, **Tailwind CSS 4**, and **Contentlayer** for MDX content.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4 with custom dark theme
- **Content:** Contentlayer + MDX for blog posts
- **Fonts:** Space Grotesk (Google Fonts)
- **Package Manager:** Yarn 3.6.1

## Development

```bash
yarn        # install dependencies
yarn dev    # start dev server at localhost:3000
yarn build  # production build + postbuild
yarn serve  # serve production build
yarn lint   # ESLint with auto-fix
```

## Project Structure

- `app/` — Next.js App Router pages and layouts
- `components/` — Reusable React components
- `data/` — Site config, blog posts (`data/blog/`), author data
- `public/static/` — Static assets (images, favicons, docs)
- `contentlayer.config.ts` — Contentlayer schema and MDX pipeline

## Content

Blog posts are MDX files in `data/blog/`. Frontmatter supports:

```yaml
---
title: 'Post Title'
date: '2026-05-14'
tags: ['productivity', 'deep-work']
draft: false
summary: 'Short description for SEO and listings.'
authors: ['default']
---
```

## Deployment

Deployed via GitHub Actions to GitHub Pages. See `.github/workflows/pages.yml`.

## License

MIT © Dani Alvarez
