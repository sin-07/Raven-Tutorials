'use client';

import React from 'react';

export default function GlobalBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-[#050507]"
      style={{ contain: 'strict', transform: 'translate3d(0, 0, 0)' }}
      aria-hidden="true"
    >
      {/* ── 1. DARK NOISE & SUBTLE CYBER GRID ── */}
      <div 
        className="absolute inset-0 opacity-[0.12]" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── 2. CYBER EMERALD & MINT GLOW RADIALS (Hardware-accelerated, zero blur overhead) ── */}
      {/* Top Center Hero Glow */}
      <div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.06) 40%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Mid Left Emerald Aura */}
      <div 
        className="absolute top-[35%] -left-40 w-[620px] h-[620px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(5, 150, 105, 0.10) 0%, rgba(6, 78, 59, 0.04) 45%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Bottom Right Mint Glow */}
      <div 
        className="absolute top-[65%] -right-40 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, rgba(6, 78, 59, 0.04) 50%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
    </div>
  );
}
