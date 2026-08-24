'use client';

import { useEffect, useMemo, useState } from 'react';

type Owner = 'you' | 'bot';
type Edge = { orientation: 'h' | 'v'; index: number };
type DotsState = { h: boolean[]; v: boolean[]; boxes: (Owner | null)[]; scores: Record<Owner, number>; turn: Owner | null; winner: Owner | 'draw' | null };
const emptyState = (): DotsState => ({ h: Array(12).fill(false), v: Array(12).fill(false), boxes: Array(9).fill(null), scores: { you: 0, bot: 0 }, turn: 'you', winner: null });
const edges: Edge[] = [...Array.from({ length: 12 }, (_, index) => ({ orientation: 'h' as const, index })), ...Array.from({ length: 12 }, (_, index) => ({ orientation: 'v' as const, index }))];

function boxComplete(box: number, h: boolean[], v: boolean[]) {
  const row = Math.floor(box / 3); const col = box % 3;
  return h[row * 4 + col] && h[(row + 1) * 4 + col] && v[row * 3 + col] && v[row * 3 + col + 1];
}

function applyEdge(state: DotsState, edge: Edge, owner: Owner): DotsState {
  const h = [...state.h]; const v = [...state.v];
  if (edge.orientation === 'h') h[edge.index] = true; else v[edge.index] = true;
  const boxes = [...state.boxes]; let claimed = 0;
  boxes.forEach((value, index) => { if (!value && boxComplete(index, h, v)) { boxes[index] = owner; claimed += 1; } });
  const scores = { ...state.scores, [owner]: state.scores[owner] + claimed };
  const finished = boxes.every(Boolean);
  const winner = finished ? (scores.you === scores.bot ? 'draw' : scores.you > scores.bot ? 'you' : 'bot') : null;
  return { h, v, boxes, scores, winner, turn: winner ? null : claimed ? owner : owner === 'you' ? 'bot' : 'you' };
}

function completesBox(state: DotsState, edge: Edge) {
  const h = [...state.h]; const v = [...state.v]; if (edge.orientation === 'h') h[edge.index] = true; else v[edge.index] = true;
  return state.boxes.some((value, index) => !value && boxComplete(index, h, v));
}

export default function DotsBoxesGame() {
  const [game, setGame] = useState<DotsState>(emptyState);
  const available = useMemo(() => edges.filter((edge) => !(edge.orientation === 'h' ? game.h[edge.index] : game.v[edge.index])), [game.h, game.v]);
  const status = game.winner ? game.winner === 'draw' ? 'Draw. Every box is claimed.' : `${game.winner === 'you' ? 'You' : 'Bot'} win the grid.` : game.turn === 'you' ? 'Your turn. Close a box for an extra move.' : 'Bot is choosing a line…';

  const reset = () => setGame(emptyState());
  const play = (edge: Edge) => { if (game.turn !== 'you' || game.winner) return; setGame((current) => applyEdge(current, edge, 'you')); };

  useEffect(() => {
    if (game.turn !== 'bot' || game.winner) return undefined;
    const timer = window.setTimeout(() => {
      setGame((current) => {
        const free = edges.filter((edge) => !(edge.orientation === 'h' ? current.h[edge.index] : current.v[edge.index]));
        const edge = free.find((item) => completesBox(current, item)) ?? free[Math.floor(free.length / 2)];
        return edge ? applyEdge(current, edge, 'bot') : current;
      });
    }, 480);
    return () => window.clearTimeout(timer);
  }, [game.turn, game.winner]);

  return <div className="mini-game mini-game-dots"><div className="mini-game-head"><div><p className="eyebrow">Dots & Boxes / 3 × 3</p><h3>Draw a line, <em>own a box</em></h3></div><div className="mini-game-score"><span>You <b className="mark-x">{game.scores.you}</b></span><span>Bot <b className="mark-o">{game.scores.bot}</b></span></div></div><div className="dots-board" aria-label="Dots and Boxes board">{game.boxes.map((owner, index) => <div key={`box-${index}`} className={`dots-box ${owner ? `owned-by-${owner}` : ''}`} style={{ left: `${(index % 3) * 33.333}%`, top: `${Math.floor(index / 3) * 33.333}%` }}>{owner === 'you' ? 'X' : owner === 'bot' ? 'O' : ''}</div>)}{Array.from({ length: 12 }, (_, index) => { const row = Math.floor(index / 3); const col = index % 3; return <button key={`h-${index}`} type="button" aria-label={`Horizontal line ${index + 1}`} className={`dots-line dots-line-h ${game.h[index] ? 'is-taken taken-you' : ''}`} style={{ left: `${col * 33.333}%`, top: `${row * 33.333}%` }} onClick={() => play({ orientation: 'h', index })} disabled={game.h[index] || game.turn !== 'you' || Boolean(game.winner)} />; })}{Array.from({ length: 12 }, (_, index) => { const row = Math.floor(index / 4); const col = index % 4; return <button key={`v-${index}`} type="button" aria-label={`Vertical line ${index + 1}`} className={`dots-line dots-line-v ${game.v[index] ? 'is-taken taken-you' : ''}`} style={{ left: `${col * 33.333}%`, top: `${row * 33.333}%` }} onClick={() => play({ orientation: 'v', index })} disabled={game.v[index] || game.turn !== 'you' || Boolean(game.winner)} />; })}{Array.from({ length: 16 }, (_, index) => <i key={`dot-${index}`} className="dots-dot" style={{ left: `${(index % 4) * 33.333}%`, top: `${Math.floor(index / 4) * 33.333}%` }} />)}<div className="dots-status">{status}</div></div><div className="mini-game-footer"><span>{available.length} lines left</span><button type="button" onClick={reset}>Reset grid ↻</button></div></div>;
}
