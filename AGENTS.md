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
import {
	Button,
	CtaCardSection,
	CustomerQuoteSection,
} from '@components/odyssey-theme';
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

| File                     | Purpose                                               |
| ------------------------ | ----------------------------------------------------- |
| `src/config/settings.js` | Site title, URL, business name, theme switcher toggle |
| `src/config/nav.js`      | Top navigation links (array of `{title, slug}`)       |
| `src/config/footer.js`   | Footer link lists and social links                    |

Theme switcher is currently **disabled** (`enableThemeSwitcher: false`).

### Theming

CSS custom properties in `src/styles/theme.css`. Active palette is a luxury bridal theme, sitewide as of the "Warm Film / Golden Hour" rollout (2026-08-22):

- `--theme-primary`: `#1a1a1a` (near-black)
- `--theme-accent`: `#C4A484` (warm champagne/gold) — decorative use only (borders, underlines, badge fills); fails AA as text color
- `--theme-accent-text`: `#7a4d18` — AA-safe accent color, use this instead of `--theme-accent` for any actual text
- `--theme-highlight` / `--theme-highlight-deep`: richer decorative golds (large-scale accents, e.g. blog's script "Journal" word)
- `--theme-bg`: `#FFFAF7` (warm white) — warmth lives on imagery/shadows, not page-chrome backgrounds
- `--theme-button-border-radius`: `999px` (pill) — read by `Button.astro`; every shared `<Button>` is a pill, not hardcoded per-component
- `--theme-radius-lg` (`1.25rem`) / `--theme-card-shadow` / `--theme-image-glow`: warm rounded-corner + shadow-lift treatment for photography and cards — deliberately not a flat photo-tinting overlay
- Fonts: **Playfair Display** (display/h1-h2), **Cormorant Garamond** (serif/h3-h4, body accents), **Work Sans** (sans); `--theme-font-script` (`Italianno`) is a signature accent only (pricing package names, blog "Journal" wordmark) — never body/post headlines

Unused alternate themes (`dark`, `earth`, `ocean`, `sand`) remain in `theme.css`.

`src/styles/blog-theme.css` holds only blog-specific component classes now (`.blog-warm-image`, `.blog-pill-tag`, `.blog-post__preview h3`); its `--blog-*` custom properties are aliases to the sitewide `--theme-*` tokens above, not a separate palette — don't add new literal values there, extend `theme.css` instead.

### Active Pages / Routes

| Route               | File                               | Notes                                                     |
| ------------------- | ---------------------------------- | --------------------------------------------------------- |
| `/`                 | `src/pages/index.astro`            | Portfolio videos + wedding & general events pricing cards |
| `/company/about`    | `src/pages/company/about.astro`    |                                                           |
| `/company/contact`  | `src/pages/company/contact.astro`  | Uses `ContactForm` + S3-hosted video                      |
| `/company/legal`    | `src/pages/company/legal.astro`    |                                                           |
| `/pricing-pdf`      | `src/pages/pricing-pdf.astro`      | Standalone (no layout), print-ready pricing sheet         |
| `/blog`             | `src/pages/blog/index.astro`       | Blog listing; posts in `src/pages/blog/posts/`            |
| `/blog/tags/[slug]` | `src/pages/blog/tags/[slug].astro` |                                                           |

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
- **CI**: `.github/workflows/ci.yml` runs `npm ci` + `npm run build` on push/PR to `main`

## Branching & Deploy Strategy (standing rule — read before opening any PR)

Two live deployments watch this repo via VCS auto-deploy, not just CI:

- `develop` → `https://develop.d2kzeu15mx2xps.amplifyapp.com` — staging.
- `main` → `https://btsbs.com` — production, live to real customers.

**Every PR targets `develop`. Never `main` directly, no exceptions** — not for docs, not for a one-line fix, regardless of how small or confident the change is.

`develop` → `main` promotion is a separate, deliberate PR that only happens after a human has reviewed the actual live staging URL above (not a local build, not a description of the change) and explicitly approved it. This promotion PR is the only path that touches production.

A change is not done when CI passes or the local build works — it is done when it is confirmed correct on the real staging deployment. If anything on staging doesn't look right, keep iterating with new commits/PRs against `develop` until it actually is right before asking for promotion.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
