'use client';

import React from 'react';
import { useTheme } from './ThemeContext';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce platform built with Next.js and Stripe integration.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
    link: '#',
    image: '📦'
  },
  {
    id: '2',
    title: 'Social Media Analytics',
    description: 'Real-time analytics dashboard for tracking social media metrics.',
    tags: ['React', 'Node.js', 'D3.js', 'MongoDB'],
    link: '#',
    image: '📊'
  },
  {
    id: '3',
    title: 'AI Chat Application',
    description: 'Intelligent chatbot with natural language processing capabilities.',
    tags: ['Next.js', 'OpenAI', 'WebSocket', 'PostgreSQL'],
    link: '#',
    image: '🤖'
  },
  {
    id: '4',
    title: 'Task Management Tool',
    description: 'Collaborative task management application with real-time sync.',
    tags: ['React', 'Firebase', 'Zustand', 'Framer Motion'],
    link: '#',
    image: '✅'
  }
];

export const PortfolioSection: React.FC = () => {
  const { theme, contrast } = useTheme();
  
  const isDark = theme === 'dark';
  const isHighContrast = contrast === 'high';

  const bgColor = isDark ? '#0a0a0e' : '#fafbfc';
  const textColor = isDark ? '#fff' : '#000';
  const cardBg = isDark 
    ? isHighContrast ? '#1a1a1e' : '#141419'
    : isHighContrast ? '#f0f0f0' : '#ffffff';
  const borderColor = isHighContrast 
    ? (isDark ? '#fff' : '#000')
    : (isDark ? '#3f3f46' : '#e5e7eb');

  return (
    <section className="py-20 px-4" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Featured Projects</h2>
        <p className="text-lg mb-12" style={{ color: isDark ? '#a1a1a6' : '#6b7280' }}>
          A selection of projects I've worked on recently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              className="group p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: cardBg,
                borderColor: borderColor,
                borderWidth: '1px',
              }}
            >
              <div className="text-4xl mb-4">{project.image}</div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#5227ff] transition-colors">
                {project.title}
              </h3>
              
              <p className="mb-4" style={{ color: isDark ? '#a1a1a6' : '#6b7280' }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: isHighContrast 
                        ? (isDark ? '#333' : '#ddd')
                        : (isDark ? 'rgba(82,39,255,0.1)' : 'rgba(82,39,255,0.1)'),
                      color: '#5227ff',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-[#5227ff] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Project</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
