'use client';

import React from 'react';

export default function GlobalBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-[#050507]"
      style={{ contain: 'strict' }}
      aria-hidden="true"
    >
      {/* ── 1. DARK NOISE & SUBTLE CYBER GRID ── */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── 2. CYBER EMERALD & MINT GLOW RADIALS ── */}
      {/* Top Center Hero Glow */}
      <div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #10b981 0%, #059669 30%, transparent 70%)',
        }}
      />

      {/* Mid Left Emerald Aura */}
      <div 
        className="absolute top-[35%] -left-40 w-[620px] h-[620px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #059669 0%, #064e3b 45%, transparent 70%)',
        }}
      />

      {/* Bottom Right Mint Glow */}
      <div 
        className="absolute top-[65%] -right-40 w-[650px] h-[650px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #10b981 0%, #064e3b 50%, transparent 70%)',
        }}
      />
    </div>
  );
}
