export const FLAPPY_WORLD = { width: 300, height: 500 } as const;
export const FLAPPY_BIRD_X = 78;
export const FLAPPY_BIRD_RADIUS = 13;
export const FLAPPY_GROUND_HEIGHT = 52;
export const FLAPPY_PIPE_WIDTH = 46;
export const FLAPPY_PIPE_GAP = 138;

export type FlappyBird = { x: number; y: number; radius: number };
export type FlappyPipe = { x: number; gapTop: number; passed: boolean };

export function createFlappyPipe(x: number, gapTop: number): FlappyPipe {
  return { x, gapTop, passed: false };
}

export function isBirdOutOfBounds(bird: FlappyBird): boolean {
  return bird.y - bird.radius <= 0 || bird.y + bird.radius >= FLAPPY_WORLD.height - FLAPPY_GROUND_HEIGHT;
}

export function isBirdCollidingWithPipe(bird: FlappyBird, pipe: FlappyPipe): boolean {
  const overlapsX = bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + FLAPPY_PIPE_WIDTH;
  if (!overlapsX) return false;
  const gapBottom = pipe.gapTop + FLAPPY_PIPE_GAP;
  return bird.y - bird.radius < pipe.gapTop || bird.y + bird.radius > gapBottom;
}

export function getFlappyGapTop(seed: number): number {
  const normalized = Math.abs(Math.trunc(seed)) % 7;
  const gaps = [92, 142, 196, 118, 224, 168, 108];
  return gaps[normalized];
}
