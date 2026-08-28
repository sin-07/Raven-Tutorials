'use client';

import React, { useEffect, useRef } from 'react';

export default function AmbientGlow() {
  const mouseLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mouseLightRef.current;
    if (!el || typeof window === 'undefined') return;

    let ticking = false;
    let targetX = -500;
    let targetY = -500;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (el) {
            el.style.transform = `translate3d(${targetX - 250}px, ${targetY - 250}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10"
      style={{ contain: 'strict' }}
    >
      {/* ── 1. TOP PROMINENT EMERALD LIGHT CONE & NEON FILAMENT ────── */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.38) 0%, rgba(16, 185, 129, 0.22) 35%, rgba(5, 150, 105, 0.08) 60%, transparent 80%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
      <div 
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[120px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.5) 0%, rgba(16, 185, 129, 0.25) 50%, transparent 75%)',
        }}
      />

      {/* ── 2. ANGLED LEFT EMERALD LIGHT STREAM ─────────────────────── */}
      <div 
        className="absolute top-[10%] -left-[5%] w-[600px] h-[90vh] rounded-full opacity-90"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.12) 45%, transparent 75%)',
          transform: 'rotate(-15deg) translate3d(0, 0, 0)',
        }}
      />

      {/* ── 3. ANGLED RIGHT TEAL-EMERALD LIGHT STREAM ───────────────── */}
      <div 
        className="absolute top-[25%] -right-[5%] w-[650px] h-[90vh] rounded-full opacity-85"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.28) 0%, rgba(16, 185, 129, 0.12) 45%, transparent 75%)',
          transform: 'rotate(15deg) translate3d(0, 0, 0)',
        }}
      />

      {/* ── 4. MID & BOTTOM LUMINOUS AURORAS ────────────────────────── */}
      <div 
        className="absolute top-[55%] left-[10%] w-[700px] h-[600px] rounded-full opacity-70"
        style={{
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.24) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 75%)',
        }}
      />

      <div 
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full opacity-80"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.12) 40%, transparent 75%)',
        }}
      />

      {/* ── 5. SMOOTH MOUSE-FOLLOWING SPOTLIGHT (0 React Re-renders) ─── */}
      <div 
        ref={mouseLightRef}
        className="fixed w-[550px] h-[550px] rounded-full opacity-75 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(52, 211, 153, 0.22) 0%, rgba(16, 185, 129, 0.1) 45%, transparent 70%)',
          transform: 'translate3d(-500px, -500px, 0)',
          willChange: 'transform',
        }}
      />

      {/* ── 6. TACTILE DOT MATRIX GRID ──────────────────────────────── */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(rgba(52, 211, 153, 0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
