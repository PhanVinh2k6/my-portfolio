'use client';

import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';

type MotionProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className = '' }: MotionProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;
    node.classList.add('rb-reveal-ready');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
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
  }, []);

  return <div ref={nodeRef} className={`rb-reveal ${className}`}>{children}</div>;
}

export function SpotlightCard({ children, className = '' }: MotionProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const moveSpotlight = (event: PointerEvent<HTMLDivElement>) => {
    const node = nodeRef.current;
    if (!node || event.pointerType === 'touch') return;
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
