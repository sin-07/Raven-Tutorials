'use client';

import React from 'react';

export default function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Top Center Emerald Sun / Aurora */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full bg-gradient-to-b from-emerald-500/25 via-emerald-600/15 to-transparent blur-[130px] animate-pulse-glow" 
      />

      {/* Top Right Neon Teal Shadow Orb */}
      <div 
        className="absolute top-[15%] -right-48 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.2)_0%,_rgba(20,184,166,0.1)_40%,_transparent_75%)] blur-[140px] animate-float-slow" 
      />

      {/* Middle Left Neon Emerald Shadow Blob */}
      <div 
        className="absolute top-[45%] -left-48 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.18)_0%,_rgba(5,150,105,0.08)_45%,_transparent_75%)] blur-[150px] animate-float-slow"
        style={{ animationDelay: '-4s' }}
      />

      {/* Bottom Right Floating Aurora */}
      <div 
        className="absolute -bottom-32 right-[10%] w-[700px] h-[500px] rounded-full bg-gradient-to-t from-emerald-500/20 via-teal-600/10 to-transparent blur-[160px] animate-pulse-glow"
        style={{ animationDelay: '-2s' }}
      />

      {/* Subtle Matrix / Dot Grid Overlay for Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.07)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
    </div>
  );
}
