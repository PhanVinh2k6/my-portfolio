import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, WifiOff } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import GameHub from '@/components/GameHub';
import ArcadeLoader from '@/components/ArcadeLoader';
import OfflineRegistration from '@/components/OfflineRegistration';

export const metadata: Metadata = {
  title: 'Play — Offline game hub',
  description: 'Signal Room là game hub offline-first với daily puzzle Wend và Zip, Hint, timer, local leaderboard cùng bốn trò chơi replay.',
};

export default function PlayPage() {
  return (
    <main id="page-content" className="subpage-shell play-shell"><OfflineRegistration />
      <PageHeader />
      <div className="play-hero page-grid"><div className="section-kicker"><span>06</span><span>Small side web</span></div><div><p className="eyebrow"><WifiOff size={13} /> Offline-ready experiment</p><h1>Play<br /><em>mode.</em></h1><p className="subpage-intro">Sáu trò chơi nhỏ, một game room yên tĩnh. Mỗi ngày có Wend và Zip mới; bốn game còn lại luôn sẵn để chơi lại — kể cả khi mất mạng.</p></div></div>
      <ArcadeLoader variant="play" />
      <GameHub />
      <footer className="subpage-footer"><Link href="/"><ArrowLeft size={14} /> Back to portfolio</Link><Link href="/blog">Read the notes <ArrowUpRight size={14} /></Link></footer>
    </main>
  );
}
