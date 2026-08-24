'use client';

import { useEffect, useMemo, useState } from 'react';

type Mark = 'X' | 'O' | null;
const SIZE = 9;
const emptyBoard = (): Mark[] => Array.from({ length: SIZE * SIZE }, () => null);

function winner(board: Mark[]) {
  for (let row = 0; row < SIZE; row += 1) for (let col = 0; col < SIZE; col += 1) {
    const mark = board[row * SIZE + col];
    if (!mark) continue;
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (const [dr, dc] of directions) {
      const cells = [0, 1, 2].map((step) => [row + dr * step, col + dc * step]);
      if (cells.every(([r, c]) => r >= 0 && r < SIZE && c >= 0 && c < SIZE && board[r * SIZE + c] === mark)) return mark;
    }
  }
  return board.every(Boolean) ? 'draw' : null;
}

function botMove(board: Mark[]) {
  const available = board.map((value, index) => value ? null : index).filter((index): index is number => index !== null);
  const scoreMove = (mark: Mark) => available.find((index) => { const copy = [...board]; copy[index] = mark; return winner(copy) === mark; });
  return scoreMove('O') ?? scoreMove('X') ?? available.sort((a, b) => Math.abs(40 - a) - Math.abs(40 - b))[0];
}

export default function CaroGame() {
  const [board, setBoard] = useState<Mark[]>(emptyBoard);
  const [turn, setTurn] = useState<Mark>('X');
  const [result, setResult] = useState<string | null>(null);
  const [botThinking, setBotThinking] = useState(false);
  const status = result ? (result === 'draw' ? 'Draw game.' : `${result === 'X' ? 'You' : 'Bot'} win.`) : botThinking ? 'Bot is thinking…' : turn === 'X' ? 'Your turn.' : 'Bot turn.';

  const reset = () => { setBoard(emptyBoard()); setTurn('X'); setResult(null); setBotThinking(false); };

  const play = (index: number) => {
    if (board[index] || turn !== 'X' || result || botThinking) return;
    const next = [...board]; next[index] = 'X'; const gameResult = winner(next);
    setBoard(next);
    if (gameResult) { setResult(gameResult); return; }
    setTurn('O'); setBotThinking(true);
  };

  useEffect(() => {
    if (turn !== 'O' || result) return undefined;
    const timer = window.setTimeout(() => {
      setBoard((current) => {
        const move = botMove(current); if (move === undefined) return current;
        const next = [...current]; next[move] = 'O'; const gameResult = winner(next);
        setResult(gameResult);
        setTurn(gameResult ? null : 'X'); setBotThinking(false);
        return next;
      });
    }, 420);
    return () => window.clearTimeout(timer);
  }, [result, turn]);

  const filled = useMemo(() => board.filter(Boolean).length, [board]);

  return <div className="mini-game mini-game-caro"><div className="mini-game-head"><div><p className="eyebrow">Caro / 3 in a row</p><h3>Human <em>vs.</em> machine</h3></div><div className="mini-game-score"><span>You <b className="mark-x">X</b></span><span>Bot <b className="mark-o">O</b></span></div></div><div className="caro-board" role="grid" aria-label="Caro board">{board.map((mark, index) => <button key={index} type="button" role="gridcell" aria-label={`Cell ${index + 1}${mark ? ` ${mark}` : ''}`} className={`caro-cell ${mark ? `has-${mark.toLowerCase()}` : ''}`} onClick={() => play(index)} disabled={Boolean(mark) || Boolean(result) || turn !== 'X'}>{mark}</button>)}</div><div className="mini-game-footer"><span>{status} {filled > 0 && !result ? `${filled} moves` : ''}</span><button type="button" onClick={reset}>Reset board ↻</button></div></div>;
}
