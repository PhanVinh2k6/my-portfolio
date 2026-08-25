# ReactBits integration research

## Sources

- ReactBits Animated Content: https://reactbits.dev/animations/animated-content
- ReactBits Spotlight Card: https://reactbits.dev/components/spotlight-card
- ReactBits Installation: https://reactbits.dev/get-started/installation

## Findings

ReactBits presents source-copyable animated React components rather than requiring a single runtime package. Animated Content exposes scroll/mount reveal controls such as direction, distance, duration, delay, opacity, scale and threshold, and its documented dependency is GSAP. Spotlight Card exposes a small API centered on `spotlightColor` and `className`, using a pointer-driven radial spotlight effect.

## Signal Room decision

Use the ReactBits interaction patterns as inspiration but keep the implementation local and dependency-light in this existing Next.js static project. The selected layer will be a native client-side progressive enhancement: scroll reveal via IntersectionObserver, pointer spotlight on project cards, and a restrained text/number reveal. No global GSAP runtime or heavy cursor effect will be added. Static content remains visible without JavaScript, touch devices do not depend on hover, and `prefers-reduced-motion` disables non-essential transforms/transitions.
