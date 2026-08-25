# Signal Room Memory

## Decisions to preserve

- Keep the existing Next.js App Router repository; do not migrate to a different scaffold.
- Keep the architecture static-first. Do not add a speculative backend or claim realtime online multiplayer.
- Local multiplayer means 2–4 people sharing the same device where the game supports it.
- Preserve SEO, social image routes, sitemap, robots, JSON-LD, GA4 opt-in, theme switching, blog search, project filtering, security headers and deployment documentation.
- Treat service worker support as progressive enhancement. Game rules must work on the first normal load and must never depend on service-worker activation.
- Use the generated arcade visual as the main art anchor. Do not restore the deleted 4.6 MB JPG.
- Keep game rules out of React components. Fix engines and tests before polishing interaction details.
- Do not use offensive security testing or generate DDoS/DoS traffic; only defensive checks and local quality validation are appropriate.

## Current state at rebuild resume

The homepage and three pure engines have been rewritten locally. The new homepage uses Signal Room editorial classes and the optimized WebP arcade visual. Caro and Dots UI components now use engine-backed state and bot timers; Sudoku is engine-backed. Lint and production build pass after resolving effect state updates and a player-count type error. Deterministic engine tests, CSS cleanup, final Play redesign, service worker versioning and browser QA are still required.

## Quality heuristics

Prefer short, intentional motion over constant animation. Use `prefers-reduced-motion` to remove non-essential effects. Keep focus styles visible. Validate the actual rendered page at mobile and desktop widths instead of trusting only static markup. If a new change makes a route or game less clear, favor the simpler interaction and document the trade-off.


## ReactBits motion integration

ReactBits interaction patterns are implemented locally rather than imported as a heavy runtime. `components/ReactBitsMotion.tsx` provides IntersectionObserver-based `ScrollReveal` and CSS-variable pointer `SpotlightCard`. Static content must remain visible before enhancement, touch devices must not depend on hover, and reduced-motion must disable non-essential transforms and spotlight effects.
