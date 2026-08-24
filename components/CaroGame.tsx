'use client';

import { useEffect, useState } from 'react';
import { CARO_SIZE, CaroState, chooseCaroBotMove, createCaroState, playCaroMove } from '@/lib/games/caro';

type CaroMode = 'bot' | 'local';

export default function CaroGame() {
  const [mode, setMode] = useState<CaroMode>('bot');
  const [game, setGame] = useState<CaroState>(createCaroState);
  const botThinking = mode === 'bot' && game.turn === 'O' && !game.result;
  const status = game.result ? game.result === 'draw' ? 'Draw — the board is full.' : `${game.result === 'X' ? (mode === 'bot' ? 'You' : 'Player 1') : (mode === 'bot' ? 'Bot' : 'Player 2')} wins.` : botThinking ? 'Bot is thinking…' : mode === 'bot' && game.turn === 'O' ? 'Bot turn.' : mode === 'local' ? `${game.turn === 'X' ? 'Player 1' : 'Player 2'} turn.` : 'Your turn.';

  const reset = (nextMode = mode) => { setMode(nextMode); setGame(createCaroState());  };
  const play = (index: number) => { if (game.result || botThinking || (mode === 'bot' && game.turn === 'O')) return; setGame((current) => playCaroMove(current, index)); };

  useEffect(() => {
    if (mode !== 'bot' || game.turn !== 'O' || game.result) return undefined;
    const timer = window.setTimeout(() => {
      setGame((current) => { const move = chooseCaroBotMove(current.board); return move === undefined ? current : playCaroMove(current, move, 'O'); });
    }, 420);
    return () => window.clearTimeout(timer);
  }, [game.result, game.turn, mode]);

  return <div className="mini-game mini-game-caro"><div className="mini-game-head"><div><p className="eyebrow">Caro / Gomoku 5</p><h3>Five in a row, <em>think ahead.</em></h3></div><div className="mini-game-score"><span>{mode === 'bot' ? 'You' : 'P1'} <b className="mark-x">X</b></span><span>{mode === 'bot' ? 'Bot' : 'P2'} <b className="mark-o">O</b></span></div></div><div className="game-mode-switch" role="group" aria-label="Caro game mode"><button type="button" className={mode === 'bot' ? 'is-active' : ''} onClick={() => reset('bot')}>Play bot</button><button type="button" className={mode === 'local' ? 'is-active' : ''} onClick={() => reset('local')}>2 players</button></div><div className="caro-board caro-board-large" role="grid" aria-label="Caro 9 by 9 board">{game.board.map((mark, index) => <button key={index} type="button" role="gridcell" aria-label={`Row ${Math.floor(index / CARO_SIZE) + 1}, column ${(index % CARO_SIZE) + 1}${mark ? ` ${mark}` : ', empty'}`} className={`caro-cell ${mark ? `has-${mark.toLowerCase()}` : ''}`} onClick={() => play(index)} disabled={Boolean(mark) || Boolean(game.result) || botThinking || (mode === 'bot' && game.turn === 'O')}>{mark}</button>)}</div><div className="mini-game-footer"><span>{status} {game.moves > 0 && !game.result ? `· ${game.moves} moves` : ''}</span><button type="button" onClick={() => reset()}>New match ↻</button></div></div>;
}
