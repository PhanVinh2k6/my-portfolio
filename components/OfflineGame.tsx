'use client';

import { useEffect, useState } from 'react';

const GAME_LENGTH = 20;
const INITIAL_TARGET = { left: 48, top: 50 };

type TargetPosition = { left: number; top: number };

export default function OfflineGame() {
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(GAME_LENGTH);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [target, setTarget] = useState<TargetPosition>(INITIAL_TARGET);
  const [message, setMessage] = useState('Ready when you are.');
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setHighScore(Number(window.localStorage.getItem('signal-sprint-high-score') || 0));
      setOffline(!window.navigator.onLine);
    });
    const updateOnlineState = () => setOffline(!window.navigator.onLine);
    window.addEventListener('online', updateOnlineState);
    window.addEventListener('offline', updateOnlineState);
    return () => { window.removeEventListener('online', updateOnlineState); window.removeEventListener('offline', updateOnlineState); };
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          setPlaying(false);
          setMessage('Time. Nice sprint.');
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (playing || score <= highScore) return undefined;
    const frame = requestAnimationFrame(() => {
      setHighScore(score);
      window.localStorage.setItem('signal-sprint-high-score', String(score));
    });
    return () => cancelAnimationFrame(frame);
  }, [highScore, playing, score]);

  const startGame = () => {
    setScore(0);
    setSeconds(GAME_LENGTH);
    setTarget(INITIAL_TARGET);
    setMessage('Find the signal.');
    setPlaying(true);
  };

  const hitTarget = () => {
    if (!playing) return;
    setScore((current) => current + 1);
    setTarget({ left: 12 + Math.random() * 76, top: 14 + Math.random() * 72 });
  };

  return (
    <section className="game-section content-section" aria-labelledby="signal-sprint-title">
      <div className="game-shell">
        <div className="game-header"><div><p className="eyebrow">Signal / 001</p><h2 id="signal-sprint-title">Catch the<br /><em>signal.</em></h2></div><div className="game-stats"><div><small>Score</small><strong>{score.toString().padStart(2, '0')}</strong></div><div><small>Best</small><strong>{highScore.toString().padStart(2, '0')}</strong></div><div><small>Time</small><strong>{seconds}s</strong></div></div></div>
        <div className={`game-board ${playing ? 'is-playing' : ''}`}><div className="game-grid" /><div className="game-message">{message}</div>{playing && <button className="game-target" type="button" style={{ left: `${target.left}%`, top: `${target.top}%` }} onClick={hitTarget} aria-label="Catch signal">+</button>}{!playing && <button className="game-start" type="button" onClick={startGame}>{seconds === 0 ? 'Run again' : 'Start sprint'} <span>↗</span></button>}</div>
        <div className="game-footer"><span>{offline ? 'Offline mode active' : 'Playable without an account'}</span><span>20 seconds / one clear signal</span></div>
      </div>
    </section>
  );
}
