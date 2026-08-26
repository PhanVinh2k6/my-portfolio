import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for reaching out to Phan Vinh.',
  alternates: { canonical: 'https://phanvinh.id.vn/thank-you' },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <main id="page-content" className="subpage-shell">
      <PageHeader />
      <article className="article-shell thank-you-page">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Thank You' }]} />
        <div className="article-top"><Link href="/" className="back-link"><ArrowLeft size={14} /> Back to portfolio</Link><span>Signal received / 01</span></div>
        <header className="article-header"><p className="eyebrow">Thank you <span className="eyebrow-line" /> Message received</p><h1>Good signal.<br /><em>Thank you.</em></h1><p>If you have just sent an email, it should now be on its way. I aim to reply within 2 working days.</p></header>
        <div className="article-end"><Link href="/" className="back-link"><ArrowLeft size={14} /> Return home</Link><Link href="/blog" className="text-link">Read the journal <ArrowUpRight size={15} /></Link></div>
      </article>
      <footer className="subpage-footer"><Link href="/"><ArrowLeft size={14} /> Back to portfolio</Link><Link href="/privacy">Privacy</Link></footer>
    </main>
  );
}
