"use client";
import React, { useRef, useEffect } from 'react';

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let particles: any[] = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    class Particle {
      x: number; y: number; vx: number; vy: number;
      constructor() {
        this.x = Math.random() * canvas!.width; this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }
      draw() {
        ctx!.beginPath(); ctx!.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(82, 39, 255, 0.3)'; ctx!.fill();
      }
    }
    const init = () => { particles = []; for (let i = 0; i < 80; i++) particles.push(new Particle()); };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update(); p.draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x; const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath(); ctx.strokeStyle = `rgba(82, 39, 255, ${0.15 - dist / 1000})`;
            ctx.lineWidth = 0.5; ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };
    window.addEventListener('resize', resize); resize(); init(); animate();
    return () => window.removeEventListener('resize', resize);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
}