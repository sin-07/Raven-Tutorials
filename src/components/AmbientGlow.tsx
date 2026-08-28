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
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none"
      style={{ contain: 'strict' }}
    >
      {/* ── 1. TOP PRIMARY EMERALD LIGHT CONE (Clean Radial Gradient) ─ */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.22) 0%, rgba(16, 185, 129, 0.12) 35%, rgba(5, 150, 105, 0.03) 65%, transparent 80%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* ── 2. ANGLED LEFT EMERALD LIGHT STREAM ─────────────────────── */}
      <div 
        className="absolute top-0 left-[5%] w-[450px] h-[90vh] rounded-full opacity-80"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.16) 0%, rgba(5, 150, 105, 0.05) 50%, transparent 80%)',
          transform: 'rotate(-15deg) translate3d(0, 0, 0)',
        }}
      />

      {/* ── 3. ANGLED RIGHT TEAL LIGHT STREAM ───────────────────────── */}
      <div 
        className="absolute top-[10%] right-[5%] w-[450px] h-[85vh] rounded-full opacity-70"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.16) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 80%)',
          transform: 'rotate(15deg) translate3d(0, 0, 0)',
        }}
      />

      {/* ── 4. SMOOTH MOUSE-FOLLOWING SPOTLIGHT (Direct Ref, 0 React Re-renders) ─ */}
      <div 
        ref={mouseLightRef}
        className="fixed w-[500px] h-[500px] rounded-full opacity-60 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.16) 0%, rgba(52, 211, 153, 0.04) 45%, transparent 70%)',
          transform: 'translate3d(-500px, -500px, 0)',
          willChange: 'transform',
        }}
      />

      {/* ── 5. LIGHTWEIGHT DOT MATRIX GRID ──────────────────────────── */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
