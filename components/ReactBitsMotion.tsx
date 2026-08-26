'use client';

import { Fragment, useEffect, useRef, type PointerEvent, type ReactNode } from 'react';

type MotionProps = {
  children: ReactNode;
  className?: string;
};

type RevealProps = MotionProps & { delay?: number };

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function ScrollReveal({ children, className = '', delay = 0 }: RevealProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;
    node.style.setProperty('--rb-delay', `${delay}ms`);
    node.classList.add('rb-reveal-ready');
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      node.classList.add('rb-reveal-visible');
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('rb-reveal-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={nodeRef} className={`rb-reveal ${className}`}>{children}</div>;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;
    node.style.setProperty('--rb-delay', `${delay}ms`);
    node.classList.add('rb-text-ready');
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      node.classList.add('rb-text-visible');
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('rb-text-visible');
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  const words = text.split(' ');
  return <span ref={nodeRef} className={`rb-text-reveal ${className}`} aria-label={text}>{words.map((word, index) => <Fragment key={`${word}-${index}`}><span aria-hidden="true" className="rb-text-word">{word}</span>{index < words.length - 1 ? ' ' : null}</Fragment>)}</span>;
}

export function SpotlightCard({ children, className = '' }: MotionProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const moveSpotlight = (event: PointerEvent<HTMLDivElement>) => {
    const node = nodeRef.current;
    if (!node || event.pointerType === 'touch' || prefersReducedMotion()) return;
    const bounds = node.getBoundingClientRect();
    node.style.setProperty('--rb-x', `${event.clientX - bounds.left}px`);
    node.style.setProperty('--rb-y', `${event.clientY - bounds.top}px`);
  };

  const resetSpotlight = () => {
    const node = nodeRef.current;
    if (!node) return;
    node.style.setProperty('--rb-x', '50%');
    node.style.setProperty('--rb-y', '50%');
  };

  return <div ref={nodeRef} className={`rb-spotlight ${className}`} onPointerMove={moveSpotlight} onPointerLeave={resetSpotlight}>{children}</div>;
}

export function Magnetic({ children, className = '' }: MotionProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const moveMagnet = (event: PointerEvent<HTMLDivElement>) => {
    const node = nodeRef.current;
    if (!node || event.pointerType === 'touch' || prefersReducedMotion()) return;
    const bounds = node.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
    node.style.setProperty('--rb-mx', `${x}px`);
    node.style.setProperty('--rb-my', `${y}px`);
  };

  const resetMagnet = () => {
    const node = nodeRef.current;
    if (!node) return;
    node.style.setProperty('--rb-mx', '0px');
    node.style.setProperty('--rb-my', '0px');
  };

  return <div ref={nodeRef} className={`rb-magnetic ${className}`} onPointerMove={moveMagnet} onPointerLeave={resetMagnet}>{children}</div>;
}
