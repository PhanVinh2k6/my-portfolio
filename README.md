# Phan Vinh — Portfolio

Personal portfolio for **Phan Vinh**, an Information Technology student and product-minded developer based in Thai Nguyen, Vietnam.

The site uses an editorial visual system with a warm paper canvas, cobalt accent, serif display typography, and lightweight CSS motion. It presents selected work, working approach, background, capabilities, and a direct contact path in one responsive landing page.

Visit the live portfolio at [phanvinh.id.vn](https://phanvinh.id.vn).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Verify production build

```bash
npm run lint
npm run build
npm start
```

## Project structure

- `app/page.tsx` — homepage content and interactive navigation.
- `app/globals.css` — design tokens, responsive layout, visual system, and motion.
- `app/layout.tsx` — metadata and document shell.
- `public/` — small static assets only.

## Analytics and social previews

To enable Google Analytics 4, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_GA_ID` to the Measurement ID from your GA4 property. The analytics scripts load only when the variable is present and use `afterInteractive` loading so an unconfigured local build adds no tracking request.

The site includes generated Open Graph and Twitter preview images at `/opengraph-image` and `/twitter-image`. Root metadata also exposes canonical URLs, descriptions, social images, JSON-LD, `robots.txt`, and `sitemap.xml`.

## Content features

The `/blog` page includes client-side keyword search across article title, excerpt, category, and body content, plus category chips. The homepage Selected Work section includes category filtering for Product systems and AI & research. Blog and project content lives in `lib/content.ts`, so new entries can be added without changing route components.
