'use client';

import { useEffect, useState } from 'react';
import { DotsEdge, DotsPlayer, DotsState, chooseDotsBotEdge, createDotsState, playDotsEdge } from '@/lib/games/dots';

type DotsMode = 'bot' | 'local';
const label: Record<DotsPlayer, string> = { P1: 'P1', P2: 'P2', P3: 'P3', P4: 'P4' };

export default function DotsBoxesGame() {
  const [mode, setMode] = useState<DotsMode>('bot');
  const [playerCount, setPlayerCount] = useState<2 | 3 | 4>(2);
  const [game, setGame] = useState<DotsState>(createDotsState());
  const players = mode === 'bot' ? ['P1', 'P2'] as DotsPlayer[] : (['P1', 'P2', 'P3', 'P4'].slice(0, playerCount) as DotsPlayer[]);
  const active = game.players[game.activePlayer];
  const botThinking = mode === 'bot' && active === 'P2' && !game.winner;
  const status = game.winner ? game.winner === 'draw' ? 'Draw — every box is claimed.' : `${game.winner === 'P1' ? 'You' : game.winner === 'P2' && mode === 'bot' ? 'Bot' : label[game.winner]} win the grid.` : botThinking ? 'Bot is choosing a line…' : mode === 'bot' && active === 'P1' ? 'Your turn. Close a box for an extra move.' : `${label[active]} turn. Close a box for an extra move.`;

  const reset = (nextMode = mode, nextCount = playerCount) => { setMode(nextMode); setPlayerCount(nextCount); setGame(createDotsState(nextMode === 'bot' ? ['P1', 'P2'] : (['P1', 'P2', 'P3', 'P4'].slice(0, nextCount) as DotsPlayer[])));  };
  const play = (edge: DotsEdge) => { if (game.winner || botThinking || (mode === 'bot' && active === 'P2')) return; setGame((current) => playDotsEdge(current, edge)); };

  useEffect(() => {
    if (mode !== 'bot' || active !== 'P2' || game.winner) return undefined;
    const timer = window.setTimeout(() => { setGame((current) => { const edge = chooseDotsBotEdge(current); return edge ? playDotsEdge(current, edge, 'P2') : current; }); }, 500);
    return () => window.clearTimeout(timer);
  }, [active, game.winner, mode]);

  return <div className="mini-game mini-game-dots"><div className="mini-game-head"><div><p className="eyebrow">Dots &amp; Boxes / 3 × 3</p><h3>Draw a line, <em>own a box.</em></h3></div><div className="mini-game-score">{players.map((player) => <span key={player}>{player === 'P2' && mode === 'bot' ? 'Bot' : label[player]} <b className={player === 'P1' ? 'mark-x' : 'mark-o'}>{game.scores[player] ?? 0}</b></span>)}</div></div><div className="game-mode-switch" role="group" aria-label="Dots and Boxes game mode"><button type="button" className={mode === 'bot' ? 'is-active' : ''} onClick={() => reset('bot', 2)}>Play bot</button><button type="button" className={mode === 'local' ? 'is-active' : ''} onClick={() => reset('local', playerCount)}>Local room</button></div>{mode === 'local' && <div className="player-count-switch" role="group" aria-label="Number of local players">{[2, 3, 4].map((count) => <button type="button" key={count} className={playerCount === count ? 'is-active' : ''} onClick={() => reset('local', count as 2 | 3 | 4)}>{count} players</button>)}</div>}<div className="dots-board" aria-label="Dots and Boxes board">{game.boxes.flatMap((row, boxRow) => row.map((owner, boxCol) => <div key={`box-${boxRow}-${boxCol}`} className={`dots-box ${owner ? `owned-by-${owner.toLowerCase()}` : ''}`} style={{ left: `${boxCol * 33.333}%`, top: `${boxRow * 33.333}%` }}>{owner ? label[owner] : ''}</div>))}{Array.from({ length: 12 }, (_, index) => { const row = Math.floor(index / 3); const col = index % 3; const owner = game.horizontalOwner[row][col]; return <button key={`h-${index}`} type="button" aria-label={`Horizontal line ${index + 1}`} className={`dots-line dots-line-h ${owner ? `is-taken taken-${owner.toLowerCase()}` : ''}`} style={{ left: `${col * 33.333}%`, top: `${row * 33.333}%` }} onClick={() => play({ axis: 'h', row, col })} disabled={Boolean(owner) || Boolean(game.winner) || botThinking || (mode === 'bot' && active === 'P2')} />; })}{Array.from({ length: 12 }, (_, index) => { const row = Math.floor(index / 4); const col = index % 4; const owner = game.verticalOwner[row][col]; return <button key={`v-${index}`} type="button" aria-label={`Vertical line ${index + 1}`} className={`dots-line dots-line-v ${owner ? `is-taken taken-${owner.toLowerCase()}` : ''}`} style={{ left: `${col * 33.333}%`, top: `${row * 33.333}%` }} onClick={() => play({ axis: 'v', row, col })} disabled={Boolean(owner) || Boolean(game.winner) || botThinking || (mode === 'bot' && active === 'P2')} />; })}{Array.from({ length: 16 }, (_, index) => <i key={`dot-${index}`} className="dots-dot" style={{ left: `${(index % 4) * 33.333}%`, top: `${Math.floor(index / 4) * 33.333}%` }} />)}<div className="dots-status">{status}</div></div><div className="mini-game-footer"><span>{24 - game.horizontal.flat().filter(Boolean).length - game.vertical.flat().filter(Boolean).length} lines left · {mode === 'bot' ? 'bot enabled' : `${players.length} local players`}</span><button type="button" onClick={() => reset()}>New grid ↻</button></div></div>;
}
