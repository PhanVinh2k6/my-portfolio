import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function PageHeader() {
  return (
    <header className="page-header">
      <Link href="/" className="brand-mark" aria-label="Phan Vinh home"><span>PV</span><small>Portfolio / 26</small></Link>
      <nav className="page-header-nav" aria-label="Page navigation">
        <Link href="/#work">Work</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/play">Play</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Let&apos;s talk</Link>
      </nav>
      <ThemeToggle />
    </header>
  );
}
