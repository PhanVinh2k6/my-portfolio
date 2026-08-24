'use client';

import { Clock3, Lightbulb, RotateCcw, Undo2 } from 'lucide-react';
import { formatDailyDate, formatDuration, type DailyGameId, type DailyScore } from '@/lib/games/daily';

type DailyGameShellProps = {
  game: DailyGameId;
  title: string;
  kicker: string;
  description: string;
  dayKey: string;
  started: boolean;
  complete: boolean;
  timeMs: number;
  hintsUsed: number;
  scores: DailyScore[];
  onStart: () => void;
  onHint: () => void;
  onReset: () => void;
  onUndo?: () => void;
  onClear?: () => void;
  children: React.ReactNode;
};

export default function DailyGameShell({ game, title, kicker, description, dayKey, started, complete, timeMs, hintsUsed, scores, onStart, onHint, onReset, onUndo, onClear, children }: DailyGameShellProps) {
  return <div className={`daily-game-shell daily-game-${game}`}>
    <div className="daily-game-header"><div><p className="daily-game-kicker">{kicker} <span>Daily / {formatDailyDate(dayKey)}</span></p><h3>{title}</h3><p className="daily-game-description">{description}</p></div><div className="daily-game-stats"><div><small><Clock3 size={13} /> Time</small><strong>{formatDuration(timeMs)}</strong></div><div><small><Lightbulb size={13} /> Hints</small><strong>{hintsUsed}</strong></div></div></div>
    <div className="daily-game-toolbar"><div className="daily-game-actions">{!started && !complete ? <button type="button" className="daily-primary-action" onClick={onStart}>Start today&apos;s puzzle ↗</button> : <button type="button" onClick={onHint} disabled={complete}><Lightbulb size={14} /> Hint</button>}{onUndo && <button type="button" onClick={onUndo} disabled={!started || complete}><Undo2 size={14} /> Undo</button>}{onClear && <button type="button" onClick={onClear} disabled={!started || complete}><RotateCcw size={14} /> Clear</button>}</div><button type="button" className="daily-reset-action" onClick={onReset}><RotateCcw size={14} /> New puzzle</button></div>
    {children}
    {complete && <div className="daily-complete"><div><span className="daily-complete-kicker">Solved / {game}</span><h4>Nice work. <em>Same time tomorrow.</em></h4><p>Completed in <strong>{formatDuration(timeMs)}</strong> with {hintsUsed} hint{hintsUsed === 1 ? '' : 's'}.</p></div><div className="daily-leaderboard"><div className="daily-leaderboard-heading"><span>Local leaderboard</span><small>this device</small></div>{scores.length === 0 ? <p>No saved times yet.</p> : <ol>{scores.map((score, index) => <li key={`${score.completedAt}-${index}`}><span>0{index + 1}</span><strong>{formatDuration(score.timeMs)}</strong><small>{score.hints} hint{score.hints === 1 ? '' : 's'}</small></li>)}</ol>}</div></div>}
    <p className="daily-game-footnote">Daily puzzle · Offline-ready · Local times only · {game === 'zip' ? 'One path, every cell.' : 'Every letter, exactly once.'}</p>
  </div>;
}
