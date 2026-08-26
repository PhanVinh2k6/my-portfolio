import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy information for the Phan Vinh portfolio and Signal Room offline arcade.',
  alternates: { canonical: 'https://phanvinh.id.vn/privacy' },
};

export default function PrivacyPage() {
  return (
    <main id="page-content" className="subpage-shell">
      <PageHeader />
      <article className="article-shell legal-page">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
        <div className="article-top"><Link href="/" className="back-link"><ArrowLeft size={14} /> Back to portfolio</Link><span>Trust / 01</span></div>
        <header className="article-header"><p className="eyebrow">Last updated · 26.08.2026</p><h1>Privacy, kept<br /><em>plain.</em></h1><p>This portfolio is intentionally small. This page explains what can be stored or measured when you browse Signal Room.</p></header>
        <div className="article-body">
          <section><h2>What is collected</h2><p>Contacting Phan Vinh uses your email client through a mailto link. The site does not provide a server-side contact form, account system or user database.</p></section>
          <section><h2>Local storage</h2><p>The arcade may store theme preference and daily game results on the device you use. Those values are not sent to this site as a user profile and can be cleared from your browser settings.</p></section>
          <section><h2>Analytics</h2><p>Google Analytics 4 is loaded only when the deployment has a `NEXT_PUBLIC_GA_ID` configured. The implementation uses anonymize_ip and is omitted from local builds without that variable. You can block analytics with browser privacy controls.</p></section>
          <section><h2>External links</h2><p>Links to GitHub, LinkedIn and Google Maps are opened as external services. Their own privacy policies apply when you choose to visit them.</p></section>
          <section><h2>Questions</h2><p>For a privacy question, email <a className="text-link" href="mailto:hello@phanvinh.id.vn">hello@phanvinh.id.vn</a>. This page is informational and should be updated if the site adds a form, cookies or other data-processing features.</p></section>
        </div>
        <div className="article-end"><Link href="/" className="back-link"><ArrowLeft size={14} /> Back to portfolio</Link><Link href="/#contact" className="text-link">Ask a question <ArrowUpRight size={15} /></Link></div>
      </article>
      <footer className="subpage-footer"><Link href="/"><ArrowLeft size={14} /> Back to portfolio</Link><span>© 2026 Phan Vinh</span></footer>
    </main>
  );
}
