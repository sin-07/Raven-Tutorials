import React from 'react';

interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({ label, className = '' }: DividerProps) {
  if (!label) {
    return <hr className={`border-t border-zinc-800/80 my-4 ${className}`} />;
  }

  return (
    <div className={`flex items-center my-4 ${className}`}>
      <div className="flex-grow border-t border-zinc-800/80" />
      <span className="px-3 text-xs uppercase tracking-wider text-zinc-500 font-mono">{label}</span>
      <div className="flex-grow border-t border-zinc-800/80" />
    </div>
  );
}
