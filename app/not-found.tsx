import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StickyMobileCta from '@/components/StickyMobileCta';

export const metadata: Metadata = {
  title: '404 — Signal lost',
  description: 'The requested page could not be found. Continue to the Signal Room portfolio, journal or offline arcade.',
};

const recoveryLinks = [
  { href: '/#work', label: 'Browse selected work', note: 'Case studies and product systems' },
  { href: '/blog', label: 'Read the journal', note: 'Notes from the work' },
  { href: '/play', label: 'Enter Signal Room', note: 'Offline-ready small games' },
  { href: '/#faq', label: 'Read the FAQ', note: 'Useful answers before we start' },
];

export default function NotFound() {
  return (
    <main id="page-content" className="subpage-shell">
      <PageHeader />
      <div className="not-found"><p className="eyebrow">404 / Signal lost</p><h1>This page went<br /><em>somewhere else.</em></h1><p className="not-found-lede">The address may have changed, but there are still a few useful ways into Signal Room.</p><div className="not-found-primary"><Link href="/" className="new-button new-button-dark">Back to portfolio <ArrowUpRight size={16} /></Link></div><nav className="not-found-links" aria-label="Recovery navigation">{recoveryLinks.map((link) => <Link href={link.href} key={link.href}><span>{link.label}</span><small>{link.note}</small><ArrowUpRight size={15} /></Link>)}</nav></div>
      <footer className="subpage-footer"><Link href="/"><ArrowLeft size={14} /> Back to portfolio</Link><Link href="/#contact">Start a conversation <ArrowUpRight size={14} /></Link></footer>
      <StickyMobileCta />
    </main>
  );
}
