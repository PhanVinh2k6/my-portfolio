# Signal Room Structure

## Runtime

The site remains a static-first Next.js 16 App Router application with React 19 and TypeScript. Content is compiled from `lib/content.ts`; portfolio and journal routes are statically generated. The application has no user account, server-side game room or realtime transport.

## UI layers

| Layer | Responsibility | Key locations |
| --- | --- | --- |
| App shell | Metadata, JSON-LD, theme bootstrap, analytics opt-in, global transitions | `app/layout.tsx`, `app/globals.css` |
| Editorial routes | Homepage, blog index/articles, project index/details and not-found experience | `app/page.tsx`, `app/blog/**`, `app/projects/**`, `app/not-found.tsx` |
| Shared primitives | Theme, page header, project explorer, blog explorer and loading experiences | `components/ThemeToggle.tsx`, `components/PageHeader.tsx`, `components/ProjectExplorer.tsx`, `components/BlogExplorer.tsx`, `components/ArcadeLoader.tsx` |
| Arcade shell | Game selector, mode controls, instructions, reset flow and route-level offline registration | `app/play/page.tsx`, `components/GameHub.tsx`, `components/OfflineRegistration.tsx` |
| Game UI | Accessible, responsive boards and score/status presentation | `components/CaroGame.tsx`, `components/DotsBoxesGame.tsx`, `components/SudokuGame.tsx`, `components/OfflineGame.tsx` |
| Game engines | Framework-free immutable state transitions, validation, win detection and bot selection | `lib/games/caro.ts`, `lib/games/dots.ts`, `lib/games/sudoku.ts` |
| PWA layer | Manifest, versioned service worker and progressive registration | `app/manifest.ts`, `public/sw.js`, `components/OfflineRegistration.tsx` |

## Engine contract

React owns presentation state such as the selected mode, current engine state, bot timer lifecycle and transient interaction feedback. The game engines own all rules. UI components call pure functions and never duplicate win, ownership, turn or validation rules. Bot functions return a legal move or `undefined`; they do not mutate state or access timers.

Each engine must support a deterministic test surface:

- `caro.ts` exposes state creation, legal move application, winner/draw detection and a tactical bot move selector.
- `dots.ts` exposes state creation, edge validation, edge application, box detection, score/turn resolution and a legal bot edge selector.
- `sudoku.ts` exposes puzzle creation, solution-backed validation and immutable cell updates.

## Styling system

`app/globals.css` is the single global design system. It defines Signal Room tokens, typography, layout primitives, responsive breakpoints, focus states, light/dark theme variables, board components and reduced-motion fallbacks. New styles should be grouped by concern and should not append a second legacy system.

## Responsive rules

The layout is mobile-first. The primary breakpoint is around 800px for collapsing editorial grids and navigation; a compact mobile breakpoint is around 560px for smaller type, controls and board spacing. Every interactive control must remain keyboard reachable with visible focus. Game boards use square aspect ratios, bounded widths and touch-safe hit areas; local multiplayer labels make same-device play explicit.

## Navigation and loading

The homepage uses hash navigation for sections and regular routes for Journal and Play. Play has a dedicated entry animation. The global loader is limited to an intentional first-load moment or route entry rather than blocking every internal navigation. A reduced-motion user receives an abbreviated/non-blocking state.
