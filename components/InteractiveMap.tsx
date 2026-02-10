"use client";
import React, { useRef, useEffect, useState } from 'react';

<<<<<<< HEAD
export default function InteractiveMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotation = useRef(0);
  const [userLocation, setUserLocation] = useState<{lon: number, lat: number} | null>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/').then(res => res.json()).then(data => {
      if(data.longitude && data.latitude) {
        setUserLocation({ lon: (data.longitude + 180) * (Math.PI / 180), lat: (90 - data.latitude) * (Math.PI / 180) });
      }
    }).catch(() => {});

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
=======
const InteractiveMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotation = useRef(0);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const dragSpeed = useRef(0);
  const defaultSpeed = 0.005;
  const [userLocation, setUserLocation] = useState<{lon: number, lat: number} | null>(null);

  useEffect(() => {
    // Lấy vị trí - Fix lỗi "Location access denied" hiện lên màn hình
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if(data.longitude && data.latitude) {
          setUserLocation({
            lon: (data.longitude + 180) * (Math.PI / 180),
            lat: (90 - data.latitude) * (Math.PI / 180)
          });
        }
      }).catch(() => {}); // Im lặng khi lỗi để không hiện popup đỏ

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
>>>>>>> 9cb181a (🚀 Final Build: Spjrk Portfolio 2026 with 3D Globe)
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1000px-World_map_-_low_resolution.svg.png';
    
    let dots: { x: number, y: number }[] = [];
    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = 120; tempCanvas.height = 60;
      tempCtx?.drawImage(img, 0, 0, 120, 60);
<<<<<<< HEAD
      const data = tempCtx?.getImageData(0, 0, 120, 60).data;
      if (data) {
        for (let y = 0; y < 60; y++) {
          for (let x = 0; x < 120; x++) {
            if (data[(y * 120 + x) * 4 + 3] > 150) dots.push({ x: (x / 120) * Math.PI * 2, y: (y / 60) * Math.PI });
          }
        }
=======
      try {
        const data = tempCtx?.getImageData(0, 0, 120, 60).data;
        if (data) {
          for (let y = 0; y < 60; y++) {
            for (let x = 0; x < 120; x++) {
              if (data[(y * 120 + x) * 4 + 3] > 150) {
                dots.push({ x: (x / 120) * Math.PI * 2, y: (y / 60) * Math.PI });
              }
            }
          }
        }
      } catch (e) {
        // Fallback: Nếu lỗi CORS, vẽ 1 vòng tròn điểm giả lập
        for(let i=0; i<500; i++) dots.push({x: Math.random()*Math.PI*2, y: Math.random()*Math.PI});
>>>>>>> 9cb181a (🚀 Final Build: Spjrk Portfolio 2026 with 3D Globe)
      }
    };

    const render = () => {
<<<<<<< HEAD
      canvas.width = canvas.parentElement?.clientWidth || 0;
      canvas.height = canvas.parentElement?.clientHeight || 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotation.current += 0.005;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;

      dots.forEach(dot => {
        const lon = dot.x + rotation.current;
        const z = Math.cos(lon) * Math.sin(dot.y);
        if (z > 0) {
          const x = Math.sin(lon) * Math.sin(dot.y) * radius + canvas.width / 2;
          const y = -Math.cos(dot.y) * radius + canvas.height / 2;
          ctx.fillStyle = '#5227ff'; ctx.globalAlpha = z * 0.7;
          ctx.beginPath(); ctx.arc(x, y, z * 1.5, 0, Math.PI * 2); ctx.fill();
        }
      });
      requestAnimationFrame(render);
    };
    render();
  }, [userLocation]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 touch-none" />;
}
=======
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth; canvas.height = parent.clientHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!isDragging.current) {
        dragSpeed.current *= 0.95;
        rotation.current += defaultSpeed + dragSpeed.current;
      } else {
        rotation.current += dragSpeed.current;
      }

      const radius = Math.min(canvas.width, canvas.height) * 0.4;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      dots.forEach(dot => {
        const lon = dot.x + rotation.current;
        const lat = dot.y;
        const z = Math.cos(lon) * Math.sin(lat);
        if (z > 0) {
          const x = Math.sin(lon) * Math.sin(lat) * radius + centerX;
          const y = -Math.cos(lat) * radius + centerY;
          ctx.fillStyle = '#5227ff';
          ctx.globalAlpha = z * 0.7;
          ctx.beginPath();
          ctx.arc(x, y, z * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (userLocation) {
        const lon = userLocation.lon + rotation.current;
        const lat = userLocation.lat;
        const z = Math.cos(lon) * Math.sin(lat);
        if (z > 0) {
          const x = Math.sin(lon) * Math.sin(lat) * radius + centerX;
          const y = -Math.cos(lat) * radius + centerY;
          ctx.shadowBlur = 15; ctx.shadowColor = '#22c55e';
          ctx.fillStyle = '#22c55e'; ctx.globalAlpha = 1;
          ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      requestAnimationFrame(render);
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPointerX.current = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      dragSpeed.current = (e.clientX - lastPointerX.current) * 0.007;
      lastPointerX.current = e.clientX;
    };
    const onPointerUp = () => { isDragging.current = false; };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    const animId = requestAnimationFrame(render);
    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      cancelAnimationFrame(animId);
    };
  }, [userLocation]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 touch-none cursor-grab active:cursor-grabbing" style={{ touchAction: 'none' }} />;
};

export default InteractiveMap;
>>>>>>> 9cb181a (🚀 Final Build: Spjrk Portfolio 2026 with 3D Globe)
