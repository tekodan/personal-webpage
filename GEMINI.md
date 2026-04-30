# Gemini Project Context: Personal Webpage & Blog

Este documento proporciona el contexto instruccional para trabajar en este repositorio. Es una plataforma de blog personal y portafolio construida sobre el ecosistema de Next.js.

## Project Overview

- **Tipo:** Next.js Application (App Router).
- **Stack Principal:**
  - **Framework:** Next.js 15.5.12 (React 19).
  - **Contenido:** Contentlayer2 (para procesar MDX y Markdown).
  - **Estilos:** Tailwind CSS 4.0 con @tailwindcss/postcss.
  - **Tipado:** TypeScript.
  - **Herramientas de Calidad:** ESLint, Prettier, Husky.
- **Arquitectura:** Sigue el patrón de Next.js App Router con una separación clara entre datos (`data/`), componentes (`components/`), layouts (`layouts/`) y rutas (`app/`).

## Key Features

- **Gestión de Contenido:** Blog y autores gestionados mediante archivos MDX en `data/blog` y `data/authors`.
- **CV dinámico:** Generación de CV en formatos Markdown y PDF mediante rutas de API (`/api/cv`).
- **SEO:** Configuración avanzada de metadatos en `app/seo.tsx` y `data/siteMetadata.js`.
- **Búsqueda:** Generación de índice de búsqueda local para integración con Kbar o similares.
- **Diseño:** Totalmente responsivo, con soporte para modo oscuro mediante `next-themes`.

## Building and Running

- **Desarrollo:** `yarn dev` (Inicia el servidor en `localhost:3000`).
- **Build:** `yarn build` (Genera una versión optimizada para producción).
- **Linting:** `yarn lint` (Ejecuta ESLint con corrección automática).
- **Postbuild:** El script `scripts/postbuild.mjs` genera el feed RSS y el índice de búsqueda después del build.
- **Despliegue:** Configurado para GitHub Pages mediante el workflow `.github/workflows/pages.yml`. Requiere `EXPORT=1` para exportación estática.

## Project Structure

- `app/`: Rutas, layouts y lógica de servidor/cliente.
- `components/`: Componentes UI reutilizables (Card, Header, Footer, etc.).
- `data/`: Configuración del sitio (`siteMetadata.js`), enlaces de navegación (`headerNavLinks.ts`) y contenido fuente (MDX).
- `layouts/`: Plantillas para diferentes tipos de páginas (ListLayout, PostLayout, AuthorLayout).
- `public/`: Assets estáticos como imágenes, favicons y documentos.

## Development Conventions

- **Nomenclatura:** Los componentes deben usar PascalCase (e.g., `ThemeSwitch.tsx`). Las rutas y utilidades suelen usar kebab-case o camelCase.
- **Contenido:** Para agregar un nuevo post, crea un archivo `.mdx` en `data/blog/`. El frontmatter debe seguir el esquema definido en `contentlayer.config.ts`.
- **Estilos:** Usa clases de Tailwind CSS directamente. La configuración de colores y fuentes se encuentra en `tailwind.config.js` y `css/tailwind.css`.
- **Surgical Updates:** Al editar `data/projectsData.ts`, asegúrate de mantener las interfaces de TypeScript correctas.

## TODOs & Maintenance

- [ ] Validar accesibilidad (alt text) en componentes de imagen (ej. `CVDocument.tsx`).
- [ ] Asegurar que las rutas de API no intenten pre-renderizarse estáticamente si dependen de datos dinámicos durante el build de GitHub Pages.
