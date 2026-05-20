import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function Progress({ value, max = 100, className = '', showLabel = false }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Progress</span>
          <span className="font-mono text-emerald-400">{percentage}%</span>
        </div>
      )}
      <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
