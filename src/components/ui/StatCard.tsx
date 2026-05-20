import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'emerald' | 'amber' | 'cyan';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'emerald',
  className = ''
}) => {
  const colorMap = {
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
  }[color];

  return (
    <div className={`p-5 rounded-2xl bg-zinc-900/70 border border-white/10 hover:border-white/20 transition shadow-lg flex items-center justify-between ${className}`}>
      <div>
        <p className="text-xs font-jakarta text-zinc-400 font-medium mb-1">{title}</p>
        <h3 className="font-outfit font-black text-2xl text-white">{value}</h3>
        {subtitle && <p className="text-[11px] font-space text-zinc-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-xl border ${colorMap}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
export default StatCard;
