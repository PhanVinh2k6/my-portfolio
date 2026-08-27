'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const navigation = [
  { href: '/#work', number: '01', label: 'Work' },
  { href: '/blog', number: '02', label: 'Journal' },
  { href: '/play', number: '03', label: 'Play' },
  { href: '/#about', number: '04', label: 'About' },
];

export default function PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
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

  return (
    <>
      <a className="skip-link" href="#page-content">Skip to content</a>
      <header className={`new-header new-header-subpage ${menuOpen ? 'is-open' : ''}`}>
      <Link href="/" className="new-brand" aria-label="Phan Vinh home" onClick={close}><span className="new-brand-mark"><Image src="/phan-vinh-avatar.webp" alt="" width={42} height={42} priority /></span><span className="new-brand-copy"><small>Signal Room / 26</small></span></Link>
      <nav id="primary-navigation" ref={navRef} className="new-nav" aria-label="Page navigation">
        {navigation.map((item) => <Link key={item.href} href={item.href} onClick={close}><small>{item.number}</small>{item.label}</Link>)}
        <Link href="/#contact" className="new-nav-contact" onClick={close}>Start a conversation <ArrowUpRight size={14} /></Link>
      </nav>
      <ThemeToggle />
      <button ref={menuButtonRef} className="new-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </header>
    </>
  );
}
