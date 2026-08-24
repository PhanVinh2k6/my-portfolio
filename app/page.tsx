'use client';

import { useState } from 'react';
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

function ProjectVisual({ type }: { type: 'football' | 'crm' }) {
  if (type === 'football') {
    return (
      <div className="project-visual football-visual" aria-hidden="true">
        <div className="visual-window-bar"><i /><i /><i /><span>victory / matchday</span></div>
        <div className="football-layout">
          <div className="football-sidebar"><b>V</b><span /><span /><span /><span /></div>
          <div className="football-main">
            <div className="football-heading"><small>Saturday, 14 June</small><strong>Matchday overview</strong></div>
            <div className="score-card"><div><small>Home</small><b>VCT</b></div><strong>03 : 01</strong><div className="score-away"><small>Away</small><b>RVR</b></div></div>
            <div className="football-stats"><span /><span /><span /><span /></div>
            <div className="football-table"><b>Upcoming sessions</b><em>17:30&nbsp; — &nbsp;Training / Pitch 02</em><em>19:00&nbsp; — &nbsp;League fixture / Pitch 01</em></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual crm-visual" aria-hidden="true">
      <div className="crm-orbit orbit-one" /><div className="crm-orbit orbit-two" />
      <div className="crm-header"><span>CRM intelligence</span><b>● live model</b></div>
      <div className="crm-grid">
        <div className="crm-metric"><small>Leads qualified</small><strong>84.6%</strong><span>+12.8%</span></div>
        <div className="crm-metric"><small>Response time</small><strong>1.4<span>h</span></strong><span>−34.2%</span></div>
        <div className="crm-chart"><small>Pipeline momentum</small><div className="chart-line"><i /><i /><i /><i /><i /><i /><i /></div></div>
      </div>
      <div className="crm-footer"><span>Vietnam Post / Research node</span><span>AI&nbsp;&nbsp;·&nbsp;&nbsp;CRM&nbsp;&nbsp;·&nbsp;&nbsp;DATA</span></div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <a href="#top" className="brand-mark" aria-label="Phan Vinh home"><span>PV</span><small>Portfolio / 26</small></a>
        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu}><span>0{index + 1}</span>{item.label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let&apos;s talk <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div id="top" className="hero-section page-grid">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span className="status-dot" />Based in Thai Nguyen, Vietnam <span className="eyebrow-line" /> 2026</div>
          <h1>Building digital products <em>with clarity.</em></h1>
          <p className="hero-intro">I&apos;m <strong>Phan Vinh</strong>, an IT student and developer interested in the space between thoughtful systems, expressive interfaces, and useful AI.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">Explore selected work <ArrowDownRight size={17} /></a>
            <a className="text-link" href="mailto:hello@phanvinh.id.vn">Get in touch <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="hero-visual reveal reveal-delay-1">
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

      <section id="work" className="work-section content-section">
        <div className="section-heading page-grid">
          <SectionKicker number="01">Selected work</SectionKicker>
          <div><h2>Work that makes<br /><em>the complex feel clear.</em></h2><p>Two ongoing explorations across product design, management systems, and applied AI. Each project is a chance to turn a messy problem into a sharper experience.</p></div>
        </div>
        <div className="projects-grid">
          <a href="https://github.com/PhanVinh2k6" target="_blank" rel="noreferrer" className="project-card project-card-large reveal">
            <ProjectVisual type="football" />
            <div className="project-meta"><div><span>01 — Product system</span><h3>Victory Football</h3><p>A pitch and matchday management system designed to keep teams moving together.</p></div><ArrowUpRight className="project-arrow" size={22} /></div>
          </a>
          <a href="https://github.com/PhanVinh2k6" target="_blank" rel="noreferrer" className="project-card reveal reveal-delay-1">
            <ProjectVisual type="crm" />
            <div className="project-meta"><div><span>02 — AI / Research</span><h3>CRM Intelligence</h3><p>Exploring smarter customer operations with data, automation, and a human point of view.</p></div><ArrowUpRight className="project-arrow" size={22} /></div>
          </a>
        </div>
        <div className="work-footnote"><span>More work is in progress</span><a href="https://github.com/PhanVinh2k6" target="_blank" rel="noreferrer">View GitHub profile <ArrowUpRight size={14} /></a></div>
      </section>

      <section id="approach" className="approach-section">
        <div className="approach-inner page-grid">
          <SectionKicker number="02">My approach</SectionKicker>
          <div className="approach-content"><h2>Good work sits<br />between <em>logic</em> and<br /><em>feeling.</em></h2><div className="approach-copy"><p>I like working close to the problem. First, I ask what needs to be true. Then I shape a system that feels simple to use, credible to look at, and resilient enough to grow.</p><a className="button button-light" href="#contact">Start a conversation <ArrowUpRight size={17} /></a></div></div>
          <div className="approach-list">{['Understand the context', 'Shape the right system', 'Make the experience sing'].map((item, index) => <div key={item} className="approach-row"><span>0{index + 1}</span><strong>{item}</strong><Check size={17} /></div>)}</div>
        </div>
      </section>

      <section id="about" className="about-section content-section">
        <div className="about-grid page-grid">
          <SectionKicker number="03">A little about me</SectionKicker>
          <div className="about-main"><h2>Curious by default.<br /><em>Intentional by design.</em></h2><p className="about-lead">I&apos;m currently studying Information Technology at ICTU, where I spend my time learning how products work from the inside out — from databases and architecture to the small details that make an interface feel right.</p><div className="capability-list">{capabilities.map((item) => <span key={item}>{item}</span>)}</div></div>
          <div className="about-aside"><div className="aside-block"><small>Education</small><strong>Information Technology<br />ICTU / 2024—present</strong></div><div className="aside-block"><small>Based in</small><strong>Thai Nguyen<br />Vietnam</strong></div><div className="aside-block"><small>Open to</small><strong>Collaborations<br />&amp; interesting problems</strong></div></div>
        </div>
      </section>

      <footer id="contact" className="contact-section">
        <div className="contact-inner page-grid"><SectionKicker number="04">Get in touch</SectionKicker><div className="contact-content"><h2>Have a good<br /><em>problem?</em></h2><a className="contact-email" href="mailto:hello@phanvinh.id.vn">hello@phanvinh.id.vn <ArrowUpRight size={28} /></a><div className="contact-bottom"><span>Available for thoughtful collaborations.</span><div className="social-links"><a href="https://github.com/PhanVinh2k6" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="mailto:hello@phanvinh.id.vn" aria-label="Email"><Mail size={18} /></a></div></div></div></div>
        <div className="footer-line page-grid"><span>© 2026 Phan Vinh</span><span>Designed &amp; built with intention</span><a href="#top">Back to top <ArrowUpRight size={13} /></a></div>
      </footer>
    </main>
  );
}
