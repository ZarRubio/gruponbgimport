# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:5173
npm run build      # production build → ./dist/
npm run preview    # serve the built dist locally
```

There is no test suite and no linter configured.

## Architecture

This is a single-page React landing site for Grupo NBG Import, a Peruvian automotive parts importer.

**Entire app lives in one file: `src/App.jsx`.** All UI primitives (Button, Card, Input, Textarea, Badge) are defined inline there — there is no component library or separate component files. Do not extract components into separate files unless explicitly asked.

Key design decisions:
- **No routing.** Navigation is anchor-based (`#marcas`, `#nosotros`, `#contacto`). Active section is tracked via `IntersectionObserver`.
- **Form → mailto.** The contact form builds a `mailto:` URI and redirects; there is no backend or API call.
- **Pending brands modal.** SHAM and NBG have no `href` in the `BRANDS` array. Clicking them calls `onPendingClick` which sets `pendingBrand` state and shows an `AnimatePresence` overlay.
- **Analytics via `trackEvent`.** All user interactions call this helper, which pushes to `window.dataLayer` (GTM) and also calls `window.gtag` if present. Analytics tags are in `index.html`.
- **`prefers-reduced-motion` respected.** The ticker animation and other Framer Motion animations check the `reduceMotion` state derived from a `matchMedia` listener.
- **Scroll depth tracking.** A ref (`scrollMilestonesRef`) prevents re-firing the 25/50/75/100% scroll events.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-hostinger.yml`, which builds the project and deploys `./dist/` to `public_html/` on Hostinger via FTPS. Secrets required: `HOSTINGER_FTP_HOST`, `HOSTINGER_FTP_USER`, `HOSTINGER_FTP_PASSWORD`.
