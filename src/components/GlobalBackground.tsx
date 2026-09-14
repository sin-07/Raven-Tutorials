'use client';

import React from 'react';

export default function GlobalBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-[#f6fcf8]"
      style={{ contain: 'strict' }}
      aria-hidden="true"
    >
      {/* ── 1. SUBTLE PLAYFUL CARTOON POLKA-DOT GRID (MINT GREENISH TINT) ── */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(#15803d 1.25px, transparent 1.25px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ── 2. FRESH GREENISH ACCENT CORNER ELEMENTS (NO GRADIENTS) ────────── */}
      {/* Top Left Pop Circle */}
      <div 
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#dcfce7] opacity-60 border-3 border-black pointer-events-none shadow-[4px_4px_0px_#000]"
      />

      {/* Top Right Pop Pill */}
      <div 
        className="absolute top-28 -right-16 w-60 h-60 rounded-full bg-[#bbf7d0] opacity-50 border-3 border-black pointer-events-none shadow-[4px_4px_0px_#000]"
      />

      {/* Bottom Left Pop Square */}
      <div 
        className="absolute bottom-20 -left-12 w-52 h-52 rounded-3xl rotate-12 bg-[#86efac] opacity-45 border-3 border-black pointer-events-none shadow-[4px_4px_0px_#000]"
      />

      {/* Bottom Right Pop Circle */}
      <div 
        className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#d1fae5] opacity-50 border-3 border-black pointer-events-none shadow-[4px_4px_0px_#000]"
      />
    </div>
  );
}
