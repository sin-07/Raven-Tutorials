import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'orange' | 'cyan' | 'zinc' | 'rose';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'emerald', size = 'sm', className = '' }: BadgeProps) {
  const variants = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_12px_rgba(249,115,22,0.15)]',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.15)]',
    zinc: 'bg-zinc-800/60 text-zinc-300 border-zinc-700/40',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.15)]'
  };
  const sizes = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full border backdrop-blur-md transition-all ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
