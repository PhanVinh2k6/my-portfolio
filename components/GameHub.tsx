'use client';

import { useState } from 'react';
import { Bot, Grid3X3, Hash, MousePointer2 } from 'lucide-react';
import OfflineGame from '@/components/OfflineGame';
import CaroGame from '@/components/CaroGame';
import SudokuGame from '@/components/SudokuGame';
import DotsBoxesGame from '@/components/DotsBoxesGame';

type GameId = 'signal' | 'caro' | 'sudoku' | 'dots';

const games: { id: GameId; number: string; title: string; description: string; icon: typeof Bot; label: string }[] = [
  { id: 'signal', number: '01', title: 'Signal Sprint', description: 'Bắt tín hiệu trong 20 giây.', icon: MousePointer2, label: 'Reflex' },
  { id: 'caro', number: '02', title: 'Caro vs Bot', description: 'Đấu 3-in-a-row trên bàn 9 × 9.', icon: Grid3X3, label: 'Strategy' },
  { id: 'sudoku', number: '03', title: 'Sudoku', description: 'Điền số, giữ nhịp, tìm logic.', icon: Hash, label: 'Logic' },
  { id: 'dots', number: '04', title: 'Dots & Boxes', description: 'Khép ô, ăn điểm, giành lượt.', icon: Bot, label: 'Tactics' },
];

export default function GameHub() {
  const [selected, setSelected] = useState<GameId>('signal');
  const current = games.find((game) => game.id === selected) ?? games[0];

  return (
    <section className="game-hub content-section" aria-labelledby="game-hub-title">
      <div className="game-hub-inner">
        <div className="game-hub-heading"><div><p className="eyebrow">Play / 004</p><h2 id="game-hub-title">Pick a small<br /><em>adventure.</em></h2></div><p className="game-hub-note">No account. No leaderboard. No signal required. Just a few quiet games for a spare minute.</p></div>
        <div className="game-picker" role="tablist" aria-label="Choose a game">
          {games.map((game) => { const Icon = game.icon; return <button key={game.id} className={`game-picker-card ${selected === game.id ? 'is-active' : ''}`} type="button" role="tab" aria-selected={selected === game.id} onClick={() => setSelected(game.id)}><span className="game-picker-top"><small>{game.number}</small><Icon size={17} /></span><strong>{game.title}</strong><span>{game.description}</span><i>{game.label}</i></button>; })}
        </div>
        <div className="game-selected-label"><span>Now playing</span><strong>{current.title}</strong><span className="game-status-dot" /> <span>offline-ready</span></div>
        <div className="game-stage">{selected === 'signal' && <OfflineGame />}{selected === 'caro' && <CaroGame />}{selected === 'sudoku' && <SudokuGame />}{selected === 'dots' && <DotsBoxesGame />}</div>
      </div>
    </section>
  );
}
