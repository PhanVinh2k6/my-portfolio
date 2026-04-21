"use client";

import { useState, useEffect } from "react";

export function Intro() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* Animated loading screen */}
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Animated logo/initials */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 border-r-red-600 animate-spin" />
          <div className="text-5xl font-bold text-red-600">PV</div>
        </div>

        {/* Animated text */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white animate-pulse">
            Phan Vinh
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium tracking-widest uppercase">
            Full-Stack Developer
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 animate-[slideRight_2s_ease-in-out]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
