'use client';

import { useState } from 'react';
import { Bot, Grid3X3, Hash, MousePointer2 } from 'lucide-react';
import CaroGame from '@/components/CaroGame';
import DotsBoxesGame from '@/components/DotsBoxesGame';
import OfflineGame from '@/components/OfflineGame';
import SudokuGame from '@/components/SudokuGame';

type GameId = 'signal' | 'caro' | 'sudoku' | 'dots';

type GameDefinition = { id: GameId; number: string; title: string; description: string; icon: typeof Bot; label: string };

const games: GameDefinition[] = [
  { id: 'signal', number: '01', title: 'Signal Sprint', description: 'Bắt tín hiệu trong 20 giây.', icon: MousePointer2, label: 'Reflex / solo' },
  { id: 'caro', number: '02', title: 'Caro / Gomoku', description: 'Năm quân liền trên bàn 9 × 9.', icon: Grid3X3, label: 'Bot / 2 local' },
  { id: 'sudoku', number: '03', title: 'Sudoku', description: 'Điền số, giữ nhịp, tìm logic.', icon: Hash, label: 'Logic / solo' },
  { id: 'dots', number: '04', title: 'Dots & Boxes', description: 'Khép ô, ăn điểm, giành lượt.', icon: Bot, label: 'Bot / 2–4 local' },
];

export default function GameHub() {
  const [selected, setSelected] = useState<GameId>('signal');
  const current = games.find((game) => game.id === selected) ?? games[0];

  return (
    <section className="game-hub content-section" aria-labelledby="game-hub-title">
      <div className="game-hub-inner">
        <div className="game-hub-heading"><div><p className="eyebrow">Play / 003</p><h2 id="game-hub-title">Pick a small<br /><em>adventure.</em></h2></div><p className="game-hub-note">Không cần tài khoản, leaderboard hay mạng. Chọn một game và chơi ngay trên cùng thiết bị — solo, đấu bot hoặc chuyền tay cho bạn bè.</p></div>
        <div className="game-picker" role="tablist" aria-label="Choose a game">
          {games.map((game) => { const Icon = game.icon; return <button key={game.id} id={`game-tab-${game.id}`} className={`game-picker-card ${selected === game.id ? 'is-active' : ''}`} type="button" role="tab" aria-selected={selected === game.id} aria-controls={`game-panel-${game.id}`} tabIndex={selected === game.id ? 0 : -1} onClick={() => setSelected(game.id)} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowDown') setSelected(games[(games.findIndex((item) => item.id === selected) + 1) % games.length].id); if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') setSelected(games[(games.findIndex((item) => item.id === selected) - 1 + games.length) % games.length].id); }}><span className="game-picker-top"><small>{game.number}</small><Icon size={17} /></span><strong>{game.title}</strong><span>{game.description}</span><i>{game.label}</i></button>; })}
        </div>
        <div className="game-selected-label"><span>Now playing</span><strong>{current.title}</strong><span className="game-status-dot" /> <span>offline-ready</span></div>
        <div id={`game-panel-${selected}`} className="game-stage" role="tabpanel" aria-labelledby={`game-tab-${selected}`}>
          {selected === 'signal' && <OfflineGame />}{selected === 'caro' && <CaroGame />}{selected === 'sudoku' && <SudokuGame />}{selected === 'dots' && <DotsBoxesGame />}
        </div>
      </div>
    </section>
  );
}
