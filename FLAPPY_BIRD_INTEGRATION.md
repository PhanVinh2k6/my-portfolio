# Flappy Bird integration notes

## Upstream audit

The requested upstream repository is [noanonoa/flappy-bird](https://github.com/noanonoa/flappy-bird), currently on its `master` branch. Its README describes a small HTML/CSS canvas game with click and Space controls, gravity/flap physics, scrolling pipes, score tracking and collision-based game over.

GitHub reports no repository license, and the repository contains no `LICENSE` or `COPYING` file. The README also attributes the visual sprite sheets and sound files to third-party sources. Those materials are therefore not copied into Signal Room. The integration uses a clean-room React canvas implementation of the gameplay concept and preserves this attribution link for reference.

## Signal Room adaptation

Flappy Bird is added as an offline-ready seventh game in the existing Play hub. The implementation is intentionally framework-local and does not depend on the upstream page's global variables, fixed 300 × 500 layout, `setInterval` loop, or unlicensed sprite/audio assets.

The adapted game uses a responsive canvas with device-pixel-ratio scaling, `requestAnimationFrame`, pointer/touch/keyboard input, a pause-safe lifecycle, a local best score, a reduced-motion-friendly presentation, and accessible control instructions. Visuals are drawn with canvas primitives and Signal Room colors so the game can ship without unverified third-party media.

## Verification gates

- Start, flap, pipe movement, scoring and collision must be deterministic enough to test.
- Pointer/touch input must not scroll the page while playing.
- Space, ArrowUp and W must work on desktop; buttons must remain reachable on touch devices.
- Resize and device-pixel-ratio changes must preserve playable geometry.
- Canvas must be disposed cleanly when switching tabs.
- Local best score must fail safely when storage is unavailable.
- The game must remain available after the PWA cache is warm and the device is offline.
