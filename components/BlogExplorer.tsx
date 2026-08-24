'use client';

import { Clock3, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Post } from '@/lib/content';

export default function BlogExplorer({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All notes');
  const categories = ['All notes', ...Array.from(new Set(posts.map((post) => post.category)))];

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === 'All notes' || post.category === category;
      const searchable = [post.title, post.excerpt, post.category, ...post.body.flatMap((section) => [section.heading, ...section.paragraphs])].join(' ').toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, posts, query]);

  return (
    <div className="blog-explorer">
      <div className="blog-controls">
        <label className="search-field"><Search size={17} /><span className="sr-only">Search notes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes..." type="search" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</label>
        <div className="filter-chips" role="group" aria-label="Filter notes by category">{categories.map((item) => <button key={item} type="button" className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
      </div>
      <div className="filter-result-count">{filteredPosts.length} {filteredPosts.length === 1 ? 'note' : 'notes'} found</div>
      <div className="blog-list-results">
        {filteredPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-row">
            <span className="blog-number">{post.number}</span>
            <div className="blog-row-content"><div className="blog-meta"><span>{post.category}</span><span>{post.date}</span></div><h2>{post.title}</h2><p>{post.excerpt}</p></div>
            <div className="blog-row-end"><span><Clock3 size={14} />{post.readTime}</span><span className="blog-row-arrow"><span className="sr-only">Read article</span>↗</span></div>
          </Link>
        ))}
        {filteredPosts.length === 0 && <div className="empty-search"><Search size={19} /><h2>No notes found.</h2><p>Try a different keyword or reset the category filter.</p><button type="button" onClick={() => { setQuery(''); setCategory('All notes'); }}>Reset filters</button></div>}
      </div>
    </div>
  );
}
