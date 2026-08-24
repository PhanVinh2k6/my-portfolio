import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, WifiOff } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import OfflineGame from '@/components/OfflineGame';
import OfflineRegistration from '@/components/OfflineRegistration';

export const metadata: Metadata = {
  title: 'Signal Sprint',
  description: 'Một mini-game phản xạ offline do Phan Vinh xây dựng.',
};

export default function PlayPage() {
  return (
    <main className="subpage-shell play-shell"><OfflineRegistration />
      <PageHeader />
      <div className="play-hero page-grid"><div className="section-kicker"><span>06</span><span>Small side web</span></div><div><p className="eyebrow"><WifiOff size={13} /> Offline-ready experiment</p><h1>Signal<br /><em>Sprint.</em></h1><p className="subpage-intro">Một bài test phản xạ 20 giây. Bắt tín hiệu, giữ nhịp và thử phá kỷ lục của chính mình.</p></div></div>
      <OfflineGame />
      <footer className="subpage-footer"><Link href="/"><ArrowLeft size={14} /> Back to portfolio</Link><Link href="/blog">Read the notes <ArrowUpRight size={14} /></Link></footer>
    </main>
  );
}
