import React from 'react';

export function Kbd({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd className={`px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-300 bg-zinc-800/80 border border-zinc-700/60 rounded shadow-sm ${className}`}>
      {children}
    </kbd>
  );
}
