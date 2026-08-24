'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import ProjectExplorer from '@/components/ProjectExplorer';
import { projects } from '@/lib/content';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '/blog' },
];

const capabilities = [
  'Product thinking',
  'Frontend development',
  'System analysis',
  'AI experiments',
];

function SectionKicker({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-kicker">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('motion-ready');
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));

    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
        setScrolled(window.scrollY > 36);
        const focusLine = window.innerHeight * 0.38;
        const currentSection = sections.reduce((closest, section) => {
          const distance = Math.abs(section.getBoundingClientRect().top - focusLine);
          return distance < closest.distance ? { id: section.id, distance } : closest;
        }, { id: 'top', distance: Number.POSITIVE_INFINITY });
        setActiveSection(currentSection.id);
      });
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      revealObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const isDarkSection = activeSection === 'approach' || activeSection === 'contact';

  return (
    <main className="portfolio-shell">
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
      <header className={`site-header ${isDarkSection ? 'is-dark' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#top" className="brand-mark" aria-label="Phan Vinh home"><span>PV</span><small>Portfolio / 26</small></a>
        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item, index) => item.href.startsWith('#') ? (
            <a key={item.href} href={item.href} onClick={closeMenu} className={activeSection === item.href.slice(1) ? 'is-active' : ''}><span>0{index + 1}</span>{item.label}</a>
          ) : (
            <Link key={item.href} href={item.href} onClick={closeMenu}><span>0{index + 1}</span>{item.label}</Link>
          ))}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let&apos;s talk <ArrowUpRight size={14} /></a>
        </nav>
        <ThemeToggle />
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div id="top" data-section="top" className="hero-section page-grid">
        <div className="hero-copy scroll-reveal" data-reveal>
          <div className="eyebrow"><span className="status-dot" />Based in Thai Nguyen, Vietnam <span className="eyebrow-line" /> 2026</div>
          <h1>Building digital products <em>with clarity.</em></h1>
          <p className="hero-intro">I&apos;m <strong>Phan Vinh</strong>, an IT student and developer interested in the space between thoughtful systems, expressive interfaces, and useful AI.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">Explore selected work <ArrowDownRight size={17} /></a>
            <a className="text-link" href="mailto:hello@phanvinh.id.vn">Get in touch <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="hero-visual scroll-reveal reveal-delay-1" data-reveal>
          <div className="hero-visual-top"><span>01 / 04</span><span>Designing the useful</span></div>
          <div className="hero-monogram"><span>PHAN</span><strong>V</strong><span>VINH</span></div>
          <div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" />
          <div className="hero-visual-note"><span>Currently exploring</span><strong>Interfaces for<br />complex ideas.</strong></div>
          <div className="hero-visual-footer"><span>Scroll to discover</span><ArrowDownRight size={16} /></div>
        </div>
      </div>

      <div className="ticker" aria-label="Areas of interest">
        <div className="ticker-track"><span>Product thinking</span><i>✳</i><span>System design</span><i>✳</i><span>Frontend craft</span><i>✳</i><span>AI research</span><i>✳</i><span>Product thinking</span><i>✳</i><span>System design</span><i>✳</i><span>Frontend craft</span><i>✳</i><span>AI research</span><i>✳</i></div>
      </div>

      <section id="work" data-section="work" className="work-section content-section">
        <div className="section-heading page-grid scroll-reveal" data-reveal>
          <SectionKicker number="01">Selected work</SectionKicker>
          <div><h2>Work that makes<br /><em>the complex feel clear.</em></h2><p>Two ongoing explorations across product design, management systems, and applied AI. Each project is a chance to turn a messy problem into a sharper experience.</p></div>
        </div>
        <ProjectExplorer projects={projects} />
        <div className="work-footnote scroll-reveal" data-reveal><span>More work is in progress</span><div className="work-links"><Link href="/blog">Read the notes <ArrowUpRight size={14} /></Link><a href="https://github.com/PhanVinh2k6" target="_blank" rel="noreferrer">View GitHub profile <ArrowUpRight size={14} /></a></div></div>
      </section>

      <section id="approach" data-section="approach" className="approach-section">
        <div className="approach-inner page-grid">
          <SectionKicker number="02">My approach</SectionKicker>
          <div className="approach-content scroll-reveal" data-reveal><h2>Good work sits<br />between <em>logic</em> and<br /><em>feeling.</em></h2><div className="approach-copy"><p>I like working close to the problem. First, I ask what needs to be true. Then I shape a system that feels simple to use, credible to look at, and resilient enough to grow.</p><a className="button button-light" href="#contact">Start a conversation <ArrowUpRight size={17} /></a></div></div>
          <div className="approach-list scroll-reveal reveal-delay-1" data-reveal>{['Understand the context', 'Shape the right system', 'Make the experience sing'].map((item, index) => <div key={item} className="approach-row"><span>0{index + 1}</span><strong>{item}</strong><Check size={17} /></div>)}</div>
        </div>
      </section>

      <section id="about" data-section="about" className="about-section content-section">
        <div className="about-grid page-grid">
          <SectionKicker number="03">A little about me</SectionKicker>
          <div className="about-main scroll-reveal" data-reveal><h2>Curious by default.<br /><em>Intentional by design.</em></h2><p className="about-lead">I&apos;m currently studying Information Technology at ICTU, where I spend my time learning how products work from the inside out — from databases and architecture to the small details that make an interface feel right.</p><div className="capability-list">{capabilities.map((item) => <span key={item}>{item}</span>)}</div></div>
          <div className="about-aside scroll-reveal reveal-delay-1" data-reveal><div className="aside-block"><small>Education</small><strong>Information Technology<br />ICTU / 2024—present</strong></div><div className="aside-block"><small>Based in</small><strong>Thai Nguyen<br />Vietnam</strong></div><div className="aside-block"><small>Open to</small><strong>Collaborations<br />&amp; interesting problems</strong></div></div>
        </div>
      </section>

      <footer id="contact" data-section="contact" className="contact-section">
        <div className="contact-inner page-grid"><SectionKicker number="04">Get in touch</SectionKicker><div className="contact-content scroll-reveal" data-reveal><h2>Have a good<br /><em>problem?</em></h2><a className="contact-email" href="mailto:hello@phanvinh.id.vn">hello@phanvinh.id.vn <ArrowUpRight size={28} /></a><div className="contact-bottom"><span>Available for thoughtful collaborations.</span><div className="social-links"><a href="https://github.com/PhanVinh2k6" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="mailto:hello@phanvinh.id.vn" aria-label="Email"><Mail size={18} /></a></div></div></div></div>
        <div className="footer-line page-grid scroll-reveal reveal-delay-1" data-reveal><span>© 2026 Phan Vinh</span><span>Designed &amp; built with intention</span><a href="#top">Back to top <ArrowUpRight size={13} /></a></div>
      </footer>
    </main>
  );
}
