# Signal Room Assets

## Art direction

The visual target is an editorial studio desk meeting a small arcade cabinet: warm off-white paper, cobalt hardware, luminous signal lines, graphite ink and acid-lime indicators. The portfolio uses the language of a printed field guide; the Play route turns the same system into a dark, tactile game room.

## Local assets

| Asset | Path | Purpose | Notes |
| --- | --- | --- | --- |
| Arcade key visual | `/public/arcade-keyvisual.webp` | Homepage hero and Signal Room teaser | Original generated visual, optimized to WebP at approximately 49 KB; suitable for local static delivery and Next image optimization |
| Service worker | `/public/sw.js` | Progressive offline caching | Configuration asset, not visual media; must be versioned on release |

The original approximately 4.6 MB JPG was intentionally removed. No remote image dependency is required for the current experience. Project cards use UI compositions and content-driven visuals rather than a large media library, which keeps the first visit fast.

## Asset rules

New visual assets must have a clear route purpose, an accessible alt strategy and a performance budget. Prefer CSS composition or small generated assets for editorial surfaces. Any future heavy asset should be optimized before commit and evaluated against offline cache size. The hero image should remain priority-loaded only where it is genuinely above the fold; below-fold repetitions should remain non-priority.
