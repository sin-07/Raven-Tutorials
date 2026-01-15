import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatBadgeProps {
  value: number | string;
  trend?: 'up' | 'down' | 'neutral';
  suffix?: string;
  label?: string;
  className?: string;
}

export const StatBadge: React.FC<StatBadgeProps> = ({
  value,
  trend = 'neutral',
  suffix = '%',
  label,
  className = ''
}) => {
  const trendConfig = {
    up: { icon: ArrowUpRight, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    down: { icon: ArrowDownRight, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    neutral: { icon: Minus, color: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20' }
  }[trend];

  const Icon = trendConfig.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-mono font-bold ${trendConfig.color} ${className}`}>
      <Icon className="w-3 h-3 stroke-[2.5]" />
      <span>{value}{suffix}</span>
      {label && <span className="font-jakarta text-zinc-400 font-normal ml-0.5">{label}</span>}
    </span>
  );
};
export default StatBadge;
