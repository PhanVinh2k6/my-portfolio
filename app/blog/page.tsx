import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { posts } from '@/lib/content';

export const metadata = {
  title: 'Blog',
  description: 'Những ghi chú về product thinking, thiết kế giao diện và AI experiments của Phan Vinh.',
};

export default function BlogPage() {
  return (
    <main className="subpage-shell">
      <PageHeader />
      <div className="subpage-hero page-grid blog-hero">
        <div className="section-kicker"><span>05</span><span>Personal notes</span></div>
        <div><p className="eyebrow">Ideas in progress</p><h1>Thinking out<br /><em>loud.</em></h1><p className="subpage-intro">Một góc nhỏ để mình viết về những thứ đang học, đang xây và những câu hỏi chưa có câu trả lời hoàn chỉnh.</p></div>
      </div>
      <section className="blog-list content-section">
        <div className="blog-list-inner">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-row">
              <span className="blog-number">{post.number}</span>
              <div className="blog-row-content"><div className="blog-meta"><span>{post.category}</span><span>{post.date}</span></div><h2>{post.title}</h2><p>{post.excerpt}</p></div>
              <div className="blog-row-end"><span><Clock3 size={14} />{post.readTime}</span><ArrowUpRight size={20} /></div>
            </Link>
          ))}
        </div>
      </section>
      <footer className="subpage-footer"><Link href="/"><ArrowLeft size={14} /> Back to portfolio</Link><span>© 2026 Phan Vinh</span></footer>
    </main>
  );
}
