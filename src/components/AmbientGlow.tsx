'use client';

import React, { useEffect, useState } from 'react';

export default function AmbientGlow() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* ── 1. PRIMARY TOP EMERALD SPOTLIGHT CONE ─────────────────── */}
      <div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_top,_rgba(52,211,153,0.32)_0%,_rgba(16,185,129,0.2)_30%,_rgba(5,150,105,0.06)_60%,_transparent_80%)] blur-[95px] animate-pulse-glow" 
      />

      {/* Bright Core Neon Light Filament */}
      <div 
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-[450px] h-[90px] rounded-full bg-emerald-400/40 blur-[50px]"
      />

      {/* ── 2. ANGLED NEON GREEN LIGHT BEAMS ──────────────────────── */}
      {/* Left Laser Light Beam */}
      <div 
        className="absolute top-0 left-[8%] w-[420px] h-[100vh] bg-gradient-to-b from-emerald-400/22 via-emerald-600/10 to-transparent blur-[110px] transform -rotate-12 animate-float-slow origin-top" 
      />

      {/* Right Neon Cyan-Emerald Beam */}
      <div 
        className="absolute top-[15%] right-[5%] w-[480px] h-[90vh] bg-gradient-to-b from-teal-400/22 via-emerald-500/10 to-transparent blur-[120px] transform rotate-12 animate-float-slow origin-top"
        style={{ animationDelay: '-3.5s' }}
      />

      {/* ── 3. MID & BOTTOM FLOATING LIGHT ORBS ────────────────────── */}
      {/* Middle Left Neon Green Pulse */}
      <div 
        className="absolute top-[48%] -left-32 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.22)_0%,_rgba(5,150,105,0.08)_45%,_transparent_75%)] blur-[140px] animate-float-slow"
        style={{ animationDelay: '-5s' }}
      />

      {/* Bottom Center Ground Glow */}
      <div 
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full bg-gradient-to-t from-emerald-500/22 via-teal-600/10 to-transparent blur-[140px] animate-pulse-glow"
        style={{ animationDelay: '-2s' }}
      />

      {/* ── 4. INTERACTIVE MOUSE-FOLLOWING EMERALD SPOTLIGHT ───────── */}
      {mounted && (
        <div 
          className="fixed w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.18)_0%,_rgba(52,211,153,0.06)_40%,_transparent_70%)] blur-[90px] transition-transform duration-200 ease-out will-change-transform opacity-70"
          style={{
            transform: `translate3d(${mousePos.x - 275}px, ${mousePos.y - 275}px, 0)`,
          }}
        />
      )}

      {/* ── 5. SUBTLE HIGH-TECH LIGHT MATRIX PATTERN ──────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.09)_1px,transparent_1px)] [background-size:28px_28px] opacity-45" />
    </div>
  );
}
