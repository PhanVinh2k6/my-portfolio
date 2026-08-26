'use client';

import { ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Project } from '@/lib/content';
import ProjectVisual from './ProjectVisual';
import { ScrollReveal, SpotlightCard } from './ReactBitsMotion';

export default function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState('All work');
  const categories = ['All work', ...Array.from(new Set(projects.map((project) => project.category)))];
  const filteredProjects = useMemo(() => category === 'All work' ? projects : projects.filter((project) => project.category === category), [category, projects]);

  return (
    <div className="project-explorer">
      <div className="project-filter-bar"><div className="filter-label"><SlidersHorizontal size={15} /><span>Filter work</span></div><div className="filter-chips" role="group" aria-label="Filter projects by category">{categories.map((item) => <button key={item} type="button" className={category === item ? 'is-active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="filter-result-count" aria-live="polite">{filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}</span></div>
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <Link href={`/projects/${project.slug}`} key={project.slug} className={`project-card ${index === 0 ? 'project-card-large' : ''} scroll-reveal`}>
            <ScrollReveal className="project-card-motion"><SpotlightCard><ProjectVisual type={project.visual} /></SpotlightCard></ScrollReveal>
            <div className="project-meta"><div><span>{project.number} — {project.eyebrow}</span><h3>{project.title}</h3><p>{project.shortDescription}</p></div><ArrowUpRight className="project-arrow" size={22} /></div>
          </Link>
        ))}
      </div>
      {filteredProjects.length === 0 && <div className="empty-search"><h2>No projects in this category.</h2><button type="button" onClick={() => setCategory('All work')}>Show all work</button></div>}
    </div>
  );
}
