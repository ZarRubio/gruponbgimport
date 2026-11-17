# AGENTS.md

This file provides guidance to Codex when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:5173 (host: true, so also reachable on LAN)
npm run build      # production build → ./dist/
npm run preview    # serve the built dist locally
```

There is no test suite, no linter, and no `tsconfig.json`. `npm run build` is the only correctness check — run it after changes. `.tsx` files are transpiled by Vite/esbuild without type checking, so type errors will not fail the build.

## Architecture

Single-page React 18 + Vite + Tailwind 3 landing site for Grupo NBG Import, a Peruvian importer of motorcycle/automotive parts (brands: CST Tires Perú, SAHM Parts, NBG Parts). All user-facing copy is in Spanish.

**`src/App.jsx` is the shell and owns all shared state.** It defines the inline UI primitives (`Button`, `Card`, `Input`, `Textarea`, `Reveal`, `SectionHeader`), the header/nav, the `#marcas` and `#contacto` sections, the contact form, the pending-brand modal, and the footer. Larger sections live in `src/components/` and are composed by `App.jsx`; they receive state/callbacks as props (`reduceMotion`, `onBrandClick`, `onPendingClick`, etc.) rather than owning global state.

- `src/components/*.jsx` — page sections (HeroNBG, SolucionesNegocios, BrandMarquee, FAQ, Testimonios, …).
- `src/components/ui/*.tsx` — richer interactive blocks (`brand-grid.tsx` holds the **brand data array**, `why-us-tabs.tsx`).
- `src/components/magicui/*.tsx` — copied Magic UI effect components (particles, border-beam, number-ticker…); they import `cn` from `src/lib/utils.ts` (clsx + tailwind-merge). No path aliases are configured — use relative imports.
- Note: `App.jsx` and `brand-grid.tsx` each define their own simpler local `cn` that only joins truthy class strings; it is not the tailwind-merge version.

Key behaviors:
- **No routing.** Anchor navigation (`#inicio`, `#soluciones`, `#marcas`, `#contacto`) driven by `NAV_ITEMS`; the active section is tracked with an `IntersectionObserver` in `App.jsx`.
- **Contact form → WhatsApp.** `handleSubmit` validates via `validateField`, then opens `wa.me/<WHATSAPP_PHONE>` with a prefilled message built by `buildWhatsAppQuoteUrl`. There is no backend. (`mailto:marketing@nbg.pe` links still appear as secondary contact options.)
- **Pending brand modal.** Brands with `isPending: true` in `brand-grid.tsx` (currently NBG Parts) call `onPendingClick(name)` → `setPendingBrand` in `App.jsx`, which renders an `AnimatePresence` overlay (closed by click or Escape).
- **Analytics via `trackEvent`** (in `App.jsx`): pushes to `window.dataLayer` and calls `window.gtag` if present. Every CTA/interaction should call it; child components receive callbacks that wrap it. The gtag snippet in `index.html` still has a placeholder ID (`G-XXXXXXXXXX`).
- **Scroll-depth events** (25/50/75/100%) are de-duplicated via `scrollMilestonesRef`.
- **`prefers-reduced-motion`**: `App.jsx` derives `reduceMotion` from a `matchMedia` listener and passes it down; Framer Motion animations in sections should honor that prop.
- Static assets (brand images/logos) are served from `public/images/...` and referenced by absolute paths like `/images/brands/...`. `public/robots.txt` and `public/sitemap.xml` are hand-maintained for SEO.
- Both `framer-motion` and `motion` are installed; existing code imports from `framer-motion`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-hostinger.yml` (Node 20, `npm ci`, `npm run build`), which uploads `./dist/` to `public_html/` on Hostinger via FTPS. Secrets: `HOSTINGER_FTP_HOST`, `HOSTINGER_FTP_USER`, `HOSTINGER_FTP_PASSWORD`. Every push to `main` is a production deploy.

`CLAUDE.md` mirrors this file for Claude Code — keep them in sync when architecture changes.
