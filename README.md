# Phan Vinh — Signal Room

Signal Room is a premium editorial portfolio and offline arcade for **Phan Vinh**, an IT student and product-minded developer based in Thai Nguyen, Vietnam. The public experience presents selected product work, a personal journal and a direct contact path; the `/play` route opens a small, tactile game room built to remain useful when a network connection is not available.

The visual system combines warm paper, cobalt blue, ink black, oversized editorial typography, thin instrumentation lines and acid-lime signal details. The site is intentionally work-first, while the arcade uses the same design language with a console-style entry sequence. Visit the live portfolio at [phanvinh.id.vn](https://phanvinh.id.vn).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The normal first load works without a service worker; visiting `/play` once allows the progressive offline layer to warm its cache.

## Verify a release

```bash
npm run lint
npm test
npm run build
npm audit --audit-level=high
git diff --check
npm start
```

The deterministic tests live in `lib/games/games.test.ts` and exercise engine rules without React or browser APIs.

## Product structure

`app/page.tsx` is the Signal Room homepage. `app/blog/**` and `app/projects/**` contain statically generated journal and case-study routes. `app/play/page.tsx` hosts the arcade shell. `components/GameHub.tsx` selects the active game, while the game components own presentation state and call pure engines under `lib/games/`.

The six games are deliberately explicit about their supported modes:

| Game | Modes | Rules |
| --- | --- | --- |
| Wend | Daily / solo | 5×5 word paths; every letter is used once |
| Zip | Daily / solo | One path through every cell in marker order |
| Signal Sprint | Solo | Twenty-second reflex game with local best score |
| Caro / Gomoku | Bot or 2 local players | 9×9 board; five in a row wins |
| Sudoku | Solo | Engine-backed puzzle, validation, clearing and completion |
| Dots & Boxes | Bot or 2–4 local players | 3×3 boxes; closing a box awards a point and an extra turn |

“Local players” means people sharing the same device. Wend and Zip use a deterministic UTC daily key, Hint support, completion timers and local-device best times. There is no realtime online multiplayer, account system or fake global leaderboard, and no backend is added solely to imply one.

## Preserved platform features

The app retains static blog/project content, blog search and category filtering, project filtering, light/dark theme switching, responsive layouts, generated Open Graph and Twitter image routes, canonical metadata, JSON-LD, `robots.txt`, `sitemap.xml`, opt-in GA4, defensive security headers and Vercel deployment guidance.

`public/sw.js` is a versioned progressive service worker. It precaches the homepage, Play shell and manifest, uses network-first navigation with an offline fallback, and uses runtime cache-first behavior for same-origin assets. It must never be treated as a prerequisite for the game engines.

## Analytics and social previews

To enable Google Analytics 4, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_GA_ID` to the Measurement ID from the GA4 property. Tracking is injected only when the variable is configured. The social preview endpoints are `/opengraph-image` and `/twitter-image`.

## Content and assets

Journal and project entries are maintained in `lib/content.ts`. The primary arcade visual is the optimized local asset `public/arcade-keyvisual.webp`; the deleted heavy JPG is intentionally not part of the project. Rebuild context and design decisions are documented in `PLAN.md`, `STRUCTURE.md`, `MEMORY.md` and `ASSETS.md`.

## Deployment and security

See [DEPLOY.md](./DEPLOY.md) for Vercel import, GA4 environment configuration, custom domain, social preview and production security checks. The project is static-first and has no user-data API. Security work should remain defensive: dependency audits, CSP/header verification, crawlability and controlled preview checks are appropriate; generating DDoS/DoS traffic is not.


## Homepage sections

The homepage now follows a complete portfolio narrative: selected work establishes proof, the point-of-view section explains how decisions are made, capabilities clarify the types of help available, the four-step process explains collaboration, Signal Room adds the offline arcade layer, Journal provides ongoing thinking, and the final contact block states availability and the best next step. The Play hub leads with two deterministic daily puzzles and keeps the remaining four games available for replay.
