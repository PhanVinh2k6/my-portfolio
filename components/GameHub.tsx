'use client';

import { useRef, useState } from 'react';
import { Bird, Bot, Grid3X3, Hash, MousePointer2, Sparkles, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import CaroGame from '@/components/CaroGame';
import DotsBoxesGame from '@/components/DotsBoxesGame';
import FlappyBirdGame from '@/components/FlappyBirdGame';
import OfflineGame from '@/components/OfflineGame';
import SudokuGame from '@/components/SudokuGame';
import WendGame from '@/components/WendGame';
import ZipGame from '@/components/ZipGame';

type GameId = 'signal' | 'wend' | 'zip' | 'caro' | 'sudoku' | 'dots' | 'flappy';

type GameDefinition = { id: GameId; number: string; title: string; description: string; icon: LucideIcon; label: string };

const games: GameDefinition[] = [
  { id: 'wend', number: '01', title: 'Wend', description: 'Nối chữ, tìm từ, dùng mỗi ô một lần.', icon: Sparkles, label: 'Daily / word path' },
  { id: 'zip', number: '02', title: 'Zip', description: 'Một đường đi, mọi ô, đúng thứ tự.', icon: Zap, label: 'Daily / logic path' },
  { id: 'signal', number: '03', title: 'Signal Sprint', description: 'Bắt tín hiệu trong 20 giây.', icon: MousePointer2, label: 'Reflex / solo' },
  { id: 'caro', number: '04', title: 'Caro / Gomoku', description: 'Năm quân liền trên bàn 9 × 9.', icon: Grid3X3, label: 'Bot / 2 local' },
  { id: 'sudoku', number: '05', title: 'Sudoku', description: 'Điền số, giữ nhịp, tìm logic.', icon: Hash, label: 'Logic / solo' },
  { id: 'dots', number: '06', title: 'Dots & Boxes', description: 'Khép ô, ăn điểm, giành lượt.', icon: Bot, label: 'Bot / 2–4 local' },
  { id: 'flappy', number: '07', title: 'Flappy Bird', description: 'Giữ nhịp bay, tránh signal pipe.', icon: Bird, label: 'Arcade / solo' },
];

export default function GameHub() {
  const [selected, setSelected] = useState<GameId>('wend');
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const current = games.find((game) => game.id === selected) ?? games[0];

  const moveSelection = (currentId: GameId, direction: 1 | -1) => {
    const currentIndex = games.findIndex((game) => game.id === currentId);
    const nextId = games[(currentIndex + direction + games.length) % games.length].id;
    setSelected(nextId);
    requestAnimationFrame(() => tabRefs.current[nextId]?.focus());
  };

  return <section className="game-hub content-section" aria-labelledby="game-hub-title"><div className="game-hub-inner"><div className="game-hub-heading"><div><p className="eyebrow">Play / 003</p><h2 id="game-hub-title">Pick a small<br /><em>adventure.</em></h2></div><p className="game-hub-note">Hai daily puzzle mới mỗi ngày, cộng thêm năm game để chơi lại bất cứ lúc nào. Không cần tài khoản hay mạng — chỉ cần một màn hình và một chút tò mò.</p></div><div className="game-picker" role="tablist" aria-label="Choose a game">{games.map((game) => { const Icon = game.icon; return <button key={game.id} ref={(node) => { tabRefs.current[game.id] = node; }} id={`game-tab-${game.id}`} className={`game-picker-card ${selected === game.id ? 'is-active' : ''}`} type="button" role="tab" aria-selected={selected === game.id} aria-controls={`game-panel-${game.id}`} tabIndex={selected === game.id ? 0 : -1} onClick={() => setSelected(game.id)} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); moveSelection(game.id, 1); } if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); moveSelection(game.id, -1); } }}><span className="game-picker-top"><small>{game.number}</small><Icon size={17} /></span><strong>{game.title}</strong><span>{game.description}</span><i>{game.label}</i></button>; })}</div><div className="game-selected-label"><span>Now playing</span><strong>{current.title}</strong><span className="game-status-dot" /> <span>{current.id === 'wend' || current.id === 'zip' ? "today's puzzle" : 'offline-ready'}</span></div><div id={`game-panel-${selected}`} className="game-stage" role="tabpanel" aria-labelledby={`game-tab-${selected}`}>{selected === 'signal' && <OfflineGame />}{selected === 'wend' && <WendGame />}{selected === 'zip' && <ZipGame />}{selected === 'caro' && <CaroGame />}{selected === 'sudoku' && <SudokuGame />}{selected === 'dots' && <DotsBoxesGame />}{selected === 'flappy' && <FlappyBirdGame />}</div></div></section>;
}
