# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use Yarn (pinned to `yarn@3.6.1`):

```bash
yarn dev       # Dev server at http://localhost:3000
yarn build     # Production build + postbuild (generates search index)
yarn serve     # Serve production build
yarn lint      # ESLint with auto-fix across app/, components/, layouts/, scripts/
yarn analyze   # Build with bundle analyzer
```

No test framework is configured. Validate changes by running `yarn lint` and exercising key pages locally.

## Architecture

This is a personal portfolio site built on [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) with Next.js App Router, Contentlayer2 for MDX processing, and Tailwind CSS v4.

### Configuration layer

Two config files control nearly all site behavior:

- **`data/siteMetadata.js`** — identity, URLs, analytics (Umami), comments (Giscus), search (kbar). This is a plain JS module (not TS) imported by both server and client code.
- **`data/appConfig.ts`** — feature flags (`features.*`) and UI copy (`home.*`, `profile.*`). Pages call `notFound()` if their feature flag is off. Nav links are filtered in `data/headerNavLinks.ts` using these flags.

### Content pipeline

Contentlayer2 processes MDX files from `data/`:
- `data/blog/**/*.mdx` → `Blog` document type (requires `title`, `date`; supports `tags`, `draft`, `layout`, `authors`)
- `data/authors/**/*.mdx` → `Authors` document type (supports `skills[]` list)

On build success, two files are regenerated: `app/tag-data.json` (tag counts) and `public/search.json` (kbar search index).

### Page routing

`app/page.tsx` redirects to `/home` or `/about` based on `appConfig.features`. Each route under `app/` checks its feature flag and calls `notFound()` if disabled. Blog pagination lives at `app/blog/page/[page]/page.tsx`; tag filtering at `app/tags/[tag]/page/[page]/page.tsx`.

### Layouts

MDX blog posts specify their layout via frontmatter `layout:` field. Available layouts in `layouts/`:
- `PostLayout` (default, with author + TOC sidebar)
- `PostSimple`
- `PostBanner`
- `ListLayout` / `ListLayoutWithTags`
- `AuthorLayout` (used by the About page)

### Styling

Dark-first design using Tailwind CSS v4 with `@tailwindcss/postcss`. Base color is `bg-[#070B12]` / `bg-[#060A12]`. Accent color is `#9DFF00` (lime green). Font is Space Grotesk via `next/font/google`. Full-bleed sections use the `-mx-[50vw] w-screen` pattern to break out of the container.

### Key aliases

`@/` resolves to the project root (see `tsconfig.json`). Import paths like `@/components/Link`, `@/data/siteMetadata`, `@/layouts/AuthorLayout` are standard throughout.

### Content Security Policy

`next.config.js` defines a strict CSP. When adding new external scripts or fonts, add their domains to the appropriate CSP directive there.

### CV / static docs

The downloadable CV lives at `public/static/docs/dani-alva-cv.md` and is linked from `layouts/AuthorLayout.tsx`.
