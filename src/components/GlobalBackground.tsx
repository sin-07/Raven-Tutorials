'use client';

import React from 'react';

export default function GlobalBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-[#070908]"
      style={{ contain: 'strict' }}
      aria-hidden="true"
    >
      {/* ── 1. DARK MINERAL / STONE NOISE & SUBTLE GRID ── */}
      <div 
        className="absolute inset-0 opacity-[0.18]" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── 2. HIGH-TECH EMERALD & CYAN AMBIENT LIGHT RADIALS ── */}
      {/* Top Center Hero Glow */}
      <div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #22c55e 0%, #10b981 35%, transparent 70%)',
        }}
      />

      {/* Mid Left Emerald Aura */}
      <div 
        className="absolute top-[35%] -left-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #4ade80 0%, #059669 40%, transparent 70%)',
        }}
      />

      {/* Bottom Right Cyber Glow */}
      <div 
        className="absolute top-[65%] -right-40 w-[650px] h-[650px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #10b981 0%, #064e3b 50%, transparent 70%)',
        }}
      />
    </div>
  );
}
