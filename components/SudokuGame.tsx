'use client';

import { useMemo, useState } from 'react';

const solution = [
  5, 3, 4, 6, 7, 8, 9, 1, 2,
  6, 7, 2, 1, 9, 5, 3, 4, 8,
  1, 9, 8, 3, 4, 2, 5, 6, 7,
  8, 5, 9, 7, 6, 1, 4, 2, 3,
  4, 2, 6, 8, 5, 3, 7, 9, 1,
  7, 1, 3, 9, 2, 4, 8, 5, 6,
  9, 6, 1, 5, 3, 7, 2, 8, 4,
  2, 8, 7, 4, 1, 9, 6, 3, 5,
  3, 4, 5, 2, 8, 6, 1, 7, 9,
];
const puzzle = solution.map((value, index) => [0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 22, 24, 26, 28, 30, 32, 34, 36, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80].includes(index) ? value : 0);

export default function SudokuGame() {
  const [values, setValues] = useState(puzzle);
  const [selected, setSelected] = useState<number | null>(null);
  const fixed = useMemo(() => puzzle.map(Boolean), []);
  const complete = values.every((value) => value > 0);
  const solved = complete && values.every((value, index) => value === solution[index]);
  const filled = values.filter(Boolean).length;

  const setValue = (value: number) => {
    if (selected === null || fixed[selected] || solved) return;
    setValues((current) => current.map((item, index) => index === selected ? value : item));
  };

  const reset = () => { setValues(puzzle); setSelected(null); };

  return <div className="mini-game mini-game-sudoku"><div className="mini-game-head"><div><p className="eyebrow">Sudoku / Easy warm-up</p><h3>Find the <em>quiet</em> pattern</h3></div><div className="sudoku-progress">{filled} / 81 filled</div></div><div className="sudoku-layout"><div className="sudoku-board" role="grid" aria-label="Sudoku board">{values.map((value, index) => <button key={index} type="button" role="gridcell" aria-label={`Row ${Math.floor(index / 9) + 1}, column ${(index % 9) + 1}${value ? `, ${value}` : ', empty'}`} className={`sudoku-cell ${fixed[index] ? 'is-fixed' : ''} ${selected === index ? 'is-selected' : ''} ${value && !fixed[index] && value !== solution[index] ? 'is-wrong' : ''}`} onClick={() => setSelected(index)}>{value || ''}</button>)}</div><div className="sudoku-pad" aria-label="Sudoku number pad">{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => <button key={number} type="button" onClick={() => setValue(number)}>{number}</button>)}<button type="button" className="sudoku-clear" onClick={() => setValue(0)}>Clear</button></div></div><div className="mini-game-footer"><span>{solved ? 'Solved. Very clean.' : complete ? 'Check the highlighted cells.' : selected === null ? 'Select a cell to begin.' : 'Choose a number.'}</span><button type="button" onClick={reset}>New puzzle ↻</button></div></div>;
}
