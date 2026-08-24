'use client';

import { useState } from 'react';
import { createSudokuState, setSudokuValue, sudokuIsComplete, SudokuState, SUDOKU_SOLUTION } from '@/lib/games/sudoku';

export default function SudokuGame() {
  const [game, setGame] = useState<SudokuState>(createSudokuState);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const solved = sudokuIsComplete(game);
  const filled = game.values.flat().filter(Boolean).length;
  const currentValue = selected ? game.values[selected[0]][selected[1]] : 0;

  const enter = (value: number) => {
    if (!selected || solved || game.fixed[selected[0]][selected[1]]) return;
    const next = setSudokuValue(game, selected[0], selected[1], value);
    if (next === game && value !== 0) setMistakes((count) => count + 1); else setGame(next);
  };
  const reset = () => { setGame(createSudokuState()); setSelected(null); setMistakes(0); };

  return <div className="mini-game mini-game-sudoku"><div className="mini-game-head"><div><p className="eyebrow">Sudoku / Logic room</p><h3>Find the <em>quiet pattern.</em></h3></div><div className="sudoku-progress">{filled} / 81 filled · {mistakes} mistakes</div></div><div className="sudoku-layout"><div className="sudoku-board" role="grid" aria-label="Sudoku board">{game.values.flatMap((row, rowIndex) => row.map((value, colIndex) => <button key={`${rowIndex}-${colIndex}`} type="button" role="gridcell" aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}${value ? `, ${value}` : ', empty'}`} className={`sudoku-cell ${game.fixed[rowIndex][colIndex] ? 'is-fixed' : ''} ${selected?.[0] === rowIndex && selected?.[1] === colIndex ? 'is-selected' : ''}`} onClick={() => setSelected([rowIndex, colIndex])}>{value || ''}</button>))}</div><div className="sudoku-pad" aria-label="Sudoku number pad">{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => <button key={number} type="button" onClick={() => enter(number)}>{number}</button>)}<button type="button" className="sudoku-clear" onClick={() => enter(0)}>Clear</button></div></div><div className="mini-game-footer"><span>{solved ? 'Solved. Very clean.' : selected ? currentValue ? 'Pick another number or clear this cell.' : 'Choose a number that fits the row, column and box.' : 'Select a cell to begin.'} · solution has {SUDOKU_SOLUTION.length} rows</span><button type="button" onClick={reset}>New puzzle ↻</button></div></div>;
}
