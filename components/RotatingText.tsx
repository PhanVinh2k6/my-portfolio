"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RotatingText({ texts, mainClassName = "" }: any) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % texts.length), 3000);
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <div className="relative inline-flex flex-col h-[1em] items-baseline overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span 
          key={index} 
          initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`block whitespace-nowrap leading-none ${mainClassName}`}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}