import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import StickyMobileCta from '@/components/StickyMobileCta';
import { getPost, posts } from '@/lib/content';

const siteUrl = 'https://phanvinh.id.vn';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post?.title ?? 'Blog',
    description: post?.excerpt ?? 'Personal notes by Phan Vinh.',
    alternates: { canonical: post ? `${siteUrl}/blog/${slug}` : `${siteUrl}/blog` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return <main id="page-content" className="subpage-shell"><PageHeader /><div className="not-found"><p className="eyebrow">404 / Not found</p><h1>This note went<br /><em>somewhere else.</em></h1><Link href="/blog" className="button button-dark">Back to blog <ArrowUpRight size={16} /></Link></div></main>;
  }

  return (
    <main id="page-content" className="subpage-shell">
      <PageHeader />
      <article className="article-shell">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Journal', href: '/blog' }, { label: post.title }]} />
        <div className="article-top"><Link href="/blog" className="back-link"><ArrowLeft size={14} /> All notes</Link><span>{post.number} / {post.category}</span></div>
        <header className="article-header"><p className="eyebrow">{post.date} <span className="eyebrow-line" /> <Clock3 size={13} /> {post.readTime}</p><h1>{post.title}</h1><p>{post.excerpt}</p></header>
        <div className="article-body">{post.body.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div>
        <div className="article-end"><Link href="/blog" className="back-link"><ArrowLeft size={14} /> More notes</Link><Link href="/#contact" className="text-link">Start a conversation <ArrowUpRight size={15} /></Link></div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt, datePublished: post.date.split('.').reverse().join('-'), author: { '@type': 'Person', name: 'Phan Vinh', url: siteUrl }, mainEntityOfPage: `${siteUrl}/blog/${post.slug}` }) }} />
      </article>
      <StickyMobileCta />
      <footer className="subpage-footer"><Link href="/"><ArrowLeft size={14} /> Back to portfolio</Link><span>© 2026 Phan Vinh</span></footer>
    </main>
  );
}
