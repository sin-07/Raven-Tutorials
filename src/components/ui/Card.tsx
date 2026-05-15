import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'emerald' | 'orange' | 'none';
}

export function Card({ children, className = '', glow = 'none' }: CardProps) {
  const glows = {
    emerald: 'hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]',
    orange: 'hover:border-orange-500/40 hover:shadow-[0_0_249,115,22,0.15)]',
    none: 'hover:border-zinc-700'
  };

  return (
    <div className={`bg-[#0d1117]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 ${glows[glow]} ${className}`}>
      {children}
    </div>
  );
}
