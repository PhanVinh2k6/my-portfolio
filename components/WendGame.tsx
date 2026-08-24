'use client';

import { useEffect, useMemo, useState } from 'react';
import DailyGameShell from '@/components/DailyGameShell';
import { getDailyKey, loadDailyScores, saveDailyScore, type DailyScore } from '@/lib/games/daily';
import { applyWendHint, createWendState, getDailyWendPuzzle, getWendCompletionScore, isWendCellUsed, submitWendPath, type WendCell, type WendState } from '@/lib/games/wend';

export default function WendGame() {
  const dayKey = useMemo(() => getDailyKey(), []);
  const puzzle = useMemo(() => getDailyWendPuzzle(dayKey), [dayKey]);
  const [state, setState] = useState<WendState>(() => createWendState(puzzle));
  const [selection, setSelection] = useState<WendCell[]>([]);
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [scores, setScores] = useState<DailyScore[]>(() => loadDailyScores('wend', dayKey));

  useEffect(() => {
    if (!started || state.complete) return undefined;
    const timer = window.setInterval(() => setElapsed((current) => current + 100), 100);
    return () => window.clearInterval(timer);
  }, [started, state.complete]);

  const begin = () => {
    if (started) return;
    setStarted(true);
  };
  const sameCell = (left: WendCell, right: WendCell) => left.row === right.row && left.col === right.col;
  const selectCell = (cell: WendCell) => {
    begin();
    if (state.complete || isWendCellUsed(state, cell) || selection.some((selected) => sameCell(selected, cell))) return;
    setSelection((current) => [...current, cell]);
  };
  const submit = () => {
    if (selection.length === 0) return;
    const next = submitWendPath(state, selection);
    setState(next);
    if (next.complete) {
      const score = getWendCompletionScore(next, elapsed);
      if (score) setScores(saveDailyScore(score));
    }
    setSelection([]);
  };
  const reset = () => {
    setState(createWendState(puzzle));
    setSelection([]);
    setStarted(false);
    setElapsed(0);
    setScores(loadDailyScores('wend', dayKey));
  };

  return <DailyGameShell game="wend" title="Trace the hidden words." kicker="Wend / Word paths" description="Nối các chữ cái kề nhau để tìm toàn bộ từ ẩn. Mỗi ô chỉ được dùng một lần — hãy đi chậm, nhưng đừng mất nhịp." dayKey={dayKey} started={started} complete={state.complete} timeMs={elapsed} hintsUsed={state.hintsUsed} scores={scores} onStart={begin} onHint={() => { begin(); setState((current) => applyWendHint(current)); }} onReset={reset} onClear={() => setSelection([])}>
    <div className="wend-instructions"><span>{started ? 'Tap letters in sequence, then submit the word.' : 'A new word board is ready.'}</span><span>{state.found.length} / {puzzle.words.length} words found</span></div>
    <div className="wend-layout">
      <div className="wend-board" role="grid" aria-label="Wend letter grid">
        {puzzle.letters.map((letter, index) => { const cell = { row: Math.floor(index / puzzle.size), col: index % puzzle.size }; const selectedIndex = selection.findIndex((item) => sameCell(item, cell)); const foundIndex = state.found.find((wordIndex) => state.puzzle.paths[wordIndex].some((item) => sameCell(item, cell))); const hintIndex = state.lastHint?.path.findIndex((item) => sameCell(item, cell)) ?? -1; return <button key={`${cell.row}-${cell.col}`} className={`wend-cell ${selectedIndex >= 0 ? 'is-selected' : ''} ${foundIndex !== undefined ? 'is-found' : ''} ${hintIndex >= 0 ? 'is-hinted' : ''}`} type="button" role="gridcell" aria-label={`Row ${cell.row + 1}, column ${cell.col + 1}, letter ${letter}`} onClick={() => selectCell(cell)}><span>{letter}</span>{selectedIndex >= 0 && <i>{selectedIndex + 1}</i>}</button>; })}
      </div>
      <div className="wend-side-panel"><div className="wend-word-list"><div className="daily-panel-label">Find these lengths</div>{puzzle.words.map((word, index) => <div className={`wend-word-row ${state.found.includes(index) ? 'is-found' : ''}`} key={`${word}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div>{state.found.includes(index) ? <strong>{word}</strong> : <strong>{Array.from({ length: word.length }, () => '—').join(' ')}</strong>}<small>{state.found.includes(index) ? 'Found' : `${word.length} letters`}</small></div></div>)}</div><div className="wend-selection"><span className="daily-panel-label">Current trace</span><strong>{selection.length ? selection.map((cell) => puzzle.letters[cell.row * puzzle.size + cell.col]).join('') : '— — —'}</strong><button type="button" onClick={submit} disabled={!selection.length}>Submit word ↗</button></div></div>
    </div>
  </DailyGameShell>;
}
