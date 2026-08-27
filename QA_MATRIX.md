# Signal Room QA Matrix

## Tester lanes

| Lane | Scope | Regression gate |
| --- | --- | --- |
| Rules tester | Caro, Dots & Boxes, Sudoku, Wend, Zip and Signal Sprint state transitions | `npm test` plus deterministic edge cases |
| Interaction tester | Game tabs, filters, search, theme toggle, mobile menu, reset/clear/undo, keyboard paths | Browser DOM checks and manual pointer/keyboard flows |
| Responsive tester | 390px mobile, 768px tablet and desktop; grid collapse, board sizing, text wrapping, no horizontal overflow | Headless screenshots and `scrollWidth <= innerWidth` |
| Accessibility tester | Skip links, accessible names, tab/tabpanel semantics, `aria-pressed`, live result counts, focus-visible states, reduced motion | DOM audit and keyboard traversal |
| Platform tester | Static routes, metadata, security headers, service worker warm-cache behavior | Production build, curl route/header checks and offline browser check |

## Required flow checks

The homepage must show the hero, work explorer, capabilities, process, arcade teaser, journal and contact without blank motion placeholders. Selected work filters must change the visible count and preserve keyboard focus. Journal search and category filters must expose their selected state through `aria-pressed` and announce result changes through `aria-live`.

The shared mobile menu must expose `aria-expanded` and `aria-controls`, close on Escape, lock background scrolling while open, keep the drawer within the viewport height and close after navigation. Theme toggle must preserve the selected theme across reload, work when localStorage is unavailable, and keep readable contrast in both modes.

Every game must be tested from a clean reset and after a second run. Daily Wend and Zip must use the same UTC puzzle for the same date, start timing on the first valid move, handle Hint without silently completing the puzzle, stop timing on completion, and keep the best local time rather than replacing it with a slower run. Caro, Dots & Boxes and Sudoku must retain their deterministic engine coverage.

## Release commands

```bash
npm run lint
npm test -- --reporter=dot
npm run build
npm audit --audit-level=high
git diff --check
```

No release is complete if a tested route has horizontal overflow at 390px, a menu blocks scroll after closing, a game state can be mutated through an invalid move, or the app implies global realtime leaderboard behavior without a backend.


## Latest QA run

The homepage runtime audit found no unnamed interactive elements or missing image alt text. After service-worker cache reset, Blog filters exposed `aria-pressed` correctly and the result count exposed `aria-live="polite"`. The homepage mobile-menu state opened with `aria-expanded="true"`, `aria-controls="primary-navigation"` and `body.menu-open`; Escape returned it to the closed state. Desktop CSS intentionally restores overflow to `auto`, while the mobile media query uses the scroll lock and backdrop.


## Responsive snapshot review

The 390px homepage screenshot keeps the mobile taskbar, theme toggle, menu button, hero type and CTA inside the viewport without horizontal overflow. The 768px Play screenshot is stable and readable, but intentionally stays on the mobile/tablet one-column hero treatment; future refinement can introduce a mid-tablet split only if it improves the game picker and does not compress the board.


## Play runtime QA

The Play route rendered all six game tabs with one active tab at `tabIndex=0`, inactive tabs at `-1`, matching tabpanel linkage through `aria-controls` and `aria-labelledby`. The current Wend panel and game controls had accessible names, there were zero unnamed `button/a/input` elements in the audit, and no horizontal overflow was reported at the browser viewport.


## Keyboard tab QA

On the Play route, focusing `game-tab-wend` and sending ArrowRight moved selection to `game-tab-zip`, changed the panel to `game-panel-zip`, and moved DOM focus to `game-tab-zip`. This verifies the roving-tabindex behavior expected by the tablist pattern.


## Advanced motion responsive QA

The 390px screenshot after the TextReveal wrapping fix shows the hero title breaking naturally across lines without clipping. The serif emphasis remains legible, both CTAs stay within the viewport, and the Magnetic wrapper does not change the mobile vertical rhythm because touch pointers do not apply the transform.

## Wend / Zip browser audit — 26 Aug 2026

Wend runtime check passed: starting the daily puzzle, selecting the first three cells produced a three-letter trace, and Undo reduced it to two cells without clearing the run. The timer started and the live status announced the running state.

Zip runtime check passed: the active daily template rendered two visible wall segments, displayed zero legal-move dots before assistance, and showed zero exact next labels before Hint. After Hint, exactly one cell received the hinted state and one `hint` label appeared. The board exposed 25 grid cells with marker-aware accessible labels.

## Production route and header QA

A clean `next start` instance on port 4190 returned HTTP 200 for `/`, `/play`, `/blog`, a blog detail route, a project detail route, `/manifest.webmanifest`, `/sw.js`, `/sitemap.xml` and `/robots.txt`. The homepage response included Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, Strict-Transport-Security and long-lived static cache headers.

## Final release gate

The final gate passed with ESLint clean, 24 deterministic Vitest tests passing, Next production build generating all 18 routes, `npm audit --audit-level=high` reporting 0 vulnerabilities, and `git diff --check` reporting no whitespace errors. Zip coverage includes solvable daily templates, off-path wall invariants, blocked-edge movement, Hint, Undo and Clear semantics.

## Conversion and SEO checklist QA

The homepage browser audit shows three above-the-fold CTAs, exactly five FAQ disclosures, a response-window promise, region-level Maps and Directions links, Privacy and Thank You internal links, and the sticky mobile CTA. The 390px screenshot confirms the hero CTA stack stays within the viewport and the sticky CTA remains readable without horizontal overflow. Custom 404 recovery links were rechecked after clearing the service-worker cache and now render vertically with clear labels.

The checklist release gate added `/privacy` and `/thank-you`, BreadcrumbList/FAQPage/Person/WebSite JSON-LD, a sitemap entry for `/play` and `/privacy`, a noindex directive for Thank You, related case-study links, five non-empty FAQs, region-level Maps/Directions links, and a response window. The final test suite is 25/25 passing. A fresh production instance confirmed HTTP 200 for all public assets/routes, HTTP 404 for an unknown path, FAQPage only on `/`, BreadcrumbList on detail/legal pages, CreativeWork on case studies, and noindex on `/thank-you`.

During 404 visual QA, the browser's current stylesheet was confirmed stale: the loaded CSS asset did not contain the new `.not-found-links` rule while the updated JSX was present. This is consistent with the existing service-worker cache caveat; the cache must be unregistered/cleared before judging a CSS mismatch as a source defect. After unregistering the service worker and deleting the runtime cache, the recovery links rendered as a readable vertical list with supporting labels and a clear primary CTA. The visible issue badge was the local Next development overlay, not page content.

## Avatar branding QA

The supplied portrait is used as the shared header logo with an accessible link label and no duplicate screen-reader announcement. The original upload was confirmed to contain real RGBA transparency; the prior AI-derived asset had opaque checkerboard pixels and was replaced by a direct alpha-preserving WebP conversion from the supplied source. A 390px production screenshot confirmed the avatar, Signal Room label, theme toggle and menu button remain within the header without horizontal overflow. A fresh production instance returned HTTP 200 with the expected content types for `/favicon.ico`, `/phan-vinh-avatar.webp`, `/icon-192.png`, `/icon-512.png`, `/apple-touch-icon.png`, `/manifest.webmanifest` and `/sw.js`; the service worker reports `signal-room-v3`. A short production loader capture confirmed the portrait replaces `PV` inside the arcade screen with a clean transparent edge, scanline, ring glow and restrained float animation.
