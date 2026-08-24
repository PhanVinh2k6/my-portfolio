'use client';

import { useEffect, useMemo, useState } from 'react';
import DailyGameShell from '@/components/DailyGameShell';
import { getDailyKey, loadDailyScores, saveDailyScore, type DailyScore } from '@/lib/games/daily';
import { applyZipHint, canZipMove, createZipState, getDailyZipPuzzle, getZipCompletionScore, submitZipCell, undoZip, clearZip, type ZipCell, type ZipState } from '@/lib/games/zip';

export default function ZipGame() {
  const dayKey = useMemo(() => getDailyKey(), []);
  const puzzle = useMemo(() => getDailyZipPuzzle(dayKey), [dayKey]);
  const [state, setState] = useState<ZipState>(() => createZipState(puzzle));
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [scores, setScores] = useState<DailyScore[]>(() => loadDailyScores('zip', dayKey));

  useEffect(() => {
    if (!started || state.complete) return undefined;
    const timer = window.setInterval(() => setElapsed((current) => current + 100), 100);
    return () => window.clearInterval(timer);
  }, [started, state.complete]);

  const begin = () => {
    if (started) return;
    setStarted(true);
  };
  const play = (cell: ZipCell) => {
    begin();
    if (state.complete) return;
    const next = submitZipCell(state, cell);
    setState(next);
    if (next.complete) {
      const score = getZipCompletionScore(next, elapsed);
      if (score) setScores(saveDailyScore(score));
    }
  };
  const reset = () => {
    setState(createZipState(puzzle));
    setStarted(false);
    setElapsed(0);
    setScores(loadDailyScores('zip', dayKey));
  };
  const pathKeys = new Set(state.path.map((cell) => `${cell.row}:${cell.col}`));
  const nextCell = state.path.length < puzzle.path.length ? puzzle.path[state.path.length] : null;

  return <DailyGameShell game="zip" title="Find one clean line." kicker="Zip / Path logic" description="Bắt đầu từ số 1, đi qua các mốc theo thứ tự và lấp đầy mọi ô bằng một đường duy nhất. Chạm từng ô để vẽ đường đi." dayKey={dayKey} started={started} complete={state.complete} timeMs={elapsed} hintsUsed={state.hintsUsed} scores={scores} onStart={begin} onHint={() => { begin(); setState((current) => applyZipHint(current)); }} onReset={reset} onUndo={() => setState((current) => undoZip(current))} onClear={() => setState((current) => clearZip(current))}>
    <div className="zip-instructions"><span>{started ? 'Tap an adjacent cell to continue the line.' : 'Start at the cell marked 1.'}</span><span>{state.path.length} / {puzzle.path.length} cells connected</span></div>
    <div className="zip-layout">
      <div className="zip-board" role="grid" aria-label="Zip path grid">
        {Array.from({ length: puzzle.size * puzzle.size }, (_, index) => { const cell = { row: Math.floor(index / puzzle.size), col: index % puzzle.size }; const key = `${cell.row}:${cell.col}`; const marker = puzzle.markers[key]; const pathIndex = state.path.findIndex((item) => `${item.row}:${item.col}` === key); const isHint = state.lastHint?.row === cell.row && state.lastHint.col === cell.col; const legal = canZipMove(state, cell); return <button key={key} className={`zip-cell ${pathIndex >= 0 ? 'is-path' : ''} ${isHint ? 'is-hinted' : ''} ${marker ? 'has-marker' : ''}`} type="button" role="gridcell" aria-label={`Row ${cell.row + 1}, column ${cell.col + 1}${marker ? `, marker ${marker}` : ''}`} onClick={() => play(cell)} disabled={state.complete || (started && pathKeys.has(key))}>{pathIndex >= 0 && <i>{pathIndex + 1}</i>}{marker && <strong>{marker}</strong>}{started && !pathIndex && legal && !marker && <span className="zip-next-dot" />}</button>; })}
        {nextCell && started && <span className="zip-next-label" style={{ top: `${(nextCell.row + 0.5) * 20}%`, left: `${(nextCell.col + 0.5) * 20}%` }}>next</span>}
      </div>
      <aside className="zip-side-panel"><div className="zip-marker-legend"><div className="daily-panel-label">Route status</div><strong>{state.complete ? 'Complete' : `${state.puzzle.path.length - state.path.length} cells left`}</strong><p>{state.mistakes ? `${state.mistakes} wrong turn${state.mistakes === 1 ? '' : 's'}` : 'No wrong turns yet.'}</p></div><div className="zip-number-list"><div className="daily-panel-label">Order</div>{Object.entries(puzzle.markers).sort(([, left], [, right]) => left - right).map(([key, marker]) => <span className={pathKeys.has(key) ? 'is-done' : ''} key={key}>{marker}</span>)}</div></aside>
    </div>
  </DailyGameShell>;
}
