"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function CircularText({ text, radius = 50, fontSize = "10px", spinDuration = 10, className = "" }: any) {
  const characters = text.split("");
  const degreeStep = 360 / characters.length;
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ duration: spinDuration, repeat: Infinity, ease: "linear" }} className={`relative flex items-center justify-center ${className}`} style={{ width: radius * 2.2, height: radius * 2.2 }}>
      {characters.map((char: any, i: any) => (
        <span key={i} className="absolute font-black uppercase" style={{ fontSize, transform: `rotate(${i * degreeStep}deg) translateY(-${radius}px)` }}>{char}</span>
      ))}
    </motion.div>
  );
}