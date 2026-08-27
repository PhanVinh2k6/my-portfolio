'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, Sparkles, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import ProjectExplorer from '@/components/ProjectExplorer';
import ArcadeLoader from '@/components/ArcadeLoader';
import StickyMobileCta from '@/components/StickyMobileCta';
import { capabilities, faqs, posts, processSteps, projects } from '@/lib/content';
import { Magnetic, ScrollReveal, SpotlightCard, TextReveal } from '@/components/ReactBitsMotion';

const navItems = [{ label: 'Work', href: '#work' }, { label: 'Journal', href: '#journal' }, { label: 'Play', href: '/play' }, { label: 'About', href: '#about' }];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('work');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-home-section]')];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-20% 0px -65% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const close = () => setMenuOpen(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', handleKeyDown);
    navRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const button = menuButtonRef.current;
    return () => button?.focus();
  }, [menuOpen]);

  return <main id="main-content" className="new-site-shell"><a className="skip-link" href="#work">Skip to content</a>
    <ArcadeLoader />
    <header className={`new-header ${menuOpen ? 'is-open' : ''}`}>
      <Link href="#top" className="new-brand" aria-label="Phan Vinh home"><span className="new-brand-mark"><Image src="/phan-vinh-avatar.webp" alt="" width={42} height={42} priority /></span><span className="new-brand-copy"><small>Signal Room / 26</small></span></Link>
      <nav id="primary-navigation" ref={navRef} className="new-nav" aria-label="Primary navigation">{navItems.map((item, index) => item.href.startsWith('#') ? <a key={item.href} href={item.href} onClick={close} className={active === item.href.slice(1) ? 'is-active' : ''}><small>0{index + 1}</small>{item.label}</a> : <Link key={item.href} href={item.href} onClick={close}><small>0{index + 1}</small>{item.label}</Link>)}<a href="#contact" onClick={close} className="new-nav-contact">Start a conversation <ArrowUpRight size={14} /></a></nav>
      <ThemeToggle />
      <button ref={menuButtonRef} className="new-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
    </header>

    <section id="top" className="new-hero" aria-labelledby="hero-title"><div className="new-hero-kicker"><span><i /> Independent developer / product thinker</span><span>Thai Nguyen, VN / 2026</span></div><div className="new-hero-grid"><div className="new-hero-copy"><p className="new-eyebrow">A small studio of one <Sparkles size={14} /></p><h1 id="hero-title"><TextReveal text="Interfaces that feel like" /><br /><em><TextReveal text="a good idea." delay={100} /></em></h1><p className="new-hero-lede">I&apos;m Phan Vinh — I turn complex workflows, early product questions and curious experiments into things people can understand and use.</p><div className="new-hero-actions"><Magnetic><a className="new-button new-button-dark" href="#work">See the work <ArrowDownRight size={17} /></a></Magnetic><Magnetic><Link className="new-text-link" href="/play">Enter Signal Room <ArrowUpRight size={15} /></Link></Magnetic><Magnetic><Link className="new-text-link" href="#contact">Start a conversation <ArrowUpRight size={15} /></Link></Magnetic></div></div><div className="new-hero-art"><div className="art-label"><span>Signal / 001</span><span>Made for the useful</span></div><SpotlightCard className="hero-spotlight"><div className="art-image-wrap"><Image src="/arcade-keyvisual.webp" alt="Cobalt tabletop arcade machine with a luminous signal on screen" fill priority sizes="(max-width: 800px) 100vw, 45vw" /></div></SpotlightCard><div className="art-caption"><strong>Play is a serious<br />way to learn.</strong><span>Scroll down<br />to explore ↓</span></div></div></div></section>

    <div className="new-marquee" aria-label="Areas of practice"><div>PRODUCT THINKING <i>✳</i> FRONTEND CRAFT <i>✳</i> SYSTEM DESIGN <i>✳</i> AI EXPERIMENTS <i>✳</i> PRODUCT THINKING <i>✳</i> FRONTEND CRAFT <i>✳</i></div></div>

    <section id="work" data-home-section className="new-section new-work"><div className="new-section-intro"><div className="new-index">01 <span>Selected work</span></div><div><h2><TextReveal text="Make the complex" /><br /><em><TextReveal text="feel close." delay={120} /></em></h2><p>Product systems, quiet interfaces and research-led experiments. A selection of things I&apos;ve been thinking through and building.</p></div></div><ProjectExplorer projects={projects} /><div className="new-section-tail"><span>Three directions / one point of view</span><Link href="/blog">Read the journal <ArrowUpRight size={14} /></Link></div></section>

    <section id="about" data-home-section className="new-section new-statement"><div className="new-index">02 <span>Point of view</span></div><div className="statement-grid"><h2>Good digital work is part logic, part <em>invitation.</em></h2><div><p>I like working close to the problem. First I ask what needs to be true. Then I shape a system that feels simple to use, credible to look at and resilient enough to grow.</p><div className="statement-list"><span>01 / Understand the context</span><span>02 / Shape the right system</span><span>03 / Make the experience sing</span></div></div></div></section>

    <section id="services" data-home-section className="new-section new-capabilities"><div className="new-section-intro"><div className="new-index">03 <span>What I can help with</span></div><div><h2>Useful from the<br /><em>first question.</em></h2><p>Không chỉ làm cho sản phẩm trông tốt hơn. Mình giúp biến một bài toán còn mơ hồ thành hệ thống có thể hiểu, thử và phát triển.</p></div></div><div className="capability-grid">{capabilities.map((capability) => <ScrollReveal className="capability-card-motion" key={capability.number}><article className="capability-card"><div className="capability-card-top"><span>{capability.number}</span><span>Signal / {capability.number}</span></div><h3>{capability.title}</h3><p>{capability.description}</p><div className="capability-tags">{capability.bullets.map((bullet) => <span key={bullet}>{bullet}</span>)}</div></article></ScrollReveal>)}</div></section>

    <section id="process" data-home-section className="new-section new-process"><div className="new-section-intro"><div className="new-index">04 <span>How I work</span></div><div><h2><TextReveal text="Less theatre," /><br /><em><TextReveal text="more signal." delay={120} /></em></h2><p>Một quy trình tốt không làm mọi thứ chậm lại. Nó giúp cả team biết điều gì cần được hiểu, quyết định và ship tiếp theo.</p></div></div><div className="process-list">{processSteps.map((step) => <ScrollReveal className="process-row-motion" key={step.number}><div className="process-row"><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div><ArrowDownRight size={18} /></div></ScrollReveal>)}</div></section>

    <section id="play" data-home-section className="new-section new-play"><div className="new-index">05 <span>Signal Room</span></div><div className="play-teaser"><div className="play-teaser-copy"><p className="new-eyebrow">Offline-first / Small games</p><h2>A little room<br />for <em>play.</em></h2><p>Six small games built as a reminder that interfaces can be useful and delightful at the same time. Wend and Zip refresh daily; the rest are ready for replay. No account, no signal required.</p><Link className="new-button new-button-light" href="/play">Open the arcade <ArrowUpRight size={17} /></Link></div><div className="play-teaser-art"><Image src="/arcade-keyvisual.webp" alt="Arcade machine visual for Signal Room" fill sizes="(max-width: 800px) 100vw, 50vw" /><span>PV-26 / INSERT FUN</span></div></div></section>

    <section id="journal" data-home-section className="new-section new-journal"><div className="new-section-intro"><div className="new-index">06 <span>Journal</span></div><div><h2>Notes from<br /><em>the work.</em></h2><p>Short essays about design restraint, product thinking and learning in public.</p></div></div><div className="new-journal-list">{posts.slice(0, 3).map((post) => <Link href={`/blog/${post.slug}`} className="new-journal-row" key={post.slug}><span>{post.number}</span><div><small>{post.category} · {post.readTime}</small><h3>{post.title}</h3><p>{post.excerpt}</p></div><ArrowUpRight size={20} /></Link>)}</div><Link className="new-text-link" href="/blog">Browse all notes <ArrowUpRight size={15} /></Link></section>

    <section id="faq" data-home-section className="new-section new-faq"><div className="new-section-intro"><div className="new-index">07 <span>FAQ</span></div><div><h2>Useful answers<br /><em>before we start.</em></h2><p>Nếu câu hỏi của bạn chưa có ở đây, email là cách nhanh nhất để bắt đầu một cuộc trao đổi có bối cảnh.</p></div></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }) }} /></section>

    <footer id="contact" className="new-footer"><div className="new-footer-top"><div className="new-index">08 <span>Get in touch</span></div><div><h2>Have a good<br /><em>problem?</em></h2><p className="new-footer-intro">Đang mở cho những dự án nhỏ có câu hỏi lớn — product direction, frontend systems hoặc một prototype cần được đưa ra ánh sáng.</p><a className="new-footer-email" href="mailto:hello@phanvinh.id.vn">hello@phanvinh.id.vn <ArrowUpRight size={24} /></a><div className="new-footer-contact-meta"><div><small>Response window</small><strong>Within 2 working days</strong></div><div><small>Base / general area</small><strong>Thai Nguyen, Vietnam</strong><span><a href="https://www.google.com/maps/search/?api=1&query=Thai%20Nguyen%2C%20Vietnam" target="_blank" rel="noreferrer">View map</a><a href="https://www.google.com/maps/dir/?api=1&destination=Thai%20Nguyen%2C%20Vietnam" target="_blank" rel="noreferrer">Directions</a></span></div></div></div></div><div className="new-footer-availability"><span><i /> Currently open to thoughtful collaborations</span><span>Remote / Vietnam time</span></div><div className="new-footer-bottom"><span>© 2026 Phan Vinh / Built with intention</span><div className="new-socials"><a href="https://github.com/PhanVinh2k6" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="mailto:hello@phanvinh.id.vn" aria-label="Email"><Mail size={17} /></a></div><span className="new-footer-legal"><Link href="#faq">FAQ</Link><Link href="/privacy">Privacy</Link><Link href="/thank-you">Thank you</Link><a href="#top">Back to top ↑</a></span></div></footer>
    <StickyMobileCta />
  </main>;
}
