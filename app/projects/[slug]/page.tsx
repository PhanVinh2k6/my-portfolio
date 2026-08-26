import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { getProject, projects } from '@/lib/content';

const siteUrl = 'https://phanvinh.id.vn';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project?.title ?? 'Project',
    description: project?.shortDescription ?? 'Selected project by Phan Vinh.',
    alternates: { canonical: project ? `${siteUrl}/projects/${slug}` : siteUrl },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return <main id="page-content" className="subpage-shell"><PageHeader /><div className="not-found"><p className="eyebrow">404 / Not found</p><h1>This project went<br /><em>somewhere else.</em></h1><Link href="/#work" className="button button-dark">Back to work <ArrowUpRight size={16} /></Link></div></main>;
  }

  return (
    <main id="page-content" className="subpage-shell">
      <PageHeader />
      <article className="project-detail">
        <div className="article-top"><Link href="/#work" className="back-link"><ArrowLeft size={14} /> Selected work</Link><span>{project.number} / {project.eyebrow}</span></div>
        <header className="project-detail-header"><p className="eyebrow">{project.year} <span className="eyebrow-line" /> {project.eyebrow}</p><h1>{project.title}</h1><p>{project.description}</p></header>
        <div className={`detail-artwork detail-artwork-${project.accent}`} aria-label={`${project.title} interface preview`}><div className="detail-artwork-grid" /><div className="detail-artwork-label"><span>Case study / {project.number}</span><strong>{project.title}</strong><small>Designing the useful</small></div><div className="detail-artwork-orbit" /></div>
        <div className="project-facts"><div><small>Role</small><strong>{project.role}</strong></div><div><small>Stack</small><strong>{project.stack.join(' · ')}</strong></div><div><small>Focus</small><strong>Clarity, systems, useful detail</strong></div></div>
        <div className="case-study-grid"><div className="case-study-label"><span>01</span><small>The challenge</small></div><div><h2>Start with the<br /><em>real problem.</em></h2><p>{project.challenge}</p></div></div>
        <div className="case-study-grid"><div className="case-study-label"><span>02</span><small>The approach</small></div><div><h2>Make every decision<br /><em>earn its place.</em></h2><div className="detail-steps">{project.approach.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><Check size={16} /></div>)}</div></div></div>
        <div className="case-study-grid outcome-grid"><div className="case-study-label"><span>03</span><small>The outcome</small></div><div><h2>A clearer path<br /><em>forward.</em></h2><p>{project.outcome}</p></div></div>
        <div className="article-end"><Link href="/#work" className="back-link"><ArrowLeft size={14} /> Back to work</Link><Link href="/blog" className="text-link">Read the notes <ArrowUpRight size={15} /></Link></div>
      </article>
      <footer className="subpage-footer"><Link href="/"><ArrowLeft size={14} /> Back to portfolio</Link><span>© 2026 Phan Vinh</span></footer>
    </main>
  );
}
