# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Odyssey Theme customized for **BTS By Steph** — a wedding content creator (iPhone videography) site. It includes a homepage with portfolio videos and pricing cards, an about page, a contact form, and a standalone print-ready pricing PDF page.

## Development Commands

- `npm run dev` or `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier

## Framework & Tech Stack

- **Astro 5** (SSG) with TypeScript path aliases
- **MDX** for blog posts (linked in nav/footer as `/blog`)
- **Lit** web components via `@astrojs/lit`
- **astro-icon** with `@iconify-json/ic` and `@iconify-json/mdi` icon sets
- **AWS Amplify** backend (auth/data) — config in `amplify/`
- **Google Analytics** GA4 (`G-8291Q1LY4D`) injected in `src/layouts/Page.astro`

## Architecture

### Layout Chain

```
Base.astro          → <html>, <head>, named slots: announcement-bar, header, footer
  └─ Page.astro     → adds Header + Footer + Google Analytics; used by all pages
       └─ Post.astro → wraps blog posts; reads MDX frontmatter (title, publishDate, featuredImage, tags)
```

All pages use `Page.astro` (not `Base.astro` directly).

### Component Barrel

All reusable components are exported from `src/components/odyssey-theme.js`. Import them via the `@components` alias:

```js
import { Button, CtaCardSection, CustomerQuoteSection } from '@components/odyssey-theme';
```

**Exception**: `ContactForm` is **not** in the barrel — import it directly:
```js
import ContactForm from '../../components/forms/ContactForm.astro';
```

### TypeScript Path Aliases (`tsconfig.json`)

- `@config` → `src/config/*`
- `@components` → `src/components/*`
- `@layouts` → `src/layouts/*`
- `@utils` → `src/utils/*`
- `@styles` → `src/styles/*`
- `@assets` → `src/assets/*`
- `@icons` → `src/icons/*`
- `@lib` → `src/lib/*`
- `@pages` → `src/pages/*`
- `@data` → `src/data/*`

### Site Configuration

| File | Purpose |
|------|---------|
| `src/config/settings.js` | Site title, URL, business name, theme switcher toggle |
| `src/config/nav.js` | Top navigation links (array of `{title, slug}`) |
| `src/config/footer.js` | Footer link lists and social links |

Theme switcher is currently **disabled** (`enableThemeSwitcher: false`).

### Theming

CSS custom properties in `src/styles/theme.css`. Active palette is a luxury bridal theme:

- `--theme-primary`: `#1a1a1a` (near-black)
- `--theme-accent`: `#C4A484` (warm champagne/gold)
- `--theme-bg`: `#FFFAF7` (warm white)
- Fonts: **Playfair Display** (display), **Cormorant Garamond** (serif), **Work Sans** (sans)
- Additional font `Italianno` (cursive) is hardcoded in `index.astro` for pricing package names — not a theme variable

Unused alternate themes (`dark`, `earth`, `ocean`, `sand`) remain in `theme.css`.

Blog pages layer `src/styles/blog-theme.css` on top (Direction 3 "Warm Film / Golden Hour" tokens: `--blog-*` custom properties, incl. `Italianno` via `--blog-font-script`). Scoped to `.blog-warm-scope` so it doesn't affect the homepage/pricing sharp-edge button style — see the file's header comment for the tradeoff rationale.

### Active Pages / Routes

| Route | File | Notes |
|-------|------|-------|
| `/` | `src/pages/index.astro` | Portfolio videos + wedding & general events pricing cards |
| `/company/about` | `src/pages/company/about.astro` | |
| `/company/contact` | `src/pages/company/contact.astro` | Uses `ContactForm` + S3-hosted video |
| `/company/legal` | `src/pages/company/legal.astro` | |
| `/pricing-pdf` | `src/pages/pricing-pdf.astro` | Standalone (no layout), print-ready pricing sheet |
| `/blog` | `src/pages/blog/index.astro` | Blog listing; posts in `src/pages/blog/posts/` |
| `/blog/tags/[slug]` | `src/pages/blog/tags/[slug].astro` | |

### Media & Assets

- Portfolio/contact videos are hosted on **AWS S3**: `https://btsbs.s3.us-east-2.amazonaws.com/`
- Static images in `public/assets/images/`
- Videos in `index.astro` use `controlslist="nodownload"` to discourage downloading

### Content Management

- **Blog posts**: `src/pages/blog/posts/*.mdx` — frontmatter fields: `layout`, `title`, `description`, `publishDate`, `featuredImage`, `excerpt`, `tags`
- Blog is linked in nav (`src/config/nav.js`) and footer (`src/config/footer.js`)

### Deployment

- **Netlify**: `netlify.toml` (publish: `dist/`, build: `npm run build`)
- **Firebase**: `firebase.json` present but minimal
- **AWS Amplify**: Backend resources in `amplify/`
