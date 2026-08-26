'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const navigation = [
  { href: '/#work', number: '01', label: 'Work' },
  { href: '/blog', number: '02', label: 'Journal' },
  { href: '/play', number: '03', label: 'Play' },
  { href: '/#about', number: '04', label: 'About' },
];

export default function PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#page-content">Skip to content</a>
      <header className={`new-header new-header-subpage ${menuOpen ? 'is-open' : ''}`}>
      <Link href="/" className="new-brand" aria-label="Phan Vinh home" onClick={close}><span>PV</span><small>Signal Room / 26</small></Link>
      <nav className="new-nav" aria-label="Page navigation">
        {navigation.map((item) => <Link key={item.href} href={item.href} onClick={close}><small>{item.number}</small>{item.label}</Link>)}
        <Link href="/#contact" className="new-nav-contact" onClick={close}>Start a conversation <ArrowUpRight size={14} /></Link>
      </nav>
      <ThemeToggle />
      <button className="new-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </header>
    </>
  );
}
