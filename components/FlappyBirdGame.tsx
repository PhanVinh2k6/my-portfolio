'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FLAPPY_BIRD_RADIUS,
  FLAPPY_BIRD_X,
  FLAPPY_GROUND_HEIGHT,
  FLAPPY_PIPE_GAP,
  FLAPPY_PIPE_WIDTH,
  FLAPPY_WORLD,
  createFlappyPipe,
  getFlappyGapTop,
  isBirdCollidingWithPipe,
  isBirdOutOfBounds,
  type FlappyPipe,
} from '@/lib/games/flappy';

type FlappyStatus = 'ready' | 'playing' | 'gameover';
type FlappyRuntime = {
  birdY: number;
  birdVelocity: number;
  elapsed: number;
  nextPipeAt: number;
  nextGapSeed: number;
  score: number;
  status: FlappyStatus;
  pipes: FlappyPipe[];
};

const BEST_SCORE_KEY = 'signal-room-flappy-best-score';
const GRAVITY = 850;
const FLAP_VELOCITY = -315;
const PIPE_SPEED = 155;
const PIPE_INTERVAL = 1.55;

function createRuntime(): FlappyRuntime {
  return {
    birdY: FLAPPY_WORLD.height * 0.42,
    birdVelocity: 0,
    elapsed: 0,
    nextPipeAt: 0.7,
    nextGapSeed: 0,
    score: 0,
    status: 'ready',
    pipes: [],
  };
}

function getBestScore(): number {
  if (typeof window === 'undefined') return 0;
  try {
    return Number(window.localStorage.getItem(BEST_SCORE_KEY) || 0);
  } catch {
    return 0;
  }
}

function drawPipe(context: CanvasRenderingContext2D, x: number, y: number, height: number, capAtBottom: boolean) {
  const gradient = context.createLinearGradient(x, 0, x + FLAPPY_PIPE_WIDTH, 0);
  gradient.addColorStop(0, '#3157c7');
  gradient.addColorStop(0.52, '#a9bdff');
  gradient.addColorStop(1, '#17285f');
  context.fillStyle = gradient;
  context.fillRect(x, y, FLAPPY_PIPE_WIDTH, height);
  const capY = capAtBottom ? y : y + height - 16;
  context.fillRect(x - 5, capY, FLAPPY_PIPE_WIDTH + 10, 16);
  context.fillStyle = 'rgba(255,255,255,.22)';
  context.fillRect(x + 7, y, 4, height);
}

function drawGame(canvas: HTMLCanvasElement, runtime: FlappyRuntime) {
  const context = canvas.getContext('2d');
  if (!context) return;

  const scale = Math.min(canvas.width / FLAPPY_WORLD.width, canvas.height / FLAPPY_WORLD.height);
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.setTransform(scale, 0, 0, scale, 0, 0);

  const sky = context.createLinearGradient(0, 0, 0, FLAPPY_WORLD.height);
  sky.addColorStop(0, '#101b4b');
  sky.addColorStop(0.62, '#3157c7');
  sky.addColorStop(1, '#9fe2b0');
  context.fillStyle = sky;
  context.fillRect(0, 0, FLAPPY_WORLD.width, FLAPPY_WORLD.height);

  context.fillStyle = 'rgba(255,255,255,.09)';
  for (let index = 0; index < 8; index += 1) {
    const x = 24 + index * 46;
    const y = 58 + (index % 3) * 33;
    context.fillRect(x, y, 18, 2);
    context.fillRect(x + 8, y - 5, 10, 2);
  }

  context.fillStyle = 'rgba(16,27,75,.2)';
  context.beginPath();
  context.moveTo(0, 330);
  context.lineTo(70, 280);
  context.lineTo(132, 335);
  context.lineTo(205, 266);
  context.lineTo(300, 336);
  context.lineTo(300, FLAPPY_WORLD.height - FLAPPY_GROUND_HEIGHT);
  context.lineTo(0, FLAPPY_WORLD.height - FLAPPY_GROUND_HEIGHT);
  context.closePath();
  context.fill();

  runtime.pipes.forEach((pipe) => {
    drawPipe(context, pipe.x, 0, pipe.gapTop, false);
    drawPipe(context, pipe.x, pipe.gapTop + FLAPPY_PIPE_GAP, FLAPPY_WORLD.height - FLAPPY_GROUND_HEIGHT - pipe.gapTop - FLAPPY_PIPE_GAP, true);
  });

  context.fillStyle = '#111313';
  context.fillRect(0, FLAPPY_WORLD.height - FLAPPY_GROUND_HEIGHT, FLAPPY_WORLD.width, FLAPPY_GROUND_HEIGHT);
  context.fillStyle = '#9fe2b0';
  for (let x = -20; x < FLAPPY_WORLD.width + 20; x += 32) context.fillRect(x, FLAPPY_WORLD.height - FLAPPY_GROUND_HEIGHT + 8, 19, 3);
  context.fillStyle = 'rgba(255,255,255,.18)';
  context.fillRect(0, FLAPPY_WORLD.height - FLAPPY_GROUND_HEIGHT, FLAPPY_WORLD.width, 2);

  const birdAngle = Math.max(-0.35, Math.min(1.05, runtime.birdVelocity / 420));
  context.save();
  context.translate(FLAPPY_BIRD_X, runtime.birdY);
  context.rotate(birdAngle);
  context.shadowColor = 'rgba(0,0,0,.35)';
  context.shadowBlur = 10;
  context.fillStyle = '#f6d365';
  context.beginPath();
  context.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
  context.fill();
  context.shadowBlur = 0;
  context.fillStyle = '#ca6672';
  context.beginPath();
  context.ellipse(-4, 8, 10, 4, -0.25, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#fff';
  context.beginPath();
  context.arc(7, -5, 4.5, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#111313';
  context.beginPath();
  context.arc(8, -5, 1.8, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#f29aa7';
  context.beginPath();
  context.moveTo(12, -1);
  context.lineTo(24, 2);
  context.lineTo(12, 5);
  context.closePath();
  context.fill();
  context.restore();

  context.setTransform(1, 0, 0, 1, 0, 0);
}

export default function FlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<FlappyRuntime>(createRuntime());
  const animationRef = useRef<number | null>(null);
  const [status, setStatus] = useState<FlappyStatus>('ready');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => getBestScore());
  const [message, setMessage] = useState('Tap, click or press Space to take off.');

  const resetGame = useCallback(() => {
    runtimeRef.current = createRuntime();
    setScore(0);
    setStatus('ready');
    setMessage('Tap, click or press Space to take off.');
  }, []);

  const startGame = useCallback(() => {
    const runtime = runtimeRef.current;
    if (runtime.status === 'gameover') {
      resetGame();
      return;
    }
    runtime.status = 'playing';
    runtime.birdVelocity = FLAP_VELOCITY;
    setStatus('playing');
    setMessage('Stay between the signals.');
  }, [resetGame]);

  const flap = useCallback(() => {
    const runtime = runtimeRef.current;
    if (runtime.status === 'ready') {
      startGame();
      return;
    }
    if (runtime.status === 'gameover') {
      resetGame();
      return;
    }
    runtime.birdVelocity = FLAP_VELOCITY;
    setMessage('');
  }, [resetGame, startGame]);

  const finishGame = useCallback(() => {
    const runtime = runtimeRef.current;
    if (runtime.status !== 'playing') return;
    runtime.status = 'gameover';
    setStatus('gameover');
    setMessage('Signal lost. Try another flight.');
    setBest((currentBest) => {
      const nextBest = Math.max(currentBest, runtime.score);
      if (nextBest > currentBest) {
        try {
          window.localStorage.setItem(BEST_SCORE_KEY, String(nextBest));
        } catch {
          // Storage is optional; the score remains available for this session.
        }
      }
      return nextBest;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const resize = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(FLAPPY_WORLD.width * devicePixelRatio);
      canvas.height = Math.round(FLAPPY_WORLD.height * devicePixelRatio);
      drawGame(canvas, runtimeRef.current);
    };
    resize();

    let previousTime = performance.now();
    const frame = (time: number) => {
      const runtime = runtimeRef.current;
      const delta = Math.min(34, time - previousTime) / 1000;
      previousTime = time;
      if (runtime.status === 'playing') {
        runtime.elapsed += delta;
        runtime.birdVelocity += GRAVITY * delta;
        runtime.birdY += runtime.birdVelocity * delta;
        if (runtime.elapsed >= runtime.nextPipeAt) {
          runtime.pipes.push(createFlappyPipe(FLAPPY_WORLD.width + 18, getFlappyGapTop(runtime.nextGapSeed)));
          runtime.nextGapSeed += 1;
          runtime.nextPipeAt = runtime.elapsed + PIPE_INTERVAL;
        }
        runtime.pipes.forEach((pipe) => { pipe.x -= PIPE_SPEED * delta; });
        runtime.pipes = runtime.pipes.filter((pipe) => pipe.x > -FLAPPY_PIPE_WIDTH - 12);
        runtime.pipes.forEach((pipe) => {
          if (!pipe.passed && pipe.x + FLAPPY_PIPE_WIDTH < FLAPPY_BIRD_X - FLAPPY_BIRD_RADIUS) {
            pipe.passed = true;
            runtime.score += 1;
            setScore(runtime.score);
          }
        });
        const bird = { x: FLAPPY_BIRD_X, y: runtime.birdY, radius: FLAPPY_BIRD_RADIUS };
        if (isBirdOutOfBounds(bird) || runtime.pipes.some((pipe) => isBirdCollidingWithPipe(bird, pipe))) finishGame();
      }
      drawGame(canvas, runtime);
      animationRef.current = window.requestAnimationFrame(frame);
    };
    animationRef.current = window.requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
    };
  }, [finishGame]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') {
      event.preventDefault();
      flap();
    }
  };

  return (
    <section className="game-section content-section" aria-labelledby="flappy-bird-title">
      <div className="game-shell flappy-shell">
        <div className="game-header"><div><p className="eyebrow">Signal / 007</p><h2 id="flappy-bird-title">Fly the<br /><em>signal.</em></h2></div><div className="game-stats"><div><small>Score</small><strong>{score.toString().padStart(2, '0')}</strong></div><div><small>Best</small><strong>{best.toString().padStart(2, '0')}</strong></div><div><small>State</small><strong>{status === 'playing' ? 'ON' : status === 'gameover' ? 'OUT' : 'RDY'}</strong></div></div></div>
        <div className={`flappy-stage is-${status}`}>
          <canvas ref={canvasRef} className="flappy-canvas" tabIndex={0} role="img" aria-label="Flappy Bird game board" aria-describedby="flappy-instructions" onPointerDown={(event) => { event.preventDefault(); event.currentTarget.focus({ preventScroll: true }); flap(); }} onKeyDown={handleKeyDown} />
          {status !== 'playing' && <div className="flappy-overlay"><p>{message}</p><button className="game-start" type="button" onClick={status === 'ready' ? startGame : resetGame}>{status === 'gameover' ? 'Run again' : 'Start flight'} <span>↗</span></button></div>}
        </div>
        <p id="flappy-instructions" className="flappy-instructions">Tap or click the game, or focus the board and press Space, ArrowUp or W to flap. The game is offline-ready and the best score stays on this device.</p>
        <div className="game-footer"><span>Offline-ready / touch + keyboard</span><span>Local best score / no account</span></div>
      </div>
    </section>
  );
}
