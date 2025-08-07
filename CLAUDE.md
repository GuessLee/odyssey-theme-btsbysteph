# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Odyssey Theme - an Astro-based marketing website theme for startups and businesses. It's been customized for "BTS By Steph" and includes landing pages, a blog system, contact forms, and a complete theming system.

## Development Commands

- `npm run dev` or `npm start` - Start development server
- `npm run build` - Build for production 
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier

## Architecture

### Framework & Tech Stack
- **Astro 4.4+** with SSG (Static Site Generation)
- **TypeScript** configuration with path aliases
- **AWS Amplify** backend integration for auth and data
- **MDX** for blog posts and content pages
- **Lit** web components integration
- **astro-icon** for icon management

### Project Structure

#### Key Directories
- `src/components/` - Reusable Astro components organized by category
- `src/layouts/` - Base layouts (Base.astro, Page.astro, Post.astro)  
- `src/pages/` - File-based routing with Astro pages
- `src/config/` - Site configuration (settings, navigation, footer)
- `src/styles/` - CSS files including the theme system
- `amplify/` - AWS Amplify backend configuration

#### Component Organization
Components are exported from `src/components/odyssey-theme.js` and organized into:
- **Core**: Header, Footer, Container, SkipLink, etc.
- **Sections**: TextSection, HeroSection, StickyTextImageSection, etc. 
- **Cards**: FeatureCard and other card components
- **Forms**: ContactForm, FormInput, FormTextarea, etc.
- **Blog**: BlogPostsList, BlogPostPreview
- **Buttons**: Reusable Button component

### TypeScript Path Aliases
Configure in `tsconfig.json`:
- `@config` → `src/config/*`
- `@components` → `src/components/*` 
- `@layouts` → `src/layouts/*`
- `@utils` → `src/utils/*`
- `@styles` → `src/styles/*`
- `@pages` → `src/pages/*`
- `@assets` → `src/assets/*`
- `@icons` → `src/icons/*`

### Theming System

The theme uses CSS custom properties defined in `src/styles/theme.css`:
- **Colors**: Primary, background, surface variants with corresponding text colors
- **Layout**: Container widths, grid gaps, section margins
- **Typography**: Font families for serif and sans-serif
- **Shapes**: Border radius values for consistent styling
- **Transitions**: Consistent animation timing

Theme switching can be enabled via `src/config/settings.js` (`enableThemeSwitcher: true`).

### Site Configuration

Key settings in `src/config/settings.js`:
- Site title, description, and URL
- Business name for branding
- Theme switcher toggle
- Little Sticks branding toggle

Navigation configured in `src/config/nav.js` with title/slug pairs.

### Content Management

- **Blog posts**: Located in `src/pages/blog/posts/` as `.mdx` files
- **Static pages**: Regular `.astro` files in `src/pages/` 
- **Images**: Stored in `public/assets/images/` with organized subdirectories

### Deployment Configuration

- **Netlify**: Configured via `netlify.toml` (publish: `dist/`, build: `npm run build`)
- **Firebase**: Basic `firebase.json` present
- **AWS Amplify**: Backend resources defined in `amplify/` directory

## Development Guidelines

- Use existing component patterns when adding new functionality
- Follow the established theming system for consistent styling
- Leverage TypeScript path aliases for clean imports
- MDX files support both Markdown and React/Astro components
- Test theme switching if enabled in settings
- Consider mobile responsiveness for all new components