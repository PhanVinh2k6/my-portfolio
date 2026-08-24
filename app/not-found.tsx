import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function NotFound() {
  return (
    <main className="subpage-shell">
      <PageHeader />
      <div className="not-found"><p className="eyebrow">404 / Not found</p><h1>This page went<br /><em>somewhere else.</em></h1><Link href="/" className="button button-dark">Back to portfolio <ArrowUpRight size={16} /></Link></div>
    </main>
  );
}
