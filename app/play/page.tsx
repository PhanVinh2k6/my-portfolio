import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, WifiOff } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import GameHub from '@/components/GameHub';
import ArcadeLoader from '@/components/ArcadeLoader';
import OfflineRegistration from '@/components/OfflineRegistration';

export const metadata: Metadata = {
  title: 'Play — Offline game hub',
  description: 'Một game hub offline-first với những trò chơi nhỏ do Phan Vinh xây dựng.',
};

export default function PlayPage() {
  return (
    <main className="subpage-shell play-shell"><OfflineRegistration />
      <PageHeader />
      <div className="play-hero page-grid"><div className="section-kicker"><span>06</span><span>Small side web</span></div><div><p className="eyebrow"><WifiOff size={13} /> Offline-ready experiment</p><h1>Play<br /><em>mode.</em></h1><p className="subpage-intro">Bốn trò chơi nhỏ, một game room yên tĩnh. Chọn một game, chạm vào màn hình và chơi ngay — kể cả khi mất mạng.</p></div></div>
      <ArcadeLoader variant="play" />
      <GameHub />
      <footer className="subpage-footer"><Link href="/"><ArrowLeft size={14} /> Back to portfolio</Link><Link href="/blog">Read the notes <ArrowUpRight size={14} /></Link></footer>
    </main>
  );
}
