"use client";
import React, { useRef, useEffect } from 'react';

export default function InteractiveMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotation = useRef(0);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    // Interaction handlers
    const handleStart = (x: number) => { isDragging.current = true; lastPointerX.current = x; };
    const handleMove = (x: number) => {
      if (!isDragging.current) return;
      rotation.current += (x - lastPointerX.current) * 0.005;
      lastPointerX.current = x;
    };
    const handleEnd = () => { isDragging.current = false; };

    canvas.addEventListener('mousedown', (e) => handleStart(e.clientX));
    window.addEventListener('mousemove', (e) => handleMove(e.clientX));
    window.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX));
    window.addEventListener('touchmove', (e) => handleMove(e.touches[0].clientX));
    window.addEventListener('touchend', handleEnd);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1000px-World_map_-_low_resolution.svg.png';
    
    let dots: { x: number, y: number }[] = [];
    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = 120; tempCanvas.height = 60;
      tempCtx?.drawImage(img, 0, 0, 120, 60);
      const data = tempCtx?.getImageData(0, 0, 120, 60).data;
      if (data) {
        for (let y = 0; y < 60; y++) {
          for (let x = 0; x < 120; x++) {
            if (data[(y * 120 + x) * 4 + 3] > 150) dots.push({ x: (x / 120) * Math.PI * 2, y: (y / 60) * Math.PI });
          }
        }
      }
    };

    const render = () => {
      canvas.width = canvas.parentElement?.clientWidth || 0;
      canvas.height = canvas.parentElement?.clientHeight || 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // QUAY TỊNH TIẾN KHI KHÔNG VUỐT
      if (!isDragging.current) {
        rotation.current += 0.003; 
      }

      const radius = Math.min(canvas.width, canvas.height) * 0.45;
      dots.forEach(dot => {
        const lon = dot.x + rotation.current;
        const z = Math.cos(lon) * Math.sin(dot.y);
        if (z > 0) {
          const x = Math.sin(lon) * Math.sin(dot.y) * radius + canvas.width / 2;
          const y = -Math.cos(dot.y) * radius + canvas.height / 2;
          ctx.fillStyle = '#5227ff'; ctx.globalAlpha = z * 0.7;
          ctx.beginPath(); ctx.arc(x, y, z * 1.6, 0, Math.PI * 2); ctx.fill();
        }
      });
      requestAnimationFrame(render);
    };
    render();
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 touch-none cursor-grab active:cursor-grabbing" />;
}