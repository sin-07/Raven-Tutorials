import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  color?: 'emerald' | 'amber' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showPercent = false,
  color = 'emerald',
  size = 'md',
  className = ''
}) => {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }[size];

  const colorClasses = {
    emerald: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]',
    amber: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]',
    blue: 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
  }[color];

  return (
    <div className={`w-full ${className}`} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-jakarta font-medium text-zinc-300">
          {label && <span>{label}</span>}
          {showPercent && <span className="font-mono text-emerald-400 font-bold">{percent}%</span>}
        </div>
      )}
      <div className={`w-full bg-zinc-800/80 rounded-full overflow-hidden p-0.5 border border-white/5 ${sizeClasses}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClasses}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
export default Progress;
