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
