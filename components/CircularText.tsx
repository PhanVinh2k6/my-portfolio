"use client";
<<<<<<< HEAD
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
=======
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  className?: string;
  radius?: number;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 15,
  className = '',
  radius = 50 
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: spinDuration,
      },
    });
  }, [spinDuration, controls]);

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: radius * 2, height: radius * 2 }}
      animate={controls}
    >
      {letters.map((letter, i) => {
        // Tính toán góc cho mỗi chữ cái (360 độ chia đều)
        const rotation = (360 / letters.length) * i;
        return (
          <span
            key={i}
            className="absolute font-black uppercase text-center"
            style={{
              // Xoay toàn bộ khung span và đẩy chữ ra cạnh bằng translateY (-radius)
              transform: `rotate(${rotation}deg) translateY(-${radius}px)`,
              width: '20px', // Độ rộng cố định để chữ không bị méo
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
>>>>>>> 9cb181a (🚀 Final Build: Spjrk Portfolio 2026 with 3D Globe)
