'use client';

import React from 'react';

export default function GlobalBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-[#07080c]"
      style={{ contain: 'strict' }}
      aria-hidden="true"
    >
      {/* ── 1. PRIMARY TOP EMERALD RADIAL CORONA ────────────────────── */}
      <div 
        className="absolute -top-36 left-1/2 -translate-x-1/2 w-[1400px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.06) 35%, rgba(0, 229, 168, 0.02) 55%, transparent 75%)',
        }}
      />

      {/* ── 2. MID-PAGE LEFT & RIGHT AMBIENT AURORAS ───────────────── */}
      <div 
        className="absolute top-[35%] -left-48 w-[600px] h-[600px] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
        }}
      />

      <div 
        className="absolute top-[45%] -right-48 w-[650px] h-[650px] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 229, 168, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── 3. BOTTOM HORIZON AMBIENT GLOW ──────────────────────────── */}
      <div 
        className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] rounded-full opacity-50"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, transparent 75%)',
        }}
      />

      {/* ── 4. TACTILE DOT MATRIX GRID ──────────────────────────────── */}
      <div 
        className="absolute inset-0 opacity-25" 
        style={{
          backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
