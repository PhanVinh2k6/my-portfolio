'use client';

import { useEffect, useState } from 'react';

type LoaderVariant = 'boot' | 'play';

export default function ArcadeLoader({ variant = 'boot' }: { variant?: LoaderVariant }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let duration = variant === 'play' ? 1350 : 1000;
    if (variant === 'boot') {
      try {
        if (window.sessionStorage.getItem('signal-room-booted')) duration = 0;
        else window.sessionStorage.setItem('signal-room-booted', '1');
      } catch {
        // If storage is unavailable, the boot still degrades to a normal timed overlay.
      }
    }
    const timeout = window.setTimeout(() => setVisible(false), duration);
    return () => window.clearTimeout(timeout);
  }, [variant]);

  if (!visible) return null;

  return (
    <div className={`arcade-loader arcade-loader-${variant}`} role="status" aria-live="polite">
      <div className="arcade-loader-screen">
        <div className="arcade-loader-top"><span>PV-26</span><span>{variant === 'play' ? 'PLAY MODE' : 'SYSTEM BOOT'}</span></div>
        <div className="arcade-loader-machine"><div className="arcade-loader-screen-inner"><span className="arcade-loader-scanline" /><strong>PV</strong><em>{variant === 'play' ? 'INSERT FUN' : 'LOADING WORLD'}</em></div><div className="arcade-loader-controls"><i /><i /><i /><b /><b /></div></div>
        <div className="arcade-loader-progress"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
        <p>{variant === 'play' ? 'Choosing your next small adventure' : 'Building digital products with clarity'}</p>
      </div>
    </div>
  );
}
