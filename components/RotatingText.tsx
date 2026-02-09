"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RotatingText({ texts, mainClassName = "" }: any) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % texts.length), 3000);
    return () => clearInterval(timer);
  }, [texts.length]);
  return (
    <div className="relative inline-block h-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span key={index} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className={`block ${mainClassName}`}>{texts[index]}</motion.span>
      </AnimatePresence>
    </div>
  );
}