# Signal Room Rebuild Plan

## Product direction

Signal Room is a premium editorial portfolio with a separate offline arcade room. The public site should feel quiet, intentional and work-first; the Play route should feel tactile, playful and publisher-quality without pretending to be an online multiplayer service.

The visual language is built around warm paper, ink black, cobalt blue, acid-lime signals, oversized editorial typography, thin instrumentation lines and asymmetric editorial grids. Motion should be purposeful: short reveal transitions, hover response, tactile button press states and a console-style entry sequence on first visit to the site and on entry to Play. All non-essential motion must respect `prefers-reduced-motion`.

## Scope

The rebuild preserves the existing static-first Next.js App Router architecture and its SEO, social metadata, blog/project content, GA4 opt-in, theme toggle, security headers, deployment guide and PWA foundations. No speculative backend is added because the current requirements are satisfied by static content and same-device offline play. Multiplayer means local players sharing one device.

The arcade contains four clearly differentiated games:

| Game | Players | Core promise | Offline requirement |
| --- | --- | --- | --- |
| Signal Sprint | Solo | Fast reflex / pattern response | Works without network after warm visit |
| Caro / Gomoku | Bot or 2 local players | 9×9 board, five in a row | Deterministic rules and legal bot moves |
| Sudoku | Solo | Engine-backed puzzle and validation | Puzzle state is local-only |
| Dots & Boxes | Bot or 2–4 local players | 3×3 boxes, extra turn on capture | Complete edge/box ownership model |

## High-risk slices and verification gates

1. **Pure game rules first.** All engines live in `lib/games/` and must be testable without React or browser APIs.
2. **Caro correctness.** Verify horizontal, vertical and both diagonal five-in-a-row wins, no false positives for three/four, draw detection, illegal moves, immutable updates and bot win/block choices.
3. **Dots & Boxes correctness.** Verify edge bounds and duplicate rejection, box ownership, extra turns after a capture, turn rotation otherwise, score totals and winner/draw for 2, 3 and 4 local players, plus legal bot choices.
4. **Sudoku correctness.** Verify row/column/3×3 box duplicates, fixed-cell immutability, clearing, candidate validation and correct completion.
5. **UI state safety.** Verify bot timers cancel on reset/unmount, controls are keyboard reachable, game boards have labels/focus states, and no state update occurs directly inside render/effect setup in a way that triggers cascading renders.
6. **Offline reliability.** Service worker is progressive enhancement only. The first page load works normally; a warmed visit to `/play` remains usable after network loss. Cache versioning and activation must allow future releases to replace stale assets.
7. **Responsive quality.** Check at minimum 390px mobile, 768px tablet and desktop widths. Touch targets should be comfortably tappable and boards must not overflow the viewport.

## Release gates

- `npm run lint` passes without errors.
- `npm run build` succeeds and all static routes generate.
- `npm audit --audit-level=high` reports no high-severity vulnerabilities.
- `git diff --check` is clean.
- Browser QA confirms homepage, blog, project detail, theme toggle, filters/search, Play modes, resets and route escape paths.
- Production server headers include the existing defensive security policy.
- The generated `public/arcade-keyvisual.webp` is committed; the original heavy JPG is not reintroduced.
- README and DEPLOY documentation describe the actual product, local multiplayer scope and PWA behavior.
